import { DomNode } from "@common-module/app";
import PartListItem from "./PartListItem.js";

export default class PartList extends DomNode<HTMLDivElement, {
  select: (value: string) => void;
}> {
  public children: PartListItem[] = [];
  public selected: PartListItem | undefined;

  constructor(metadatas: {
    name: string;
    type: string;
    gender: string;
    parts: Record<string, string>;
  }[]) {
    super(".part-list");
    for (const metadata of metadatas) {
      const item = new PartListItem(metadata.name, metadata).appendTo(this);
      item.onDom("click", () => this.select(metadata.name));
    }
  }

  public select(value: string) {
    this.selected?.deselect();
    this.selected = this.children.find((c) => c.name === value);
    this.selected?.select();
    this.emit("select", value);
    return this;
  }
}
