import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/login/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  opened: Boolean;
  links;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.links = [
      {
        label: 'שלום',
        link: '',
      },
      {
        label: 'החשבון שלי',
        link: '',
      },
      {
        label: 'הדירות שלי',
        link: '/myApartments',
      },
    ];
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
