# RGAA 4.1.2 Criteria Mapping

## Overview

This document maps RGAA 4.1.2 criteria to component accessibility requirements. RGAA (General Repository for Accessibility Improvement) is the French standard for web accessibility.

## Image Criteria

### 3.1 - Images as Information

- **Criterion**: Every informative image has an alternative text
- **Components**: Image, Avatar, Icon, Illustration
- **Implementation**: `alt` attribute or `aria-label`

### 3.2 - Decorative Images

- **Criterion**: Every decorative image has an empty alt attribute
- **Components**: All components with decorative imagery
- **Implementation**: `alt=""` or `role="presentation"`

## Color Criteria

### 3.3 - Color as Information

- **Criterion**: Do not use color alone to convey information
- **Components**: Alert, Badge, Status, Toggle, Checkbox, Radio
- **Implementation**: Add icons, patterns, or text labels

### 10.2 - Contrast (Text)

- **Criterion**: Text has contrast ratio ≥ 4.5:1
- **Components**: All text-containing components
- **Implementation**: Test all text in all themes

### 10.3 - Contrast (UI Elements)

- **Criterion**: UI elements have contrast ratio ≥ 3:1
- **Components**: Buttons, Inputs, Links, Interactive elements
- **Implementation**: Test borders, icons, focus indicators

## Multimedia Criteria

### 4.1 - Video with Audio

- **Criterion**: Synchronized captions for prerecorded video
- **Components**: Video, Media components
- **Implementation**: Provide caption tracks

### 4.5 - Audio Only

- **Criterion**: Transcript for audio-only content
- **Components**: Audio player
- **Implementation**: Provide text transcript

## Link Criteria

### 9.1 - Link Purpose

- **Criterion**: Link text describes destination
- **Components**: Link, Button, Card (with links)
- **Implementation**: Descriptive link text or `aria-label`

## Script Criteria

### 7.1 - Keyboard Accessibility

- **Criterion**: All functionality available via keyboard
- **Components**: ALL interactive components
- **Implementation**: Full keyboard support

### 7.2 - Keyboard Focus

- **Criterion**: Keyboard focus is visible
- **Components**: ALL interactive components
- **Implementation**: Visible focus indicators

### 7.3 - No Keyboard Traps

- **Criterion**: User can navigate away with keyboard
- **Components**: Modal, Dialog, Popup, Tooltip
- **Implementation**: Proper focus management

### 7.4 - Timing Adjustments

- **Criterion**: Users can extend time limits
- **Components**: Toast, Notification, Auto-dismissing alerts
- **Implementation**: Pause/dismiss controls

## Structural Criteria

### 9.1 - Headings

- **Criterion**: Proper heading hierarchy
- **Components**: Accordion, Card, Section components
- **Implementation**: Appropriate h1-h6 levels

### 9.2 - Landmarks

- **Criterion**: Use HTML5 landmarks
- **Components**: Layout components
- **Implementation**: nav, main, aside, header, footer

### 9.3 - Lists

- **Criterion**: Lists properly marked up
- **Components**: List, Menu, TabList
- **Implementation**: ul, ol, li or appropriate ARIA

## Form Criteria

### 11.1 - Form Labels

- **Criterion**: All form inputs have labels
- **Components**: Input, Select, Textarea, Checkbox, Radio
- **Implementation**: label element or aria-label

### 11.2 - Form Field Purpose

- **Criterion**: Purpose of fields is clear
- **Components**: All form components
- **Implementation**: Clear labels and instructions

### 11.3 - Required Fields

- **Criterion**: Required fields are identified
- **Components**: Form inputs
- **Implementation**: aria-required and visual indicator

### 11.5 - Error Messages

- **Criterion**: Error messages are descriptive
- **Components**: Form validation
- **Implementation**: Clear error text

### 11.6 - Error Location

- **Criterion**: Users can easily find errors
- **Components**: Forms
- **Implementation**: Summary and inline errors

### 11.7 - Input Purpose

- **Criterion**: Input purpose is programmatically determinable
- **Components**: Input fields
- **Implementation**: autocomplete attribute

### 11.8 - Label Association

- **Criterion**: Labels are associated with fields
- **Components**: All form inputs
- **Implementation**: for/id attributes or wrapping

### 11.9 - Field Grouping

- **Criterion**: Related fields are grouped
- **Components**: RadioGroup, CheckboxGroup
- **Implementation**: fieldset and legend

### 11.10 - Selection Controls

- **Criterion**: Selection state is clear
- **Components**: Checkbox, Radio, Toggle, Select
- **Implementation**: Visual and programmatic state

## Table Criteria

### 5.1 - Table Headers

- **Criterion**: Data tables have headers
- **Components**: Table
- **Implementation**: th elements

### 5.2 - Complex Tables

- **Criterion**: Complex tables have proper structure
- **Components**: Complex Table
- **Implementation**: id/headers or scope attributes

### 5.3 - Table Caption

- **Criterion**: Tables have captions or titles
- **Components**: Table
- **Implementation**: caption or aria-label

## Navigation Criteria

### 12.1 - Multiple Navigation

- **Criterion**: Multiple ways to navigate
- **Components**: Navigation, Breadcrumbs, Search
- **Implementation**: Consistent navigation patterns

### 12.2 - Current Location

- **Criterion**: Current location is clear
- **Components**: Breadcrumbs, Navigation, Tabs
- **Implementation**: aria-current

### 12.3 - Consistent Navigation

- **Criterion**: Navigation is consistent
- **Components**: All navigation components
- **Implementation**: Consistent patterns

### 12.4 - Skip Links

- **Criterion**: Skip links provided
- **Components**: Page layout
- **Implementation**: Skip to main content link

### 12.5 - Site Map

- **Criterion**: Site map provided (large sites)
- **Implementation**: Sitemap page

### 12.6 - Search Function

- **Criterion**: Search function provided
- **Components**: SearchInput
- **Implementation**: Site search

### 12.8 - Breadcrumbs

- **Criterion**: Breadcrumbs or alternative
- **Components**: Breadcrumbs
- **Implementation**: Breadcrumb navigation

### 12.9 - Internal Links

- **Criterion**: Internal links have visual indicator
- **Components**: Link, Button
- **Implementation**: Underline or clear style

### 12.10 - External Links

- **Criterion**: External links are identifiable
- **Components**: Link
- **Implementation**: Icon or text indicator

### 12.11 - Focus Order

- **Criterion**: Focus order is logical
- **Components**: ALL components
- **Implementation**: DOM order matches visual order

## Consultation Criteria

### 13.1 - Page Title

- **Criterion**: Each page has a title
- **Implementation**: document.title

### 13.2 - Language

- **Criterion**: Page language is declared
- **Implementation**: html lang attribute

### 13.3 - Human Language

- **Criterion**: Content is understandable
- **Implementation**: Clear, simple language

### 13.4 - Link Purpose (Context)

- **Criterion**: Link purpose is clear from context
- **Components**: Link, Button
- **Implementation**: Descriptive text

### 13.5 - Section Headings

- **Criterion**: Content has section headings
- **Implementation**: Proper heading structure

### 13.6 - Reading Order

- **Criterion**: Reading order is logical
- **Implementation**: DOM order

### 13.7 - Change of Context

- **Criterion**: Users are warned of context changes
- **Components**: Modal, Dialog, Popup
- **Implementation**: Announcements or warnings

### 13.8 - Page Refresh

- **Criterion**: Users are warned of page refresh
- **Implementation**: Warning before auto-refresh

### 13.9 - Page Location

- **Criterion**: Users know where they are
- **Implementation**: Breadcrumbs, current page indicator

### 13.10 - Contact Information

- **Criterion**: Contact information provided
- **Implementation**: Contact page or info

### 13.11 - Accessibility Statement

- **Criterion**: Accessibility statement provided
- **Implementation**: Accessibility page

### 13.12 - Emergency Procedures

- **Criterion**: Emergency contact info
- **Implementation**: Emergency contact

### 13.13 - Uninterrupted Service

- **Criterion**: Service availability info
- **Implementation**: Status page

### 13.14 - Complaint Procedure

- **Criterion**: Complaint mechanism provided
- **Implementation**: Contact form

### 13.15 - Conformance Level

- **Criterion**: RGAA conformance level stated
- **Implementation**: Accessibility statement

## Component-Specific RGAA Mapping

### Modal/Dialog

- 7.1, 7.2, 7.3 - Keyboard accessibility
- 10.2, 10.3 - Contrast
- 13.7 - Change of context
- 9.1 - Headings (if present)

### Tooltip

- 7.1, 7.2 - Keyboard accessibility
- 10.2 - Contrast
- 13.4 - Link purpose (if contains links)

### Button

- 7.1, 7.2 - Keyboard accessibility
- 10.2, 10.3 - Contrast
- 9.1 - Purpose clear

### Alert/Notification

- 7.1, 7.2 - Keyboard accessibility
- 7.4 - Timing (if auto-dismissing)
- 10.2, 10.3 - Contrast
- 3.3 - Not color only

### Form Components

- 11.1 - Labels
- 11.3 - Required indication
- 11.5, 11.6 - Errors
- 11.8 - Label association
- 7.1, 7.2 - Keyboard

### Navigation Components

- 12.2 - Current location
- 12.8 - Breadcrumbs
- 12.11 - Focus order
- 7.1, 7.2 - Keyboard

## Testing Checklist by Criterion

For each component, test:

1. **Images (3.x)**: Alt text, decorative images
2. **Color (3.3, 10.x)**: Contrast, not color-only
3. **Multimedia (4.x)**: Captions, transcripts
4. **Links (9.1)**: Descriptive text
5. **Scripts (7.x)**: Keyboard, focus, timing
6. **Structure (9.x)**: Headings, landmarks, lists
7. **Forms (11.x)**: Labels, errors, grouping
8. **Tables (5.x)**: Headers, captions
9. **Navigation (12.x)**: Multiple ways, current location, focus
10. **Consultation (13.x)**: Title, language, context

## Priority Matrix

| Criterion                | Priority | Components Affected  |
| ------------------------ | -------- | -------------------- |
| 7.1 - Keyboard           | Critical | ALL                  |
| 7.2 - Focus Visible      | Critical | ALL                  |
| 7.3 - No Traps           | Critical | Modal, Dialog, Popup |
| 10.2 - Text Contrast     | Critical | ALL                  |
| 10.3 - UI Contrast       | Critical | ALL                  |
| 11.1 - Form Labels       | Critical | All forms            |
| 11.8 - Label Association | Critical | All forms            |
| 12.11 - Focus Order      | High     | ALL                  |
| 3.3 - Color Only         | High     | Alert, Badge, Status |
| 7.4 - Timing             | High     | Toast, Notification  |
| 11.5 - Errors            | High     | Forms                |
| 9.1 - Headings           | Medium   | Accordion, Card      |
| 12.2 - Current Location  | Medium   | Nav, Breadcrumbs     |
| 5.1 - Table Headers      | Medium   | Table                |

## Resources

- [RGAA 4.1.2 Official Documentation](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/)
- [RGAA English Translation](https://www.accessibility-developers-guide.com/)
- [WCAG 2.1 Crosswalk](https://www.w3.org/WAI/standards-guidelines/wcag/mapping-rgaa/)
