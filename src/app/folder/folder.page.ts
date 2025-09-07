import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
  IonFooter,
  IonLabel,
  IonToolbar,
  IonInput,
  IonButton,
  IonButtons,
  IonList,
  IonItem,
  IonContent,
} from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  providers: [DataService],
  imports: [
    IonFooter,
    IonLabel,
    IonToolbar,
    IonInput,
    IonButton,
    IonButtons,
    IonList,
    IonItem,
    IonContent,
    FormsModule,
    CommonModule,
  ],
})
export class FolderPage implements OnInit {
  @ViewChild(IonContent) ionContent!: IonContent;

  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  public newMessage = '';
  public messages: Array<{ from: string; text: string }> = [];

  constructor(private dataService: DataService) {}

  sendMessage() {
    this.messages.push({ from: 'user', text: this.newMessage });
    setTimeout(() => this.scrollToBottom(), 100); // Scroll after DOM update

    this.dataService.sendMessage(this.newMessage).subscribe((response: any) => {
      this.messages.push({ from: 'bot', text: response.data });
      this.newMessage = '';
      setTimeout(() => this.scrollToBottom(), 100); // Scroll after bot reply
    });
  }

  scrollToBottom() {
    this.ionContent?.scrollToBottom(300);
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
