import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-mon-comp',
  imports: [],
  templateUrl: './mon-comp.html',
  styleUrl: './mon-comp.scss'
})
export class MonComp {
  // ActivatedRoute permet de récupérer des informations sur la route actuelle
  private activatedRoute = inject(ActivatedRoute);

  // la valeur du paramètre id de la route
  myParam !: number;

  constructor() { }

  ngOnInit(): void {
    this.myParam = this.activatedRoute.snapshot.params['id'];
  }
}