import { Component, signal, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { RecetteComponent } from '../recette/recette.component';
import { RecetteService } from '../services/recettes';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, RecetteComponent],
})
export class HomePage implements OnInit {
  private recetteService = inject(RecetteService);
  recettes = signal<any[]>([]);

  ngOnInit() {
    this.recettes.set(this.recetteService.getRecettes());
  }
}