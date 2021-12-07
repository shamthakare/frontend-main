import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';
// import { DepartmentService } from 'src/app/shared/department.service';
// import { EmployeeService } from 'src/app/shared/employee.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { CourseDialogComponentComponent } from '../choice/course-dialog-component/course-dialog-component.component';
import { RegisterComponent } from '../register/register.component';
import { HomeDataSource, HomeItem } from './home-datasource';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Userss: any = [];

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['user_name', 'address', 'mobile_number', 'email_address', 'companies', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;


  constructor(public auth: AuthenticationService,
    // private service: EmployeeService,
    // private departmentService: DepartmentService,
    private dialog: MatDialog,
    private notificationService: NotificationService) {


    // this.dataSource = new HomeDataSource();
    // this.dataSource = new thisUserss();
    // this.readEmployee();
  }
  ngOnInit(): void {
    this.auth.getEmployees().subscribe(
      data => {
        this.listData = new MatTableDataSource(data);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
      });
    // throw new Error('Method not implemented.');
  }


  // readEmployee() {
  //   this.auth.getEmployees().subscribe((data) => {
  //     this.Userss = data;
  //     console.log(data)
  //   })
  // }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }


  onCreate() {
    // this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(CourseDialogComponentComponent,dialogConfig);
  }

  onEdit(row){
    this.auth.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(RegisterComponent,dialogConfig);
  }

  onDelete(_id){
    if(confirm('Are you sure to delete this record ?')){
    this.auth.deleteEmployee(_id);
    this.notificationService.warn('! Deleted successfully');
    }
  }
}
