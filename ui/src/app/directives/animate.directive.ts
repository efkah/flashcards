import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[animate]',
})
export class AnimateDirective {
  @Input() animate?: 'fadeIn' | 'rotateInDownLeft' | 'rotateInDownRight';

  constructor(private readonly elementRef: ElementRef) {
    this.elementRef.nativeElement.classList.add('animate__animated');
    const animation =
      this.elementRef.nativeElement.getAttribute('animate') + '';
    switch (animation) {
      case 'fadeIn':
        this.elementRef.nativeElement.classList.add('animate__fadeIn');
        break;
      case 'rotateInDownLeft':
        this.elementRef.nativeElement.classList.add(
          'animate__rotateInDownLeft'
        );
        break;
      case 'rotateInDownRight':
        this.elementRef.nativeElement.classList.add(
          'animate__rotateInDownRight'
        );
        break;

      default:
        break;
    }
  }
}
