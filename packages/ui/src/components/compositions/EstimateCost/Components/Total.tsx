import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'

import { Badge } from '../../../Badge'
import { Text } from '../../../Text'
import { maximumFractionDigits, maximumFractionDigitsLong } from '../constants'
import { useEstimateCost } from '../EstimateCostProvider'
import { estimateCostStyle, paddingLeftCell } from '../styles.css'

import { LineThrough } from './LineThrough'

import type { TotalContentProps } from '../types'

export const Total = ({
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
    <table
      cellPadding="0"
      cellSpacing="0"
      className={estimateCostStyle.emptyTable}
    >
      <colgroup>
        <col />
        <col className={estimateCostStyle.priceColumn} />
      </colgroup>
      <tbody>
        <tr>
          <td aria-label="control" className={estimateCostStyle.emptyCell} />
          <td
            className={cn(
              estimateCostStyle.cell({ hasBorder: false, primary: false }),
              estimateCostStyle.totalPriceCell,
            )}
            style={assignInlineVars({
              [paddingLeftCell]: '16px',
            })}
          >
            {isBeta ? (
              <Badge
                className={
                  estimateCostStyle.badgeBeta[
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
              className={estimateCostStyle.text({ beta: isBeta })}
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
