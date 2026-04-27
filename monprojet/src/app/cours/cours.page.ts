import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonButton, IonList, IonLabel, IonIcon, PopoverController } from '@ionic/angular/standalone';
import { Component, signal, inject, OnInit, computed } from '@angular/core'; // Ajoutez computed
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Message } from "../services/message";
import { DropdownMenuCoursComponent } from '../dropdown-menu-cours/dropdown-menu-cours.component';
import { addIcons } from 'ionicons';
import { swapVertical } from 'ionicons/icons';


export interface ICours {
  IdCours: number;
  Nom: string;
  lastMsg: string;
  NbP: number;
  NbT: number;
}

interface NodeData {
  status: string;
  data: any[];
}

@Component({
  selector: 'app-cours',
  templateUrl: './cours.page.html',
  styleUrls: ['./cours.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule,
    IonBackButton, IonButtons, RouterLink,
    IonList, IonLabel, IonIcon, IonButton
  ]
})
export class CoursPage {
  private service = inject(Message);
  private router = inject(Router);
  titre = signal("Composant cours");
  UE = signal<ICours[]>([]);

  // On crée un signal dérivé qui se mettra à jour automatiquement dès que UE change
  idMonComp !: string;
  currentTri = 'nom'; // Sauvegarde du tri actuel
  private popoverController = inject(PopoverController);

  constructor() {
    addIcons({ swapVertical }); // Chargement de l'icône
  }

  ionViewWillEnter() {
    this.service.sendMessage("getCourses", {}).subscribe((result: NodeData) => {
      if (Array.isArray(result?.data)) {
        this.UE.set([]);

        result.data.forEach((element: any) => {
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
        this.router.navigate(['/topics', this.idMonComp]);
        return;
      }
    }
    alert("Ce cours n'existe pas")
  }

  async openSortMenu(ev: MouseEvent) {
    const popover = await this.popoverController.create({
      component: DropdownMenuCoursComponent,
      event: ev,
      componentProps: { selectedTri: this.currentTri } // Transmission du tri actuel
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data) {
      this.currentTri = data;
      this.appliquerTri(); // Relance le tri du tableau
    }
  }

  appliquerTri() {
    this.UE.update(cours => {
      const sorted = [...cours];
      if (this.currentTri === 'nom') {
        sorted.sort((a, b) => a.Nom.localeCompare(b.Nom));
      } else if (this.currentTri === 'date') {
        sorted.sort((a, b) => new Date(b.lastMsg).getTime() - new Date(a.lastMsg).getTime());
      } else if (this.currentTri === 'topics') {
        sorted.sort((a, b) => (b.NbT || 0) - (a.NbT || 0));
      }
      return sorted;
    });
  }
}
