import { el, html } from "@common-module/universal-page";

export function introView<T>(): T {
  return el(
    ".intro-view",
    el(
      "header",
      el("p.caption", "NFT Collection"),
      el("h1", "The Gods"),
      el(
        "p.description",
        "A membership NFT collection of Gaia Protocol consisting of 3,333 NFTs",
      ),
      el(
        ".buttons",
        el(
          "a.button.contained",
          "View on OpenSea",
          html(
            '<svg width="0.625rem" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9L9 1M9 1H2.5M9 1V7.22222" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
          ),
          {
            href: "https://opensea.io/collection/gaia-protocol-gods",
            target: "_blank",
          },
        ),
      ),
    ),
    el(".god-preview"),
    el(
      "section.benefits",
      el("h2", "Holder benefits"),
      el(
        "ul",
        el(
          "li",
          el(
            "video",
            { autoplay: true, loop: true, muted: true, playsInline: true },
            el("source", {
              src: "https://gaiaprotocol.com/videos/thegods.mp4",
              type: "video/mp4",
            }),
          ),
          el(
            ".content",
            el("h3", "Customizable avatars"),
            el(
              "p",
              "Express your unique identity with our highly customizable NFT avatars.",
            ),
          ),
        ),
        el(
          "li.membership",
          {
            style: {
              backgroundImage: "url('/images/valhalla.jpg')",
            },
          },
          el(
            ".content",
            el("h3", "Community membership"),
            el(
              "p",
              "Connect and engage with our development team in real-time through ",
              el(
                "a",
                "Valhalla ",
                html(
                  '<svg width="0.625rem" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9L9 1M9 1H2.5M9 1V7.22222" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
                ),
                {
                  href: "https://valhalla.gaia.cc",
                  target: "_blank",
                },
              ),
              ", our exclusive holder-only platform.",
            ),
          ),
        ),
      ),
    ),
  );
}
