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
  disabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  setInternTabsWidth: PropTypes.func,
  isTabsWidthSet: PropTypes.bool,
  index: PropTypes.number,
  onClick: PropTypes.func,
  hasEndedCount: PropTypes.bool,
  children: PropTypes.node,
  name: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
}

Tab.defaultProps = {
  disabled: false,
  isSelected: false,
  setInternTabsWidth: () => {},
  isTabsWidthSet: false,
  index: 0,
  onClick: () => {},
  hasEndedCount: false,
  children: null,
  as: undefined,
  name: undefined,
}

export default Tab
