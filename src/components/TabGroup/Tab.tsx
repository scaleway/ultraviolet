import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {
  ElementType,
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
} from 'react'

export const StyledTab = styled.span`
  display: flex;
  flex-direction: row;
  padding: 8px 12px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme: { colors } }) => colors.gray550};
  font-weight: 500;
  text-decoration: none;
  user-select: none;
  touch-action: manipulation;
  transition: color 0.2s;

  &:hover,
  &:active,
  &:focus {
    color: ${({ theme: { colors } }) => colors.primary};
    text-decoration: none;
    outline: none;
  }

  &:focus-visible {
    outline: auto;
  }

  &[aria-selected='true'] {
    color: ${({ theme: { colors } }) => colors.primary};
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.5;
    &:hover,
    &:focus {
      color: ${({ theme: { colors } }) => colors.gray550};
    }
  }
`

export type TabProps = {
  as?: ElementType<unknown>
  children?: ReactNode
  disabled?: boolean
  hasEndedCount?: boolean
  index?: number
  isSelected?: boolean
  isTabsWidthSet?: boolean
  name?: string
  onClick?: (
    event: MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLSpanElement>,
  ) => void
  setInternTabsWidth?: (width: number, index: number) => void
}

const Tab: FunctionComponent<TabProps> = ({
  children = null,
  disabled = false,
  isSelected = false,
  setInternTabsWidth = () => {},
  isTabsWidthSet = false,
  index = 0,
  name,
  onClick = () => {},
  hasEndedCount = false,
  as,
  ...props
}) => {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setInternTabsWidth(ref?.current?.offsetWidth || 0, index)
  }, [index, hasEndedCount, isTabsWidthSet, setInternTabsWidth, name, children])

  return (
    <StyledTab
      as={as}
      aria-label={name}
      ref={ref}
      role="tab"
      tabIndex={isSelected ? 0 : -1}
      onKeyDown={event => {
        if (['Enter', 'Space'].includes(event.code) && onClick) {
          onClick(event)
        }
      }}
      aria-selected={isSelected}
      aria-disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledTab>
  )
}

Tab.propTypes = {
  as: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  hasEndedCount: PropTypes.bool,
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  isTabsWidthSet: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  setInternTabsWidth: PropTypes.func,
}

export default Tab
