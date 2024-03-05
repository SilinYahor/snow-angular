import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-large-area',
  templateUrl: './large-area.component.html',
  styleUrls: ['./large-area.component.css']
})
export class LargeAreaComponent {
  @Input() title: string;
}
