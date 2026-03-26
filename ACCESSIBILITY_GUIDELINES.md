# Accessibility Guidelines for Ultraviolet

This document provides guidelines and patterns for building accessible components in the Ultraviolet design system.

## 🎯 Core Principles

1. **Perceivable**: Information and user interface components must be presentable to users in ways they can perceive
2. **Operable**: User interface components and navigation must be operable by all users
3. **Understandable**: Information and the operation of user interface must be understandable
4. **Robust**: Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies

## 📝 Development Guidelines

### 1. Use Semantic HTML

Always prefer native HTML elements over custom components when possible:

```tsx
// ✅ Good - uses native button
<button onClick={handleClick}>Click me</button>

// ❌ Bad - requires additional ARIA
<div onClick={handleClick} role="button" tabIndex={0}>Click me</div>
```

### 2. Provide Accessible Names

All interactive elements must have accessible names:

```tsx
// ✅ Good - has accessible name
<Button aria-label="Close dialog">
  <CloseIcon />
</Button>

// ❌ Bad - no accessible name
<Button>
  <CloseIcon />
</Button>
```

### 3. Manage Focus Properly

Ensure focus is visible and managed correctly:

```tsx
// ✅ Good - focus returns to trigger
const handleOpen = () => {
  setIsOpen(true)
  triggerRef.current?.focus()
}

const handleClose = () => {
  setIsOpen(false)
  triggerRef.current?.focus()
}
```

### 4. Support Keyboard Navigation

All interactive components must be keyboard accessible:

```tsx
// ✅ Good - handles keyboard events
<div
  role="menu"
  onKeyDown={(e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      focusNextItem()
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      focusPreviousItem()
    }
    if (e.key === 'Escape') {
      closeMenu()
    }
  }}
>
  {items}
</div>
```

### 5. Use ARIA Correctly

ARIA should enhance, not replace, native semantics:

```tsx
// ✅ Good - proper ARIA usage
<div
  role="combobox"
  aria-expanded={isOpen}
  aria-haspopup="listbox"
  aria-controls={dropdownId}
>
  <input aria-autocomplete="list" />
  <ul role="listbox" id={dropdownId}>
    {options}
  </ul>
</div>
```

## 🧩 Component Patterns

### Buttons

```tsx
type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  'aria-label'?: string
  'aria-pressed'?: boolean // for toggle buttons
  'aria-expanded'?: boolean // for buttons that control visibility
}

export const Button = ({
  children,
  onClick,
  disabled,
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
  'aria-expanded': ariaExpanded,
}: ButtonProps) => (
  <button
    type="button"
    disabled={disabled}
    aria-label={ariaLabel}
    aria-pressed={ariaPressed}
    aria-expanded={ariaExpanded}
    onClick={onClick}
  >
    {children}
  </button>
)
```

### Links

```tsx
type LinkProps = {
  href: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  children: ReactNode
  'aria-label'?: string
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false'
}

export const Link = ({
  href,
  target,
  children,
  'aria-label': ariaLabel,
  'aria-current': ariaCurrent,
}: LinkProps) => {
  const isExternal = target === '_blank'
  
  return (
    <a
      href={href}
      target={target}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children}
      {isExternal && (
        <>
          <OpenInNewIcon aria-hidden="true" />
          <span className="sr-only">opens in new window</span>
        </>
      )}
    </a>
  )
}
```

### Form Inputs

```tsx
type InputProps = {
  label: string
  error?: string
  required?: boolean
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  'aria-errormessage'?: string
}

export const Input = ({
  label,
  error,
  required,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  'aria-errormessage': ariaErrorMessage,
}: InputProps) => {
  const inputId = useId()
  const errorId = useId()
  
  return (
    <div>
      <label htmlFor={inputId} aria-required={required}>
        {label}
        {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : ariaDescribedBy}
        aria-errormessage={error ? errorId : undefined}
      />
      {error && (
        <span id={errorId} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
```

### Modals/Dialogs

```tsx
type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const titleId = useId()
  const descriptionId = useId()
  
  useEffect(() => {
    if (isOpen) {
      // Trap focus within modal
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements?.[0]
      const lastElement = focusableElements?.[focusableElements.length - 1]
      
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
        if (e.key === 'Escape') {
          onClose()
        }
      }
      
      document.addEventListener('keydown', handleTabKey)
      firstElement?.focus()
      
      return () => document.removeEventListener('keydown', handleTabKey)
    }
  }, [isOpen, onClose])
  
  if (!isOpen) return null
  
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <h2 id={titleId}>{title}</h2>
      <div id={descriptionId}>
        {children}
      </div>
      <button onClick={onClose} aria-label="Close dialog">
        <CloseIcon />
      </button>
    </div>
  )
}
```

### Menus

```tsx
type MenuProps = {
  isOpen: boolean
  onClose: () => void
  triggerRef: RefObject<HTMLElement>
  children: ReactNode
}

export const Menu = ({ isOpen, onClose, triggerRef, children }: MenuProps) => {
  const menuId = useId()
  const menuRef = useRef<HTMLUListElement>(null)
  
  useEffect(() => {
    if (isOpen) {
      menuRef.current?.querySelector('[role="menuitem"]')?.focus()
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
          triggerRef.current?.focus()
        }
      }
      
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, triggerRef])
  
  if (!isOpen) return null
  
  return (
    <ul
      role="menu"
      id={menuId}
      ref={menuRef}
      aria-labelledby={triggerRef.current?.id}
    >
      {children}
    </ul>
  )
}

type MenuItemProps = {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
}

export const MenuItem = ({ children, onClick, disabled }: MenuItemProps) => (
  <li
    role="menuitem"
    tabIndex={disabled ? -1 : 0}
    aria-disabled={disabled}
    onClick={disabled ? undefined : onClick}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick()
      }
    }}
  >
    {children}
  </li>
)
```

## 🧪 Testing

### Automated Testing with axe-core

```tsx
import { axe } from 'axe-core'
import { expect } from 'vitest'
import { render } from '@testing-library/react'

it('should have no accessibility violations', async () => {
  const { container } = render(<MyComponent />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

// Test specific rules
it('should have proper labels', async () => {
  const { container } = render(<MyForm />)
  const results = await axe(container, {
    runOnly: {
      type: 'rule',
      values: ['label', 'button-name', 'link-name']
    }
  })
  expect(results).toHaveNoViolations()
})
```

### Manual Testing Checklist

1. **Keyboard Navigation**
   - Tab through all interactive elements
   - Use Enter/Space to activate buttons
   - Use Arrow keys for navigation within composite widgets
   - Use Escape to close popups

2. **Screen Reader Testing**
   - Test with NVDA (Windows), JAWS (Windows), or VoiceOver (Mac)
   - Verify all interactive elements are announced
   - Verify state changes are announced
   - Verify error messages are announced

3. **Visual Testing**
   - Zoom to 200% - verify content is still accessible
   - Test in high contrast mode
   - Verify focus indicators are visible
   - Verify color is not the only means of conveying information

## 📚 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Checklist](https://webaim.org/standards/wcag/checklist)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## 🔧 Tools

- **axe-core**: Automated accessibility testing
- **eslint-plugin-jsx-a11y**: Static analysis for accessibility
- **Lighthouse**: Accessibility auditing
- **WAVE**: Web accessibility evaluation tool
- **Color Contrast Analyzers**: Verify color contrast ratios

## 📖 Related Documents

- [Accessibility Checklist](./ACCESSIBILITY_CHECKLIST.md) - Detailed checklist for component reviews
- [Component Accessibility Fixes](./ACCESSIBILITY_FIXES.md) - Specific fixes made to components
