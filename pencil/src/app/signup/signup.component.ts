import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HomeService } from '../../services/home.service';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: any;
  signupForm: FormGroup;
  submitted: boolean;
  submitting: boolean;
  success: boolean;

  constructor(private userService: UserService, private homeService: HomeService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.user = this.userService.getUser();

    this.signupForm = this.formBuilder.group({
      name: new FormControl(''),
      open: new FormControl(''),
      close: new FormControl(''),
      address: new FormControl(''),
      addressDetails: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl(''),
      userId: new FormControl(''),
      userName: new FormControl(''),
      country: new FormControl(''),
      type: new FormControl('')
    });

  }

  addBusiness() {
    this.submitting = true;
    let signUpForm = this.signupForm;
    this.signupForm.patchValue({
      userId: this.user.id,
      userName: this.user.name
    });
    console.log(signUpForm.value);
    signUpForm = this.signupForm.value;
    this.homeService.createBusiness(signUpForm).subscribe(_ => {
      this.submitting = false;
      this.success = true;
    }, (err) => {
      console.log(err);
    });
  }

}
