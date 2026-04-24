import { linkTo } from '@storybook/addon-links'
import { Button, Stack, Table, Text } from '@ultraviolet/ui'
import { useState, useEffect } from 'react'

import {
  A11Y_LEVELS,
  getComponentAuditCategories,
  findA11yStatus,
} from '../AccessibilityAudit/constants'
import {
  storiesCompositionsModules,
  storiesComponentModules,
} from '../constants'

import { COMPONENT_STATES, findComponentState } from './constants'

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
    Promise.allSettled([
      ...storiesComponentModules,
      ...storiesCompositionsModules,
    ])
      .then(localModules => {
        console.debug(localModules)
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
      <Text as="p" variant="body">
        Here you will find all our components and their states. They are updated
        automatically based on configuration of the component story.
      </Text>

      <Stack gap={3}>
        <Text as="h2" variant="headingLarge">
          Definition of states:
        </Text>
        {Object.entries(COMPONENT_STATES).map(
          ([key, { icon, label, description }]) => (
            <Stack gap={1} key={key} justifyContent="center">
              <Text as="h3" variant="headingSmall">
                {label} {icon}
              </Text>
              {description}
            </Stack>
          ),
        )}
      </Stack>
      <Stack gap={3}>
        <Text as="h2" variant="headingLarge">
          Accessibility levels:
        </Text>
        <Stack gap={1}>
          <Text as="p" variant="body">
            Accessibility levels are an additional status that can be added to
            components to track their accessibility compliance. A component can
            have both a state (Stable, Experimental, Deprecated) and an
            accessibility level.
          </Text>
        </Stack>
        {Object.entries(A11Y_LEVELS).map(
          ([key, { icon, label, description }]) => (
            <Stack gap={1} key={key} justifyContent="center">
              <Text as="h3" variant="headingSmall">
                {label} {icon}
              </Text>
              {description}
            </Stack>
          ),
        )}
      </Stack>

      <Stack gap={3}>
        <Text as="h2" variant="headingLarge">
          Accessibility Audit Checklist
        </Text>
        <Text as="p" variant="body">
          For components not yet compliant, use this checklist to verify
          accessibility criteria. Each category contains specific WCAG criteria
          to validate during the audit process.
        </Text>
      </Stack>
      <Stack gap={3}>
        <Text as="h2" variant="heading">
          Components list
        </Text>

        <Stack gap={1}>
          <Text as="p" variant="body">
            <Text as="span" variant="bodyStronger">
              Number of components
            </Text>
            : {modules?.length}
          </Text>
          <Table
            columns={[
              { label: 'Name' },
              { label: 'Category' },
              { label: 'State' },
              { label: 'Accessibility' },
              { label: 'Audit a11y' },
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
                  const componentName = destructuredName.at(-1)

                  /** Get the lifecycle state (deprecated/experimental/stable) */
                  const componentState = findComponentState(
                    module.value.default.parameters,
                  )
                  const a11yStatus = findA11yStatus(
                    module.value.default.parameters,
                  )
                  const auditCategories = getComponentAuditCategories(
                    module.value.default.parameters,
                  )

                  return (
                    <Table.Row
                      id={module.value.default.title}
                      key={module.value.default.title}
                    >
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
                      <Table.Cell>
                        <Text as="span" variant="body">
                          {componentCategory || 'Others'}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text as="span" variant="body">
                          {componentState.icon} {componentState.label}
                        </Text>
                      </Table.Cell>
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
                      <Table.Cell>
                        <Stack direction="row" gap={1}>
                          {auditCategories.map(category => (
                            <Text
                              as="span"
                              key={category.id}
                              variant="bodySmall"
                            >
                              {category.completed ? '●' : '○'}
                            </Text>
                          ))}
                        </Stack>
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
