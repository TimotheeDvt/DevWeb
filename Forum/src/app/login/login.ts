import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Indispensable pour ngModel
import { Message, PhpData } from '../services/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // On importe FormsModule ici
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private service = inject(Message);
  private router = inject(Router);
  errorMessage = signal("");
  // Définition des signaux pour le formulaire
  username = signal('');
  password = signal('');

  // Méthode appelée lors du clic sur le bouton
  onSubmit() {
    this.service.sendMessage("checkLogin", {
      login: this.username(),
      password: this.password()
    }).subscribe((result: PhpData) => {
      console.log(result);
      if (result.status == "error") {
        this.errorMessage.set(result.data.reason);
      } else {
        this.errorMessage.set("");
        this.router.navigate(['/courses']);
      }
    })
  }
}