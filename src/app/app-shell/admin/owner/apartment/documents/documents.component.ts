import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '@login/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';

export interface DialogData {
  animal: string;
  category: string;
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documents;
  categories;
  chosenCategory;
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
    this.documents = [];
    this.myDate = new Date();
    this.api = environment.endpoint.api;
    this.ownerId = this.route.snapshot.parent.paramMap.get('id');

  }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.chosenCategory = null;
    return this.userService.getAdminDocumentsCategories(this.route.snapshot.parent.paramMap.get('aptId')).pipe(first()).subscribe(users => {
      this.categories = users;
    },
      err => {
        this.uploadResponse = { message: 0 };
        this.progressMode = 'determinate';
        this.WarningMessageOpen = true;
        this.WarningMessageText = '❌ אין מסמכים קיימים';
      }
    );
  }


  getDocuments(category) {
    this.chosenCategory = category;
    this.userService.getAdminDocumentsOfCategories(this.route.snapshot.parent.paramMap.get('aptId'), this.chosenCategory)
      .pipe(first()).subscribe(users => {
        this.documents = users;
      },
        err => {
          this.uploadResponse = { message: 0 };
          this.progressMode = 'determinate';
          this.WarningMessageOpen = true;
          this.WarningMessageText = '❌ אין מסמכים קיימים';
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
      //  link.download = "דוח.pdf";
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
  }


  addDocument(): void {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '60vw',
      data: { category: this.chosenCategory }
    });

    dialogRef.afterClosed().subscribe(result => {
      const date = this.myDate.toISOString();
      if (result) {
        const formGroup = result;
        const formData = new FormData();
        formData.append('apt_id', this.route.snapshot.parent.paramMap.get('aptId'));
        formData.append('name', formGroup.name);
        formData.append('date', date);
        formData.append('category', formGroup.category);
        formData.append('file', formGroup.file);

        //  formData.forEach((value, key) => {
        //    console.log(key + ' ' + value);
        //  });

        this.userService.newDocument(formData).subscribe(
          (res) => {
            this.documents = null;
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
  selector: 'add-document-dialog',
  templateUrl: './addDocument-dialog.html',
})
export class AddDocumentDialogComponent {
  profileForm = new FormGroup({
    //  owner_id: new FormControl('', [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
    category: new FormControl(this.data.category, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<AddDocumentDialogComponent>,
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