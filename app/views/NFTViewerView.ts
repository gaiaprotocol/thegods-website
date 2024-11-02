import { QueriedDomNode, View } from "@common-module/app";
import NFTViewer from "../components/NFTViewer.js";

export default class NFTViewerView extends View {
  constructor() {
    super();
    this.container = new QueriedDomNode(".nft-viewer-view").append(
      new NFTViewer(
        parseInt(new URLSearchParams(location.search).get("tokenId") ?? ""),
      ),
    );
  }
}
