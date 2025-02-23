import { Component, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-home',
  imports: [], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  faqItems = [
    { question: "How does it work?", answer: "You create an account as developer or a recruiter. A developer can take tests, and the recruiter can upload technical IT tests.", active: false },
    { question: "How can I pass a test?", answer: "Once your recruiter uploads a test, it will appear in your dashboard, and you can take it.", active: false },
    { question: "How does the anti-cheat work?", answer: "Your camera & mic must be opened, you have to be alone in the room and verify all conditions to be redirected to the test page.", active: false },
    { question: "What are the tips to pass the test safely?", answer: "You should look at the test, stay in a quiet environment, don't change tabs, and clear the background behind you.", active: false },
    { question: "How do I get the result of my test?", answer: "Once you complete the test (generally a quiz), you get your score.", active: false }
  ];

  constructor(private renderer: Renderer2) {}

  toggleFAQ(item: any) {
    item.active = !item.active;
  }

}



  


