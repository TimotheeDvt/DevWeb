import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonBadge, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../services/message';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-topics',
  templateUrl: './topics.page.html',
  styleUrls: ['./topics.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonBadge, IonFab, IonFabButton, IonIcon, RouterLink]
})
export class TopicsPage implements OnInit {
  courseId: string | null = null;
  topics: any[] = [];

  constructor(private route: ActivatedRoute, private service: Message) {}

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
            lastMsg: new Date(topic.lastMsg).toLocaleDateString("fr-FR",{
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
}