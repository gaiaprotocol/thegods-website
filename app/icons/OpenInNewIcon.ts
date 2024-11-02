import { DomNode } from "@common-module/app";

export default class OpenInNewIcon extends DomNode {
  constructor() {
    super(".icon.open-in-new");
    const svgHeight = 22;

    const svg = '<svg fill="currentColor" height="' + svgHeight +
      '" viewBox="-5 -5 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M1 9L9 1M9 1H2.5M9 1V7.22222" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
    this.htmlElement.innerHTML = svg;
  }
}
