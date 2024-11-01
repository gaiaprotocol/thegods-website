import { View } from "@common-module/app";
import { myNFTsView } from "../../pages/myNFTsView.js";
import Layout from "./Layout.js";

export default class MyNFTsView extends View {
  constructor() {
    super();
    Layout.content = this.container = myNFTsView();
  }
}
