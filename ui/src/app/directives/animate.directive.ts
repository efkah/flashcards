import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[animate]',
})
export class AnimateDirective {
  @Input() animate?: 'fadeIn';

  constructor(private readonly elementRef: ElementRef) {
    this.elementRef.nativeElement.classList.add('animate__animated');
    const animation =
      this.elementRef.nativeElement.getAttribute('animate') + '';
    switch (animation) {
      case 'fadeIn':
        this.elementRef.nativeElement.classList.add('animate__fadeIn');
        break;

      default:
        break;
    }
  }
}
