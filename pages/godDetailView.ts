import { el, html } from "@commonmodule/universal-page";

export function godDetailView<T>(tokenId: number): T {
  return el(
    ".god-detail-view",
    el(
      "header",
      el("h1", `God #${tokenId}`),
      el(
        "a.button.contained",
        "View on OpenSea ",
        html(
          '<svg width="0.625rem" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9L9 1M9 1H2.5M9 1V7.22222" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        ),
        {
          href:
            `https://opensea.io/assets/ethereum/0x134590acb661da2b318bcde6b39ef5cf8208e372/${tokenId}`,
          target: "_blank",
        },
      ),
    ),
  );
}
