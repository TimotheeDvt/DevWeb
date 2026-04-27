import { Component, inject, OnInit } from '@angular/core';
import {
  IonContent, IonList, IonItem, IonRadioGroup,
  IonRadio, PopoverController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-dropdown-menu-cours',
  standalone: true,
  imports: [IonContent, IonItem, IonRadioGroup, IonRadio],
  templateUrl: './dropdown-menu-cours.component.html'
})
export class DropdownMenuCoursComponent implements OnInit {
  // Propriété reçue depuis CoursPage via componentProps
  selectedTri: string = 'nom';
  private popoverController = inject(PopoverController);

  ngOnInit() { }

  // Ferme le menu et renvoie la nouvelle valeur de tri
  onTriChange(event: any) {
    this.popoverController.dismiss(event.detail.value);
  }
}