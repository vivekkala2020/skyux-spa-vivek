import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '../models/user';
import { UserService } from './user.service';

describe('User-Service Test', () => {

  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('be able to retrieve Users from the API via GET', () => {
    const dummyUsers: User[] = [{
      'id': 1,
      'firstName': 'vivek',
      'lastName': 'kala',
      'contactNumber': 9868574786,
      'email': 'vivekkala123@gmail.com',
      'dob': new Date('2021-07-30T18:30:00.000Z'),
      'address': {
        'street': '103-C, Chandu Park',
        'state': 'Delhi',
        'pin': 110051
      }
    },
      {
        'firstName': 'vivek',
        'lastName': 'kala',
        'contactNumber': 7697676762,
        'email': 'vivek',
        'dob': new Date('1998-08-17T18:30:00.000Z'),
        'address': {
          'street': '103-C, Chandu Park',
          'state': 'Delhi',
          'pin': 110051
        },
        'id': 2
      }];

  userService.getUser().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users).toEqual(dummyUsers);
    });
    const request = httpTestingController.expectOne('http://localhost:3000/users');
    expect(request.request.method).toBe('GET');
    request.flush(dummyUsers);
    });

  it('be able to Save User from the API via POST', () => {
    const dummyUser: User = {
      'id': 1,
      'firstName': 'vivek',
      'lastName': 'kala',
      'contactNumber': 9868574786,
      'email': 'vivekkala123@gmail.com',
      'dob': new Date('2021-07-30T18:30:00.000Z'),
      'address': {
        'street': '103-C, Chandu Park',
        'state': 'Delhi',
        'pin': 110051
      }
    };

  userService.saveUser(dummyUser).subscribe(user => {
        expect(user).toBeTruthy();
    });
    const request = httpTestingController.expectOne('http://localhost:3000/users');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(dummyUser);
    });

});
