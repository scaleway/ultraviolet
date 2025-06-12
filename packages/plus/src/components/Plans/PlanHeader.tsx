import styled from '@emotion/styled'
import { Badge, Separator, Stack, Text } from '@ultraviolet/ui'
import PlansLocales from './locales/en'
import type { PlanType } from './types'

const StyledInput = styled.input`
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
`

const FullHeightStack = styled(Stack)`
  height: 100%;
`

const PlanDescription = styled.div`
  padding: ${({ theme }) => theme.space['1']};
  width: 100%;
`

const FullSizeSeparator = styled(Separator)`
  width: 100%;
`

const CurrentPlanWrapper = styled.div`
  /* Same as button */
  height: ${({ theme }) => theme.sizing['600']};
  display: flex;
  align-items: center;
`

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
      <StyledInput
        id={plan.value}
        type="radio"
        name={fieldName}
        value={plan.value}
        onChange={() => onChange(plan.value)}
        onFocus={() => {
          setFocusedPlan(plan.value)
        }}
        onBlur={() => {
          setFocusedPlan(undefined)
        }}
        data-testid={plan.value}
      />
    ) : null}
    <FullHeightStack gap={2} alignItems="center" justifyContent="space-between">
      <Stack gap={3} alignItems="center" width="100%">
        <Stack gap={1} alignItems="center">
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
              variant="headingSmallStrong"
              sentiment={plan.sentiment ?? 'primary'}
              disabled={disabled}
            >
              {plan.header.price}
            </Text>
            <Stack style={{ minHeight: '16px' }}>
              {plan.header.priceDescription ? (
                <Text
                  disabled={disabled}
                  as="span"
                  variant="caption"
                  sentiment={plan.sentiment ?? 'primary'}
                >
                  {plan.header.priceDescription}
                </Text>
              ) : null}
            </Stack>
          </Stack>
        </Stack>
        {plan.header.description ? (
          <PlanDescription>
            <Text as="div" variant="caption" disabled={disabled}>
              {plan.header.description}
            </Text>
          </PlanDescription>
        ) : null}
      </Stack>
      <Stack width="100%" gap={3} alignItems="center">
        {plan.header.cta && currentPlanValue !== plan.value
          ? plan.header.cta
          : null}
        {plan.header.cta && currentPlanValue === plan.value ? (
          <CurrentPlanWrapper>
            <Text
              as="span"
              variant="bodySmallStrong"
              sentiment={plan.sentiment ?? 'primary'}
              disabled={disabled}
            >
              {locales['plans.currentPlan']}
            </Text>
          </CurrentPlanWrapper>
        ) : null}
        {plan.header.separator ? <FullSizeSeparator /> : null}
      </Stack>
    </FullHeightStack>
  </>
)
