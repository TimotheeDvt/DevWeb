import { Component, inject, signal } from '@angular/core'; // N'oubliez pas signal
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  // Vos erreurs signalent l'usage de "username" dans le HTML
  username = ""; 
  password = "";
  
  // Vos erreurs signalent l'usage de "errorMessage()" dans le HTML
  errorMessage = signal<string | null>(null);

  private authService = inject(Auth);
  private router = inject(Router);

  onSubmit() {
    // Réinitialise l'erreur à chaque tentative
    this.errorMessage.set(null);

    // On utilise "username" ici car c'est ce qui est lié au HTML
    this.authService.sendAuthentication(this.username, this.password).subscribe({
      next: (res) => {
        if (res.status === 'ok') {
          this.router.navigate(['/courses']);
        } else {
          // Met à jour le signal pour l'affichage HTML
          this.errorMessage.set("Identifiants incorrects");
        }
      },
      error: (err) => {
        this.errorMessage.set("Erreur de connexion au serveur");
      }
    });
  }
}