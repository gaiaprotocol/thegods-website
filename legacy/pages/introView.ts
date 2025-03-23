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
        ".button-container",
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
          {
            style: {
              backgroundImage:
                "url('https://common-resources.gaia.cc/covers/thegods.jpg')",
            },
          },
          el(
            "video",
            { autoplay: true, loop: true, muted: true, playsInline: true },
            el("source", {
              src: "https://common-resources.gaia.cc/covers/thegods.mp4",
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
        /*el(
          "li.membership",
          {
            style: {
              backgroundImage: "url('https://common-resources.gaia.cc/covers/valhalla.jpg')",
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
        ),*/
        el(
          "li",
          {
            style: {
              backgroundImage:
                "url('https://common-resources.gaia.cc/covers/gaia-names.png')",
            },
          },
          el(
            ".content",
            el("h3", "Gaia Name"),
            el(
              "p",
              "Receive your unique ",
              el(
                "a",
                "Gaia Name ",
                html(
                  '<svg width="0.625rem" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9L9 1M9 1H2.5M9 1V7.22222" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
                ),
                {
                  href: "https://names.gaia.cc",
                  target: "_blank",
                },
              ),
              " that can be used across the entire Gaia ecosystem.",
            ),
          ),
        ),
        el(
          "li",
          {
            style: {
              backgroundImage:
                "url('https://common-resources.gaia.cc/covers/gaia-personas.jpg')",
            },
          },
          el(
            ".content",
            el("h3", "Boosted Earnings in Gaia Personas"),
            el(
              "p",
              "Enjoy 200% trading revenue from your persona transactions in Gaia Personas. (Coming soon)",
            ),
          ),
        ),
        el(
          "li",
          {
            style: {
              backgroundImage:
                "url('https://common-resources.gaia.cc/covers/holding-points.jpg')",
            },
          },
          el(
            ".content",
            el("h3", "Holding Points"),
            el(
              "p",
              "Earn 10,000 holding points per NFT, increasing your trading fee earnings.",
            ),
          ),
        ),
        el(
          "li",
          {
            style: {
              backgroundImage:
                "url('https://common-resources.gaia.cc/covers/topictrade.jpg')",
            },
          },
          el(
            ".content",
            el("h3", "Enhanced topic.trade Returns"),
            el(
              "p",
              "Receive up to 200% boosted trading revenue distribution based on the total holding points of topic holders. (Coming soon)",
            ),
          ),
        ),
        el(
          "li",
          {
            style: {
              backgroundImage:
                "url('https://common-resources.gaia.cc/covers/gaia-clans.jpg')",
            },
          },
          el(
            ".content",
            el("h3", "Clan Operational Funding"),
            el(
              "p",
              "Get up to 200% boosted trading fee allocation to your clan's operational funds based on clan members' total holding points. (Coming soon)",
            ),
          ),
        ),
      ),
    ),
  );
}
