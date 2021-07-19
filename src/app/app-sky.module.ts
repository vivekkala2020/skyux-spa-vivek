import { CommonModule } from '@angular/common';
import {
  NgModule
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkyAgGridModule } from '@skyux/ag-grid';
import {
  SkyAvatarModule
} from '@skyux/avatar';
import { SkyIdModule } from '@skyux/core';
import { SkyDatepickerModule } from '@skyux/datetime';
import { SkyInputBoxModule } from '@skyux/forms';
import { SkyGridModule } from '@skyux/grids';
import {
  SkyAlertModule,
  SkyKeyInfoModule,
  SkyStatusIndicatorModule
} from '@skyux/indicators';
import { SkyCardModule, SkyFluidGridModule, SkyPageModule, SkyToolbarModule } from '@skyux/layout';
import { SkySearchModule } from '@skyux/lookup';
import { SkyModalModule } from '@skyux/modals';
import {
  SkyNavbarModule
} from '@skyux/navbar';
import { SkyPhoneFieldModule } from '@skyux/phone-field';
import { SkyDropdownModule } from '@skyux/popovers';
import { SkyEmailValidationModule } from '@skyux/validation';
import { UserService } from './services/user.service';

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
    CommonModule,
    SkyGridModule,
    SkyAgGridModule,

    SkyToolbarModule,
    SkyModalModule,
    SkyDropdownModule,
    SkySearchModule,
    SkyPageModule
  ],
  providers: [UserService]
})
export class AppSkyModule { }
