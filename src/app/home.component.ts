import { OnInit, Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { SkyValidators } from '@skyux/validation';
import { UserService } from './services/user.service';
import {
  ListSortFieldSelectorModel
} from '@skyux/list-builder-common';
import { User } from './models/user';

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
  public todaysDate: Date;

  public data: User[];

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.todaysDate = new Date();
   }

  public ngOnInit() {
    this.getAllUsers();
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
          return;
        },
        err => {
          console.log('Hello Error ' + err);
          return;
        }
      );
    }
  }

  public onSortChangeForGrid(activeSort: ListSortFieldSelectorModel): void {
    this.data = this.sortGridData(activeSort, this.data);
  }

  private sortGridData(activeSort: ListSortFieldSelectorModel, data: any[]): any[] {
    const sortField = activeSort.fieldSelector;
    const descending = activeSort.descending;

    return data.sort((a: any, b: any) => {
      let value1 = a[sortField];
      let value2 = b[sortField];

      if (value1 && typeof value1 === 'string') {
        value1 = value1.toLowerCase();
      }

      if (value2 && typeof value2 === 'string') {
        value2 = value2.toLowerCase();
      }

      if (value1 === value2) {
        return 0;
      }

      let result = value1 > value2 ? 1 : -1;

      if (descending) {
        result *= -1;
      }

      return result;
    }).slice();
  }

}
