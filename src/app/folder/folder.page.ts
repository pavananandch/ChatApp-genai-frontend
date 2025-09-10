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
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('pdf', this.selectedFile);

      this.dataService.sendFile(formData).subscribe((response: any) => {
        this.messages.push({ from: 'bot', text: response.data });
        this.selectedFile = null; // Reset file after sending
        setTimeout(() => this.scrollToBottom(), 100);
      });
    } else if (this.newMessage.trim()) {
      this.messages.push({ from: 'user', text: this.newMessage });
      setTimeout(() => this.scrollToBottom(), 100);

      this.dataService
        .sendMessage(this.newMessage)
        .subscribe((response: any) => {
          console.log(response.data);
          this.messages.push({ from: 'bot', text: response.data });
          this.newMessage = '';
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
