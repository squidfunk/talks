/*
 * Copyright (c) 2019 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import * as escape from "escape-html"
import * as Highlight from "highlight.js"
import * as Reveal from "reveal.js"

import "highlight.js/styles/dracula.css"
import "reveal.js/css/reveal.css"

import "./styles/theme.css"

/* ----------------------------------------------------------------------------
 * Presentation
 * ------------------------------------------------------------------------- */

/* Automatically escape code blocks and remove unnecessary whitespace */
const blocks = document.querySelectorAll("pre > code")
for (const block of Array.from(blocks)) {
  const html = escape(block.innerHTML)

  /* Remove unintended indent */
  const [indent] = html.match(/^[ ]+/m)!
  const code = html
    .replace(new RegExp(indent, "g"), "")
    .split(/\n/)

  /* Remove empty lines at beginning and end */
  if (code[0].trim().length === 0)
    code.shift()
  if (code[code.length - 1].trim().length === 0)
    code.pop()

  /* Set code block */
  block.innerHTML = code.join("\n")
}

/* */
const headlines = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
for (const headline of Array.from(headlines)) {
  const children = Array.from(headline.childNodes) as HTMLElement[] // TODO: ugly
  const nodes = children
    .reduce<Array<HTMLElement | Text>>((list, child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        return [...list, ...child.textContent!.split(/(\s+)/).filter(Boolean).map(x => document.createTextNode(x))]
      } else {
        return [...list, child]
      }
    }, [])

  headline.textContent = ""
  for (const [i, node] of nodes.entries()) {
    const container = document.createElement("span")
    container.classList.add("container")

    const animation = document.createElement("span")
    animation.classList.add("animation")
    animation.style.animationDelay = `${i * 100}ms`

    animation.appendChild(node) // TODO: ugly
    container.appendChild(animation) // TODO: ugly

    headline.appendChild(container)
  }
}

/* Initialize presentation */
Reveal.initialize({
  hash: true,
  slideNumber: true,
  transition: "fade",
  transitionSpeed: "fast"
})

/* Initialize syntax highlighting */
Highlight.initHighlightingOnLoad()
