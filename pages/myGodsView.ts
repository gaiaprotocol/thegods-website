import { el } from "@commonmodule/universal-page";

export function myGodsView<T>(): T {
  return el(
    ".my-gods-view",
    el("header", el("h1", "My Gods")),
    el("main"),
  );
}
