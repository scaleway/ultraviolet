import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
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
  margin: auto;
  height: 100%;
  overflow-y: scroll;
`

const ListItem = styled.li<{ isFocused: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 8px;
  width: 100%;
  color: ${({ isFocused, theme }) =>
    isFocused ? theme.colors.primary.textWeak : theme.colors.neutral.text};
`

const Bullet = styled.div<{
  needPattern?: boolean | null
  id: string
  isFocused: boolean
}>`
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 8px;
  background: ${({ color }) => color};

  ${({ needPattern, color, id }) => {
    if (!needPattern) return null

    return patternVariants?.[`${id}-dot` as keyof typeof patternVariants]?.(
      color,
    )
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
  position: relative;
  width: 100%;
`

const ProgressiveLine = styled.span<{ isFocused: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.borderWeak};
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
  onFocusChange(index?: string): void
}

const Legends = ({ focused, data, onFocusChange }: LegendsProps) => (
  <List>
    {data?.map(item => {
      const isSegmentFocused = focused !== undefined && item.id === focused

      const id = `chart-legend-${item.id}`

      return (
        <Tooltip
          key={item.id}
          visible={isSegmentFocused}
          id={id}
          text={<TooltipContainer data={item} />}
        >
          <ListItem isFocused={isSegmentFocused}>
            <ToggleBox
              data-testid={id}
              onMouseOver={() => onFocusChange(item.id)}
              onFocus={() => onFocusChange(item.id)}
              onMouseOut={() => onFocusChange()}
              onBlur={() => onFocusChange()}
            />
            <Bullet
              color={item.color}
              isFocused={isSegmentFocused}
              needPattern={item.needPattern}
              id={`chart-legend-${item.id}`}
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
  focused: undefined,
}

Legends.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      needPattern: PropTypes.bool,
      percent: PropTypes.number.isRequired,
      value: PropTypes.string,
    }).isRequired,
  ).isRequired,
  focused: PropTypes.string,
  onFocusChange: PropTypes.func.isRequired,
}

export default Legends
