import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/shared/login/_services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  skipLinkPath: string;
  navbarTogglerDemo02: boolean;
  constructor(
    private location: Location,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.skipLinkPath = `${this.location.path()}#mainContent`;

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
