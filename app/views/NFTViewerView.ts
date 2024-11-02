import { QueriedDomNode, View } from "@common-module/app";
import NFTViewer from "../components/NFTViewer.js";

export default class NFTViewerView extends View {
  constructor() {
    super();
    this.container = new QueriedDomNode(".nft-viewer-view");
  }

  public changeData(data: { tokenId: string }): void {
    this.container.empty().append(
      new NFTViewer(parseInt(data.tokenId), true),
    );
  }
}
