import { linkTo } from '@storybook/addon-links'
import {
  SettingsOutlineIcon,
  ShieldCheckOutlineIcon,
  ProgressCheckIcon,
} from '@ultraviolet/icons'
import { Button, Stack, Table, Text } from '@ultraviolet/ui'
import { useState, useEffect } from 'react'

import * as components from '../../../../packages/ui/src/components'

import type { ReactNode } from 'react'

/**
 * Accessibility compliance levels for components
 * @typedef {'partial' | 'compliant' | 'certified'} A11yLevel
 */
type A11yLevel = 'partial' | 'compliant' | 'certified'

/**
 * Component lifecycle state information
 * @typedef ComponentStatus
 * @property {string} label - Display name for the state
 * @property {string} icon - Icon identifier or emoji representing the state
 * @property {React.ReactNode} description - Detailed explanation of the state
 */
type ComponentStatus = {
  label: string
  icon: string
  description: React.ReactNode
}

/**
 * Accessibility compliance status information
 * @typedef A11yStatus
 * @property {A11yLevel} level - The compliance level identifier
 * @property {string} label - Display name for the accessibility level
 * @property {ReactNode} icon - Visual indicator (icon) for the level
 * @property {ReactNode} description - Detailed explanation of what this level means
 */
type A11yStatus = {
  level: A11yLevel
  label: string
  icon: ReactNode
  description: ReactNode
}

/**
 * Mapping of accessibility levels to their status configurations
 * Defines three tiers of WCAG compliance:
 * - partial: Component has some accessibility improvements but not fully compliant
 * - compliant: Meets WCAG 2.1 Level AA standards (basic compliance)
 * - certified: Meets WCAG 2.1 Level AAA standards (highest compliance)
 */
const A11Y_LEVELS: Record<A11yLevel, A11yStatus> = {
  partial: {
    level: 'partial',
    icon: <SettingsOutlineIcon size="xlarge" sentiment="danger" />,
    label: 'A11y Partial',
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
    icon: <ProgressCheckIcon size="xlarge" sentiment="success" />,
    label: 'A11y Compliant',
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
    icon: <ShieldCheckOutlineIcon size="xlarge" sentiment="success" />,
    label: 'A11y Certified',
    description: (
      <Text as="p" variant="body">
        A11y Certified means the component has been thoroughly tested and
        certified for accessibility compliance (WCAG 2.1 Level AAA). This is the
        highest level of accessibility validation.
      </Text>
    ),
  },
}

/**
 * Mapping of component lifecycle states to their configurations
 * Defines three states in the component lifecycle:
 * - deprecated: Component is obsolete and will be removed (migration needed)
 * - experimental: Component is in testing phase, API may change (not production-ready)
 * - stable: Component is production-ready with stable API (breaking changes = major version)
 */
const COMPONENT_STATES: Record<string, ComponentStatus> = {
  deprecated: {
    icon: '⛔',
    label: 'Deprecated',
    description: (
      <Text as="p" variant="body">
        Deprecated state means the component is not recommended for use and will
        be removed in the future. When seeing a component you use being
        deprecated you should start migrating to another component as soon as
        possible. To know what to use instead you can check the story of the
        deprecated component.
      </Text>
    ),
  },
  experimental: {
    icon: '🧪',
    label: 'Experimental',
    description: (
      <>
        <Text as="p" variant="body">
          Experimental state means the component is being tested and props might
          change in the future. The component itself might even disappear if
          we&apos;t find a real purpose for it. This state is also used for new
          version of a component (ex: Button v2) that we want to test before
          replacing the old one. In any case{' '}
          <Text as="span" variant="bodyStronger">
            this state means the component is not ready for production
          </Text>
          .
        </Text>
        <Text as="p" variant="body">
          An experimental component won&apos;t generate major version when
          having a breaking change.
        </Text>
      </>
    ),
  },
  stable: {
    icon: '✅',
    label: 'Stable',
    description: (
      <Text as="p" variant="body">
        Stable state means the component is ready for production. If a breaking
        change occurs it will generate a major version.
      </Text>
    ),
  },
}

/**
 * Determines the lifecycle state of a component based on its story parameters
 * @param parameters - The component story parameters
 * @param parameters.deprecated - Whether the component is marked as deprecated
 * @param parameters.experimental - Whether the component is marked as experimental
 * @returns The component state configuration (deprecated, experimental, or stable)
 *
 * @example
 * // For a deprecated component
 * findComponentState({ deprecated: true }) // Returns deprecated state
 *
 * @example
 * // For a stable component (default)
 * findComponentState({}) // Returns stable state
 */
const findComponentState = (parameters: {
  deprecated?: boolean
  experimental?: boolean
}) => {
  if (parameters?.deprecated) {
    return COMPONENT_STATES['deprecated']
  }

  if (parameters?.experimental) {
    return COMPONENT_STATES['experimental']
  }

  return COMPONENT_STATES['stable']
}

/**
 * Retrieves the accessibility compliance status for a component
 * @param parameters - The component story parameters containing accessibility info
 * @param parameters.a11y - Accessibility level (boolean or A11yLevel string)
 * @returns The accessibility status configuration or null if not specified
 *
 * @remarks
 * - If `a11y` is `true`, defaults to 'compliant' level
 * - If `a11y` is a string, uses that specific level ('partial', 'compliant', or 'certified')
 * - If `a11y` is falsy or undefined, returns null (no accessibility status)
 *
 * @example
 * // For a compliant component
 * findA11yStatus({ a11y: true }) // Returns compliant status
 *
 * @example
 * // For a certified component
 * findA11yStatus({ a11y: 'certified' }) // Returns certified status
 *
 * @example
 * // For a component without accessibility status
 * findA11yStatus({}) // Returns null
 */
const findA11yStatus = (parameters: { a11y?: boolean | A11yLevel }) => {
  if (!parameters?.a11y) {
    return null
  }

  const a11yLevel =
    typeof parameters.a11y === 'string' ? parameters.a11y : 'compliant'

  return A11Y_LEVELS[a11yLevel]
}

const componentsNames = Object.keys(components)

/**
 * ComponentState - A Storybook documentation component that displays component lifecycle states and accessibility compliance levels
 *
 * @description
 * This component automatically scans all components from the `@ultraviolet/ui` library
 * and displays their current state (Stable/Experimental/Deprecated) and accessibility
 * compliance level (Partial/Compliant/Certified) in a comprehensive table.
 *
 * @features
 * - Automatically detects component states from story parameters
 * - Displays accessibility compliance levels based on WCAG guidelines
 * - Provides clickable links to each component's Storybook documentation
 * - Shows total component count
 * - Categorizes components by their domain (UI, Compositions, etc.)
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/quickref/} for WCAG accessibility guidelines
 *
 * @example
 * // In a Storybook story
 * export default {
 *   title: 'Documentation/Component States',
 *   component: ComponentState,
 * }
 */
const ComponentState = () => {
  /**
   * State to hold dynamically loaded component story modules
   * Contains settled promises with component metadata (title, parameters, etc.)
   */
  const [modules, setModules] = useState<
    | PromiseSettledResult<{
        default: {
          title: string
          parameters: { deprecated: boolean; a11y: boolean }
        }
      }>[]
    | null
  >(null)

  /**
   * Effect to dynamically import all component story files
   * Loads index.stories.tsx for each component in the components directory
   * Uses Promise.allSettled to handle potential import failures gracefully
   */
  useEffect(() => {
    /**
     * Import all component story files in parallel
     * Path pattern: ../../../../packages/ui/src/components/{ComponentName}/__stories__/index.stories.tsx
     */
    Promise.allSettled(
      componentsNames.map(
        async name =>
          import(
            `../../../../packages/ui/src/components/${name}/__stories__/index.stories.tsx`
          ),
      ),
    )
      .then(localModules => {
        setModules(localModules)
      })
      .catch((error: unknown) => {
        const { error: consoleError } = console

        if (error instanceof Error) {
          consoleError('Error loading component stories:', error)
        }
      })
  }, [])

  return (
    <Stack gap={4}>
      {/* Introduction paragraph explaining the purpose of this documentation page */}
      <Text as="p" variant="body">
        Here you will find all our components and their states. They are updated
        automatically based on configuration of the component story.
      </Text>

      {/* Section: Component Lifecycle States */}
      <Stack gap={3}>
        <Text as="h2" variant="headingLarge">
          Definition of states
        </Text>
        {/* Render each component state (Deprecated, Experimental, Stable) with its icon and description */}
        {Object.entries(COMPONENT_STATES).map(
          ([key, { icon, label, description }]) => (
            <Stack gap={1} key={key}>
              <Text as="h3" variant="headingSmall">
                {icon} {label}
              </Text>
              {description}
            </Stack>
          ),
        )}
      </Stack>
      {/* Section: Accessibility Compliance Levels */}
      <Stack gap={3}>
        <Text as="h2" variant="headingLarge">
          Accessibility levels
        </Text>
        <Stack gap={1}>
          {/* Explanation of how accessibility levels work alongside component states */}
          <Text as="p" variant="body">
            Accessibility levels are an additional status that can be added to
            components to track their accessibility compliance. A component can
            have both a state (Stable, Experimental, Deprecated) and an
            accessibility level.
          </Text>
        </Stack>
        {/* Render each accessibility level (Partial, Compliant, Certified) with its icon and description */}
        {Object.entries(A11Y_LEVELS).map(
          ([key, { icon, label, description }]) => (
            <Stack gap={1} key={key}>
              <Text as="h3" variant="headingSmall">
                {icon} {label}
              </Text>
              {description}
            </Stack>
          ),
        )}
      </Stack>
      {/* Section: Complete Component List with States and Accessibility Levels */}
      <Stack gap={3}>
        <Text as="h2" variant="heading">
          Components list
        </Text>

        <Stack gap={1}>
          {/* Display total count of components in the library */}
          <Text as="p" variant="body">
            <Text as="span" variant="bodyStronger">
              Number of components
            </Text>
            : {componentsNames.length}
          </Text>
          {/* Table displaying all components with their metadata */}
          <Table
            columns={[
              { label: 'Name' },
              { label: 'Category' },
              { label: 'State' },
              { label: 'Accessibility' },
            ]}
            loading={!modules}
            stripped
          >
            <Table.Body>
              {/* Map through loaded modules and render each component's information */}
              {modules?.map(module => {
                if (module.status === 'fulfilled') {
                  /**
                   * Parse component title to extract category and name
                   * Title format: 'UI/Category/ComponentName' or 'UI/Category/SubCategory/ComponentName'
                   */
                  const destructuredName: string[] =
                    module.value.default.title.split('/') ?? []

                  // Title format: 'UI/Category/ComponentName' or 'UI/Category/SubCategory/ComponentName'
                  // We want the last part as component name and the rest as category
                  const componentCategory = destructuredName
                    .slice(1, -1)
                    .join('/')
                  const componentName = destructuredName.at(1)

                  /** Get the lifecycle state (deprecated/experimental/stable) */
                  const componentState = findComponentState(
                    module.value.default.parameters,
                  )
                  /** Get the accessibility compliance level (partial/compliant/certified) */
                  const a11yStatus = findA11yStatus(
                    module.value.default.parameters,
                  )

                  return (
                    <Table.Row
                      id={module.value.default.title}
                      key={module.value.default.title}
                    >
                      {/* Component name with link to its Storybook documentation */}
                      <Table.Cell>
                        <Text as="span" variant="bodyStrong">
                          <Button
                            onClick={linkTo(module.value.default.title)}
                            size="small"
                            variant="ghost"
                          >
                            {componentName}
                          </Button>
                        </Text>
                      </Table.Cell>
                      {/* Component category (e.g., "Forms", "Data Display", etc.) */}
                      <Table.Cell>
                        <Text as="span" variant="body">
                          {componentCategory || 'Others'}
                        </Text>
                      </Table.Cell>
                      {/* Component lifecycle state with icon */}
                      <Table.Cell>
                        <Text as="span" variant="body">
                          {componentState.icon} {componentState.label}
                        </Text>
                      </Table.Cell>
                      {/* Accessibility compliance level with icon, or '-' if not specified */}
                      <Table.Cell>
                        <Text as="span" variant="body">
                          {a11yStatus ? (
                            <>
                              {a11yStatus.icon}
                              <Text as="span" variant="body">
                                {a11yStatus.label}
                              </Text>
                            </>
                          ) : (
                            '-'
                          )}
                        </Text>
                      </Table.Cell>
                    </Table.Row>
                  )
                }

                return null
              })}
            </Table.Body>
          </Table>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ComponentState
