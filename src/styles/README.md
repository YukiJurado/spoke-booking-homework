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
- Inter font files are not bundled in this project. The family token names Inter
  with a generic fallback; font loading is still needed for visual fidelity.
- Foundations does not specify dark mode, shadows, breakpoints, or semantic
  hover/focus/error colours. No values have been invented for these.
- The existing starter CSS retains its own styles. Components will adopt these
  tokens in the next implementation step.
