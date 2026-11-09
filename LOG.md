# Process log

Add a row every time you prompt the agent for something that matters. Write it while you work, not afterwards.

| Date | What I asked (prompt or summary) | What the AI produced | What I fixed or changed, and why | Pull request |
|---|---|---|---|---|
| 2026-11-09 | Connect my Figma design to this project. | Downloaded the starter repository and verified access through the installed Figma MCP integration by reading page 6:5 (Spoke starter kit). Added verified links to its three screen frames in README.md. | No design or app code changes yet. | — |
| 2026-11-09 | Read Figma Foundations and create CSS tokens for colours, spacing, radii, and typography; preserve names and flag gaps. | Read Foundations node 7:26 and its variable definitions through Figma MCP. Created src/styles/tokens.css, imported it in main.tsx, and documented the mappings in src/styles/README.md. | Mapped slashes to hyphens and split text styles into CSS properties. Flagged missing Inter font files and unspecified additional foundations. | — |
| 2026-11-09 | Check all the components in the Figma file as well. | Inspected definitions on both pages, all 8 component families and their 13 definitions, variant/content properties, token bindings, screen reuse and a rendered component sheet. Recorded the review in src/components/README.md. | Flagged state size changes, absent interaction states, brand contrast, an unbound icon colour, missing component tokens, nested content controls and pending font loading. No design or app component changes. | — |
| 2026-11-09 | Create the Choose a service page in code and check its components. | Read frame 7:114 and Button variants through Figma MCP. Built TopBar, ServiceCard, Tag, Button and ActionBar in React; loaded Inter locally and downloaded the exact chevron asset. | Preserved Figma colours and variant geometry. Added native radio selection, keyboard focus and Continue selection feedback. The slot screen is not implemented. Build/lint and browser layout, selection and overflow checks passed. | — |
| 2026-11-09 | Create the second screen. | Read frame 7:121 and TimeSlot variants through Figma MCP. Built PickSlot and reusable TimeSlot with native day/time radio groups, and connected screen 01 Continue and screen 02 Back. | Reused existing tokens and components. Preserved service/day/time selections and updated the subtitle from the service. Slots are static Figma exercise data; screen 03 is not implemented. Build/lint and browser layout, keyboard, disabled-state and navigation checks passed. | — |

## Hint level in Challenge 1

Which hint did you need to connect Codex to Figma? (none, 1, 2 or 3)

-
