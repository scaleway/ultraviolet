import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { cloneElement, useMemo } from 'react'
import flattenChildren from 'react-flatten-children'
import Box from '../Box'
import Link from '../Link'

function reverseZIndexes() {
  const count = 10

  return Array.from(
    { length: count },
    (_, index) => `
      &:nth-child(${index + 1}) {
        z-index: ${count - index};
      }
    `,
  )
}

function contractString(str) {
  if (typeof str === 'string' && str.length > 30) {
    return `${str.slice(0, 15)}...${str.slice(-15)}`
  }

  return str
}

const StyledOl = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
`

const Breadcrumbs = ({
  children,
  variant,
  selected: selectedProp,
  ...props
}) => {
  const flatChildren = flattenChildren(children)
  const selected =
    selectedProp !== undefined ? selectedProp : flatChildren.length - 1

  return (
    <Box as="nav" aria-label="breadcrumb" {...props}>
      <StyledOl>
        {flatChildren.map((child, index) => {
          if (!child) return null

          const active = selected === index

          return (
            <React.Fragment key={child.key}>
              {cloneElement(child, {
                'aria-current': active ? 'page' : undefined,
                step: index,
                variant,
              })}
            </React.Fragment>
          )
        })}
      </StyledOl>
    </Box>
  )
}

const BubbleVariant = styled.li`
  display: flex;
  flex: 1;
  font-weight: 500;
  line-height: 24px;
  border-radius: 24px;
  border-style: solid;
  border-width: 1px;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: ${({ theme }) => theme.space['6']};
  padding-right: ${({ theme }) => theme.space['3']};
  margin-left: -${({ theme }) => theme.space['3']};
  margin-right: -${({ theme }) => theme.space['3']};

  background-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.white};

  &:first-child {
    padding-left: ${({ theme }) => theme.space['3']};
    margin-left: 0;
    margin-right: -${({ theme }) => theme.space['3']};
  }

  &:last-child {
    margin-right: 0;
  }

  &[aria-current='page'] {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.white};

    &:focus {
      box-shadow: 0 0 0 2px
        ${({ theme }) => transparentize(0.75, theme.colors.primary)};
    }
  }

  &[aria-current='page'] ~ & {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.gray550};
    border-color: ${({ theme }) => theme.colors.gray350};

    &:focus {
      box-shadow: 0 0 0 2px
        ${({ theme }) => transparentize(0.75, theme.colors.gray550)};
    }
  }

  ${({ onClick, theme }) =>
    onClick
      ? `
    cursor: pointer;
    &[aria-disabled="true"] {
      pointer-events: none;
    }

  &:focus {
    box-shadow: 0 0 0 2px ${transparentize(0.75, theme.colors.success)};
  }`
      : ``}

  ${reverseZIndexes()}
`

const LinkVariant = styled.li`
  display: inline;

  &[aria-current='page'] {
    color: ${({ theme }) => theme.colors.gray550};
  }

  &:not(:last-child)::after {
    content: '›';
    margin: 0 8px;
  }

  ${({ onClick }) =>
    onClick
      ? `
    cursor: pointer;
    &[aria-disabled="true"] {
      pointer-events: none;
    }
`
      : ``}
`

const variants = {
  bubble: BubbleVariant,
  link: LinkVariant,
}

export const breadcrumbsVariants = Object.keys(variants)

export const Item = ({
  to,
  children,
  disabled,
  variant,
  'aria-current': ariaCurrent,
  onClick,
  step,
}) => {
  const VariantComponent = useMemo(() => variants[variant], [variant])

  return (
    <VariantComponent
      aria-disabled={disabled}
      onClick={onClick ? event => onClick(event, step) : undefined}
      aria-current={ariaCurrent}
    >
      {to ? (
        <Link variant="primary" to={to}>
          {contractString(children)}
        </Link>
      ) : (
        contractString(children)
      )}
    </VariantComponent>
  )
}

Breadcrumbs.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.number,
  variant: PropTypes.oneOf(breadcrumbsVariants),
}

Breadcrumbs.defaultProps = {
  selected: undefined,
  variant: 'link',
}

Item.propTypes = {
  'aria-current': PropTypes.string,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  /**
   * Id of the step, automatically injected by Breadcrumbs parent tag
   */
  step: PropTypes.number,
  /**
   * Make the component act a `Link` tag
   */
  to: PropTypes.string,
  /**
   * Will be automatically injected by Breadcrumbs parent tag
   */
  variant: PropTypes.oneOf(breadcrumbsVariants),
}

Item.defaultProps = {
  'aria-current': undefined,
  disabled: false,
  onClick: undefined,
  step: undefined,
  to: null,
  variant: 'link',
}

Breadcrumbs.Item = Item

export default Breadcrumbs
