import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'

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
  outline: none;
  user-select: none;
  touch-action: manipulation;

  transition: color 0.2s;
  &:hover,
  &:active,
  &:focus {
    color: ${({ theme: { colors } }) => colors.primary};
    text-decoration: none;
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

const Tab = ({
  children,
  disabled,
  isSelected,
  setInternTabsWidth,
  isTabsWidthSet,
  index,
  name,
  onClick,
  hasEndedCount,
  as,
  ...props
}) => {
  const ref = useRef({})

  useEffect(() => {
    if (ref && ref.current) {
      setInternTabsWidth(ref.current.offsetWidth, index)
    }
  }, [index, hasEndedCount, isTabsWidthSet, setInternTabsWidth, name, children])

  return (
    <StyledTab
      as={as}
      aria-label={name}
      ref={ref}
      role="tab"
      tabIndex={0}
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
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
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

Tab.defaultProps = {
  as: undefined,
  children: null,
  disabled: false,
  hasEndedCount: false,
  index: 0,
  isSelected: false,
  isTabsWidthSet: false,
  name: undefined,
  onClick: () => {},
  setInternTabsWidth: () => {},
}

export default Tab
