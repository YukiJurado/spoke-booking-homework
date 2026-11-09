# Figma component review

Reviewed through Figma MCP on 2026-11-09, including a rendered view of the
[Components section](https://www.figma.com/design/xWrQF0fTmdvB0OKzHVPsDo/?node-id=3-25).
This is an inventory and implementation guide. The first screen now uses React
implementations of Button, Tag, TopBar, ServiceCard and ActionBar. TimeSlot, Input
and SummaryRow remain to be implemented.

Both pages were searched for component definitions. `Spoke starter kit` contains
8 component families: 4 standalone components and 4 variant sets containing
9 variants (13 component definitions total). `Sloppy vs clean` contains no
component or component-set definitions.

## Inventory

| Figma component | Node | Variants | Exposed content properties | Suggested React name |
|---|---|---|---|---|
| Tag | `3:27` | None | Label | `Tag` |
| Button | `3:33` | Primary, Secondary | Label | `Button` |
| Time slot | `6:14` | Default, Selected, Disabled | Label | `TimeSlot` |
| Input | `6:23` | Default, Focus | Label, Placeholder | `Input` |
| Top bar | `6:24` | None | Title, Step | `TopBar` |
| Service card | `11:33` | Default, Selected | Title, Price, Description | `ServiceCard` |
| Summary row | `11:34` | None | Label, Value | `SummaryRow` |
| Action bar | `11:37` | None | None at the parent level; contains a Button instance | `ActionBar` |

## Layout and token mapping

All 13 component definitions use auto layout. Their nonzero padding and gaps
are variable-bound. Visible solid colours are variable-bound except for the
Top bar chevron stroke, which is a literal `#1a1a1a` matching `color/text/primary`.
Text layers use named text styles matching the imported typography tokens.
Component-set display padding/gaps are literal 16px; those are canvas
organization values, not application layout requirements.

| Component | Layout values | Typography / colours |
|---|---|---|
| Tag | 4px vertical / 12px horizontal padding; pill radius | Label/Tag; tag/background and tag/text |
| Button | 12px vertical / 20px horizontal padding; md radius | Label/Button; Primary uses brand/on-brand; Secondary uses surface, primary text and border |
| Time slot | 12px vertical / 16px horizontal padding; md radius | Label/Field; selected uses brand/on-brand; disabled has 50% root opacity and muted text |
| Input | 8px label-to-field gap; field padding 12px vertical / 16px horizontal; md radius | Label/Field label, Card/Body placeholder; focus border uses brand |
| Top bar | 16px vertical / 20px horizontal padding; 12px gap; 24px icon | Card/Title heading, Card/Caption step; surface and border |
| Service card | 16px padding; 8px vertical gap; 12px header gap; lg radius | Card/Title title and price, Card/Body description; nested Tag |
| Summary row | Horizontal layout; 16px gap | Card/Caption label, Card/Body value |
| Action bar | 16px vertical / 20px horizontal padding; full-width nested Button | Surface, border, Primary Button |

Use the existing `src/styles/tokens.css` values when implementing these.
Keep the distinction between shared foundation tokens and component-specific
measurements; icon size, border widths and disabled opacity are not currently
named foundation tokens.

## Reuse in the screens

Counts below include nested instances, such as Tags within Service cards and
Buttons within Action bars. Every inspected instance resolved to a main component.

| Screen | Instances |
|---|---|
| 01 Choose a service (`7:114`) | 1 Top bar, 4 Service cards, 4 Tags, 1 Action bar, 1 Button |
| 02 Pick a slot (`7:121`) | 1 Top bar, 9 Time slots (day and time choices), 1 Action bar, 1 Button |
| 03 Confirm (`7:128`) | 1 Top bar, 3 Summary rows, 2 Inputs, 1 Action bar, 1 Button |

## Findings to resolve during design and implementation

1. **State changes alter geometry.** Primary Button is 162×48; Secondary is
   164×50 with the same label. Default Time slot is 72×46; Selected is 70×44.
   Default Input is 320×76; Focus is 320×78 (field border grows from 1px to 2px).
   Default Service card is 350×126; Selected is 350×128 (1px to 2px border).
   Decide whether these changes are intentional before coding stable control
   dimensions. Directly reproducing them can shift adjacent content.
2. **Some interaction states are absent.** Button provides visual Primary and
   Secondary variants but no disabled, hover, pressed or focus variants. Input
   has no error or disabled variant. Service card has no keyboard-focus variant.
   Time slot has no separate keyboard-focus variant. These need explicit design
   decisions when building accessible interactions.
3. **Colour contrast needs attention.** White on brand `#e8552b` is approximately
   3.64:1, below the 4.5:1 WCAG AA threshold for normal text. This affects the
   16px Primary Button label and 14px Selected Time slot label. No Figma colours
   were changed during this review.
4. **The back-arrow stroke is unbound.** Bind its existing primary-text colour
   to the shared token in Figma when polishing the library.
5. **Some values lack named foundation tokens.** The 1px/2px borders, 24px icon
   size and 50% disabled opacity are defined in components, but have no matching
   named tokens in Foundations. Add explicit component tokens when needed.
6. **Content controls could be easier to expose.** Service card duration is a
   nested Tag; the Service card parent exposes Title, Price and Description.
   Action bar exposes no parent content property for its nested Button label.
   The React components should accept these values as props; Figma can expose
   nested properties if desired.
7. **Variants are visual specifications.** All inspected component/subtree
   reaction counts were zero. Click selection, keyboard navigation, validation,
   and booking submission behaviour must be implemented in React. The first
   screen now has native radio selection and visible keyboard focus.
8. **Font loading was pending at review time.** Inter weights 400, 500 and 600
   are now self-hosted through `@fontsource/inter`.

The component sheet was visually inspected. The implemented first screen was
also checked in the browser at 392×846, with additional 320px and desktop
overflow checks. Mouse and arrow-key radio selection and Continue feedback were
verified. Continue currently confirms the selection; it does not navigate to
the unimplemented slot screen. The existing Figma variant geometry and orange
colour are preserved, including the contrast limitation noted above.

The original Figma review covers the source library. Browser verification here
covers the first screen only; the other two screens remain unimplemented.
