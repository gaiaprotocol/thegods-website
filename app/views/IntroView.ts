import { QueriedDomNode, View } from "@common-module/app";
import { introView } from "../../pages/introView.js";
import NFTViewer from "../components/NFTViewer.js";
import Layout from "./Layout.js";

export default class IntroView extends View {
  constructor() {
    super();
    Layout.content = this.container = introView();

    new QueriedDomNode(".nft-preview").append(
      new NFTViewer(0),
    );
  }
}
