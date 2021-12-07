import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  addressForm: FormGroup;


  mainForm() {
    this.addressForm = this.fb.group({
      user_name: ['', Validators.required],
      address: ['', Validators.required],
      mobile_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email_address: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.compose([
        Validators.required, Validators.minLength(4), Validators.maxLength(20)])
      ],
      companies: [[] , Validators.required]
    });
  }
  hasUnitNumber = false;

  Company = [
    {name: 'F-31'},
    {name: 'Shanti'},
    {name: 'Trikash'},

  ];

  constructor(private fb: FormBuilder,private auth: AuthenticationService, private router: Router) {

    this.mainForm();
  }

  onSubmit(): void {
    this.auth.register(this.addressForm.value).subscribe(
      () => {
        this.router.navigateByUrl('/dashboard')
      },
      err => {
        alert(err);

        console.error(err)
      }
    )
    // alert(this.addressForm.value.companies.value);
    // console.log(this.addressForm.value);
  }
}
