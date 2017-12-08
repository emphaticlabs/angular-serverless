import { Component, OnInit } from '@angular/core';
import { FixtureBet } from '../interfaces/bet.interfaces';
import { PronosticosService } from '../share/pronosticos.service';

@Component({
  selector: 'liga-pronosticos-list',
  templateUrl: './pronosticos-list.component.html',
  styleUrls: ['./pronosticos-list.component.scss']
})
export class PronosticosListComponent implements OnInit {
  pronosticos: FixtureBet[] = [];

  constructor(private pronosticosService: PronosticosService) {}

  ngOnInit() {
    this.pronosticosService.getPronosticosList().subscribe(
      result => {
        this.pronosticos = result.data;
      },
      err => console.error(err)
    );
  }
}
