import { el } from "@common-module/universal-page";

export default function test() {
  return el("div", el("span", "Hello, World!"), el("img", { src: "test" }));
}
