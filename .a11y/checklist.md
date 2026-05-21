# Accessibility Checklist

## Universal Checklist (All Components)

### Keyboard Accessibility

- [ ] All interactive elements are keyboard accessible
- [ ] Tab order follows visual order
- [ ] No keyboard traps
- [ ] Custom components support appropriate key interactions
- [ ] Focus is never lost during interactions

### Focus Management

- [ ] Visible focus indicator on all interactive elements
- [ ] Focus indicator has 3:1 contrast ratio
- [ ] Focus order is logical and intuitive
- [ ] Focus is managed appropriately in dynamic content

### ARIA Implementation

- [ ] Semantic HTML used where possible
- [ ] ARIA roles used only when necessary
- [ ] ARIA attributes are kept up-to-date with state changes
- [ ] No ARIA conflicts or redundancies

### Color & Contrast

- [ ] Text has minimum 4.5:1 contrast ratio (WCAG AA)
- [ ] Large text (18pt+) has minimum 3:1 contrast ratio
- [ ] UI components and graphical objects have 3:1 contrast
- [ ] Color is not the only means of conveying information

### Screen Reader Compatibility

- [ ] Meaningful alt text for images
- [ ] Decorative images have empty alt text
- [ ] Form inputs have associated labels
- [ ] Dynamic content changes are announced
- [ ] Custom components have appropriate accessible names

### Content & Structure

- [ ] Page has proper heading hierarchy (h1-h6)
- [ ] Language is declared in HTML
- [ ] Links have descriptive text
- [ ] Tables have proper headers and captions
- [ ] Lists are properly marked up

### Motion & Animation

- [ ] Animations can be paused or disabled
- [ ] No content flashes more than 3 times per second
- [ ] Motion can be reduced (prefers-reduced-motion)
- [ ] Auto-playing media can be paused

### Forms

- [ ] All inputs have visible labels
- [ ] Error messages are clear and helpful
- [ ] Error messages are programmatically associated
- [ ] Required fields are indicated
- [ ] Form submission provides feedback

### Time-Based Content

- [ ] Users can extend time limits
- [ ] Auto-updating content can be paused
- [ ] No time limits for essential activities

### Navigation

- [ ] Multiple ways to find pages (search, sitemap, nav)
- [ ] Current location is clear
- [ ] Navigation is consistent across pages
- [ ] Skip links provided for repetitive content

## Component-Specific Checklists

### Modal/Dialog

- [ ] Role="dialog" or role="alertdialog"
- [ ] aria-modal="true"
- [ ] aria-labelledby points to title
- [ ] Focus trap implemented
- [ ] Escape key closes modal
- [ ] Focus returns to trigger element on close
- [ ] Background content is inert

### Tooltip

- [ ] role="tooltip"
- [ ] aria-describedby on trigger element
- [ ] Tooltip is dismissible
- [ ] No keyboard focus in tooltip
- [ ] Appropriate delay before showing
- [ ] Persistent on hover for pointer users

### Popup/Dropdown

- [ ] aria-haspopup on trigger
- [ ] aria-expanded reflects state
- [ ] aria-controls points to popup
- [ ] Escape closes popup
- [ ] Click outside closes popup
- [ ] Focus management on open/close

### Tabs

- [ ] role="tablist" on container
- [ ] role="tab" on tab buttons
- [ ] role="tabpanel" on panels
- [ ] aria-selected on tabs
- [ ] aria-controls on tabs
- [ ] Arrow keys navigate tabs
- [ ] Tab activates panel (or Enter/Space)

### Accordion

- [ ] aria-expanded on buttons
- [ ] aria-controls on buttons
- [ ] Unique IDs for panels
- [ ] Enter/Space toggles panels
- [ ] Heading level appropriate (h2-h6)

### Alert/Notification

- [ ] role="alert" for important messages
- [ ] role="status" for informational messages
- [ ] aria-live="polite" or "assertive"
- [ ] Dismissible with keyboard
- [ ] Sufficient display time

### Menu

- [ ] role="menu" or role="list"
- [ ] aria-haspopup on trigger
- [ ] aria-expanded on trigger
- [ ] Arrow keys navigate items
- [ ] Enter/Space activates items
- [ ] Escape closes menu

### Slider/Range

- [ ] role="slider"
- [ ] aria-valuenow current value
- [ ] aria-valuemin and aria-valuemax
- [ ] aria-valuetext for formatted values
- [ ] Arrow keys adjust value
- [ ] Page Up/Down for larger steps

### Progress Bar

- [ ] role="progressbar"
- [ ] aria-valuenow current value
- [ ] aria-valuemin and aria-valuemax
- [ ] aria-valuetext for formatted values
- [ ] aria-live for dynamic updates

### Checkbox

- [ ] type="checkbox" or role="checkbox"
- [ ] aria-checked reflects state
- [ ] Associated label element
- [ ] Group related checkboxes with fieldset/legend

### Radio Group

- [ ] type="radio" or role="radio"
- [ ] aria-checked on selected radio
- [ ] Group with role="radiogroup"
- [ ] aria-labelledby on group
- [ ] Arrow keys navigate options

### Select/Dropdown

- [ ] Native select when possible
- [ ] role="listbox" for custom
- [ ] role="option" for items
- [ ] aria-selected on options
- [ ] aria-expanded on trigger
- [ ] Type-ahead support

### Table

- [ ] Proper table markup (not divs)
- [ ] th elements for headers
- [ ] scope attribute on headers
- [ ] caption or aria-label
- [ ] Complex tables use id/headers

## Testing Procedures

### Keyboard Testing

1. Unplug mouse
2. Navigate entire component with Tab, Enter, Space, Arrows, Escape
3. Verify focus is always visible
4. Verify all functionality accessible
5. Verify no keyboard traps

### Screen Reader Testing

1. Test with NVDA (Windows, free)
2. Test with JAWS (Windows)
3. Test with VoiceOver (macOS/iOS)
4. Test with Narrator (Windows)
5. Verify all content announced
6. Verify state changes announced
7. Verify navigation efficient

### Automated Testing

1. Run axe-core
2. Run Lighthouse accessibility audit
3. Run eslint-plugin-jsx-a11y
4. Fix all critical and serious issues
5. Document any known issues

### Contrast Testing

1. Use WebAIM Contrast Checker
2. Use Colour Contrast Analyser
3. Test in light theme
4. Test in dark theme
5. Test at all states (hover, focus, active, disabled)

### Documentation

1. Document all findings
2. Screenshot issues
3. Record screen reader tests (optional)
4. List RGAA criteria met
5. Create remediation plan
