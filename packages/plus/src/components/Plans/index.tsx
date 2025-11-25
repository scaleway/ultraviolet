import { CheckCircleIcon, CloseIcon } from '@ultraviolet/icons'
import { Badge, Stack, Text } from '@ultraviolet/ui'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import { FeatureHint } from './FeatureHint'
import PlansLocales from './locales/en'
import { PlanHeader } from './PlanHeader'
import {
  plansCell,
  plansOutOfStockBadge,
  plansRowHidden,
  plans as plansStyle,
  plansUppercaseText,
} from './styles.css'
import type { Feature, PlanType } from './types'

type PlansProps<T extends string> = {
  fieldName?: string
  onChange?: (newPlanValue: string | undefined) => void
  value?: string
  features: Feature<T>[]
  plans: PlanType<T>[]
  hideFeatureText?: boolean
  hideLabels?: boolean
  locales?: Record<keyof typeof PlansLocales, string>
  style?: CSSProperties
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
  style,
}: PlansProps<T>) => {
  const hasCardBehavior = !!(fieldName && onChange)
  const [focusedPlan, setFocusedPlan] = useState<string>()
  const [hoveredPlan, setHoveredPlan] = useState<string>()

  return (
    <table className={plansStyle} style={style}>
      <thead>
        <tr>
          <td className={plansCell({ hide: hideLabels })}>
            {!hideFeatureText ? (
              <Text as="span" variant="headingSmallStrong">
                {locales['plans.features']}
              </Text>
            ) : null}
          </td>
          {plans.map(plan => {
            const computedDisabled = !!(plan.outOfStock || plan.disabled)
            const selectable = hasCardBehavior && !computedDisabled

            return (
              <td
                className={plansCell({
                  activeColor:
                    value === plan.value || hoveredPlan === plan.value,
                  disabled: computedDisabled,
                  focus: focusedPlan === plan.value,
                  hideLabels,
                  selectable,
                })}
                key={plan.value}
                onBlur={
                  selectable ? () => setHoveredPlan(undefined) : undefined
                }
                onClick={selectable ? () => onChange(plan.value) : undefined}
                onFocus={
                  selectable ? () => setHoveredPlan(plan.value) : undefined
                }
                onKeyDown={event => {
                  if ([' ', 'Enter'].includes(event.key) && selectable) {
                    onChange(plan.value)
                  }
                }}
                onMouseOut={
                  selectable ? () => setHoveredPlan(undefined) : undefined
                }
                onMouseOver={
                  selectable ? () => setHoveredPlan(plan.value) : undefined
                }
              >
                {plan.outOfStock ? (
                  <Badge className={plansOutOfStockBadge} size="small">
                    {locales['plans.outOfStock']}
                  </Badge>
                ) : null}
                {plan.header.quotas ? (
                  <Badge className={plansOutOfStockBadge} size="small">
                    {plan.header.quotas}
                  </Badge>
                ) : null}
                <PlanHeader
                  currentPlanValue={value}
                  disabled={computedDisabled}
                  fieldName={fieldName}
                  onChange={onChange}
                  plan={plan}
                  setFocusedPlan={setFocusedPlan}
                />
              </td>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {features.map(feature => {
          if ('group' in feature) {
            return (
              <tr
                className={hideLabels ? plansRowHidden : ''}
                key={feature.group}
              >
                <td className={plansCell({})}>
                  <Stack alignItems="center" direction="row" gap={1}>
                    <Text
                      as="p"
                      className={plansUppercaseText}
                      sentiment="neutral"
                      variant="bodySmallStronger"
                    >
                      {feature.group}
                    </Text>
                    {feature.hint ? <FeatureHint hint={feature.hint} /> : null}
                  </Stack>
                </td>
                {plans.map(plan => (
                  <td
                    className={plansCell({
                      activeColor:
                        value === plan.value || hoveredPlan === plan.value,
                      disabled: plan.outOfStock || plan.disabled,
                      focus: focusedPlan === plan.value,
                      hide: hideLabels,
                    })}
                    key={plan.value}
                  />
                ))}
              </tr>
            )
          }

          const featureKey = feature.key ?? ''

          return (
            <tr key={feature.key}>
              <td className={plansCell({ hide: hideLabels })}>
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
                      placement="start"
                      prominence="weak"
                      sentiment="neutral"
                      variant="caption"
                    >
                      {feature.description}
                    </Text>
                  ) : null}
                </Stack>
              </td>
              {plans.map(plan => {
                const computedDisabled = plan.outOfStock || plan.disabled
                const selectable = hasCardBehavior && !computedDisabled

                return (
                  <td
                    className={plansCell({
                      activeColor:
                        value === plan.value || hoveredPlan === plan.value,
                      disabled: computedDisabled,
                      focus: focusedPlan === plan.value,
                      hideLabels,
                      selectable,
                    })}
                    data-testid={`${plan.value}-${feature.key}`}
                    key={plan.value}
                    onBlur={() => {}}
                    onClick={
                      selectable ? () => onChange(plan.value) : undefined
                    }
                    onFocus={() => {}}
                    onKeyDown={() => {}}
                    onMouseOut={
                      selectable
                        ? () => {
                            setHoveredPlan(undefined)
                          }
                        : undefined
                    }
                    onMouseOver={
                      selectable
                        ? () => {
                            setHoveredPlan(plan.value)
                          }
                        : undefined
                    }
                  >
                    {plan.data[featureKey] === false ? (
                      <CloseIcon
                        disabled={computedDisabled}
                        prominence="weak"
                        sentiment="neutral"
                        size="large"
                      />
                    ) : null}
                    {plan.data[featureKey] === true ? (
                      <CheckCircleIcon
                        disabled={computedDisabled}
                        sentiment="success"
                        size="medium"
                      />
                    ) : null}
                    {typeof plan.data[featureKey] !== 'boolean' ? (
                      <Text
                        as="span"
                        disabled={computedDisabled}
                        sentiment="neutral"
                        variant="body"
                      >
                        {plan.data[featureKey]}
                      </Text>
                    ) : null}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
