import { Component, Input, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, AlertController } from '@ionic/angular/standalone';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-recette',
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './recette.component.html',
})
export class RecetteComponent {
  @Input() recette: any;
  private alertCtrl = inject(AlertController);

  async voirIngredients() {
    const listeTexte = this.recette.ingredients
      .map((ing: string) => `• ${ing}`)
      .join(' | ');

    const alert = await this.alertCtrl.create({
      header: 'Ingrédients',
      message: listeTexte,
      backdropDismiss: false,

      buttons: ['OK']
    });

    await alert.present();
  }
}