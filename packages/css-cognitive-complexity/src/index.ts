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

import escape from "escape-html"
import * as Highlight from "highlight.js/lib/highlight"
import p5 from "p5"
import * as Reveal from "reveal.js"

import XML from "highlight.js/lib/languages/xml"
import CSS from "highlight.js/lib/languages/css"

import "highlight.js/styles/dracula.css"
import "reveal.js/css/reveal.css"

import "./styles/theme.css"

/* ----------------------------------------------------------------------------
 * Preprocessing
 * ------------------------------------------------------------------------- */

/* Automatically escape code blocks and remove unnecessary whitespace */
const blocks = document.querySelectorAll("pre > code")
for (const block of Array.from(blocks)) {
  const html = block.classList.contains("html")
    ? escape(block.innerHTML)
    : block.innerHTML

  /* Remove unintended indent */
  const [indent] = html.match(/^[ ]+/m)!
  const code = html
    .replace(new RegExp(`^${indent}`, "gm"), "")
    .split(/\n/)

  /* Remove empty lines at beginning and end */
  if (code[0].trim().length === 0)
    code.shift()
  if (code[code.length - 1].trim().length === 0)
    code.pop()

  /* Set code block */
  block.innerHTML = code.join("\n")
}

/* Initialize text reveal animation */
const headlines = document.querySelectorAll("[data-animation=reveal]")
for (const headline of Array.from(headlines)) {
  const children = Array.from(headline.childNodes) as HTMLElement[]
  const nodes = children
    .reduce<Array<HTMLElement | Text>>((list, child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        return [...list, ...child.textContent!
          .replace(/(^\s+|\s+$)/g, "")
          .split(/(\s+)/)
          .filter(Boolean)
          .map(x => document.createTextNode(x))
        ]
      } else {
        return [...list, child]
      }
    }, [])

  /* Replace with animation containers */
  headline.textContent = ""
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]

    /* Create animation container */
    const container = document.createElement("span")
    container.classList.add("container")

    /* Create animation */
    const animation = document.createElement("span")
    animation.classList.add("animation")
    animation.style.animationDelay = `${i * 75}ms`

    /* Add animated word */
    animation.appendChild(node)
    container.appendChild(animation)

    /* Add word */
    headline.appendChild(container)
  }
}

/* ----------------------------------------------------------------------------
 * Presentation
 * ------------------------------------------------------------------------- */

/* Initialize presentation */
Reveal.initialize({
  hash: true,
  slideNumber: true,
  transition: "fade",
  transitionSpeed: "fast"
})

/* Register languages */
Highlight.registerLanguage("html", XML)
Highlight.registerLanguage("css", CSS)

/* Initialize syntax highlighting */
Highlight.initHighlightingOnLoad()

/* ----------------------------------------------------------------------------
 * Cover animation
 * ------------------------------------------------------------------------- */

/* Inject canvas into background of cover slide */
const background = document.querySelector<HTMLElement>(".backgrounds .cover")!
new p5((p: p5) => {

  /* Fractal pattern and coefficients */
  const patterns = [
    'QFFVSLMIIGCR', 'QGGVSLMHHGCR', 'GIIETPIQRRUL', 'GLXOESFTTPSV',
    'MDVAIDOYHYEA', 'SOJSCEMKBBBE', 'SKDCIBQUXECQ', 'RGSBQEULKGQJ',
    'KXSHMMNQHGMX', 'GPFBSLPSSIFM', 'VLEJLCRUFQTJ', 'RCHFLWXCOKOK',
    'VFPPDBCPMSXU', 'LFMTGMBOOJLX', 'NJRJRBSNCPFC', 'SNMBDRFPSEIP',
    'XMDLHBOPUBET', 'OGLHHOWCLJGH', 'WGLMMLHQQQVL', 'SGOIOBSSESVI',
    'CINQELRDGMMT', 'DQQOSVCFUOQT', 'EMVWPTIVPHFS', 'LDUFWSKSBIGQ',
    'IPMBFXSCMKQK', 'TWNXRBQLKKJI', 'PDCTWHGFMRRQ', 'LKNIUIKWLHDP',
    'QTMWTJSLGRIH', 'ODKIXHJDVPSD', 'VJGWFEBROVPS', 'TCOSMDEMSFDM',
    'EDQIHKNGHCOH'
  ][13] // 7
  const a: number[] = []
  const r = p.random(360)

  /* Initialize coordinates */
  let x = 0.1, y = 0.1

  /* Initialize canvas and coefficients */
  p.setup = () => {
    p.createCanvas(window.screen.width, window.screen.height)
    for (let i = 0; i < patterns.length; i++)
      a[i] = (patterns.charCodeAt(i) - 65 - 12) / 10
  };

  /* Center and rotate canvas and draw points */
  p.draw = () => {
    p.translate(p.width / 2, p.height / 2)
    p.rotate(p.radians(r));

    /* Draw 250 points */
    for (let i = 0; i < 250; i++) {
      p.stroke(
        p.lerpColor(
          p.color(255, 82, 82, 150),
          p.color(0, 255, 102, 150),
          p.pow(p.abs(x) / 1.2, 1.5)
        )
      )
      p.point(x * p.width / 2, y * p.width / 2);

      /* Calculate next point */
      const x0 = a[0]         +  a[1] * x +  a[2] * x * x
               + a[3] * x * y +  a[4] * y +  a[5] * y * y
      const y0 = a[6]         +  a[7] * x +  a[8] * x * x
               + a[9] * x * y + a[10] * y + a[11] * y * y

      /* Set next coordinates */
      x = x0
      y = y0
    }
  }
}, background)
