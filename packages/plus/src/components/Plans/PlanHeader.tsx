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
    <FullHeightStack alignItems="center" gap={2} justifyContent="space-between">
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
          <PlanDescription>
            <Text as="div" disabled={disabled} variant="caption">
              {plan.header.description}
            </Text>
          </PlanDescription>
        ) : null}
      </Stack>
      <Stack alignItems="center" gap={3} width="100%">
        {plan.header.cta && currentPlanValue !== plan.value
          ? plan.header.cta
          : null}
        {plan.header.cta && currentPlanValue === plan.value ? (
          <CurrentPlanWrapper>
            <Text
              as="span"
              disabled={disabled}
              sentiment={plan.sentiment ?? 'primary'}
              variant="bodySmallStrong"
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
