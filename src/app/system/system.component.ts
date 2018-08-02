import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeStateTrigger} from '../shared/animations/fade.animation';

@Component({
  selector: 'ha-system',
  templateUrl: './system.component.html',
  animations: [fadeStateTrigger]
})

export class SystemComponent {
  @HostBinding('@fade') a = true;
}
