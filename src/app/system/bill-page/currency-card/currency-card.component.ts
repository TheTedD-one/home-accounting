import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ha-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency: any;

  currencies: string[] = ['USD', 'RUB'];

  constructor() { }

  ngOnInit() {
  }

}
