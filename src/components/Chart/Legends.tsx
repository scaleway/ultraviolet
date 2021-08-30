import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { VoidFunctionComponent, isValidElement } from 'react'
import { Color } from '../../theme/colors'
import Tooltip from '../Tooltip'
import TooltipContainer from './Tooltip'
import patternVariants from './patterns'
import { Data } from './types'

const bulletFlashAnim = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
`

const animationFlash = (isFocused: boolean) =>
  isFocused
    ? css`
        ${bulletFlashAnim.styles}
        animation: ${bulletFlashAnim.name} linear 1500ms infinite;
      `
    : ''

const List = styled.ul`
  font-size: 14px;
  list-style-type: none;
  display: flex;
  flex: 1;
  flex-direction: column;
  cursor: pointer;
  height: min-content;
`

const ListItem = styled.li<{ isFocused: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 8px;
  width: 100%;
  color: ${({ isFocused, theme }) =>
    isFocused ? theme.colors.primary : theme.colors.gray700};
`

const Bullet = styled.div<{
  needPattern?: boolean | null
  isFocused: boolean
  product: string
}>`
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 8px;
  background: ${({ color, theme }) => theme.colors[color as Color] ?? color};

  ${({ needPattern, color, theme, product }) => {
    if (!needPattern) return null

    const pattern = patternVariants?.[
      `${product}-dot` as keyof typeof patternVariants
    ]?.(theme.colors[color as Color] ?? color)

    return isValidElement(pattern) ? null : pattern
  }}

  ${({ isFocused }) => animationFlash(isFocused)}
`

const Label = styled.div`
  display: flex;
  flex: 1;
  align-items: baseline;
`

const Value = styled.div<{ isFocused: boolean }>`
  margin-left: 6px;
  font-weight: ${({ isFocused }) => (isFocused ? 500 : 400)};
`

const Text = styled.span<{ isFocused: boolean }>`
  flex: none;
  margin-right: 6px;
  font-weight: ${({ isFocused }) => (isFocused ? 500 : 400)};
`

const ToggleBox = styled.div`
  width: 250px;
  height: 21px;
  position: absolute;
`

const Line = styled.span`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  position: relative;
  width: 100%;
`

const ProgressiveLine = styled.span<{ isFocused: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  position: absolute;
  left: 0;
  top: 0;
  bottom: -1px;
  transition: width 500ms ease;
  width: ${({ isFocused }) => (isFocused ? 100 : 0)}%;
`

type LegendsProps = {
  chartId?: string
  data?: Data[]
  focused?: number
  onFocusChange(index?: number): void
}

const Legends: VoidFunctionComponent<LegendsProps> = ({
  focused,
  data,
  onFocusChange,
  chartId,
}) => (
  <List>
    {data?.map((item, index) => {
      const isSegmentFocused = focused !== undefined && index === focused

      const id = `${chartId ? `${chartId}-` : ''}chart-tooltip-${item.product}`

      return (
        <Tooltip
          key={item.product}
          visible={isSegmentFocused}
          variant="white"
          baseId={id}
          text={<TooltipContainer data={item} />}
        >
          <ListItem isFocused={isSegmentFocused}>
            <ToggleBox
              data-testid={id}
              onMouseOver={() => onFocusChange(index)}
              onFocus={() => onFocusChange(index)}
              onMouseOut={() => onFocusChange()}
              onBlur={() => onFocusChange()}
            />
            <Bullet
              color={item.color}
              isFocused={isSegmentFocused}
              needPattern={item.needPattern}
              product={item.product}
            />
            <Label>
              <Text isFocused={isSegmentFocused}>{item.name}</Text>
              <Line>
                <ProgressiveLine isFocused={isSegmentFocused} />
              </Line>
            </Label>
            <Value isFocused={isSegmentFocused}>{item.value}</Value>
          </ListItem>
        </Tooltip>
      )
    })}
  </List>
)

Legends.defaultProps = {
  chartId: undefined,
  focused: undefined,
}

Legends.propTypes = {
  chartId: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      name: PropTypes.string,
      needPattern: PropTypes.bool,
      percent: PropTypes.number.isRequired,
      product: PropTypes.string.isRequired,
      value: PropTypes.string,
    }).isRequired,
  ),
  focused: PropTypes.number,
  onFocusChange: PropTypes.func.isRequired,
}

export default Legends
