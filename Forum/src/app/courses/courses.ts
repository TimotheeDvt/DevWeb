import { Component, signal, inject, OnInit, computed } from '@angular/core'; // Ajoutez computed
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Message, PhpData } from "../services/message";

export interface ICours {
  IdCours: number;
  Nom: string;
  lastMsg: string;
  NbP : number;
  NbT : number;
}

@Component({
  selector: 'app-courses',
  standalone: true, // Assurez-vous d'être en standalone
  imports: [
    FormsModule,
    RouterLink // Ajoutez RouterLink ici pour que le HTML le reconnaisse
  ],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses implements OnInit {
  private service = inject(Message);
  private router = inject(Router);
  titre = signal("Composant cours");
  UE = signal<ICours[]>([]);

  // On crée un signal dérivé qui se mettra à jour automatiquement dès que UE change
  idMonComp !: string;

  constructor() { }

  ngOnInit() {
    this.service.sendMessage("getCourses", {}).subscribe((result: any) => {
      if (Array.isArray(result)) {
        this.UE.set([]);

        result.forEach((element: any) => {
          const cours: ICours = {
            IdCours: element.IdCours,
            Nom: element.Nom,
            lastMsg: element.lastMsg,
            NbP: element.NbP,
            NbT: element.NbT
          };
          this.UE.update((UE) => [...UE, cours]);
        });
      } else if (result && result.status === "error") {
        this.router.navigate(['/login']);
      } else {
        console.error("Format de données inconnu :", result);
      }
    });
  }

  rediriger() {
    if (typeof this.idMonComp == 'undefined') this.idMonComp = 'vide';
    // check if id exists in this.UE
    for (let i = 0; i < this.UE().length; i++) {
      if (this.UE()[i].IdCours == parseInt(this.idMonComp)) {
        this.router.navigate(['/topic', this.idMonComp]);
        return;
      }
    }
    alert("Ce cours n'existe pas")
  }
}