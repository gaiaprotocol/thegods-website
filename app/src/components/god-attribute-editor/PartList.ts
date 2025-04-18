import { DomNode } from "@commonmodule/app";
import { GodMetadata } from "@gaiaprotocol/thegods";
import PartListItem from "./PartListItem.js";

export default class PartList<T = string> extends DomNode<HTMLDivElement, {
  select: (value: T) => void;
}> {
  public children: PartListItem<T>[] = [];
  public selected: PartListItem<T> | undefined;

  constructor(dataSet: ({ value: T } & GodMetadata)[]) {
    super(".part-list");
    this.data = dataSet;
  }

  public set data(dataSet: ({ value: T } & GodMetadata)[]) {
    this.clear();
    for (const data of dataSet) {
      const item = new PartListItem(data.value, data).appendTo(this);
      item.onDom("click", () => this.select(data.value));
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
