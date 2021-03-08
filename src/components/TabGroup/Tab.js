import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'

export const variants = {
  default: ({ theme: { colors } }) => ({
    focus: colors.primary,
    selected: colors.primary,
    disabled: colors.gray550,
  }),
}

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

  ${({ variant, theme }) => {
    const colors = variants[variant]
      ? variants[variant]({ theme })
      : variants.default({ theme })

    return `
      transition: color 0.2s;
      &:hover,
      &:active,
      &:focus {
        color: ${colors.focus};
        text-decoration: none;
      }

      &[aria-selected='true'] {
        color: ${colors.selected};
      }

      &[aria-disabled='true'] {
      cursor: not-allowed;
      opacity: 0.5;
      &:hover,
      &:focus {
        color: ${colors.disabled};
      }
    }
    `
  }}
`

const Tab = ({
  children,
  disabled,
  variant,
  isSelected,
  setInternTabsWidth,
  isTabsWidthSet,
  index,
  name,
  onClick,
  hasEndedCount,
  as,
}) => {
  const ref = useRef({})

  useEffect(() => {
    if (ref && ref.current) {
      setInternTabsWidth(ref.current.offsetWidth, index)
    }
  }, [index, hasEndedCount, isTabsWidthSet, setInternTabsWidth, name, children])

  return typeof children === 'function' ? (
    children({ ref, onClick, disabled, isSelected, variant })
  ) : (
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
      variant={variant}
    >
      {children}
    </StyledTab>
  )
}

Tab.propTypes = {
  disabled: PropTypes.bool,
  variant: PropTypes.string,
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
  variant: 'default',
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
