import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core'; // N'oubliez pas signal
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonList, IonItem, IonInput, IonButton, AlertController,
  IonFab
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonList, IonItem, IonInput, IonButton, // Nouveaux composants
    CommonModule, FormsModule
  ]
})
export class LoginPage {
  // Vos erreurs signalent l'usage de "username" dans le HTML
  username = "";
  password = "";

  // Vos erreurs signalent l'usage de "errorMessage()" dans le HTML
  errorMessage = signal<string | null>(null);

  private authService = inject(Auth);
  private router = inject(Router);

  constructor(private alertController: AlertController) { }

  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Échec de connexion',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  onSubmit() {
    // Réinitialise l'erreur à chaque tentative
    this.errorMessage.set(null);

    // On utilise "username" ici car c'est ce qui est lié au HTML
    this.authService.sendAuthentication(this.username, this.password).subscribe({
      next: (res) => {
        if (res.status === 'ok') {
          this.router.navigate(['/cours']);
        } else {
          // Met à jour le signal pour l'affichage HTML
          this.presentErrorAlert("Identifiants incorrects. Veuillez réessayer.");
        }
      },
      error: (err) => {
        this.presentErrorAlert("Identifiants incorrects. Veuillez réessayer.");
      }
    });
  }
}