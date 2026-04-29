import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  private recettes = [
    {
      nom: 'spaghetti carbonara',
      ingredients: ['pâtes', 'lardons', 'oeufs', 'parmesan', 'échalottes'],
      nutriscore: 'D',
      temps_preparation: '22 min'
    },
    {
      nom: 'zaalouk',
      ingredients: ['aubergines', 'ail', 'citron', 'tomates', 'coriandre', 'persil', 'cumin', 'piment'],
      nutriscore: 'B',
      temps_preparation: '1h'
    },
    {
      nom: 'gratin dauphinois',
      ingredients: ['pommes de terre', 'noix de muscade', 'beurre', 'ail', 'crème fraiche', 'lait'],
      nutriscore: 'E',
      temps_preparation: '1h30'
    },
    {
      nom: 'ceviche de daurade',
      ingredients: ['daurade', 'citron vert', 'ail', 'mangue', 'oignon rouge', 'piment'],
      nutriscore: 'A',
      temps_preparation: '45 min'
    },
    {
      nom: 'poulet teriyaki',
      ingredients: ['poulet', 'gingembre', 'huile de sésame', 'vinaigre', 'sauce soja', 'saké', 'sucre'],
      nutriscore: 'B',
      temps_preparation: '40 min'
    },
    {
      nom: 'gâteau aux carottes',
      ingredients: ['carottes', 'oeufs', 'sucre', 'farine', 'beurre', 'levure', 'noix', 'canelle'],
      nutriscore: 'C',
      temps_preparation: '1h30'
    }
  ];

  getRecettes() {
    return this.recettes;
  }
}