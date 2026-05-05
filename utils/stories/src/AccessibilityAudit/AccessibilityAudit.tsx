import { linkTo } from '@storybook/addon-links'
import { Button, Stack, Table, Text, ProgressBar } from '@ultraviolet/ui'
import { useState, useEffect } from 'react'

import { findComponentState } from '../ComponentState/constants'
import {
  storiesCompositionsModules,
  storiesComponentModules,
} from '../constants'

import {
  AUDIT_CATEGORIES,
  A11Y_LEVELS,
  findA11yStatus,
  getComponentAuditCategories,
} from './constants'

import type {
  A11yLevel,
  ComponentAuditStatus,
  AuditCategories,
  ComponentStoryParameters,
} from './constants'
import type { ReactNode } from 'react'

type ComponentInfo = {
  title: string
  name: string
  category: string
  state: {
    label: string
    icon: ReactNode
    description: ReactNode
  }
  a11yLevel: A11yLevel | null
  audit: ComponentAuditStatus
  auditCategories: AuditCategories
}

const getComponentAudit = (
  parameters: ComponentStoryParameters,
): ComponentAuditStatus => parameters?.audit ?? {}

const AccessibilityAudit = () => {
  const [modules, setModules] = useState<
    | PromiseSettledResult<{
        default: {
          title: string
          parameters: ComponentStoryParameters
        }
      }>[]
    | null
  >(null)

  useEffect(() => {
    Promise.allSettled([
      ...storiesComponentModules,
      ...storiesCompositionsModules,
    ])
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

  const componentsInfo: ComponentInfo[] =
    modules
      ?.filter(
        (
          m,
        ): m is PromiseFulfilledResult<{
          default: {
            title: string
            parameters: ComponentStoryParameters
          }
        }> => m.status === 'fulfilled',
      )
      .map(module => {
        const destructuredName: string[] =
          module.value.default.title.split('/') ?? []

        console.debug('destructuredName', destructuredName)

        const componentCategory = destructuredName.slice(1, -1).join('/')
        const componentName = destructuredName.at(-1) ?? 'Unknown'
        const a11yStatus = findA11yStatus(module.value.default.parameters)
        const auditCategories = getComponentAuditCategories(
          module.value.default.parameters,
        )
        const audit = getComponentAudit(module.value.default.parameters)

        return {
          title: module.value.default.title,
          name: componentName,
          category: componentCategory || 'Others',
          state: findComponentState(module.value.default.parameters),
          a11yLevel: a11yStatus?.level ?? null,
          audit,
          auditCategories,
        } satisfies ComponentInfo
      }) ?? []

  const getCategoryCompletion = (categoryId: string) => {
    const total = componentsInfo.length
    const completed = componentsInfo.filter(c => c.audit[categoryId]).length
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }

  const getComponentsForCategory = (categoryId: string) =>
    componentsInfo.filter(c => c.audit[categoryId])

  return (
    <Stack gap={5}>
      <Stack gap={2}>
        <Text as="p" variant="body">
          Comprehensive accessibility audit checklist and tracking for all
          Ultraviolet components. Use this page to track progress and understand
          accessibility requirements.
        </Text>
      </Stack>

      <Stack gap={3}>
        <Text as="h2" variant="heading">
          Accessibility Levels
        </Text>
        <Stack gap={2} direction="row">
          {Object.entries(A11Y_LEVELS).map(
            ([key, { icon, label, description }]) => (
              <Stack key={key} gap={2} justifyContent="left">
                <Stack direction="row" gap={2} alignItems="center">
                  {icon}
                  <Text as="h3" variant="headingSmall">
                    {label}
                  </Text>
                </Stack>
                {description}
              </Stack>
            ),
          )}
        </Stack>
      </Stack>

      <Stack gap={3}>
        <Text as="h2" variant="heading">
          Audit Categories Overview
        </Text>
        <Table
          columns={[
            { label: 'Category' },
            { label: 'Progress', minWidth: '50%' },
            { label: 'Components' },
          ]}
          stripped
        >
          <Table.Body>
            {AUDIT_CATEGORIES.map(category => {
              const percentage = getCategoryCompletion(category.id)
              const completedCount = getComponentsForCategory(
                category.id,
              ).length

              return (
                <Table.Row id={category.id} key={category.id}>
                  <Table.Cell>
                    <Text as="span" variant="bodyStrong">
                      {category.title}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Stack direction="row" gap={2} width="100%">
                      <ProgressBar
                        max={100}
                        sentiment={percentage === 100 ? 'success' : 'primary'}
                        style={{ flex: 1 }}
                        value={percentage}
                      />
                      <Text as="span" variant="bodySmall">
                        {percentage}%
                      </Text>
                    </Stack>
                  </Table.Cell>
                  <Table.Cell>
                    <Text as="span" variant="body">
                      {completedCount}/{componentsInfo.length}
                    </Text>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </Stack>

      {/* Detailed Audit Checklist */}
      <Stack gap={4}>
        {AUDIT_CATEGORIES.map(category => (
          <Stack gap={2} key={category.id}>
            <Stack direction="row">
              <Text as="h2" variant="heading">
                {category.title}&nbsp;
                <Text as="span" variant="bodySmall">
                  {getCategoryCompletion(category.id)}% complete
                </Text>
              </Text>
            </Stack>

            {category.description && (
              <Text as="p" variant="body">
                {category.description}
              </Text>
            )}

            <Stack gap={3}>
              {category.criteria.map(criterion => (
                <Stack gap={2} key={criterion.name}>
                  <Stack gap={1}>
                    <Text as="p" variant="headingSmall">
                      {criterion.name}
                    </Text>
                    <Text as="span" variant="bodySmall">
                      {criterion.wcagLevel}
                    </Text>
                  </Stack>
                  <Text as="p" variant="body">
                    {criterion.description}
                  </Text>
                  {criterion.aaaNote && (
                    <Text as="p" variant="bodySmall">
                      <Text as="span" variant="bodySmallStronger">
                        Note AAA:{' '}
                      </Text>
                      {criterion.aaaNote}
                    </Text>
                  )}
                  {criterion.examples && (
                    <Stack gap={1}>
                      <Text as="span" variant="bodySmallStronger">
                        Examples:
                      </Text>
                      <ul>
                        {criterion.examples.map(example => (
                          <li key={example}>
                            <Text as="span" variant="bodySmall">
                              {example}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    </Stack>
                  )}
                </Stack>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Stack gap={3}>
        <Text as="h2" variant="heading">
          All Components
        </Text>
        <Text as="p" variant="body">
          Total: {componentsInfo.length} components
        </Text>
        <Table
          columns={[
            { label: 'Name' },
            { label: 'Category' },
            { label: 'State' },
            { label: 'Accessibility' },
            { label: 'Audit A11y Progress' },
          ]}
          stripped
        >
          <Table.Body>
            {componentsInfo.map(component => (
              <Table.Row id={component.title} key={component.title}>
                <Table.Cell>
                  <Button
                    onClick={linkTo(component.title)}
                    size="small"
                    variant="ghost"
                  >
                    {component.name}
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Text as="span" variant="body">
                    {component.category}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text as="span" variant="body">
                    {component.state.label}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  {component.a11yLevel ? (
                    <Stack direction="row" gap={1}>
                      {A11Y_LEVELS[component.a11yLevel].icon}
                      <Text as="span" variant="body">
                        {A11Y_LEVELS[component.a11yLevel].label}
                      </Text>
                    </Stack>
                  ) : (
                    <Text as="span" variant="body">
                      -
                    </Text>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Stack direction="row" gap={1}>
                    {component.auditCategories.map(category => (
                      <Text as="span" key={category.id} variant="bodySmall">
                        {category.completed ? '●' : '○'}
                      </Text>
                    ))}
                  </Stack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Stack>
    </Stack>
  )
}

export default AccessibilityAudit
