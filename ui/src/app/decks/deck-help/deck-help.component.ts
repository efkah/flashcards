import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-deck-help',
  templateUrl: './deck-help.component.html',
  styleUrls: ['./deck-help.component.scss'],
})
export class DeckHelpComponent implements OnInit, AfterViewChecked {
  title = '';

  constructor(private readonly elementRef: ElementRef) {}

  ngAfterViewChecked(): void {
    // TODO: Throws ExpressionChangedAfterItHasBeenCheckedError
    this.title =
      this.elementRef.nativeElement.querySelector('markdown h1').textContent;
    this.elementRef.nativeElement.querySelector('markdown h1').remove();
  }

  ngOnInit(): void {}
}
