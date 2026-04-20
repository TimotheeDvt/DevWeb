import { Component, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbData {
  nom: string;
  route: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss'
})
export class Breadcrumb implements OnInit {
  // Définition de l'input nommé 'paths' qui recevra le tableau
  paths = input.required<BreadcrumbData[]>();

  ngOnInit() {
    // Vérification dans la console comme demandé dans l'exercice
    console.log('Données reçues par le breadcrumb :', this.paths());
  }
}