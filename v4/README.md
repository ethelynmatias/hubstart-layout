# v4 — split layout

`template_v4.html` (in the repo root) is unchanged. This folder is the same page,
broken into parts.

```
v4/
├── index.html          full page — open this in the browser
├── header.html         header shell: brand, desktop nav bar, right actions
├── navigation.html     mobile full-screen menu
├── footer.html         footer
├── css/
│   ├── base.css        tokens, reset, container, buttons, scroll-to-top
│   ├── header.css      header shell, brand, icon buttons
│   ├── navigation.css  nav links, dropdowns, hamburger, mobile menu
│   ├── main.css        hero, services, clients, ceiling, proof, how, testimonials, CTA
│   └── footer.css      footer
└── js/
    ├── navigation.js   hamburger, dropdowns, header-on-scroll
    ├── sliders.js      logo + testimonial carousels
    └── ui.js           scroll-to-top, scroll-reveal, proof parallax
```

`index.html` carries the header/navigation/footer markup inline so it works when
opened straight from disk. `header.html`, `navigation.html` and `footer.html` hold
the same markup as standalone snippets — edit a snippet, then paste it back into
`index.html` (or into whatever templating system picks these up).

Paths are relative to this folder: `../theme/theme.css` for the palette and
`../assets/images/` for the logo.
