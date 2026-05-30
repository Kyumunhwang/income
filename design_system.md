---
name: Precision Ledger
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  data-mono:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style
The design system is anchored in **Corporate Minimalism**, prioritized for a personal financial management context. The brand personality is professional, dependable, and meticulously organized, aiming to reduce the cognitive load associated with financial tracking.

The visual language emphasizes clarity and data density without feeling cluttered. It evokes an emotional response of security and control through generous whitespace, a structured grid, and a sober, high-contrast color palette. Every element serves a functional purpose, leaning into a "data-first" philosophy where information hierarchy is the primary driver of the aesthetic.

## Colors
The palette is designed to communicate financial health at a glance.
- **Primary (Navy):** Used for core navigation, primary headings, and heavy UI elements to establish authority.
- **Secondary (Soft Blue):** Used for interactive elements, focus states, and accenting data visualizations.
- **Success & Error:** Strictly reserved for financial indicators. Success Green represents income, positive trends, and completed transactions. Error Red represents expenses, budget overruns, and deletions.
- **Neutral Scale:** A sophisticated range of cool grays is used for borders (Slate-200) and background surfaces (Slate-50) to keep the interface feeling airy and modern.

## Typography
Typography is the backbone of this design system. We utilize **Hanken Grotesk** for headlines to provide a sharp, contemporary professional feel. **Inter** is used for all functional body text and data points due to its exceptional legibility and neutral tone.

Financial figures should use the `data-mono` style, which leverages Inter’s tabularized features to ensure that numbers align perfectly in tables and lists, making balance comparisons effortless. Large headings scale down on mobile to maintain readability without excessive wrapping.

## Layout & Spacing
The design system employs a **Fixed Grid** model for desktop to ensure financial dashboards remain legible and structured, transitioning to a fluid single-column layout for mobile devices.

- **Grid:** A 12-column system with 24px gutters.
- **Rhythm:** All spacing (padding, margins, heights) follows an 8px base unit. 
- **Structure:** Content is grouped into logical modules (Cards). Large gaps (32px+) are used between major sections to define the information architecture, while tight spacing (8px-12px) is used within cards to associate related data points.

## Elevation & Depth
Depth is handled through **Tonal Layering** supplemented by **Ambient Shadows**. 

The background uses a subtle off-white/gray (Slate-50). Interactive "Surface" elements like cards and modals sit on top of this layer with a pure white background. To distinguish these surfaces, we use low-opacity, highly diffused shadows:
- **Low Elevation (Cards):** `0px 2px 4px rgba(15, 23, 42, 0.04)`
- **High Elevation (Modals/Popovers):** `0px 12px 24px rgba(15, 23, 42, 0.08)`

This creates a sense of "physical" stacks without the visual noise of heavy borders, maintaining the minimalist aesthetic.

## Shapes
This design system uses a **Rounded** shape language to soften the analytical nature of financial data. 
- **Small elements (Buttons, Inputs):** 8px (0.5rem) corner radius.
- **Medium elements (Cards, Containers):** 16px (1rem) corner radius.
- **Large elements (Modals):** 24px (1.5rem) corner radius.

Consistent rounding helps the UI feel approachable and modern, moving away from the harsh, sharp-edged aesthetic of traditional accounting software.

## Components

### Buttons
Primary buttons use the Navy Primary color with white text. Secondary buttons use a subtle gray outline or a Soft Blue tint background. All buttons have an 8px radius and height increments of 8px (e.g., 40px, 48px).

### Data Tables & Lists
Transactions are presented in clean rows with 1px Slate-200 dividers. Hover states should trigger a light gray background change. Positive values (Income) are highlighted in Success Green, and negative values (Expenses) in Error Red.

### Summary Cards
The "Wallet" or "Balance" cards use the Secondary Soft Blue as a background or a heavy Navy border to draw immediate attention. They utilize the `headline-lg` type for the main currency figure.

### Inputs & Selects
Form fields use a white background with a 1px border. On focus, the border transitions to Soft Blue with a subtle outer glow (2px). Labels are always placed above the input using the `body-sm` bold weight.

### Progress Bars
Used for budget tracking. The track is a light gray (Slate-100), and the fill uses Soft Blue. If a budget is exceeded, the fill color automatically switches to Error Red.
