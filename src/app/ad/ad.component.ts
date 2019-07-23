import { Component, Renderer2, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-ad',
  template: '<div [id]="\'mmt-\' + id" *ngIf="id"></div>',
  styles: [':host { display: block; }']
})
export class AdComponent implements OnInit {
  @Input() id: string;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    const script = this.renderer.createElement('script');
    const check = `$MMT = window.$MMT || {}; $MMT.cmd = $MMT.cmd || [];`;
    const command = `$MMT.cmd.push(function(){ $MMT.display.slots.push(["${this.id}"]); })`;
    const content = this.renderer.createText(`${check} ${command}`);

    this.renderer.setAttribute(script, 'type', 'text/javascript');
    this.renderer.setAttribute(script, 'data-cfasync', 'false');
    this.renderer.appendChild(script, content);
    this.renderer.appendChild(this.el.nativeElement, script);
  }
}
