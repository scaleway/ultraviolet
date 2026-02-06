import { HelpCircleOutlineIcon } from '@ultraviolet/icons/HelpCircleOutlineIcon'
import { Children, cloneElement, isValidElement } from 'react'
import { Badge } from '../../../Badge'
import { Stack } from '../../../Stack'
import { Text } from '../../../Text'
import { Tooltip } from '../../../Tooltip'
import { useEstimateCost } from '../EstimateCostProvider'
import { useOverlay } from '../OverlayContext'
import type { ItemLeftSideProps } from '../types'
import {
  estimateCostBadgeItem,
  estimateCostLeftSide,
  estimateCostMaxWidthText,
  estimateCostResourceName,
  estimateCostTextItem,
  estimateCostTooltip,
  styledDiv,
} from './components.css'

type ExtraProps = {
  itemCallback: (amount: number, isVariant: boolean) => void
  amount: number
  maxAmount: number
  unit: string
}

export const ItemLeftSide = ({
  label,
  tooltipInfo,
  subLabel,
  discount,
  discountText,
  notice,
  isDefined,
  animated,
  children,
  amount,
  itemCallback,
  maxAmount,
  unit,
  textNotDefined,
  labelTextVariant,
  labelTextProminence,
}: ItemLeftSideProps) => {
  const LeftSide = 'div'
  const { isOverlay } = useOverlay()
  const { locales } = useEstimateCost()

  return (
    <LeftSide className={isOverlay ? '' : estimateCostLeftSide}>
      <Stack>
        <Stack direction="row">
          <Text
            as="p"
            prominence={labelTextProminence ?? 'default'}
            variant={labelTextVariant ?? 'body'}
          >
            {label}
          </Text>
          {tooltipInfo ? (
            <div className={styledDiv}>
              <Tooltip className={estimateCostTooltip} text={tooltipInfo}>
                <HelpCircleOutlineIcon size="medium" />
              </Tooltip>
            </div>
          ) : null}
          {subLabel && !isOverlay ? (
            <Text
              as="p"
              className={estimateCostTextItem}
              italic
              sentiment="primary"
              variant="body"
            >
              {subLabel}
            </Text>
          ) : null}
          {discount > 0 && discountText ? (
            <Badge
              className={estimateCostBadgeItem}
              prominence="strong"
              sentiment="warning"
              size="small"
            >
              {discountText}
            </Badge>
          ) : null}
        </Stack>
        {notice ? (
          <Text
            as="p"
            className={estimateCostMaxWidthText}
            prominence="weak"
            variant="caption"
          >
            {notice}
          </Text>
        ) : null}
      </Stack>
      <div
        className={estimateCostResourceName({
          isAnimated: isOverlay && animated,
          isOverlay,
        })}
      >
        {isDefined
          ? Children.map(children, child =>
              isValidElement<ExtraProps>(child)
                ? cloneElement(child, {
                    amount,
                    itemCallback,
                    maxAmount,
                    unit,
                  })
                : null,
            )
          : textNotDefined || locales['estimate.cost.notDefined']}
      </div>
    </LeftSide>
  )
}
