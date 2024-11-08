import { DomNode } from "@common-module/app";

export default class AccordionCloseIcon extends DomNode {
  constructor() {
    super(".icon.accordion-close");
    const svgHeight = 3.5;

    this.style({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    });

    const svg = '<svg fill="currentColor" height="' + svgHeight +
      '" viewBox="0 0 8 2" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" fill-rule="evenodd" d="M0 1.5h8v-1H0v1Z" clip-rule="evenodd"></path></svg>';
    this.htmlElement.innerHTML = svg;
  }
}
