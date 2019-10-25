import { Component, OnInit } from '@angular/core';
import { UserService } from '@login/_services';
import { environment } from '../../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

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
  ) {
    this.documents = [];
    this.myDate = new Date();
    this.api = environment.endpoint.api;
  }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.chosenCategory = null;
    return this.userService.getDocumentsCategories(this.route.snapshot.parent.paramMap.get('id')).pipe(first()).subscribe(users => {
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
    this.userService.getDocumentsOfCategories(this.route.snapshot.parent.paramMap.get('id'), this.chosenCategory)
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

}
