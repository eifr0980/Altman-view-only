import { Component, OnInit } from '@angular/core';
import { Contract } from '@login/_models';
import { UserService } from '@login/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  contracts: Contract[];
  api: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.contracts = [];
    this.api = environment.endpoint.api;
  }

  ngOnInit() {
    this.userService.getContracts(this.route.snapshot.parent.paramMap.get('id')).pipe(first()).subscribe(users => {
      this.contracts = users;
    });
  }

  public showPDF(location): void {
    let uri = `/apartments/${location}`;
    this.userService.getPDF(uri)
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
