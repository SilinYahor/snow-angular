import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-narrow-area',
  templateUrl: './narrow-area.component.html',
  styleUrls: ['./narrow-area.component.css']
})
export class NarrowAreaComponent {
  @Input() title: string;
}
