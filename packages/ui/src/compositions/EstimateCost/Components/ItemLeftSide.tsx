import { HelpCircleOutlineIcon } from '@ultraviolet/icons/HelpCircleOutlineIcon'
import { Children, cloneElement, isValidElement } from 'react'

import { Badge } from '../../../components/Badge'
import { Stack } from '../../../components/Stack'
import { Text } from '../../../components/Text'
import { Tooltip } from '../../../components/Tooltip'
import { useEstimateCost } from '../EstimateCostProvider'
import { useOverlay } from '../OverlayContext'
import { estimateCostStyle } from '../styles.css'

import { estimateCostMaxWidthText } from './components.css'

import type { ItemLeftSideProps } from '../types'

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
    <LeftSide className={isOverlay ? '' : estimateCostStyle.leftSide}>
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
            <div className={estimateCostStyle.div}>
              <Tooltip className={estimateCostStyle.tooltip} text={tooltipInfo}>
                <HelpCircleOutlineIcon size="medium" />
              </Tooltip>
            </div>
          ) : null}
          {subLabel && !isOverlay ? (
            <Text
              as="p"
              className={estimateCostStyle.textItem}
              italic
              sentiment="primary"
              variant="body"
            >
              {subLabel}
            </Text>
          ) : null}
          {discount > 0 && discountText ? (
            <Badge
              className={estimateCostStyle.badgeItem}
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
        className={estimateCostStyle.resourceName({
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
