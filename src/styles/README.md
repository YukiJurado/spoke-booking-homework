# Design tokens

`tokens.css` contains values read through Figma MCP from [Foundations, node 7:26](https://www.figma.com/design/xWrQF0fTmdvB0OKzHVPsDo/?node-id=7-26).
It is loaded by `src/main.tsx` and defines values without applying component styles.

| Figma name | CSS property | Value |
|---|---|---|
| `color/surface` | `--color-surface` | `#ffffff` |
| `color/text/primary` | `--color-text-primary` | `#1a1a1a` |
| `color/text/muted` | `--color-text-muted` | `#6b6660` |
| `color/border` | `--color-border` | `#e4e0d8` |
| `color/brand` | `--color-brand` | `#e8552b` |
| `color/on-brand` | `--color-on-brand` | `#ffffff` |
| `color/tag/background` | `--color-tag-background` | `#fcebe4` |
| `color/tag/text` | `--color-tag-text` | `#b23e16` |
| `space/4` … `space/24` | `--space-4` … `--space-24` | 4, 8, 12, 16, 20, 24px |
| `radius/md` | `--radius-md` | 12px |
| `radius/lg` | `--radius-lg` | 16px |
| `radius/pill` | `--radius-pill` | 999px |

Text style names become lowercase prefixes, for example `Screen/Title` →
`--screen-title-font-size`. Each exposes `font-family`, `font-size`,
`font-weight`, `line-height`, `letter-spacing`, and a composite `font` property.
All use Inter, normal style, and zero letter spacing.

| Figma text style | CSS prefix | Size / line height | Weight |
|---|---|---|---|
| `Screen/Title` | `--screen-title` | 28 / 34px | 600 |
| `Card/Title` | `--card-title` | 20 / 28px | 600 |
| `Card/Body` | `--card-body` | 15 / 22px | 400 |
| `Card/Caption` | `--card-caption` | 14 / 20px | 400 |
| `Label/Button` | `--label-button` | 16 / 24px | 600 |
| `Label/Field` | `--label-field` | 14 / 20px | 500 |
| `Label/Tag` | `--label-tag` | 13 / 18px | 500 |

Example for a future component:

```css
.service-title {
  color: var(--color-text-primary);
  font: var(--card-title-font);
  letter-spacing: var(--card-title-letter-spacing);
  margin-block-end: var(--space-8);
}
```

## Gaps and scope

- All requested colour, spacing, radius, and text style values are specified in Foundations.
- Inter weights 400, 500 and 600 are self-hosted via `@fontsource/inter` and
  imported in `src/main.tsx`; the generic sans-serif fallback remains.
- Foundations does not specify dark mode, shadows, breakpoints, or semantic
  hover/focus/error colours. No values have been invented for these.
- The first screen and its five component families now use these tokens.
- Added implementation tokens for zero spacing, 1px/2px borders, disabled opacity
  and the screen dimensions. These names are code additions, not Figma variable
  names. The 392×846px screen includes the 1px outer border around the nominal
  390×844px Figma frame.


## Service card interaction tokens

The code-first hover design adds `--service-card-hover-lift` (-4px),
`--color-service-card-shadow` (`#1a1a1a` at 12% opacity),
`--service-card-hover-shadow` (0px 8px 20px 0px),
`--service-card-motion-duration` (180ms), and
`--service-card-motion-easing` (`cubic-bezier(0.2, 0.8, 0.2, 1)`).
Figma mirrors the colour as `color/service-card/shadow` and the shadow as the
shared `Service card/Hover` effect style. Existing spacing tokens supply shadow
offset and blur; the lift is a visual offset inside the Figma hover variant.


The completion screen adds two implementation tokens: `--success-mark-size`
(64px) and `--success-motion-duration` (400ms). Existing palette and typography
tokens style the new illustration and the reused booking-pass components.
