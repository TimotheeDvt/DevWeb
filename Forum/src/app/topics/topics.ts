import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb, BreadcrumbData } from '../breadcrumb/breadcrumb';
import { Message } from '../services/message';
import { CreateTopicDialog } from '../create-topic-dialog/create-topic-dialog';

export interface ITopic {
  Id: number;
  Nom: string;
  idUser: string;
  nbP: number;
  lastMsg: string;
}

interface NodeData {
  status: string;
  data: any;
}


@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [Breadcrumb, CreateTopicDialog],
  templateUrl: './topics.html',
  styleUrl: './topics.scss',
})
export class Topics implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(Message);

  breadcrumb = signal<BreadcrumbData[]>([]);
  topics = signal<ITopic[]>([]);

  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('id') || '';

    // Initialisation du breadcrumb
    this.breadcrumb.set([
      { nom: 'Tous les cours', route: '/courses' },
      { nom: 'Chargement...', route: '' }
    ]);

    // Récupération du nom du cours (en gérant le tableau result[0])
    this.service.sendMessage("getCours", { courseId: idStr }).subscribe((result: NodeData) => {
      if (result?.data) {
        this.breadcrumb.set([
          { nom: 'Tous les cours', route: '/courses' },
          { nom: result.data.Nom, route: '' }
        ]);
      }
    });

    // Récupération des topics
    this.service.sendMessage("getTopics", { courseId: idStr }).subscribe((result: NodeData) => {
      if (Array.isArray(result.data) && result.data.length > 0) {
        this.topics.set(result.data);
      } else {
        this.topics.set([]);
      }
    });
  }

  addTopicToList(newTopic: ITopic) {
    // Mise à jour du signal topics en ajoutant le nouveau sujet au début de la liste
    this.topics.update(currentTopics => [newTopic, ...currentTopics]);
  }
}