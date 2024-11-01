import { el } from "@common-module/universal-page";

export function introView<T>(): T {
  return el(
    ".intro-view",
    el("header", el("h1", "Welcome to my website!")),
  );
}
