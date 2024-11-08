import { DomNode } from "@common-module/app";

export default class CheckIcon extends DomNode {
  constructor() {
    super(".icon.check");
    const svgHeight = 22;

    const svg = '<svg fill="currentColor" height="' + svgHeight +
      '" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>';
    this.htmlElement.innerHTML = svg;
  }
}
