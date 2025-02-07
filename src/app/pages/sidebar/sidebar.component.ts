import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import * as momenttz from 'moment-timezone';
import { OverlayContainer } from '@angular/cdk/overlay';
const THEME_DARKNESS_SUFFIX = `-dark`;
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  status: boolean = false;
  date: any;
  theme = false;
  color = '#9e9e9e';
  bgColor = '#e0e0e0';
  sideColor = '#ff5722';
  bodyColor = ' #dcedc8';
  name: string = '';
  sidebar: any = {};
  permissions: any;
  checklistStatus: any = [];
  assignedChecklists: any = [];
  approvalClicked: boolean = false;
  filledClick: boolean = false;
  rejectedLists: any = [];
  userName: string = '';
  getData: any;
  user: string = '';
  data: string = '';
  email: string = '';
  constructor(
    private router: Router,
    private overlayContainer: OverlayContainer,
    private dataService: DataService
  ) {
    // this.setTheme(this.theme);
    this.setTheme('indigo-pink', false); // Default Theme
  }

  ngOnInit(): void {
    this.name = sessionStorage.getItem('role');
    this.user = sessionStorage.getItem('user');
    if (this.user) {
      this.anyChecklistAssigned();
    }
    this.getRole();
    setInterval(() => {
      // this.date = momenttz.tz(new Date(),timeStamp).format('d MMM, y , HH:mm:ss') ;},1000
      this.date = momenttz(new Date());
    }, 1000);
  }

  showRole: boolean = false;
  showZone: boolean = false;
  showDepartment: boolean = false;
  showPlant: boolean = false;
  showShift: boolean = false;
  showMachine: boolean = false;
  showMapping: boolean = false;
  showUser: boolean = false;
  showPartConfig: boolean = false;
  showTemplate: boolean = false;
  showChecklist: boolean = false;
  showMaster: boolean = false;
  showConfiguration: boolean = false;
  getRole() {
    this.showRole = false;
    this.showZone = false;
    this.showDepartment = false;
    this.showPlant = false;
    this.showShift = false;
    this.showMachine = false;
    this.showMapping = false;
    this.showUser = false;
    this.showPartConfig = false;
    this.showTemplate = false;
    this.showMaster = false;
    this.dataService
      .get('config/role?roleName=' + this.name)
      .subscribe((res) => {
        if (res['result'].length) {
          let result = res['result'];
          this.permissions = result[0]['permissions']['Configuration'];
          for (let key in this.permissions) {
            if (key == 'Zone') {
              if (this.permissions[key]['view']) {
                this.showZone = true;
              }
            }
            if (key == 'Role') {
              if (this.permissions[key]['view']) {
                this.showRole = true;
              }
            }
            if (key == 'Department') {
              if (this.permissions[key]['view']) {
                this.showDepartment = true;
              }
            }
            if (key == 'Plant') {
              if (this.permissions[key]['view']) {
                this.showPlant = true;
              }
            }
            if (key == 'Shift') {
              if (this.permissions[key]['view']) {
                this.showShift = true;
              }
            }
            if (key == 'Machine') {
              if (this.permissions[key]['view']) {
                this.showMachine = true;
              }
            }
            if (key == 'Operatormapping') {
              if (this.permissions[key]['view']) {
                this.showMapping = true;
              }
            }
            if (key == 'User') {
              if (this.permissions[key]['view']) {
                this.showUser = true;
              }
            }
            if (key == 'Cycletime') {
              if (this.permissions[key]['view']) {
                this.showPartConfig = true;
              }
            }
            if (key == 'Template') {
              if (this.permissions[key]['view']) {
                this.showTemplate = true;
              }
            }
            if (key == 'Checklist') {
              if (this.permissions[key]['view']) {
                this.showChecklist = true;
              }
            }
            if (key == 'Master') {
              if (this.permissions[key]['view']) {
                this.showMaster = true;
              }
            }
          }
          if (
            this.showZone ||
            this.showRole ||
            this.showDepartment ||
            this.showPlant ||
            this.showShift ||
            this.showMachine ||
            this.showMapping ||
            this.showUser ||
            this.showPartConfig
          ) {
            this.showConfiguration = true;
          } else {
            this.showConfiguration = false;
          }
        }
      });
  }

  toggleTheme() {
    this.theme = !this.theme;
    // this.setTheme(this.theme);
  }
  clickEvent() {
    this.status = !this.status;
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
  // private setTheme(darkTheme: boolean) {
  //   const lightClass = 'theme--light';
  //   const darkClass = 'theme--dark';
  //   const removeClass = darkTheme ? lightClass : darkClass;
  //   const addClass = darkTheme ? darkClass : lightClass;
  //   document.body.classList.remove(removeClass);
  //   document.body.classList.add(addClass);
  // }

  themes: string[] = [
    'deeppurple-amber',
    'indigo-pink',
    'pink-bluegrey',
    'purple-green',
  ];

  @HostBinding('class') activeThemeCssClass: string;
  isThemeDark = false;
  activeTheme: string;

  setTheme(theme: string, darkness: boolean = null) {
    if (darkness === null) darkness = this.isThemeDark;
    else if (this.isThemeDark === darkness) {
      if (this.activeTheme === theme) return;
    } else this.isThemeDark = darkness;

    this.activeTheme = theme;

    const cssClass = darkness === true ? theme + THEME_DARKNESS_SUFFIX : theme;

    const classList = this.overlayContainer.getContainerElement().classList;
    if (classList.contains(this.activeThemeCssClass))
      classList.replace(this.activeThemeCssClass, cssClass);
    else classList.add(cssClass);
    this.activeThemeCssClass = cssClass;
  }

  toggleDarkness() {
    this.setTheme(this.activeTheme, !this.isThemeDark);
  }
  anyChecklistAssigned() {
    this.approvalClicked = false;
    this.assignedChecklists = [];
    this.checklistStatus = [];
    // if (this.role == 'ADMIN' || 'SUPERADMIN' || 'SUPERVISOR' || 'QM') {
    this.dataService.get('config/approval').subscribe((res) => {
      if (res) {
        this.checklistStatus = res['result'];

        this.checklistStatus.forEach((e) => {
          e['checklist'] = 'Approval';
        });

        this.assignedChecklists = this.checklistStatus.filter((list: any) => {
          if (
            list['levelOfApproval'].some(
              (level: Object) => level['approvalPersonUser'] == this.user
            )
          )
            return list;
        });
        this.badgeArray.push(...this.assignedChecklists);

        this.anyChecklistRejected();
      }
    });
    // }
  }
  badgeArray: any = [];
  anyChecklistRejected() {
    this.filledClick = false;
    this.rejectedLists = [];
    this.dataService
      .get('config/approval?status=rejected&&preparedBy=' + this.user)
      .subscribe((res) => {
        this.rejectedLists = res['result'];
        this.rejectedLists.forEach((e) => {
          e['checklist'] = 'Rejected';
        });
        this.badgeArray.push(...this.rejectedLists);
      });
  }
  approval() {
    this.approvalClicked = true;
    this.badgeArray = this.badgeArray.filter((e) => {
      return e.checklist !== 'Approval';
    });
  }
  filledCL() {
    this.filledClick = true;
    this.badgeArray = this.badgeArray.filter((e) => {
      return e.checklist !== 'Rejected';
    });
  }

  getUser() {
    this.userName = sessionStorage.getItem('user');
    this.dataService
      .get('config/user?userName=' + this.userName)
      .subscribe((res) => {
        this.getData = res['result'][0];

        this.user = this.getData['userName'];
        this.data = this.getData['role'];
        this.email = this.getData['email'];
      });
  }
}
