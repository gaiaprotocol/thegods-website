import { DomNode } from "@common-module/app";
import { GodMetadata } from "@gaiaprotocol/thegods";
import PartListItem from "./PartListItem.js";

export default class PartList<T = string> extends DomNode<HTMLDivElement, {
  select: (value: T) => void;
}> {
  public children: PartListItem<T>[] = [];
  public selected: PartListItem<T> | undefined;

  constructor(metadatas: ({ value: T } & GodMetadata)[]) {
    super(".part-list");
    for (const metadata of metadatas) {
      const item = new PartListItem(metadata.value, metadata).appendTo(this);
      item.onDom("click", () => this.select(metadata.value));
    }
  }

  public select(value: T) {
    this.selected?.deselect();
    this.selected = this.children.find((c) => c.value === value);
    this.selected?.select();
    this.emit("select", value);
    return this;
  }
}
