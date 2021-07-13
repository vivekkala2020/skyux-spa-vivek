import {
  Component, OnInit
} from '@angular/core';
import {
  ListSortFieldSelectorModel
} from '@skyux/list-builder-common';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.scss']
})
export class GridviewComponent implements OnInit {

  public data: User[];

  constructor(private userService: UserService) {
   }

  public ngOnInit() {
    this.getAllUsers();
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
