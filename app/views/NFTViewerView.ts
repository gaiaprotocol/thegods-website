import { QueriedDomNode, View } from "@common-module/app";
import GodViewer from "../components/GodViewer.js";

export default class NFTViewerView extends View {
  constructor() {
    super();
    this.container = new QueriedDomNode(".god-viewer-view");
  }

  public changeData(data: { tokenId: string }): void {
    this.container.clear().append(
      new GodViewer(parseInt(data.tokenId), true),
    );
  }
}
