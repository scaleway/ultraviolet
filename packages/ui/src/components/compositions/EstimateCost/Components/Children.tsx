import { cn } from '@ultraviolet/utils'
import { Children, cloneElement, isValidElement } from 'react'

import { CustomUnitInput } from '../Components/CustomUnitInput'
import { useEstimateCost } from '../EstimateCostProvider'
import { estimateCostStyle } from '../styles.css'

import { Title } from './Title'

import type { ChildrenComponentType, ExtraProps } from '../types'

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
      className={estimateCostStyle.table[hideTotal ? 'noTotal' : 'total']}
      data-testid="summary"
      ref={ref}
    >
      <colgroup>
        <col />
        <col className={estimateCostStyle.priceColumn} />
      </colgroup>
      {hideTimeUnit ? null : (
        <thead>
          <tr>
            <th>
              <Title locales={locales} />
            </th>
            <th
              className={cn(
                estimateCostStyle.priceCellContent,
                estimateCostStyle.priceCell,
              )}
            >
              <div className={estimateCostStyle.timeCell}>
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
