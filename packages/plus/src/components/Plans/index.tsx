import styled from '@emotion/styled'
import { CheckCircleIcon, CloseIcon } from '@ultraviolet/icons'
import { Badge, Stack, Text } from '@ultraviolet/ui'
import { useState } from 'react'
import { FeatureHint } from './FeatureHint'
import PlansLocales from './locales/en'
import { PlanHeader } from './PlanHeader'
import type { Feature, PlanType } from './types'

const PlanTable = styled.table`
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: ${({ theme }) => theme.space[2]} 0;

  /* Needed to compensate border-spacing behavior */
  margin: 0 -${({ theme }) => theme.space[2]};
  width: calc(100% + ${({ theme }) => theme.space[4]});

  /* Needed to have full height div in header cell */
  height: 1px;

  thead tr {
    height: 100%;
  }

  /* All cells */
  td {
    outline: none;
    padding: ${({ theme }) => theme.space['1']};
    text-align: center;

    &[data-selectable='true'] {
      cursor: pointer;
    }
  }

  &[data-hide-labels="true"] {
    td {
      text-align: start;
      padding-left:  ${({ theme }) => theme.space['3']};
    }
  }

  /* First column */
  td:first-child {
    text-align: left;
  }

  /* Header Cell */
  thead td {
    height: 100%;
    vertical-align: top;
    position: relative;
    padding-top: ${({ theme }) => theme.space['4']};
    padding-bottom: ${({ theme }) => theme.space['3']};
  }

  /* First Header Cell */
  thead td:first-child {
    vertical-align: bottom;
  }

  /* Not First Header Cell */
  thead td:not(:first-child) {
    border: 1px solid ${({ theme }) => theme.colors.neutral.border};
    border-radius: ${({ theme }) =>
      `${theme.radii.large} ${theme.radii.large} 0 0`};
    border-width: 1px 1px 0 1px;

    &[data-hover='true'],
    &[data-active='true'] {
      border-color: ${({ theme }) => theme.colors.primary.border};
    }

    &[data-focus='true'] {
      /* using native color to reproduce focus color */
      border-color: blue;
      border-width: 2px 2px 0 2px;
    }
  }

  tbody td {
    &[data-space-after='true'] {
      padding-bottom: ${({ theme }) => theme.space['6']};
    }
  }

  tbody td:not(:first-child) {
    border: 1px solid ${({ theme }) => theme.colors.neutral.border};
    border-width: 0px 1px;

    &[data-hover='true'],
    &[data-active='true'] {
      border-color: ${({ theme }) => theme.colors.primary.border};
    }

    &[data-focus='true'] {
      /* using native color to reproduce focus color */
      border-color: blue;
      border-width: 0px 2px;
    }
  }

  /* Last row cells */
  tbody tr:last-child td {
    padding-bottom: ${({ theme }) => theme.space['4']};
  }

  tbody tr:last-child td:not(:first-child) {
    border: 1px solid ${({ theme }) => theme.colors.neutral.border};
    border-radius: ${({ theme }) =>
      `0 0 ${theme.radii.large} ${theme.radii.large}`};
    border-width: 0 1px 1px 1px;

    &[data-hover='true'],
    &[data-active='true'] {
      border-color: ${({ theme }) => theme.colors.primary.border};
    }

    &[data-focus='true'] {
      /* using native color to reproduce focus color */
      border-color: blue;
      border-width: 0px 2px 2px 2px;
    }
  }

  tr {
    &[data-hide="true"] {
    display: none;
  }
  }
`

const OutOfStockBadge = styled(Badge)`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
`

const PlanCell = styled.td`
    background-color: transparent;

  &[data-disabled="true"] {
      background-color: ${({ theme }) =>
        theme.colors.neutral.backgroundDisabled};
    }

  &[data-hide="true"] {
    display: none;
  }
`

const UppercaseText = styled(Text)`
  text-transform: uppercase;
`
type PlansProps<T extends string> = {
  fieldName?: string
  onChange?: (newPlanValue: string | undefined) => void
  value?: string
  features: Feature<T>[]
  plans: PlanType<T>[]
  hideFeatureText?: boolean
  hideLabels?: boolean
  locales?: Record<keyof typeof PlansLocales, string>
}

export const Plans = <T extends string>({
  fieldName,
  onChange,
  value,
  features,
  plans,
  hideFeatureText = false,
  hideLabels = false,
  locales = PlansLocales,
}: PlansProps<T>) => {
  const hasCardBehavior = !!(fieldName && onChange)
  const [focusedPlan, setFocusedPlan] = useState<string>()
  const [hoveredPlan, setHoveredPlan] = useState<string>()

  return (
    <PlanTable data-hide-labels={hideLabels}>
      <thead>
        <tr>
          <PlanCell data-hide={hideLabels}>
            {!hideFeatureText ? (
              <Text as="span" variant="headingSmallStrong">
                {locales['plans.features']}
              </Text>
            ) : null}
          </PlanCell>
          {plans.map(plan => {
            const computedDisabled = !!(plan.outOfStock || plan.disabled)
            const selectable = hasCardBehavior && !computedDisabled

            return (
              <PlanCell
                key={plan.value}
                data-disabled={computedDisabled}
                data-active={value === plan.value}
                data-focus={focusedPlan === plan.value}
                data-hover={hoveredPlan === plan.value}
                data-selectable={selectable}
                onClick={selectable ? () => onChange(plan.value) : undefined}
                onMouseOver={
                  selectable ? () => setHoveredPlan(plan.value) : undefined
                }
                onMouseOut={
                  selectable ? () => setHoveredPlan(undefined) : undefined
                }
              >
                {plan.outOfStock ? (
                  <OutOfStockBadge size="small">
                    {locales['plans.outOfStock']}
                  </OutOfStockBadge>
                ) : null}
                {plan.header.quotas ? (
                  <OutOfStockBadge size="small">
                    {plan.header.quotas}
                  </OutOfStockBadge>
                ) : null}
                <PlanHeader
                  fieldName={fieldName}
                  setFocusedPlan={setFocusedPlan}
                  onChange={onChange}
                  currentPlanValue={value}
                  plan={plan}
                  disabled={computedDisabled}
                />
              </PlanCell>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {features.map(feature => {
          if ('group' in feature) {
            return (
              <tr key={feature.group} data-hide={hideLabels}>
                <PlanCell>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <UppercaseText
                      as="p"
                      variant="bodySmallStronger"
                      sentiment="neutral"
                    >
                      {feature.group}
                    </UppercaseText>
                    {feature.hint ? <FeatureHint hint={feature.hint} /> : null}
                  </Stack>
                </PlanCell>
                {plans.map(plan => (
                  <PlanCell
                    key={plan.value}
                    data-disabled={plan.outOfStock || plan.disabled}
                    data-active={value === plan.value}
                    data-focus={focusedPlan === plan.value}
                    data-hover={hoveredPlan === plan.value}
                  />
                ))}
              </tr>
            )
          }

          const featureKey = feature.key ?? ''

          return (
            <tr key={feature.key}>
              <PlanCell data-hide={hideLabels}>
                <Stack>
                  <Stack alignItems="center" direction="row" gap={1}>
                    <Text as="p" variant="bodyStrong">
                      {feature.text}
                    </Text>
                    <FeatureHint hint={feature.hint} />
                  </Stack>
                  {feature.description ? (
                    <Text
                      as="div"
                      variant="caption"
                      prominence="weak"
                      sentiment="neutral"
                      placement="start"
                    >
                      {feature.description}
                    </Text>
                  ) : null}
                </Stack>
              </PlanCell>
              {plans.map(plan => {
                const computedDisabled = plan.outOfStock || plan.disabled
                const selectable = hasCardBehavior && !computedDisabled

                return (
                  <PlanCell
                    key={plan.value}
                    data-disabled={computedDisabled}
                    data-selectable={selectable}
                    onClick={
                      selectable ? () => onChange(plan.value) : undefined
                    }
                    data-active={value === plan.value}
                    data-focus={focusedPlan === plan.value}
                    data-hover={hoveredPlan === plan.value}
                    onMouseOver={
                      selectable
                        ? () => {
                            setHoveredPlan(plan.value)
                          }
                        : undefined
                    }
                    onMouseOut={
                      selectable
                        ? () => {
                            setHoveredPlan(undefined)
                          }
                        : undefined
                    }
                    data-testid={`${plan.value}-${feature.key}`}
                  >
                    {plan.data[featureKey] === false ? (
                      <CloseIcon
                        disabled={computedDisabled}
                        size="large"
                        sentiment="neutral"
                        prominence="weak"
                      />
                    ) : null}
                    {plan.data[featureKey] === true ? (
                      <CheckCircleIcon
                        disabled={computedDisabled}
                        size="medium"
                        sentiment="success"
                      />
                    ) : null}
                    {typeof plan.data[featureKey] !== 'boolean' ? (
                      <Text
                        disabled={computedDisabled}
                        as="span"
                        variant="body"
                        sentiment="neutral"
                      >
                        {plan.data[featureKey]}
                      </Text>
                    ) : null}
                  </PlanCell>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </PlanTable>
  )
}
