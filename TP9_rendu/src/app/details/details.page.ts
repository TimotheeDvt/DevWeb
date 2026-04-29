import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { RecetteService } from '../services/recettes';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonBackButton, IonList, IonItem,
    IonLabel, CommonModule
  ]
})
export class DetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private recetteService = inject(RecetteService);

  recette = signal<any>(null);

  ngOnInit() {
    const recipeName = this.route.snapshot.paramMap.get('nom');

    if (recipeName) {
      const found = this.recetteService.getRecettes().find(r => r.nom === recipeName);
      this.recette.set(found);
    }
  }
}