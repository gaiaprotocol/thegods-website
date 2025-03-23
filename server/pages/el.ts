import {
  DomChild,
  DomSelector,
  el as UniversalEl,
  html,
} from "@common-module/universal-page";

export default function el<S extends DomSelector>(
  selector: S,
  ...children: DomChild<S>[]
): string {
  const parts = (selector || "div").split(/([#.])/);
  const tag = parts[0] || "div";

  let id = "";
  const classes: string[] = [];

  let currentType: "#" | "." | "" = "";
  for (let i = 1; i < parts.length; i += 2) {
    currentType = parts[i] as "#" | ".";
    const value = parts[i + 1];
    if (currentType === "#") id = value;
    else if (currentType === ".") classes.push(value);
  }

  let attributes = "";
  if (id) {
    attributes += ` id="${id}"`;
  }
  if (classes.length > 0) {
    attributes += ` class="${classes.join(" ")}"`;
  }

  let childrenContent = "";

  for (const child of children) {
    if (child === undefined) continue;
    else if (typeof child === "string") {
      childrenContent += child.replace("\n", "<br>");
    } else {
      for (const key in child) {
        if (key === "style") {
          let style = "";
          for (const styleKey in child.style) {
            style += `${
              styleKey.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
            }:${child.style[styleKey as keyof typeof child.style]};`;
          }
          attributes += ` style="${style}"`;
        } else {
          attributes += ` ${key}="${child[key as keyof typeof child]}"`;
        }
      }
    }
  }

  return `<${tag}${attributes}>${childrenContent}</${tag}>`;
}

UniversalEl.impl = el;
html.impl = (htmlContent) => htmlContent;
