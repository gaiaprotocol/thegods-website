import { DomNode } from "@common-module/app";

export default class AccordionOpenIcon extends DomNode {
  constructor() {
    super(".icon.accordion-open");
    const svgHeight = 14;

    const svg = '<svg fill="currentColor" height="' + svgHeight +
      '" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" fill-rule="evenodd" d="M4.5 4.5V8h-1V4.5H0v-1h3.5V0h1v3.5H8v1H4.5Z" clip-rule="evenodd"></path></svg>';
    this.htmlElement.innerHTML = svg;
  }
}
