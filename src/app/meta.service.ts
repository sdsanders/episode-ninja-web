
import { Injectable, Inject, Renderer } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class MetaService {

  constructor(@Inject(DOCUMENT) private document: any) {}

  public setTitle(renderer: Renderer, title: string): void {
    if (this.document.head.children.forEach) {
      this.document.head.children.forEach(element => {
        if (element.name === 'title') {
          renderer.setText(element, title);
        }
      });
    }
  }

  public addTag(renderer: Renderer, name: string, content: string) {
    const elem = renderer.createElement(this.document.head, 'meta');
    renderer.setElementAttribute(elem, 'name', name);
    renderer.setElementAttribute(elem, 'content', content);
  }
}
