import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';

import { MatDialog } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material/dialog";
import { CourseDialogComponentComponent } from '../choice/course-dialog-component/course-dialog-component.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  addressForm: FormGroup;
  userss = []

  mainForm() {
    this.addressForm = this.fb.group({
      user_name: ['', Validators.required],
      address: ['', Validators.required],
      mobile_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email_address: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.compose([
        Validators.required, Validators.minLength(4), Validators.maxLength(20)])
      ],
      companies: [[], Validators.required]
    });
  }
  hasUnitNumber = false;

  Company = [
    { name: 'F-31' },
    { name: 'Shanti' },
    { name: 'Trikash' },

  ];


  constructor(

    private dialog: MatDialog,
    private fb: FormBuilder, private auth: AuthenticationService, private router: Router) {

    this.mainForm();
  }

  onSubmit(): void {
    this.auth.login(this.addressForm.value)
      .subscribe((data) => {
        // if (data) {
        //   alert('! IF Data')
        //   this.router.navigateByUrl('/')
        // } else {
        //   alert('! else Data')
        //   this.router.navigateByUrl('/login')
        // }
      },
        err => {
          alert(err);
          console.error(err)
        }
      )

  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    this.dialog.open(CourseDialogComponentComponent, dialogConfig);

    const dialogRef = this.dialog.open(CourseDialogComponentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );
  }

  // openDialog() {

  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;

  //   this.dialog.open(CourseDialogComponentComponent, dialogConfig);
  //   dialogConfig.position = {
  //     'top': '0',
  //     left: '0'
  // };
  // }
}
