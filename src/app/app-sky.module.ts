import {
  NgModule
} from '@angular/core';

import {
  SkyAvatarModule
} from '@skyux/avatar';

import {
  SkyAlertModule,
  SkyKeyInfoModule,
  SkyStatusIndicatorModule
} from '@skyux/indicators';

import {
  SkyFluidGridModule
} from '@skyux/layout';

import {
  SkyNavbarModule
} from '@skyux/navbar';

import {
  SkyCardModule
} from '@skyux/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkyDatepickerModule } from '@skyux/datetime';
import { SkyIdModule } from '@skyux/core';
import { SkyInputBoxModule } from '@skyux/forms';
import { SkyPhoneFieldModule } from '@skyux/phone-field';
import { SkyEmailValidationModule } from '@skyux/validation';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';

@NgModule({
  exports: [
    SkyAvatarModule,
    SkyAlertModule,
    SkyKeyInfoModule,
    SkyFluidGridModule,
    SkyNavbarModule,
    SkyCardModule,
    SkyDatepickerModule,
    SkyIdModule,
    SkyInputBoxModule,
    SkyPhoneFieldModule,
    SkyStatusIndicatorModule,
    ReactiveFormsModule,
    SkyEmailValidationModule,
    FormsModule,
    CommonModule
  ],
  providers: [UserService]
})
export class AppSkyModule { }
