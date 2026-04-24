import { Component, signal, inject, OnInit, computed } from '@angular/core'; // Ajoutez computed
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Message } from "../services/message";
import {ActivatedRoute} from '@angular/router';


export interface ICours {
  IdCours: number;
  Nom: string;
  lastMsg: string;
  NbP : number;
  NbT : number;
}

@Component({
  selector: 'app-cours',
  standalone: true, // Assurez-vous d'être en standalone
  imports: [
    FormsModule,
    RouterLink // Ajoutez RouterLink ici pour que le HTML le reconnaisse
  ],
  templateUrl: './cours.html',
  styleUrl: './cours.scss',
})
export class Cours implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private service = inject(Message);
  private router = inject(Router);
  titre = signal("Composant cours");
  Course = signal<ICours>({
    IdCours: 0,
    Nom: "",
    lastMsg: "",
    NbP: 0,
    NbT: 0
  });

  idMonComp !: string;

  constructor() { }

  ngOnInit() {
    this.idMonComp = this.activatedRoute.snapshot.params['id'];
    this.service.sendMessage("getCours", {
      courseId: this.idMonComp
    }).subscribe((result: any) => {
      if (result) {
        this.Course.set({
          IdCours: result.IdCours,
          Nom: result.Nom,
          lastMsg: result.lastMsg,
          NbP: result.NbP,
          NbT: result.NbT
        })
      } else if (result && result.status === "error") {
        this.router.navigate(['/login']);
      } else {
        console.error("Format de données inconnu :", result);
      }
    });
  }
}