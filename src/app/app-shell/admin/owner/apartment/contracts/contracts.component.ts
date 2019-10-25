import { Component, OnInit, Inject } from '@angular/core';
import { Contract } from '@login/_models';
import { UserService } from '@login/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  contracts: Contract[];
  myDate: Date;
  api: string;
  ownerId: string;
  error: string;
  uploadResponse;
  progressMode = 'indeterminate';
  WarningMessageText = '';
  WarningMessageOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.contracts = [];
    this.myDate = new Date();
    this.api = environment.endpoint.api;
    this.ownerId = this.route.snapshot.parent.paramMap.get('id');
  }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    return this.userService.getContracts(this.route.snapshot.parent.paramMap.get('aptId')).pipe(first()).subscribe(users => {
      this.contracts = users;
    },
      err => {
        this.uploadResponse = {message: 0};
        this.progressMode = 'determinate';
        this.WarningMessageOpen = true;
        this.WarningMessageText = '❌ אין חוזים קיימים';
      }
    );
  }

  public showPDF(location): void {
    let uri = `${this.ownerId}/apartments/${location}`;
    this.userService.getPDFadmin(uri)
      .subscribe(x => {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([x], { type: 'application/pdf' });

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
      //  link.setAttribute('target', '_blank');

      //  link.click();
      //  link.download = "דוח.pdf";
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true}));

        setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
  }

  addContract(): void {
    const dialogRef = this.dialog.open(AddContractDialogComponent, {
      width: '60vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      const date = this.myDate.toISOString();
      if (result) {
        const formGroup = result;
        const formData = new FormData();
        formData.append('apt_id', this.route.snapshot.parent.paramMap.get('aptId'));
        formData.append('created_at', formGroup.created_at.toISOString());
        formData.append('updated_at', date);
        formData.append('end_at', formGroup.end_at.toISOString());
        formData.append('file', formGroup.file);
        formData.append('cheques_valid_date', formGroup.cheques_valid_date);
        formData.append('is_last_cheque_valid', formGroup.is_last_cheque_valid ? '1' : '0');

        //  formData.forEach((value, key) => {
        //    console.log(key + ' ' + value);
        //  });

        this.userService.newContract(formData).subscribe(
          (res) => {
            this.contracts = null;
            this.progressMode = 'indeterminate';
            this.uploadResponse = res;
            if (this.uploadResponse.status === 'Done') {
              this.progressMode = 'indeterminate';
              this.WarningMessageOpen = true;
              this.WarningMessageText = this.uploadResponse.message;
              this.refreshData();
            }
          },
          (err) => this.error = err
        );
      }

    });
  }

  addResident(contract_id): void {
    const dialogRef = this.dialog.open(AddResidentDialogComponent, {
      width: '60vw',
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const formGroup = result;
        const formData = new FormData();
        formData.append('contract_id', contract_id);
        formData.append('first_name', formGroup.first_name);
        formData.append('last_name', formGroup.last_name);
        formData.append('img', formGroup.image);
        formData.append('phone_number', formGroup.phone_number);
        formData.append('email', formGroup.email);
        // formData.forEach((value, key) => {
        //   console.log(key + ' ' + value);
        // });


        this.userService.newResident(formData).subscribe(() => {
          alert('Add successfully');
        });
      }

    });
  }
  handleWarningClose(open: boolean) {
    this.WarningMessageOpen = open;
    this.WarningMessageText = '';
  }
}



@Component({
  selector: 'add-contract-dialog',
  templateUrl: './addContract-dialog.html',
})
export class AddContractDialogComponent {
  profileForm = new FormGroup({
    //  owner_id: new FormControl('', [Validators.required]),
    created_at: new FormControl(new Date(), [Validators.required]),
    end_at: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear() + 1)), [Validators.required]),
    file: new FormControl('', [Validators.required]),
    cheques_valid_date: new FormControl('', [Validators.required]),
    is_last_cheque_valid: new FormControl(false, [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<AddContractDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileForm.get('file').setValue(file);

    }
  }

  onSubmit() {
    this.dialogRef.close();
  }
}



@Component({
  selector: 'add-resident-dialog',
  templateUrl: './addResident-dialog.html',
})
export class AddResidentDialogComponent {
  profileForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    public dialogRef: MatDialogRef<AddResidentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileForm.get('image').setValue(file);
    }
  }

  onSubmit() {
    this.dialogRef.close();
  }
}
