import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { TableStatusService } from '../services/table-status.service';

interface SingleUser {
  checked: boolean;
  id: string | number;
  name: string;
  location: string;
  office: string;
  phoneOfOffice: string;
  phoneOfCell: string;
}

interface Users {
  [index: number]: SingleUser;
}

const singleUser: SingleUser = {
  checked: false,
  id: '',
  name: '',
  location: '',
  office: '',
  phoneOfOffice: '',
  phoneOfCell: ''
};


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  users: SingleUser[] = [{
    checked: false,
    id: 501,
    name: 'Khali Zhang',
    location: 'Shanghai',
    office: 'C-103',
    phoneOfOffice: 'x55778',
    phoneOfCell: '650-353-1239'
  }, {
    checked: false,
    id: 503,
    name: 'Vol Zhang',
    location: 'Shanghai',
    office: 'C-104',
    phoneOfOffice: 'x66778',
    phoneOfCell: '650-353-1220'
  }];
  private all = false; // Record if all check box is checked.
  asc = true;
  editingCellPhoneIndex;

  constructor(
    private tableStatusService: TableStatusService
  ) { }

  ngOnInit(): void {
  }



  get allUsers() {
    return this.all || false;
  }

  set allUsers(value) {
    _.map(this.users, user => user.checked = value);
    this.all = value;
    this.tableStatusService.selections = value ? [...this.users] : [];
  }

  get ifSelectionsEmpty() {
    const checkedRows = this.users.filter(user => user.checked);
    return !(this.all || !_.isEmpty(checkedRows));
  }

  trackIndex(index, user) {
    return user.id;
  }

  sortColumn(headerName) {
    this.asc = !this.asc;

    // If sort include empty row, use it.
    // @ts-ignore
    // this.users = [..._.orderBy(this.users, [headerName], [this.asc ? 'asc' : 'desc'])];

    const filledUsers = _.filter(this.users, user => user.id);
    const sortedFilledUsers = [..._.orderBy(filledUsers, [headerName], [this.asc ? 'asc' : 'desc'])];
    const unfilledUsers = _.filter(this.users, user => !user.id);

    // @ts-ignore
    this.users = [...sortedFilledUsers, ...unfilledUsers];
  }

  changeCheckbox(index) {
    this.users[index].checked = !this.users[index].checked;
    if (!this.users[index].checked && this.all) {
      this.all = false;
    }

    const checkedRows = _.filter(this.users, user => user.checked);
    if (_.size(checkedRows) === _.size(this.users)) {
      this.all = true;
    }

    this.tableStatusService.selections = [...checkedRows];
  }

  delete() {
    const checkedRows = _.filter(this.users, user => user.checked);
    if (checkedRows.length > 0) {
      this.users = _.filter(this.users, user => !user.checked);
    }
  }

  update() {
    this.tableStatusService.updateModalOpened = true;
  }

  add() {
    this.users = [...this.users, { ...singleUser, checked: this.all }];

    const checkedRows = _.filter(this.users, user => user.checked);
    this.tableStatusService.selections = [...checkedRows];
  }

  editPhoneOfCell(index) {
    this.editingCellPhoneIndex = index;
  }

  resetEditingCellPhone() {
    this.editingCellPhoneIndex = -1;
  }
}
