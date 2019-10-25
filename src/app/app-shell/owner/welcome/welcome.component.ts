import { Component, OnInit } from '@angular/core';
import { UserService } from '@login/_services';
import { Apartment } from '@login/_models';
import { first } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  apartments: Apartment[];
  api: string;

  constructor(private userService: UserService) {
    this.api = environment.endpoint.api;
  }

  ngOnInit() {
    this.userService.getAllApts().pipe(first()).subscribe(users => {
      this.apartments = users;
    });
  }

}
