# Accessibility Checklist

This checklist should be used when developing or reviewing components in the Ultraviolet design system.

## ✅ Critical Checks (Must Pass)

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible (Tab, Enter, Space, Arrow keys where appropriate)
- [ ] Focus order is logical and follows visual order
- [ ] Focus is visible and clear (minimum 3:1 contrast ratio)
- [ ] No keyboard traps (users can navigate away from all components)
- [ ] Custom components handle keyboard interactions appropriately:
  - Enter/Space activates buttons
  - Arrow keys navigate within composite widgets (menus, tabs, etc.)
  - Escape closes popups, menus, and dialogs

### Screen Reader Support
- [ ] All interactive elements have accessible names (via text content, `aria-label`, or `aria-labelledby`)
- [ ] Icons without visible text have `aria-label` or `aria-hidden="true"` if decorative
- [ ] Form inputs have associated labels (via `htmlFor`/`id` or `aria-labelledby`)
- [ ] Error messages are associated with inputs (via `aria-describedby` or `aria-errormessage`)
- [ ] Dynamic content changes are announced (using `aria-live` regions where appropriate)
- [ ] Images have meaningful `alt` text (or `alt=""` if decorative)

### ARIA Attributes
- [ ] ARIA roles are used correctly and only when necessary (prefer native HTML elements)
- [ ] Required ARIA attributes are present for custom widgets:
  - Combobox: `aria-expanded`, `aria-controls`, `aria-haspopup`
  - Menu: `role="menu"`, `aria-haspopup="menu"`
  - Tab: `role="tab"`, `aria-selected`, `aria-controls`, `id`
  - TabList: `role="tablist"`, `aria-orientation`
  - Slider: `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`
  - Progressbar: `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
  - Dialog/Modal: `aria-modal`, `aria-labelledby`, `aria-describedby`
- [ ] State attributes reflect current state (`aria-expanded`, `aria-selected`, `aria-pressed`, `aria-checked`)
- [ ] `aria-current="page"` is used for current page in navigation/breadcrumbs/pagination

### Focus Management
- [ ] Focus is moved appropriately when opening modals/dialogs
- [ ] Focus is trapped within modals/dialogs when open
- [ ] Focus returns to trigger element when closing popups/dialogs
- [ ] Focus is managed correctly in multi-step processes
- [ ] `tabIndex` is used appropriately:
  - `tabIndex="0"` to make non-interactive elements focusable
  - `tabIndex="-1"` to remove elements from tab order
  - Roving tabIndex for composite widgets (menus, toolbars, etc.)

### Semantic HTML
- [ ] Proper heading hierarchy (h1 → h2 → h3, no skipped levels)
- [ ] Lists use proper list markup (`<ul>`, `<ol>`, `<li>`)
- [ ] Tables have proper headers (`<th>`) and optionally captions
- [ ] Landmarks are used appropriately (`<nav>`, `<main>`, `<aside>`, etc.)
- [ ] Buttons use `<button>` elements (not `<div>` or `<span>`)
- [ ] Links use `<a>` elements with valid `href` attributes

## ⚠️ Important Checks

### Color & Visual
- [ ] Color contrast meets WCAG 2.1 AA standards:
  - Normal text: 4.5:1 minimum
  - Large text (18px+ or 14px+ bold): 3:1 minimum
  - UI components and graphics: 3:1 minimum
- [ ] Information is not conveyed by color alone
- [ ] Focus indicators have sufficient contrast (3:1 minimum)
- [ ] Text can be resized to 200% without loss of content or functionality

### Interaction
- [ ] Touch targets are at least 44x44 pixels
- [ ] Drag-and-drop has keyboard alternatives
- [ ] Time limits can be turned off or extended
- [ ] Motion/animation can be reduced (respects `prefers-reduced-motion`)

### Content
- [ ] Language of the page is specified (`lang` attribute)
- [ ] Abbreviations and acronyms are defined
- [ ] Link text is descriptive (avoid "click here", "read more")
- [ ] External links indicate they open in new window/tab
- [ ] Form inputs have clear instructions and error messages
- [ ] Error messages suggest how to fix the issue

## 🎯 Component-Specific Checks

### Buttons
- [ ] Have accessible names
- [ ] Disabled buttons have `aria-disabled="true"`
- [ ] Toggle buttons have `aria-pressed` attribute
- [ ] Icon-only buttons have `aria-label`

### Links
- [ ] External links have visual and screen reader indication
- [ ] Download links indicate file type/size
- [ ] Current page links have `aria-current="page"`

### Forms
- [ ] All inputs have labels
- [ ] Required fields are indicated (visually and with `aria-required`)
- [ ] Error messages are programmatically associated
- [ ] Field groups have fieldset/legend where appropriate
- [ ] Form errors are announced to screen readers

### Modals/Dialogs
- [ ] Have `role="dialog"` and `aria-modal="true"`
- [ ] Have accessible titles (`aria-labelledby`)
- [ ] Have descriptions if needed (`aria-describedby`)
- [ ] Trap focus while open
- [ ] Close on Escape key
- [ ] Return focus to trigger on close

### Menus
- [ ] Use `role="menu"` (not `role="dialog"`)
- [ ] Trigger has `aria-haspopup="menu"` and `aria-expanded`
- [ ] Menu items have `role="menuitem"`
- [ ] Arrow key navigation is implemented
- [ ] Focus is managed correctly

### Tabs
- [ ] TabList has `role="tablist"`
- [ ] Tabs have `role="tab"` and `aria-selected`
- [ ] Tab panels have `role="tabpanel"` and `aria-labelledby`
- [ ] Arrow keys navigate between tabs
- [ ] Tab activation follows expected behavior (automatic or manual)

### Tooltips
- [ ] Associated with trigger via `aria-describedby`
- [ ] Don't receive focus themselves (`tabIndex="-1"`)
- [ ] Disappear on Escape key
- [ ] Don't obscure content or trigger

### Notifications/Alerts
- [ ] Use `role="alert"` for important messages
- [ ] Use `role="status"` for informational messages
- [ ] Use `aria-live` for dynamic updates
- [ ] Don't auto-dismiss without user control (or provide pause/extend)

### Pagination
- [ ] Container has `role="navigation"` and `aria-label="Pagination"`
- [ ] Current page has `aria-current="page"`
- [ ] Page buttons have descriptive labels (`aria-label="Page X"`)
- [ ] Previous/Next buttons have descriptive labels

### Breadcrumbs
- [ ] Container has `aria-label="breadcrumb"`
- [ ] Current page has `aria-current="page"`
- [ ] All links are keyboard accessible

### Carousels
- [ ] Container has `role="region"` and `aria-label`
- [ ] Slide controls are keyboard accessible
- [ ] Slide controls have descriptive `aria-label`
- [ ] Provide pause/play control for auto-rotating carousels

### Tables
- [ ] Have `aria-label` or `aria-labelledby` if not using `<caption>`
- [ ] Column headers use `<th>` with `scope="col"`
- [ ] Sortable columns have `aria-sort`
- [ ] Row selection is keyboard accessible

### Select/Dropdown
- [ ] Combobox has proper ARIA attributes
- [ ] Listbox has `role="listbox"` and `aria-activedescendant`
- [ ] Options have `role="option"` and `aria-selected` (for multi-select)
- [ ] Keyboard navigation is fully implemented

## 🧪 Testing Methods

### Automated Testing
- [ ] Run axe-core tests (no critical violations)
- [ ] Run eslint-plugin-jsx-a11y (no errors)
- [ ] Test with browser DevTools accessibility inspector

### Manual Testing
- [ ] Navigate using only keyboard (Tab, Shift+Tab, Enter, Space, Arrow keys)
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Zoom to 200% and verify content is still accessible
- [ ] Test in high contrast mode
- [ ] Reduce motion and verify animations respect preference

### User Testing
- [ ] Test with assistive technology users when possible
- [ ] Gather feedback on accessibility barriers
- [ ] Iterate based on real-world usage

## 📚 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Checklist](https://webaim.org/standards/wcag/checklist)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project](https://www.a11yproject.com/)

## 🔧 Quick Fixes Reference

### Common Issues and Solutions

**Issue**: Icon button without accessible name
```tsx
// ❌ Bad
<Button><CloseIcon /></Button>

// ✅ Good
<Button aria-label="Close dialog"><CloseIcon /></Button>
```

**Issue**: External link without indication
```tsx
// ❌ Bad
<Link href="https://example.com" target="_blank">Example</Link>

// ✅ Good
<Link href="https://example.com" target="_blank">
  Example
  <OpenInNewIcon aria-hidden="true" />
  <span className="sr-only">opens in new window</span>
</Link>
```

**Issue**: Missing form label association
```tsx
// ❌ Bad
<label>Name</label>
<input id="name" />

// ✅ Good
<label htmlFor="name">Name</label>
<input id="name" />
```

**Issue**: Menu using wrong role
```tsx
// ❌ Bad
<Popup role="dialog">
  <div role="menu">...</div>
</Popup>

// ✅ Good
<Popup role="popup">
  <div role="menu">...</div>
</Popup>
```

**Issue**: Pagination without current page indication
```tsx
// ❌ Bad
<Button>3</Button>

// ✅ Good
<Button aria-current="page" aria-label="Page 3">3</Button>
```
