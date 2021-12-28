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
  color: ${({ theme }) => theme.colors.neutral.textWeak};
  font-weight: 500;
  text-decoration: none;
  user-select: none;
  touch-action: manipulation;
  transition: color 0.2s;

  &:hover,
  &:active,
  &:focus {
    color: ${({ theme }) => theme.colors.primary.text};
    text-decoration: none;
    outline: none;
  }

  &:focus-visible {
    outline: auto;
  }

  &[aria-selected='true'] {
    color: ${({ theme }) => theme.colors.primary.text};
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.5;
    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.neutral.textWeak};
    }
  }
`

type TabProps = {
  as?: ElementType | string
  children?: ReactNode
  disabled?: boolean
  hasEndedCount?: boolean
  index?: number
  isSelected?: boolean
  isTabsWidthSet?: boolean
  name?: string
  onClick?: (event: MouseEvent<HTMLElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void
  onChangeTab?: (nameOrIndex: string | number) => void
  setInternTabsWidth?: (width: number, index: number) => void
}

const Tab: FunctionComponent<TabProps> = ({
  children,
  disabled = false,
  isSelected = false,
  setInternTabsWidth,
  isTabsWidthSet = false,
  index = 0,
  name,
  onClick,
  onChangeTab,
  onKeyDown,
  hasEndedCount = false,
  as,
  ...props
}) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    setInternTabsWidth?.(ref?.current?.offsetWidth || 0, index)
  }, [index, hasEndedCount, isTabsWidthSet, setInternTabsWidth, name, children])

  return (
    <StyledTab
      as={as as ElementType}
      aria-label={name}
      ref={ref}
      role="tab"
      tabIndex={isSelected ? 0 : -1}
      onKeyDown={event => {
        if (['Enter', 'Space'].includes(event.code)) {
          onChangeTab?.(name || index)
        }
        onKeyDown?.(event)
      }}
      aria-selected={isSelected}
      aria-disabled={disabled}
      onClick={event => {
        onChangeTab?.(name || index)
        onClick?.(event)
      }}
      {...props}
    >
      {children}
    </StyledTab>
  )
}

Tab.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  hasEndedCount: PropTypes.bool,
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  isTabsWidthSet: PropTypes.bool,
  name: PropTypes.string,
  onChangeTab: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  setInternTabsWidth: PropTypes.func,
}

export default Tab
