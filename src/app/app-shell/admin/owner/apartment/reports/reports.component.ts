import { Component, OnInit, Inject } from '@angular/core';
import { Report } from '@login/_models';
import { UserService, AlertService } from '@login/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  report: Report;
  reportLocation;
  api: string;
  myDate: Date;
  error: string;
  uploadResponse;
  progressMode = 'indeterminate';
  WarningMessageText = '';
  WarningMessageOpen = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.api = environment.endpoint.api;
    this.myDate = new Date();
  }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    return this.userService.getLastReportAdmin(this.route.snapshot.parent.paramMap.get('id'))
      .subscribe(res => {
        this.report = res;
      },
      err => {
        this.uploadResponse = {message: 0};
        this.progressMode = 'determinate';
        this.WarningMessageOpen = true;
        this.WarningMessageText = '❌ אין דו"חות קיימים';
      }
    );
  }

  public showPDF(uri): void {
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

  addReport(): void {
    const dialogRef = this.dialog.open(AddReportDialogComponent, {
      width: '60vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      const date = this.myDate.toISOString();
      if (result) {
        const formGroup = result;
        const formData = new FormData();
        formData.append('owner_id', this.route.snapshot.parent.paramMap.get('id'));
        formData.append('created_on', date);
        formData.append('updated_on', date);
        formData.append('file', formGroup.file);
        formData.append('is_read', '0');


        this.userService.newReport(formData).subscribe(
          (res) => {
            this.report = null;
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
  selector: 'add-report-dialog',
  templateUrl: './addReport-dialog.html',
})
export class AddReportDialogComponent {
  profileForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<AddReportDialogComponent>,
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