import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '@login/_services';
import { Apartment, Owner } from '@login/_models';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  apartments: Apartment[];
  owner: Owner;
  ownerData; // The object returnes from server
  api: String;
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
    this.api = environment.endpoint.api;
  }

  ngOnInit() {
    this.refreshData();
  }
  refreshData() {
    return this.userService.getOwnerApts(this.route.snapshot.paramMap.get('id')).pipe(first()).subscribe(owner => {
      this.ownerData = owner;
      this.owner = this.ownerData.details;
      this.apartments = this.ownerData.apartments;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddApartmentDialogComponent, {
      width: '60vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const formGroup = result;
        const formData = new FormData();
        formData.append('owner_id', this.route.snapshot.paramMap.get('id'));
        formData.append('is_rented', formGroup.is_rented ? '1' : '0');
        formData.append('address', formGroup.address);
        formData.append('img', formGroup.image);
        formData.append('value', formGroup.value);
        //formData.forEach((value, key) => {
        //  console.log(key + " " + value);
        //})


        this.userService.newApartment(formData).subscribe(
          (res) => {
            this.apartments = null;
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
  handleWarningClose(open: boolean) {
    this.WarningMessageOpen = open;
    this.WarningMessageText = '';
  }

}


@Component({
  selector: 'add-apartment-dialog',
  templateUrl: './addApartment-dialog.html',
})
export class AddApartmentDialogComponent {
  profileForm = new FormGroup({
    //  owner_id: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    is_rented: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<AddApartmentDialogComponent>,
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
