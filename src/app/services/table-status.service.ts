import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableStatusService {

  updateModalOpened = false;
  selections = [];

  constructor() { }
}
