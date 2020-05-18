import { Component, OnInit, Input } from '@angular/core';
import { TableStatusService } from '../services/table-status.service';

@Component({
  selector: 'app-update-selections',
  templateUrl: './update-selections.component.html',
  styleUrls: ['./update-selections.component.scss']
})
export class UpdateSelectionsComponent implements OnInit {

  get modalOpened() {
    return this.tableStatusService.updateModalOpened;
  }

  set modalOpened(value: boolean) {
    this.tableStatusService.updateModalOpened = value;
  }

  get selections() {
    return this.tableStatusService.selections;
  }

  constructor(
    private tableStatusService: TableStatusService
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalOpened = false;
  }
}
