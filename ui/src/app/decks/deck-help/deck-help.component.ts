import { Component, OnInit } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-deck-help',
  templateUrl: './deck-help.component.html',
  styleUrls: ['./deck-help.component.scss'],
})
export class DeckHelpComponent implements OnInit {
  constructor(private markdownService: MarkdownService) {}

  ngOnInit(): void {
    this.markdownService.renderer.heading = (text: string, level: number) => {
      if (level === 1) {
        return `<h1><a class="md-back" href="/decks">arrow_back</a><span>${text}</span></h1>`;
      } else {
        return `<h${level}>${text}</h${level}>`;
      }
    };
  }
}
