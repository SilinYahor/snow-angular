import { Component } from '@angular/core';
import {ErrorService} from "../../service/error.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  errorService: ErrorService;

  constructor(errorService: ErrorService) {
    this.errorService = errorService;
  }
}
