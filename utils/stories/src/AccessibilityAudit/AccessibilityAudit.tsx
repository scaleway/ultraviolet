import { linkTo } from '@storybook/addon-links'
import { CheckCircleIcon } from '@ultraviolet/icons'
import { CloseCircleOutlineIcon } from '@ultraviolet/icons/CloseCircleOutlineIcon'
import { Button, Stack, Table, Text, Tooltip, ProgressBar, Link } from '@ultraviolet/ui'
import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { findComponentState } from '../ComponentState/constants'
import { storiesCompositionsModules, storiesComponentModules } from '../constants'
import {
  A11Y_LEVELS,
  findA11yLevel,
  getComponentA11yStatus,
  getComponentAuditCategories,
  WCAG_PRINCIPLES,
} from './constants'
import type {
  A11yLevel,
  ComponentA11yStatus,
  AuditCategories,
  ComponentStoryParameters,
  WcagPrinciple,
} from './constants'

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
  a11yStatus: ComponentA11yStatus
  auditCategories: AuditCategories
}

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
    Promise.allSettled([...storiesComponentModules, ...storiesCompositionsModules])
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
          module,
        ): module is PromiseFulfilledResult<{
          default: {
            title: string
            parameters: ComponentStoryParameters
          }
        }> => module.status === 'fulfilled',
      )
      .map(module => {
        const parameters = module.value.default.parameters
        const destructuredName: string[] = module.value.default.title.split('/') ?? []

        const componentCategory = destructuredName.slice(1, -1).join('/')
        const componentName = destructuredName.at(-1) ?? 'Unknown'

        return {
          title: module.value.default.title,
          name: componentName,
          category: componentCategory || 'Others',
          state: findComponentState(parameters),
          a11yLevel: findA11yLevel(parameters),
          a11yStatus: getComponentA11yStatus(parameters),
          auditCategories: getComponentAuditCategories(parameters),
        } satisfies ComponentInfo
      }) ?? []

  const getPrincipleCompletion = (principle: WcagPrinciple) => {
    const total = componentsInfo.length
    const completed = componentsInfo.filter(c => c.a11yStatus[principle]).length
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }

  const getComponentsForCategory = (categoryId: WcagPrinciple) => componentsInfo.filter(c => c.a11yStatus[categoryId])

  return (
    <Stack gap={5}>
      <Stack gap={2}>
        <Text as="p" variant="body">
          Accessibility audit tracking for all Ultraviolet components.
        </Text>
      </Stack>

      <Stack gap={3}>
        <Text as="h2" variant="heading">
          Accessibility Levels
        </Text>
        <Stack gap={2} direction="row">
          {Object.entries(A11Y_LEVELS).map(([key, { icon, label, description }]) => (
            <Stack key={key} gap={1} justifyContent="left">
              <Stack direction="row" gap={1} alignItems="center">
                {icon}
                <Text as="h3" variant="headingSmall" style={{ margin: 0 }}>
                  {label}
                </Text>
              </Stack>
              {description}
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Stack gap={2}>
        <Text as="h2" variant="heading">
          WCAG Principles
        </Text>
        <Text as="p" variant="body">
          Based on the <Link href="https://www.w3.org/WAI/WCAG22/Understanding/">WCAG 2.2 documentation</Link>.
        </Text>
        <Text as="p" variant="body">
          A component validates a principle if it has been audited and we found no violation of all rules within this
          principle.
        </Text>
        <Table
          columns={[
            { label: 'Principle' },
            { label: 'Progress', minWidth: '50%', width: '300px' },
            { label: 'Components' },
          ]}
          stripped
        >
          <Table.Body>
            {WCAG_PRINCIPLES.map(principle => {
              const percentage = getPrincipleCompletion(principle)
              const completedCount = getComponentsForCategory(principle).length

              return (
                <Table.Row id={principle} key={principle}>
                  <Table.Cell>
                    <Text as="span" variant="body">
                      {principle[0].toUpperCase() + principle.slice(1)}
                    </Text>
                  </Table.Cell>
                  <Table.Cell align="left">
                    <ProgressBar
                      max={100}
                      sentiment={percentage === 100 ? 'success' : 'primary'}
                      value={percentage}
                      direction="row"
                      label={`${percentage}%`}
                    />
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
            { label: 'Accessibility Level' },
            { label: 'Accessibility Progress' },
          ]}
          stripped
        >
          <Table.Body>
            {componentsInfo.map(component => (
              <Table.Row id={component.title} key={component.title}>
                <Table.Cell>
                  <Button onClick={linkTo(component.title)} size="small" variant="ghost">
                    {component.name}
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Text as="span" variant="body">
                    {component.category}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  {component.a11yLevel ? (
                    <Stack direction="row" gap={0.5} alignItems="center">
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
                        <Tooltip text={category.id}>
                          {category.completed ? (
                            <CheckCircleIcon size="medium" sentiment="success" />
                          ) : (
                            <CloseCircleOutlineIcon size="medium" sentiment="danger" />
                          )}
                        </Tooltip>
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
