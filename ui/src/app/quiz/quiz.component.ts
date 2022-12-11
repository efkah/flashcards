import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  state: 'start' | 'quiz' | 'end' = 'start';

  constructor() {}

  ngOnInit(): void {}

  start() {
    this.state = 'quiz';
  }
  quiz() {
    this.state = 'end';
  }
  end() {
    this.state = 'start';
  }
}
