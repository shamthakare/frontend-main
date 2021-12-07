import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthenticationService } from 'src/app/shared/authentication.service';
// import { DepartmentService } from 'src/app/shared/department.service';
// import { EmployeeService } from 'src/app/shared/employee.service';
import { NotificationService } from 'src/app/shared/notification.service';
@Component({
  selector: 'app-course-dialog-component',
  templateUrl: './course-dialog-component.component.html',
  styleUrls: ['./course-dialog-component.component.css']
})
export class CourseDialogComponentComponent implements OnInit {
  constructor(
    private service:AuthenticationService,
    // private departmentService: DepartmentService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CourseDialogComponentComponent>) { }



  ngOnInit() {
    this.service.getEmployees();
  }

  onClear() {
    // this.service.form.reset();
    // this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {
    // if (this.service.form.valid) {
      // if (!this.service.form.get('$key').value)
        // this.service.insertEmployee(this.service.form.value);
      // else
      // this.service.updateEmployee(this.service.form.value);
      // this.service.form.reset();
      // this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
      // this.onClose();
    // }
  }

  // onClose() {
    // this.service.form.reset();
    // this.service.initializeFormGroup();
    // this.dialogRef.close();
  // }

}
