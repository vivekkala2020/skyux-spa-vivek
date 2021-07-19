import {
  TestBed
} from '@angular/core/testing';
import {
  SkyAppTestModule
} from '@skyux-sdk/builder/runtime/testing/browser';
import {
  expect
} from '@skyux-sdk/testing';
import {
  DataGridEditModalComponent
} from './data-grid-edit-modal.component';

describe('Data grid edit modal component', () => {

  /**
   * This configureTestingModule function imports SkyAppTestModule, which brings in all of
   * the SKY UX modules and components in your application for testing convenience. If this has
   * an adverse effect on your test performance, you can individually bring in each of your app
   * components and the SKY UX modules that those components rely upon.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule]
    });
  });

  // tslint:disable-next-line: no-disabled-tests
  xit('should do something', () => {
    const fixture = TestBed.createComponent(DataGridEditModalComponent);

    fixture.detectChanges();

    expect(false).toBe(false);
  });

});
