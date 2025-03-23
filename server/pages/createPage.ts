export default function createPage(options: {
  title: string;
  suffix?: string;
  description?: string;
  coverImageURL?: string;
  jsFiles?: string[];
  cssFiles: string[];
  gtagId?: string;
  viewTransition?: boolean;
  twitterHandle?: string;
}, ...children: string[]): string {
  let ogTags =
    `<meta property="og:type" content="website">\n<meta property="og:title" content="${options.title}">`;
  ogTags += options.coverImageURL
    ? `\n<meta property="og:image" content="${options.coverImageURL}">`
    : "";
  ogTags += options.description
    ? `\n<meta property="og:description" content="${options.description}">`
    : "";

  let twitterTags =
    `<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${options.title}">`;
  twitterTags += options.coverImageURL
    ? `\n<meta name="twitter:image" content="${options.coverImageURL}">`
    : "";
  twitterTags += options.description
    ? `\n<meta name="twitter:description" content="${options.description}">`
    : "";
  twitterTags += options.twitterHandle
    ? `\n<meta name="twitter:site" content="${options.twitterHandle}">`
    : "";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">
  ${
    options.description
      ? `<meta name="description" content="${options.description}">`
      : ""
  }
  ${ogTags}
  ${twitterTags}
  <meta name="robots" content="index, follow">
  ${
    options.viewTransition
      ? '<meta name="view-transition" content="same-origin" />'
      : ""
  }
  <title>${
    options.title + (options.suffix ? ` | ${options.suffix}` : "")
  }</title>
  ${
    options.cssFiles
      ? options.cssFiles.map((file) =>
        `<link rel="stylesheet" type="text/css" href="${file}" />`
      ).join("\n")
      : ""
  }
  ${
    options.gtagId
      ? `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${options.gtagId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${options.gtagId}');
</script>`
      : ""
  }
</head>
<body>
  ${children.join("\n")}
  ${
    options.jsFiles
      ? options.jsFiles.map((file) => `<script src="${file}"></script>`).join(
        "\n",
      )
      : ""
  }
</body>
</html>`;
}
