import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {fadeStateTrigger} from '../shared/animations/fade.animation';

@Component({
  selector: 'ha-auth',
  templateUrl: './auth.component.html',
  animations: [fadeStateTrigger]
})

export class AuthComponent implements OnInit {

  @HostBinding('@fade') a = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['/login']);
  }

}
