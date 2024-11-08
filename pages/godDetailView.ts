import { el } from "@common-module/universal-page";

export function godDetailView<T>(tokenId: string): T {
  return el(
    ".god-detail-view",
    el("h1", `God #${tokenId}`),
  );
}
