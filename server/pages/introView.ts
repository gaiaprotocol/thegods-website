import { el } from "https://raw.githubusercontent.com/yjgaia/deno-module/main/page.ts";

export function introView(): string {
  return el(
    ".intro-view",
    el("header", el("h1", "Welcome to my website!")),
  );
}
