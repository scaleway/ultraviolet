'use client'

import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { Tooltip } from '../Tooltip'
import TooltipContainer from './Tooltip'
import type { Data } from './types'

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
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
  list-style-type: none;
  display: flex;
  flex: 1;
  flex-direction: column;
  max-height: 100%;
  overflow-y: auto;
`

const ListItem = styled.li<{ isFocused: boolean }>`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.space['1']};
  width: 100%;
  color: ${({ isFocused, theme }) =>
    isFocused ? theme.colors.primary.text : theme.colors.neutral.text};
`

const Bullet = styled.div<{
  needPattern?: boolean | null
  id: string
  isFocused: boolean
}>`
  display: inline-block;
  border-radius: ${({ theme }) => theme.radii.circle};
  width: 10px;
  height: 10px;
  margin: 0 ${({ theme }) => theme.space['1']};
  background: ${({ color }) => color};
  ${({ isFocused }) => animationFlash(isFocused)}
`

const Label = styled.div`
  display: flex;
  flex: 1;
  align-items: baseline;
`

const Value = styled.div<{ isFocused: boolean }>`
  margin-left: ${({ theme }) => theme.space['1']};
  font-weight: ${({ isFocused }) => (isFocused ? 500 : 400)};
`

const Text = styled.span<{ isFocused: boolean }>`
  flex: none;
  margin-right: ${({ theme }) => theme.space['1']};
  font-weight: ${({ isFocused }) => (isFocused ? 500 : 400)};
`

const ToggleBox = styled.div`
  width: 250px;
  height: 21px;
  position: absolute;
`

const Line = styled.span`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
  position: relative;
  width: 100%;
`

const ProgressiveLine = styled.span<{ isFocused: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.border};
  position: absolute;
  left: 0;
  top: 0;
  bottom: -1px;
  transition: width 500ms ease;
  width: ${({ isFocused }) => (isFocused ? 100 : 0)}%;
`

type LegendsProps = {
  data?: Data[]
  focused?: string
  onFocusChange: (index?: string) => void
  colors: string[]
}

const Legends = ({ focused, data, onFocusChange, colors }: LegendsProps) => (
  <List>
    {data?.map((item, index) => {
      const isSegmentFocused = focused !== undefined && item.id === focused

      const id = `chart-legend-${item.id}`

      return (
        <Tooltip
          id={id}
          key={item.id}
          text={<TooltipContainer data={item} />}
          visible={isSegmentFocused}
        >
          <ListItem isFocused={isSegmentFocused}>
            <ToggleBox
              data-testid={id}
              onBlur={() => onFocusChange()}
              onFocus={() => onFocusChange(item.id)}
              onMouseOut={() => onFocusChange()}
              onMouseOver={() => onFocusChange(item.id)}
            />
            <Bullet
              color={colors[index]}
              id={`chart-legend-${item.id}`}
              isFocused={isSegmentFocused}
              needPattern={item.needPattern}
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

export default Legends
