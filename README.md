# thorve-shubham.github.io

Personal site — [thorve-shubham.github.io](https://thorve-shubham.github.io)

Hand-written HTML and CSS. No framework, no npm, no build step, no dev server.

## Preview locally

```
open index.html
```

That's it. Everything is relative-pathed and the JavaScript is a classic script
(no ES modules, no `fetch`), so the page works opened straight off the
filesystem over `file://`.

## Deploy

```
git add -A && git commit -m "…" && git push
```

This is a GitHub Pages **user site**, so the root of `master` is served
directly — no Actions workflow and no `gh-pages` branch. Live in under a minute;
hard-refresh (<kbd>⌘⇧R</kbd>) to get past the CDN cache.

## Layout

```
index.html            the whole page — content is hand-written here
styles/tokens.css     design tokens: colour, type, space, motion
styles/main.css       reset, layout, components, responsive, print
js/site.js            scroll-spy, scroll reveals, mobile nav
assets/               portrait, résumé PDF, favicon, social card
.nojekyll             tells GitHub Pages to skip its Jekyll pass
```

## Editing

**Content** lives directly in `index.html`, in numbered sections (`001` hero
through `008` contact). It is deliberately not generated from a JS data file —
recruiters find this page through search, and hand-written markup is what
crawlers actually index.

**Colour and type** are all in `styles/tokens.css`. The palette is authored in
OKLCH at a single hue (125°) sampled from the hoodie collar in the portrait, so
changing `--accent` re-tints the whole page coherently. Every text/background
pair in there is measured against WCAG AA — if you change a lightness value,
re-check the contrast.

**Résumé**: replace `assets/Shubham-Thorve-Resume.pdf`, keeping the filename
(no spaces — they break URLs).

## Regenerating the derived images

`assets/portrait.jpg`, `assets/portrait.webp` and `assets/og.png` are generated
from the original 640×640 photo with Pillow. The source photo is not in the
repo. Only needed if the photo changes — the geometry of the portrait's radial
edge fade is documented in `styles/main.css` and mirrored in the card generator.
