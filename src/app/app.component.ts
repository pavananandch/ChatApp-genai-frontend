
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader,IonHeader,IonButtons,IonToolbar, IonMenuButton,IonTitle, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, documentOutline, documentsOutline, documentSharp, documentsSharp } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
    IonHeader,
    IonButtons,
    IonToolbar,
    IonMenuButton,
    IonTitle,
  ],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Chat bot',
      url: '/folder/chatbot',
      icon: 'mail',
    },
    {
      title: 'PDF-Summarizer',
      url: '/folder/pdf-summarizer',
      icon: 'document',
    },
  ];
  public history = [];
  constructor() {
    addIcons({
      mailOutline,
      mailSharp,
      documentOutline,
      documentsOutline,
      documentSharp,
      documentsSharp,
    });
  }
}
