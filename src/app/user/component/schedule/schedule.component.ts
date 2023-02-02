import { Component, OnInit, ViewChild } from '@angular/core';
import { SeoService, AuthService } from '../../../shared/services';
import { IUser } from '../../interface';
import { ScheduleEditComponent } from '../../../calendar/components';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './schedule.html'
})
export class ScheduleComponent implements OnInit {
  public tab: string = 'schedule';
  public tutor: IUser;
  public loading: boolean = false;

  @ViewChild('schedulePaid') schedulePaid: ScheduleEditComponent;
  @ViewChild('scheduleFree') scheduleFree: ScheduleEditComponent;
  constructor(private seoService: SeoService, private authService: AuthService, private modalService: NgbModal) {
    seoService.update('My Schedule');
    
  }

  ngOnInit() {
    this.loading = true;
    this.authService.getCurrentUser().then(resp => {
      if (resp._id) {
        this.tutor = resp;
      }
      this.loading = false;
    });
  }

  onTabSelect(tab: string) {
    this.tab = tab;
    if (tab === 'schedule') {
      setTimeout(() => {
        this.schedulePaid.reRender();
      }, 100);
    } else if (tab === 'free') {
      setTimeout(() => {
        this.scheduleFree.reRender();
      }, 100);
    }
    else if (tab === 'batch') {
      setTimeout(() => {
        this.schedulePaid.reRender();
      }, 100);
      
    }
  }

  onChange(isFree: boolean) {
    if (!isFree) {
      this.scheduleFree.loadStatic();
    } else {
      this.schedulePaid.loadStatic();
    }
  }
}
