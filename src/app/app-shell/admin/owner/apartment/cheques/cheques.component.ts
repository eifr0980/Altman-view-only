import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '@login/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { Cheque, Resident } from '@login/_models';

export interface DialogData {
  animal: string;
  name: string;
  residents;
}

@Component({
  selector: 'app-cheques',
  templateUrl: './cheques.component.html',
  styleUrls: ['./cheques.component.css']
})
export class ChequesComponent implements OnInit {
  cheques;
  residents: Resident[];
  myDate: Date;
  api: string;
  ownerId: string;
  error: string;
  uploadResponse;
  progressMode = 'indeterminate';
  WarningMessageText = '';
  WarningMessageOpen = false;
  monthes;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.cheques = [];
    this.myDate = new Date();
    this.api = environment.endpoint.api;
    this.ownerId = this.route.snapshot.parent.paramMap.get('id');
    this.monthes = [
      {
      }
    ]
  }

  ngOnInit() {
    this.refreshData();
    this.userService.getAdminResidents(this.route.snapshot.parent.paramMap.get('aptId')).pipe(first()).subscribe(users => {
      this.residents = users;
    });
  }

  refreshData() {
    return this.userService.getAdminChequesByDate(this.route.snapshot.parent.paramMap.get('aptId'), 2019).pipe(first()).subscribe(users => {
      this.cheques = users;
    },
      err => {
        this.uploadResponse = { message: 0 };
        this.progressMode = 'determinate';
        this.WarningMessageOpen = true;
        this.WarningMessageText = '❌ אין צ\'קים קיימים';
      }
    );
  }

  public showPDF(location): void {
    const uri = `${this.ownerId}/apartments/${location}`;
    this.userService.getPDFadmin(uri)
      .subscribe(x => {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        const newBlob = new Blob([x], { type: 'application/pdf' });

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        const link = document.createElement('a');
        link.href = data;
      //  link.download = 'דוח.pdf';
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(() => {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
  }

  addCheque(): void {
    const dialogRef = this.dialog.open(AddChequeDialogComponent, {
      width: '60vw',
      data: {
        residents: this.residents
      }
    });

    dialogRef.afterClosed().subscribe(result => {
     // const date = `${this.myDate.getDate()}/${this.myDate.getMonth() + 1}/${this.myDate.getFullYear()}`;
      if (result) {
        const formGroup = result;
        const formData = new FormData();
        formData.append('resident_id', formGroup.resident_id);
        formData.append('date', formGroup.date.toISOString());
        formData.append('file', formGroup.file);
        formData.append('valid', formGroup.valid);

        //  formData.forEach((value, key) => {
        //    console.log(key + ' ' + value);
        //  });

        this.userService.newCheque(formData).subscribe(
          (res) => {
            this.cheques = null;
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
}


@Component({
  selector: 'add-cheque-dialog',
  templateUrl: './addCheque-dialog.html',
})
export class AddChequeDialogComponent {
  profileForm = new FormGroup({
    resident_id: new FormControl('', [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
    valid: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
  });


  constructor(
    public dialogRef: MatDialogRef<AddChequeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

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
