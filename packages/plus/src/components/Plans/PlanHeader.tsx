import { Badge, Separator, Stack, Text } from '@ultraviolet/ui'
import PlansLocales from './locales/en'
import {
  plansCurrentWrapper,
  plansDescription,
  plansFullSizeSeparator,
  plansHeaderFullHeight,
  plansHeaderInput,
} from './styles.css'
import type { PlanType } from './types'

type PlanHeaderProps = {
  fieldName?: string
  setFocusedPlan: (planValue?: string) => void
  onChange?: (newPlanValue?: string) => void
  currentPlanValue?: string
  plan: PlanType<string>
  disabled: boolean
  locales?: Record<keyof typeof PlansLocales, string>
}

export const PlanHeader = ({
  fieldName,
  setFocusedPlan,
  onChange,
  currentPlanValue,
  plan,
  disabled,
  locales = PlansLocales,
}: PlanHeaderProps) => (
  <>
    {fieldName && onChange && !disabled ? (
      <input
        className={plansHeaderInput}
        data-testid={plan.value}
        id={plan.value}
        name={fieldName}
        onBlur={() => {
          setFocusedPlan(undefined)
        }}
        onChange={() => onChange(plan.value)}
        onFocus={() => {
          setFocusedPlan(plan.value)
        }}
        type="radio"
        value={plan.value}
      />
    ) : null}
    <Stack
      alignItems="center"
      className={plansHeaderFullHeight}
      gap={2}
      justifyContent="space-between"
    >
      <Stack alignItems="center" gap={3} width="100%">
        <Stack alignItems="center" gap={1}>
          <Badge
            disabled={disabled}
            sentiment={
              plan.sentiment &&
              plan.sentiment !== 'black' &&
              plan.sentiment !== 'white'
                ? plan.sentiment
                : 'primary'
            }
          >
            <label htmlFor={plan.value}>{plan.title}</label>
          </Badge>
          {plan.titleHeader}
          <Stack alignItems="center">
            <Text
              as="span"
              disabled={disabled}
              sentiment={plan.sentiment ?? 'primary'}
              variant="headingSmallStrong"
            >
              {plan.header.price}
            </Text>
            <Stack style={{ minHeight: '16px' }}>
              {plan.header.priceDescription ? (
                <Text
                  as="span"
                  disabled={disabled}
                  sentiment={plan.sentiment ?? 'primary'}
                  variant="caption"
                >
                  {plan.header.priceDescription}
                </Text>
              ) : null}
            </Stack>
          </Stack>
        </Stack>
        {plan.header.description ? (
          <div className={plansDescription}>
            <Text as="div" disabled={disabled} variant="caption">
              {plan.header.description}
            </Text>
          </div>
        ) : null}
      </Stack>
      <Stack alignItems="center" gap={3} width="100%">
        {plan.header.cta && currentPlanValue !== plan.value
          ? plan.header.cta
          : null}
        {plan.header.cta && currentPlanValue === plan.value ? (
          <div className={plansCurrentWrapper}>
            <Text
              as="span"
              disabled={disabled}
              sentiment={plan.sentiment ?? 'primary'}
              variant="bodySmallStrong"
            >
              {locales['plans.currentPlan']}
            </Text>
          </div>
        ) : null}
        {plan.header.separator ? (
          <Separator className={plansFullSizeSeparator} />
        ) : null}
      </Stack>
    </Stack>
  </>
)
