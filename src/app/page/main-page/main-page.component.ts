import { Component } from '@angular/core';
import {SessionService} from "../../service/session.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  sessionService: SessionService;

  constructor(sessionService: SessionService) {
    this.sessionService = sessionService;
  }
}
