import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apartment } from '@login/_models';
import { UserService } from '@login/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
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
        label: 'בעלי דירות',
        link: 'owners',
        backgroundColor: '#92DED5',
        index: 0
      }, {
        label: 'דירות',
        link: 'apartments',
        backgroundColor: '#31C0B0',
        index: 1
      }, {
        label: 'משימות',
        link: 'tasks',
        backgroundColor: '#0B8D7F',
        index: 2
      }
    ];
  }

  ngOnInit() {


  }

}
