import styled from '@emotion/styled'
import { Button, RadioGroup, SelectInputV2, Stack, Text } from '@ultraviolet/ui'
import { useContext, useMemo } from 'react'
import type { MouseEventHandler, ReactNode } from 'react'
import { OrderSummaryContext } from './Provider'
import { formatNumber } from './helpers'

const NonScrollableContainer = styled(Stack)`
padding: ${({ theme }) => theme.space[3]};
border-top: 1px solid ${({ theme }) => theme.colors.neutral.border};
`

type NonScrollableContentProps = {
  overallDiscount?: { label: ReactNode; discount: number }
  commitment: boolean
  commitmentChoice: 'false' | number
  totalPrice: number
  commitmentOptions?: { label: ReactNode; discount: number }[]
  onChangeCommitment: (value: 'false' | number) => void
  validateButtonOnClick: MouseEventHandler<HTMLElement>
  footer: ReactNode
}

export const NonScrollableContent = ({
  commitment,
  commitmentChoice,
  totalPrice,
  onChangeCommitment,
  validateButtonOnClick,
  commitmentOptions,
  overallDiscount,
  footer,
}: NonScrollableContentProps) => {
  const { locale, currency, locales } = useContext(OrderSummaryContext)

  const formatOptions = useMemo(
    () =>
      commitmentOptions?.map(option => ({
        value: option.discount.toString(),
        label: option.label,
        searchText: option.discount.toString(),
      })),
    [commitmentOptions],
  )

  return (
    <>
      {commitment ? (
        <NonScrollableContainer gap={3} id="commitment">
          <RadioGroup
            name="commitment"
            value={commitmentChoice === 'false' ? commitmentChoice : 'true'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const { value } = e.currentTarget
              if (value === 'false') {
                onChangeCommitment(value)
              } else {
                onChangeCommitment(1)
              }
            }}
            legend={locales['estimate.cost.commitment.label']}
          >
            <RadioGroup.Radio
              value="false"
              label={locales['estimate.cost.commitment.false']}
            />
            <RadioGroup.Radio
              value="true"
              label={locales['estimate.cost.commitment.true']}
            />
          </RadioGroup>
          {commitmentOptions ? (
            <SelectInputV2
              options={formatOptions ?? []}
              name="commitment"
              onChange={(value: string) =>
                onChangeCommitment(Number.parseFloat(value))
              }
              disabled={commitmentChoice === 'false'}
            />
          ) : null}
        </NonScrollableContainer>
      ) : null}
      <NonScrollableContainer gap={3}>
        <Stack direction="row" justifyContent="space-between">
          {overallDiscount ? (
            <Stack>
              <Text as="p" variant="bodyStrong" sentiment="neutral">
                {locales['estimate.cost.total']}:
              </Text>
              {overallDiscount.label}
            </Stack>
          ) : (
            <Text as="p" variant="bodyStrong" sentiment="neutral">
              {locales['estimate.cost.total']}:
            </Text>
          )}

          <Text as="p" variant="headingSmallStrong" sentiment="neutral">
            {formatNumber(totalPrice, locale, currency)}
          </Text>
        </Stack>
        {footer}
        <Button onClick={validateButtonOnClick}>
          {locales['estimate.cost.submit.label']}
        </Button>
      </NonScrollableContainer>
    </>
  )
}
