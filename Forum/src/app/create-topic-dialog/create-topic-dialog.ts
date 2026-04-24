import { Component, signal, inject, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '../services/message';
import { ActivatedRoute } from '@angular/router';

// Interface alignée sur votre table SQL
export interface NewTopic {
  Id: number;
  Nom: string;
  idUser: string;
  nbP: number;
  lastMsg: string;
}

@Component({
  selector: 'app-create-topic-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-topic-dialog.html',
  styleUrl: './create-topic-dialog.scss'
})
export class CreateTopicDialog implements OnInit {
  private service = inject(Message);
  private route = inject(ActivatedRoute);

  newTopicName = signal(''); // Correspond à la colonne 'Nom'
  errorMessage = signal('');
  courseId = '';

  onTopicCreated = output<NewTopic>();

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id') || '';
  }

  createTopic() {
    this.service.sendMessage("saveNewTopic", {
      courseId: this.courseId,
      Nom: this.newTopicName() // On envoie 'Nom' au PHP
    }).subscribe((result: any) => {
      if (result.status === "error") {
        this.errorMessage.set(result.data.reason);
      } else {
        console.log(result.data)
        this.onTopicCreated.emit(result.data);
        this.resetForm();
        const dialog = document.querySelector<HTMLDialogElement>("#topicDialog");
        if (dialog) dialog.close();
      }
    });
  }

  resetForm() {
    this.newTopicName.set('');
    this.errorMessage.set('');
  }
}