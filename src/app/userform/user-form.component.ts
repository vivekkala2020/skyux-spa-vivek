import {
  Component
} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SkyValidators } from '@skyux/validation';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  private userProfile = this.formBuilder.group({
    firstName: ['', [Validators.required,
                    Validators.maxLength(20),
                    Validators.pattern('^[a-zA-Z ]*$')]
                  ],
    lastName: ['', [Validators.required,
                   Validators.maxLength(20),
                   Validators.pattern('^[a-zA-Z ]*$')]
                  ],
    contactNumber: [''],
    email: ['', [
      Validators.required,
      SkyValidators.email
    ]],
    dob: ['', Validators.required],
    address: this.formBuilder.group({
      street: ['', Validators.required],
      state: ['', [Validators.required,
                   Validators.pattern('^[a-zA-Z ]*$')
                  ]],
      pin: ['', [Validators.required,
                 Validators.pattern('^[0-9]*$')
                ]]
    })
  });

  public todaysDate: Date;

  public data: User[];

  constructor(private formBuilder: FormBuilder, private userService: UserService, public router: Router) {
    this.todaysDate = new Date();
   }

   public get f() {
    return this.userProfile.controls;
  }
  public get emailControl(): AbstractControl {
    return this.userProfile.get('email');
  }
  public get phoneControl(): AbstractControl {
    return this.userProfile.get('contactNumber');
  }
  public get streetControl(): AbstractControl {
    return this.userProfile.get('address').get('street');
  }
  public get stateControl(): AbstractControl {
    return this.userProfile.get('address').get('state');
  }
  public get pincodeControl(): AbstractControl {
    return this.userProfile.get('address').get('pin');
  }

  public onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.log(this.userProfile.value);
    this.saveUserData();
  }

  public getAllUsers(): void {
    this.userService.getUser().subscribe(
      response => {
        console.log(response);
        this.data = response;
        return;
      },
      err => {
        console.log('Hello Error ' + err);
        return;
      }
    );
  }

  public saveUserData(): void {
    if (this.userProfile.valid) {
      this.userService.saveUser(this.userProfile.getRawValue()).subscribe(
        response => {
          console.log('hello');
          console.log(response);
          this.reloadComponent();
          return;
        },
        err => {
          console.log('Hello Error ' + err);
          return;
        }
      );
    }
  }

  public reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

}
