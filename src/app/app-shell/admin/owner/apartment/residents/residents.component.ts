import { Component, OnInit } from '@angular/core';
import { Resident, Apartment } from '@login/_models';
import { UserService } from '@login/_services';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.css']
})
export class ResidentsComponent implements OnInit {
  residents: Resident[];
  progressMode = 'indeterminate';
  WarningMessageText = '';
  WarningMessageOpen = false;
  error: string;
  uploadResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.residents = [];
  }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    return this.userService.getAdminResidents(this.route.snapshot.parent.paramMap.get('aptId')).pipe(first()).subscribe(users => {
      this.residents = users;
    },
      err => {
        this.uploadResponse = { message: 0 };
        this.progressMode = 'determinate';
        this.WarningMessageOpen = true;
        this.WarningMessageText = '❌ אין דיירים קיימים, עבור ל-חוזה בכדי להוסיף';
      }
    );
  }

}
