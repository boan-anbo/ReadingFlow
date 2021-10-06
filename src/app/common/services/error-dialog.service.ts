import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  constructor() { }

  openDialog(error: Error) {
    return alert(error.message);
  }
}
