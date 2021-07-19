import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SkyAppTestModule } from '@skyux-sdk/builder/runtime/testing/browser';
import { expect } from '@skyux-sdk/testing';
import { SkyValidators } from '@skyux/validation';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserFormComponent } from './user-form.component';

describe('User form component', () => {

  /**
   * This configureTestingModule function imports SkyAppTestModule, which brings in all of
   * the SKY UX modules and components in your application for testing convenience. If this has
   * an adverse effect on your test performance, you can individually bring in each of your app
   * components and the SKY UX modules that those components rely upon.
   */
   let component: UserFormComponent;
   let mockUserService: jasmine.SpyObj<UserService>;
   let router: jasmine.SpyObj<Router>;
   let fixture: ComponentFixture<UserFormComponent>;
   let formBuilder: FormBuilder;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [SkyAppTestModule]
        });

    formBuilder = new FormBuilder();

    router = jasmine.createSpyObj('Router', ['navigate']);
    mockUserService = jasmine.createSpyObj(['saveUser', 'getUser']);

    component = new UserFormComponent(formBuilder, mockUserService, router);
  });

  it('should create app', () => {
    fixture = TestBed.createComponent(UserFormComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create component', () => {
    fixture = TestBed.createComponent(UserFormComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Test Form Group Element Count', () => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const formElement = fixture.debugElement.nativeElement;
    const inputElements = formElement.querySelectorAll('sky-input-box');
    expect(inputElements.length).toEqual(8);
  });

  it('form invalid when empty', () => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.userProfile.valid).toBeFalsy();
});

});

describe('User Form Component Testing', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule],
      providers: [
        {provide: UserService, useClass: UserServiceStub}
      ],
      declarations: []
    }).compileComponents();
  });

  it('check save method', () => {
    let fixture = TestBed.createComponent(UserFormComponent);
    let app = fixture.componentInstance;
    let spySaveUserData = spyOn(app, 'reloadComponent').and.returnValue();
    let formBuilder: FormBuilder = new FormBuilder();
    app.userProfile = formBuilder.group({
      firstName: ['vijay', [Validators.required,
                      Validators.maxLength(20),
                      Validators.pattern('^[a-zA-Z ]*$')]
                    ],
      lastName: ['chauhan', [Validators.required,
                     Validators.maxLength(20),
                     Validators.pattern('^[a-zA-Z ]*$')]
                    ],
      contactNumber: ['7865432356'],
      email: ['vijay@gmail.com', [
        Validators.required,
        SkyValidators.email
      ]],
      dob: ['', Validators.required],
      address: formBuilder.group({
        street: ['56-A, IP Extension', Validators.required],
        state: ['Uttrakhand', [Validators.required,
                     Validators.pattern('^[a-zA-Z ]*$')
                    ]],
        pin: ['235543', [Validators.required,
                   Validators.pattern('^[0-9]*$')
                  ]]
      })
    });
    app.saveUserData();
    expect(spySaveUserData).toHaveBeenCalledTimes(1);
  });

   it('check reload component method', () => {
    let fixture = TestBed.createComponent(UserFormComponent);
    let app = fixture.componentInstance;
    app.reloadComponent();
    expect(location.pathname).toBe('/context.html');
  });

  it('Check on submit', () => {
    let fixture = TestBed.createComponent(UserFormComponent);
    let app = fixture.componentInstance;
    let spySaveUserData = spyOn(app, 'reloadComponent').and.returnValue();
    app.onSubmit();
    expect(spySaveUserData).toHaveBeenCalledTimes(1);
  });
});

class UserServiceStub {
  public saveUser(data: User): Observable<User> {
    return of(data);
  }
}
