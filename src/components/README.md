# Figma component review

Reviewed through Figma MCP on 2026-11-09, including a rendered view of the
[Components section](https://www.figma.com/design/xWrQF0fTmdvB0OKzHVPsDo/?node-id=3-25).
This is an inventory and implementation guide. The first screen now uses React
implementations of Button, Tag, TopBar, ServiceCard and ActionBar. The second
screen adds TimeSlot with Default, Selected and Disabled states. The third
screen adds Input and SummaryRow. All eight component families now have React
implementations.

Both pages were searched for component definitions. `Spoke starter kit` contains
8 component families: 4 standalone components and 4 variant sets containing
11 variants (15 component definitions total). `Sloppy vs clean` contains no
component or component-set definitions.

## Inventory

| Figma component | Node | Variants | Exposed content properties | Suggested React name |
|---|---|---|---|---|
| Tag | `3:27` | None | Label | `Tag` |
| Button | `3:33` | Primary, Secondary | Label | `Button` |
| Time slot | `6:14` | Default, Selected, Disabled | Label | `TimeSlot` |
| Input | `6:23` | Default, Focus | Label, Placeholder | `Input` |
| Top bar | `6:24` | None | Title, Step | `TopBar` |
| Service card | `11:33` | Default, Selected, Hover, Selected hover | Title, Price, Description | `ServiceCard` |
| Summary row | `11:34` | None | Label, Value | `SummaryRow` |
| Action bar | `11:37` | None | None at the parent level; contains a Button instance | `ActionBar` |

## Layout and token mapping

The original 13 component definitions use auto layout. The two added hover
variants retain an auto-layout root with absolute visual layers for the lift. Their nonzero padding and gaps
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
   reaction counts were zero at the original review. Service card now has
   hover/leave and click prototype transitions. Click selection, keyboard navigation, validation,
   and booking submission behaviour must be implemented in React. The first
   screen now has native radio selection and visible keyboard focus.
8. **Font loading was pending at review time.** Inter weights 400, 500 and 600
   are now self-hosted through `@fontsource/inter`.

The component sheet was visually inspected. The implemented first screen was
also checked in the browser at 392×846, with additional 320px and desktop
overflow checks. Mouse and arrow-key radio selection and Continue feedback were
verified. Continue now opens the implemented slot screen. The existing Figma variant geometry and orange
colour are preserved, including the contrast limitation noted above.

The original Figma review covers the source library. Browser verification here
now covers all three screens.


## Screen 02 implementation

`src/screens/PickSlot.tsx` follows [frame 7:121](https://www.figma.com/design/xWrQF0fTmdvB0OKzHVPsDo/?node-id=7-121).
It reuses TopBar, ActionBar and Button, and adds the TimeSlot radio component.
Day and time are separate native radio groups with keyboard selection and
visible focus. The two disabled times cannot be selected and are skipped by
keyboard navigation. The chosen service controls the subtitle; Back preserves
service, day and time selections.

The options are the static exercise data from Figma (Today, Tomorrow, Mon 16,
and six times); this screen does not fetch live availability. Continue opens
the confirmation screen with the selected service, day and time. Figma's
state-dependent control sizes and brand colours remain unchanged.

Verification: production build and lint passed; browser comparison at 392×846,
320px and desktop overflow checks, day/time selection, disabled-state keyboard
skipping, forward/back navigation and service-dependent subtitle.


## Screen 03 implementation

`src/screens/Confirm.tsx` follows [frame 7:128](https://www.figma.com/design/xWrQF0fTmdvB0OKzHVPsDo/?node-id=7-128).
It reuses TopBar, ActionBar and Button, and adds Input and SummaryRow. The three
summary rows reflect the chosen service, drop-off day/time and price. Input uses
real focus to show Figma's 2px brand border and hide the placeholder; fields are
not artificially focused. Empty fields show their placeholder again on blur.
Figma's Input Focus variant hides its Placeholder layer using zero opacity,
preserving the field dimensions and editable placeholder text property.
The existing local chevron asset is reused.

Name is required after trimming whitespace. Phone accepts an optional leading
plus, digits, spaces, parentheses, dots and hyphens, with 7–15 digits. This is a
basic format check, not phone ownership or deliverability verification. Errors
are associated with their fields, announced, and focus moves to the first invalid
field. Contact details and prior selections remain in React memory during back
navigation; reloading clears them. No contact information is sent or stored by
this app.

A valid submission now replaces the form with the BookingComplete screen
(described below), avoiding repeated form submission. There is no booking API,
live reservation, SMS integration or payment transaction.

Verification: production build and lint passed. Browser checks compared the
392×846 screen with the Figma render, including the focused Phone field and the
summary/input dimensions. Empty fields and malformed phone were rejected; valid
contact details completed the demo. Back navigation retained contact details,
changed slots and service prices updated the summary, and 320px/desktop checks
found no horizontal overflow.


## Service card hover (code first, then Figma)

- The visual card lifts 4px over 180ms with `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Shadow: 0px horizontal, 8px vertical, 20px blur, 0px spread, `#1a1a1a` at 12%.
- Default and Selected both support hover; Selected keeps its brand border.
- Only the visual card moves. The native radio hit area and surrounding layout
  stay fixed. The visual layers ignore pointer events so they do not intercept
  the radio control.
- Keyboard focus provides the same elevation and the existing visible outline.
  Reduced-motion preference removes movement and transition, retaining shadow.
  Pointer hover is limited to fine pointers that support hover.
- New code tokens in `src/styles/tokens.css` describe the lift, shadow and timing.

The existing [Service card set](https://www.figma.com/design/xWrQF0fTmdvB0OKzHVPsDo/?node-id=11-33)
now contains four states: Default, Selected, Hover (`2012:79`) and Selected hover
(`2012:87`). The Hover variants move Surface and content up 4px inside a fixed
component boundary. Existing content properties and screen text overrides are
preserved. Shared effect style `Service card/Hover` binds its colour to
`color/service-card/shadow`, vertical offset to `space/8`, and blur to `space/20`.
The shadow colour has EFFECT_COLOR scope and WEB syntax matching the CSS token.

Prototype transitions use Smart Animate, 180ms and the same easing. Hover enters
the matching raised state; leaving returns to the matching rest state. Clicking
an unselected state changes to Selected (or Selected hover while hovering).
These interactions demonstrate one card; the React radio group handles exclusive
selection across the list.

[Hover review frame](https://www.figma.com/design/xWrQF0fTmdvB0OKzHVPsDo/?node-id=2012-103)
shows all four states as component instances. Figma screenshots verified the
preview without clipped shadows and the original service screen with its content
intact. Browser checks verified the 4px transform, matching shadow, unchanged
neighbour positions, selected border, mouse/keyboard selection and reduced motion.


## Completion proposal: celebration + saveable booking pass

[04 Booking complete in Figma](https://www.figma.com/design/xWrQF0fTmdvB0OKzHVPsDo/?node-id=2027-81)
combines option 1's positive finishing moment with option 2's tangible receipt.

Scope: one new screen (`src/screens/BookingComplete.tsx`), one inline vector
checkmark, a callback option on ActionBar, and two success illustration/motion
tokens. No new reusable UI component family or dependency was introduced.
Reuses TopBar, Tag, SummaryRow, Button and ActionBar, plus the existing summary
container, spacing, colours and typography.

After valid submission the form is replaced by a personalised heading, one-time
400ms checkmark arrival, a booking pass (service, drop-off, price, demo reference),
a Secondary Save booking details action, and the existing footer with Done.
References use a random DEMO-prefixed identifier. Saving creates a local plain
text receipt with the selected details and timestamp. It sends no data to a
server and contains no phone number. Done clears the flow for a new attempt.
Reduced motion disables the checkmark animation. Demo status is explicit both
on screen and in the receipt; no appointment is reserved.

Figma uses an editable screen made of 9 existing-component instances, editable
text and vector layers, not a screenshot. It sits below the original screens
in the Screens section. The original Confirm action navigates to it using
Smart Animate; its Done action returns to Choose a service. The Save action is
a design representation in Figma; the working download is implemented in code.
The named prototype flow is Booking completion proposal. No existing main
components were duplicated or detached.

Checks: production build/lint, personalised completion and focus transfer,
actual downloaded receipt contents, Done reset, reduced-motion emulation,
320px/desktop overflow checks, and screenshot comparison between browser and
Figma. The Figma subtitle height was adjusted to match the browser's single-line
text. User-specific text (name/reference) is sample content in Figma and dynamic
in React.
