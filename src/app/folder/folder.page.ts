import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import {
  IonFooter,
  IonLabel,
  IonToolbar,
  IonInput,
  IonButton,
  IonButtons,
  IonList,
  IonItem,
  IonIcon,
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
    IonIcon,
    IonContent,
    FormsModule,
    CommonModule,
    MarkdownModule,
  ],
})
export class FolderPage implements OnInit {
  @ViewChild(IonContent) ionContent!: IonContent;

  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  public newMessage = '';
  public messages: Array<{ from: string; text: string }> = [];
  public selectedFile: File | null = null; // To store the selected file
  public isThinking = false; // To track bot's thinking state

  constructor(private dataService: DataService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      alert('Please select a valid PDF file.');
    }
  }

  sendMessage() {
    const newMessage = this.newMessage;
    this.newMessage = '';
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('pdf', this.selectedFile);
      this.isThinking = true; // Bot starts thinking
      this.dataService.sendFile(formData).subscribe((response: any) => {
        this.messages.push({ from: 'bot', text: response.data });
        this.selectedFile = null; // Reset file after sending
        this.isThinking = false; // Bot finished thinking
        setTimeout(() => this.scrollToBottom(), 100);
      });
    } else if (newMessage.trim()) {
      this.messages.push({ from: 'user', text: newMessage });
      setTimeout(() => this.scrollToBottom(), 100);

      this.isThinking = true; // Bot starts thinking
      this.dataService
        .sendMessage(newMessage)
        .subscribe((response: any) => {
          console.log(response.data);
          this.messages.push({ from: 'bot', text: response.data });
          this.isThinking = false; // Bot finished thinking
          setTimeout(() => this.scrollToBottom(), 100);
        });
    }
  }

  scrollToBottom() {
    this.ionContent?.scrollToBottom(300);
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    console.log(this.folder);
  }
}
