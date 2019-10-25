import { Component, OnInit, Inject } from '@angular/core';
import { Owner } from '@login/_models';
import { UserService } from '@login/_services';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {
  owners: Owner[];
  searchText;

  newOwner;
  name: string;


  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.owners = [];
  }

  ngOnInit() {
    this.userService.getAllOwners().pipe(first()).subscribe(users => {
      this.owners = users;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddOwnerDialogComponent, {
      width: '60vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newOwner = result;
        this.userService.newOwner(this.newOwner).subscribe(() => {
          alert('Add successfully');
        });
      }
    });
  }

}


@Component({
  selector: 'add-owner-dialog',
  templateUrl: './addOwner-dialog.html',
})
export class AddOwnerDialogComponent {

  profileForm = new FormGroup({
    personal_id: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]),
    password: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    address: new FormControl('', []),
    phone_number: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    public dialogRef: MatDialogRef<AddOwnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
