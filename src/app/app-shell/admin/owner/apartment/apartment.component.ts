import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apartment } from '@login/_models';
import { UserService } from '@login/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent implements OnInit {
  apartment: Apartment;
  currectTab: number;
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    
    this.currectTab = 0;
    this.navLinks = [
      {
        label: 'דיירים',
        link: 'residents',
        backgroundColor: '#DBF4F1',
        index: 0
      }, {
        label: 'דו"ח חודשי',
        link: 'reports',
        backgroundColor: '#C2ECE8',
        index: 1
      }, {
        label: 'חוזה',
        link: 'contract',
        backgroundColor: '#92DED5',
        index: 2
      },
      {
        label: 'צ\'קים',
        link: 'cheques',
        backgroundColor: '#62CFC3',
        index: 3
      },
      {
        label: 'מסמכים',
        link: 'documents',
        backgroundColor: '#31C0B0',
        index: 4
      },
      {
        label: 'תשואה',
        link: 'returns',
        backgroundColor: '#0EB5A3',
        index: 5
      },
      {
        label: 'התראות',
        link: 'notifications',
        backgroundColor: '#0B8D7F',
        index: 6
      }
    ];
   }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });

    this.userService.getApartment(this.route.snapshot.paramMap.get('aptId')).pipe(first()).subscribe(users => {
      this.apartment = users;
    });
  }

}
