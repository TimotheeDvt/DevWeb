import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonBadge, IonFab, IonFabButton, IonIcon, PopoverController, AlertController } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../services/message';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { swapVertical } from 'ionicons/icons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.page.html',
  styleUrls: ['./topics.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonBadge, IonFab, IonButton, IonIcon, RouterLink]
})
export class TopicsPage implements OnInit {
  private alertCtrl = inject(AlertController);
  courseId: string | null = null;
  topics: any[] = [];

  constructor(private route: ActivatedRoute, private service: Message) {
    addIcons({ add });
  }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.chargerTopics();
  }

  chargerTopics() {
    this.service.sendMessage("getTopics", { courseId: this.courseId })
      .subscribe(res => {
        this.topics = res.data.map((topic: any) => {
          return {
            ...topic,
            lastMsg: new Date(topic.lastMsg).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric"
            })
          }
        });
      }, err => {
        console.log(err);
      });
  }

  async openCreateTopicAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Nouveau sujet',
      // Exercice 3 : Configuration de l'input
      inputs: [
        {
          name: 'nomTopic',
          type: 'text',
          placeholder: 'Titre du topic'
        }
      ],
      // Exercice 2 : Boutons avec rôles
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        { text: 'Créer', role: 'create' }
      ]
    });

    await alert.present();

    // Exercice 2 & 4 : Récupération des données
    const { data, role } = await alert.onDidDismiss();

    if (role === 'create' && data.values.nomTopic) {
      this.createNewTopic(data.values.nomTopic);
    }
  }

  createNewTopic(nom: string) {
    this.service.sendMessage('saveNewTopic', {
      Nom: nom,
      courseId: this.courseId
    }).subscribe((res) => {
      if (res.status === 'ok') {
        // Rafraîchir la liste
        this.chargerTopics();
      } else {
        this.alertCtrl.create({
          header: 'Erreur',
          message: res.message,
          buttons: ['OK']
        }).then(alert => alert.present());
      }
    });
  }
}