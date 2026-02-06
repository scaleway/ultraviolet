import { CalculatorIcon } from '@ultraviolet/icons/CalculatorIcon'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ReactNode } from 'react'
import { Children, cloneElement, isValidElement, memo } from 'react'
import { Badge } from '../../../Badge'
import { Text } from '../../../Text'
import { CustomUnitInput } from '../Components/CustomUnitInput'
import { maximumFractionDigits, maximumFractionDigitsLong } from '../constants'
import { useEstimateCost } from '../EstimateCostProvider'
import type EstimateCostLocales from '../locales/en'
import {
  estimateCostBadgeBeta,
  estimateCostCalculatorIcon,
  estimateCostCell,
  estimateCostEmptyCell,
  estimateCostEmptyTable,
  estimateCostPriceCell,
  estimateCostPriceCellContent,
  estimateCostPriceColumn,
  estimateCostTable,
  estimateCostText,
  estimateCostTimeCell,
  estimateCostTitle,
  estimateCostTotalPriceCell,
  paddingLeftCell,
} from '../styles.css'
import type {
  ChildrenComponentType,
  ExtraProps,
  LocalesType,
  TotalContentProps,
} from '../types'
import { LineThrough } from './LineThrough'

export const DescriptionComponent = memo(
  ({
    description,
    locales,
  }: {
    description: ReactNode
    locales: Record<keyof typeof EstimateCostLocales, string>
  }) =>
    description === undefined || typeof description === 'string' ? (
      <Text as="span" variant="body">
        {description || locales['estimate.cost.description']}
      </Text>
    ) : (
      description
    ),
)

export const TitleComponent = memo(({ locales }: { locales: LocalesType }) => (
  <h3 className={estimateCostTitle}>
    <CalculatorIcon
      className={estimateCostCalculatorIcon}
      sentiment="primary"
      size="medium"
    />
    {locales?.['estimate.cost.label']}
  </h3>
))

export const ChildrenComponent = ({
  hideTotal,
  ref,
  hideTimeUnit,
  defaultTimeUnit,
  iteration,
  setIteration,
  timeUnits,
  children,
  discount,
  productsCallback,
}: ChildrenComponentType) => {
  const { locales } = useEstimateCost()

  return (
    <table
      cellPadding="0"
      cellSpacing="0"
      className={estimateCostTable[hideTotal ? 'noTotal' : 'total']}
      data-testid="summary"
      ref={ref}
    >
      <colgroup>
        <col />
        <col className={estimateCostPriceColumn} />
      </colgroup>
      {hideTimeUnit ? null : (
        <thead>
          <tr>
            <th>
              <TitleComponent locales={locales} />
            </th>
            <th
              className={cn(
                estimateCostPriceCellContent,
                estimateCostPriceCell,
              )}
            >
              <div className={estimateCostTimeCell}>
                <CustomUnitInput
                  defaultTimeUnit={defaultTimeUnit}
                  iteration={iteration}
                  setIteration={setIteration}
                  timeUnits={timeUnits}
                />
              </div>
            </th>
          </tr>
        </thead>
      )}
      <tbody>
        {Children.map(children, (child, index) =>
          isValidElement<ExtraProps>(child)
            ? cloneElement(child, {
                discount:
                  discount &&
                  !(
                    (
                      child as {
                        props: Record<string, unknown>
                      }
                    ).props as {
                      discount?: number
                    }
                  ).discount
                    ? discount
                    : (
                        (
                          child as {
                            props: Record<string, unknown>
                          }
                        ).props as {
                          discount?: number
                        }
                      ).discount,
                isLastElement: index === Children.count(children) - 1,
                iteration,
                productsCallback,
              })
            : child,
        )}
      </tbody>
    </table>
  )
}

export const TotalComponent = ({
  isBeta,
  discount,
  totalValue,
  totalPrice,
  totalMaxValue,
  hideHourlyPriceOnTotal,
  isLongFractionDigits,
}: TotalContentProps) => {
  const { formatNumber, locales } = useEstimateCost()
  const localeBeta =
    locales[`estimate.cost.beta.${discount > 0 ? 'discount' : 'free'}`]

  return (
    <table cellPadding="0" cellSpacing="0" className={estimateCostEmptyTable}>
      <colgroup>
        <col />
        <col className={estimateCostPriceColumn} />
      </colgroup>
      <tbody>
        <tr>
          <td aria-label="control" className={estimateCostEmptyCell} />
          <td
            className={cn(
              estimateCostCell({ hasBorder: false, primary: false }),
              estimateCostTotalPriceCell,
            )}
            style={assignInlineVars({
              [paddingLeftCell]: '16px',
            })}
          >
            {isBeta ? (
              <Badge
                className={
                  estimateCostBadgeBeta[
                    localeBeta.length > 25 ? 'long' : 'short'
                  ]
                }
                prominence="strong"
                sentiment="warning"
              >
                {`${discount > 0 ? discount * 100 : ''}
                          ${localeBeta}`}
              </Badge>
            ) : null}
            <Text
              as="h3"
              className={estimateCostText({ beta: isBeta })}
              sentiment="primary"
              variant="heading"
            >
              <LineThrough
                isActive={isBeta && (discount === 0 || discount >= 1)}
              >
                {totalValue}
                {totalPrice.maxTotal > 0 ? ` - ${totalMaxValue}` : null}
              </LineThrough>
            </Text>
            {hideHourlyPriceOnTotal &&
            totalPrice.hourly > 0 &&
            totalPrice.hourly !== totalPrice.total &&
            totalPrice.total > 0 ? (
              <Text as="p" placement="right" variant="body">
                <LineThrough
                  isActive={isBeta && (discount === 0 || discount >= 1)}
                >
                  {formatNumber(totalPrice.hourly, {
                    maximumFractionDigits: isLongFractionDigits
                      ? maximumFractionDigitsLong.hours
                      : maximumFractionDigits.hours,
                  })}
                  {totalPrice.maxHourly > 0
                    ? ` - ${formatNumber(totalPrice.maxHourly, {
                        maximumFractionDigits: isLongFractionDigits
                          ? maximumFractionDigitsLong.hours
                          : maximumFractionDigits.hours,
                      })}`
                    : null}
                  /{locales['estimate.cost.units.hours.label'].toLowerCase()}
                </LineThrough>
              </Text>
            ) : null}
          </td>
        </tr>
      </tbody>
    </table>
  )
}
