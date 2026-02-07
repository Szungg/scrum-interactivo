import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

import { IntersectionService } from '../services/intersection.service';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly intersectionService: IntersectionService
  ) {}

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;
    element.classList.add('reveal-on-scroll');
    this.intersectionService.observe(element, () => {
      element.classList.add('is-visible');
    });
  }

  ngOnDestroy(): void {
    this.intersectionService.unobserve(this.elementRef.nativeElement);
  }
}
