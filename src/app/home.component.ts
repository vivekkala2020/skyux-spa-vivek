import { OnInit, Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { SkyValidators } from '@skyux/validation';
import { UserService } from './services/user.service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

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

  get f() {
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

  public todaysDate: Date;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.todaysDate = new Date();
   }

  public ngOnInit() {
  }
  public onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.userProfile.value);
    if (this.userProfile.valid) {
      this.userService.saveUser(this.userProfile.getRawValue()).subscribe(
        response => {
          console.log('hello');
          console.log(response);
          return;
        },
        err => {
          console.log('Hello Error ' + err);
          return;
        }
      );
    }
  }
}