import { Component, OnInit, Input } from '@angular/core';
import { Resident, Apartment } from '@login/_models';
import { UserService } from '@login/_services';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-residents',
  templateUrl: './my-residents.component.html',
  styleUrls: ['./my-residents.component.css']
})
export class MyResidentsComponent implements OnInit {
  residents: Resident[];
  @Input() apt: Apartment;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.residents = [];
   }

  ngOnInit() {
    this.userService.getResidents(this.route.snapshot.parent.paramMap.get('id')).pipe(first()).subscribe(users => {
      this.residents = users;
    });
  }

}
