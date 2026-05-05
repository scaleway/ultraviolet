import {
  SettingsOutlineIcon,
  ShieldCheckOutlineIcon,
  ProgressCheckIcon,
} from '@ultraviolet/icons'
import { Text } from '@ultraviolet/ui'

import type { ReactNode } from 'react'

export type A11yLevel = 'partial' | 'compliant' | 'certified'

export type A11yStatus = {
  level: A11yLevel
  label: string
  icon: ReactNode
  description: ReactNode
}

export type AuditCriterion = {
  name: string
  wcagLevel: string
  description: string
  aaaNote?: string
  examples?: string[]
}

export type AuditCategory = {
  id: string
  title: string
  description?: string
  criteria: AuditCriterion[]
}

export const AUDIT_CATEGORIES: AuditCategory[] = [
  {
    id: 'keyboard-focus',
    title: '1. Keyboard & Focus Management',
    description:
      'Ensure all interactive elements are accessible via keyboard and focus is managed correctly.',
    criteria: [
      {
        name: 'Keyboard Accessible',
        wcagLevel: '2.1.1 - A',
        description:
          'All interactive elements can be triggered using Tab, Enter, or Space.',
        examples: [
          'Buttons respond to Enter/Space keys',
          'Links respond to Enter key',
          'Custom interactive elements have keyboard handlers',
        ],
      },
      {
        name: 'No Keyboard Trap',
        wcagLevel: '2.1.2 - A',
        description:
          'Focus never gets stuck inside a component (e.g., Modals, Datepickers).',
        examples: [
          'Modal: Can close with Escape and focus returns to trigger',
          'Datepicker: Can navigate with arrow keys and close',
          'Dropdown: Can navigate options and close with Escape',
        ],
      },
      {
        name: 'Focus Order',
        wcagLevel: '2.4.3 - A',
        description:
          'Tab order follows the visual and logical flow of the component.',
        examples: [
          'Tab order goes left-to-right, top-to-bottom',
          'Focus order matches reading order',
          'Interactive elements in logical sequence',
        ],
      },
      {
        name: 'Focus Visible',
        wcagLevel: '2.4.7 - AA',
        description:
          'Highly visible focus indicator (outline) on all interactive elements.',
        aaaNote:
          'Focus indicator has a contrast ratio of at least 4.5:1 against the background (2.4.11 - AAA).',
        examples: [
          'Clear outline on focused buttons',
          'Visible focus ring on input fields',
          'Focus indicator visible in all themes (light/dark)',
        ],
      },
      {
        name: 'Focus Restoration',
        wcagLevel: 'Best Practice',
        description:
          'Focus returns to the trigger element after closing overlays/menus.',
        examples: [
          'Modal closes → focus returns to trigger button',
          'Dropdown closes → focus returns to dropdown button',
          'Tooltip dismisses → focus returns to trigger',
        ],
      },
    ],
  },
  {
    id: 'contrast-visuals',
    title: '2. Contrast & Visuals',
    description:
      'Ensure sufficient color contrast and that information is not conveyed by color alone.',
    criteria: [
      {
        name: 'Text Contrast',
        wcagLevel: '1.4.3 - AA',
        description:
          'Minimum 4.5:1 for normal text; 3:1 for large text (18pt or 14pt bold).',
        aaaNote:
          'Minimum 7:1 for normal text; 4.5:1 for large text (1.4.6 - AAA).',
        examples: [
          'Body text has 4.5:1 contrast ratio',
          'Heading text meets contrast requirements',
          'Placeholder text is sufficiently contrasted',
        ],
      },
      {
        name: 'Non-Text Contrast',
        wcagLevel: '1.4.11 - AA',
        description:
          'Minimum 3:1 for UI components (borders, icons) and focus states.',
        examples: [
          'Input borders have 3:1 contrast',
          'Icons have sufficient contrast against background',
          'Focus indicators have 3:1 contrast',
        ],
      },
      {
        name: 'Use of Color',
        wcagLevel: '1.4.1 - A',
        description:
          'Color is not the only way to convey info (e.g., error states use icons/text + color).',
        examples: [
          'Error fields have icon + red color + error message',
          'Success states use checkmark + color + text',
          'Required fields indicated by asterisk, not just color',
        ],
      },
      {
        name: 'Text Spacing',
        wcagLevel: '1.4.12 - AA',
        description:
          'Component remains functional when line height/letter spacing is increased.',
        examples: [
          `Text doesn't overlap when line-height is 1.5x`,
          `Content doesn't truncate when letter-spacing is increased`,
          `Layout adapts to custom spacing settings`,
        ],
      },
    ],
  },
  {
    id: 'semantics-screen-reader',
    title: '3. Semantics & Screen Reader (VoiceOver)',
    description:
      'Use proper semantic HTML and ARIA attributes to ensure screen reader compatibility.',
    criteria: [
      {
        name: 'Name, Role, Value',
        wcagLevel: '4.1.2 - A',
        description:
          'Every component has a valid ARIA role and a programmatic name (e.g., aria-label).',
        examples: [
          'Custom buttons have role="button" and accessible name',
          'Icons have aria-label or aria-hidden="true"',
          'Interactive regions have appropriate roles',
        ],
      },
      {
        name: 'Info & Relationships',
        wcagLevel: '1.3.1 - A',
        description:
          'Proper HTML tags used (e.g., <ul> for lists, <button> for actions).',
        examples: [
          'Lists use <ul>/<ol> and <li> elements',
          'Buttons use <button> not <div>',
          'Headings use proper hierarchy (<h1> to <h6>)',
        ],
      },
      {
        name: 'Status Messages',
        wcagLevel: '4.1.3 - AA',
        description:
          'Dynamic updates (success, loading, errors) use aria-live or role="status".',
        examples: [
          'Form submissions use aria-live for status updates',
          'Loading states announce to screen readers',
          'Error messages are announced automatically',
        ],
      },
      {
        name: 'State Transparency',
        wcagLevel: 'Best Practice',
        description:
          'Attributes like aria-expanded, aria-selected, or aria-checked update correctly on interaction.',
        examples: [
          'Accordion: aria-expanded updates on toggle',
          'Tabs: aria-selected updates on tab change',
          'Checkboxes: aria-checked reflects current state',
        ],
      },
    ],
  },
  {
    id: 'pointer-touch',
    title: '4. Pointer & Touch (Matériel)',
    description: 'Ensure components work well with touch and pointer devices.',
    criteria: [
      {
        name: 'Target Size',
        wcagLevel: '2.5.8 - AA',
        description: 'Minimum target area of 24x24 CSS pixels (WCAG 2.2).',
        aaaNote: 'Minimum target area of 44x44 CSS pixels (2.5.5 - AAA).',
        examples: [
          'Buttons are at least 24x24 pixels',
          'Icon buttons have sufficient clickable area',
          'Links have adequate padding for touch',
        ],
      },
      {
        name: 'Pointer Cancellation',
        wcagLevel: '2.5.2 - A',
        description:
          'Actions are triggered on the "Up" event (click), not the "Down" event, allowing users to abort.',
        examples: [
          'Click activates on mouseup, not mousedown',
          'Touch actions complete on touchend',
          'Users can move pointer away to cancel action',
        ],
      },
      {
        name: 'Label in Name',
        wcagLevel: '2.5.3 - A',
        description:
          'For buttons with text, the accessible name must contain the visible text.',
        examples: [
          'Button "Submit" has accessible name containing "Submit"',
          'Icon + text buttons include text in accessible name',
          'aria-label matches or contains visible text',
        ],
      },
    ],
  },
  {
    id: 'specific-patterns',
    title: '5. Specific Patterns',
    description: 'Specific accessibility requirements for common UI patterns.',
    criteria: [
      {
        name: 'Forms',
        wcagLevel: '3.3.2 - A',
        description:
          'Every input has a visible <label> or an aria-labelledby association.',
        examples: [
          'Inputs have associated <label> elements',
          'Labels are visible (not just placeholders)',
          'aria-labelledby used for complex form structures',
        ],
      },
      {
        name: 'Error Identification',
        wcagLevel: '3.3.1 - A',
        description:
          'Errors are clear and programmatically linked via aria-describedby.',
        examples: [
          'Error messages linked with aria-describedby',
          'Invalid fields have aria-invalid="true"',
          'Error summary provided for form-level errors',
        ],
      },
      {
        name: 'Tables',
        wcagLevel: '1.3.1 - A',
        description:
          'Structural headers (<th>) are correctly associated with data cells (<td>).',
        examples: [
          'Table headers use <th> elements',
          'scope attribute on headers (row/col)',
          'Complex tables use aria-describedby for caption',
        ],
      },
      {
        name: 'Content on Hover/Focus',
        wcagLevel: '1.4.13 - AA',
        description:
          'Tooltips or menus triggered by hover can be dismissed without moving the pointer and remain visible while the pointer is over the content.',
        examples: [
          'Tooltips dismissible with Escape key',
          'Hover content stays visible when pointer moves over it',
          'Dropdown menus remain open on hover',
        ],
      },
    ],
  },
]

export const A11Y_LEVELS: Record<
  A11yLevel,
  {
    level: A11yLevel
    label: string
    icon: ReactNode
    description: ReactNode
  }
> = {
  partial: {
    level: 'partial',
    icon: <SettingsOutlineIcon size="medium" sentiment="danger" />,
    label: 'Partial',
    description: (
      <Text as="p" variant="body">
        A11y Partial means the component has some accessibility improvements but
        is not fully compliant. Work is in progress to meet accessibility
        standards.
      </Text>
    ),
  },
  compliant: {
    level: 'compliant',
    icon: <ProgressCheckIcon size="medium" sentiment="success" />,
    label: 'Compliant',
    description: (
      <Text as="p" variant="body">
        A11y Compliant means the component meets basic accessibility standards
        (WCAG 2.1 Level AA). The component has been audited and validated for
        accessibility.
      </Text>
    ),
  },
  certified: {
    level: 'certified',
    icon: <ShieldCheckOutlineIcon size="medium" sentiment="success" />,
    label: 'Certified',
    description: (
      <Text as="p" variant="body">
        A11y Certified means the component has been thoroughly tested and
        certified for accessibility compliance (WCAG 2.1 Level AAA). This is the
        highest level of accessibility validation.
      </Text>
    ),
  },
}

export type ComponentAuditStatus = Record<string, boolean>

export type AuditCategories = {
  id: string
  completed: boolean
}[]

export type ComponentStoryParameters = {
  deprecated?: boolean
  experimental?: boolean
  a11y?: boolean | A11yLevel
  audit?: ComponentAuditStatus
}

export const getComponentAuditCategories = (
  parameters: ComponentStoryParameters,
): AuditCategories => {
  if (!parameters?.audit) {
    return AUDIT_CATEGORIES.map(cat => ({ id: cat.id, completed: false }))
  }

  return AUDIT_CATEGORIES.map(cat => ({
    id: cat.id,
    completed: parameters.audit?.[cat.id] ?? false,
  }))
}

export const findA11yStatus = (parameters: { a11y?: boolean | A11yLevel }) => {
  if (!parameters?.a11y) {
    return null
  }

  const a11yLevel =
    typeof parameters.a11y === 'string' ? parameters.a11y : 'compliant'

  return A11Y_LEVELS[a11yLevel]
}
