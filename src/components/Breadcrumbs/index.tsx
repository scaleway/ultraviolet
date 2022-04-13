import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {
  AriaAttributes,
  Children,
  ReactNode,
  WeakValidationMap,
  cloneElement,
  isValidElement,
  useMemo,
} from 'react'
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

const contractString = (str: ReactNode): ReactNode => {
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

  background-color: ${({ theme }) => theme.colors.success.backgroundStrong};
  color: ${({ theme }) => theme.colors.success.textStrong};

  &:first-of-type {
    padding-left: ${({ theme }) => theme.space['3']};
    margin-left: 0;
    margin-right: -${({ theme }) => theme.space['3']};
  }

  &:last-of-type {
    margin-right: 0;
  }

  &[aria-current='page'] {
    background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};
    color: ${({ theme }) => theme.colors.primary.textStrong};
  }

  &[aria-current='page'] ~ & {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    color: ${({ theme }) => theme.colors.neutral.textWeak};
    border-color: ${({ theme }) => theme.colors.neutral.borderWeak};
  }

  ${({ onClick }) =>
    onClick
      ? `
    cursor: pointer;
    &[aria-disabled="true"] {
      pointer-events: none;
    }`
      : ``}

  ${reverseZIndexes()}
`

const LinkVariant = styled.li`
  display: inline;

  &[aria-current='page'] {
    color: ${({ theme }) => theme.colors.neutral.textWeak};
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
type Variants = keyof typeof variants
export const breadcrumbsVariants = Object.keys(variants) as Variants[]

interface ItemProps {
  children: ReactNode
  'aria-current'?:
    | boolean
    | 'false'
    | 'true'
    | 'page'
    | 'step'
    | 'location'
    | 'date'
    | 'time'
  to?: string
  disabled?: boolean
  variant?: Variants
  step?: number
  onClick?: (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    step: number,
  ) => void
}

export const Item = ({
  to,
  children,
  disabled = false,
  variant = 'link',
  'aria-current': ariaCurrent,
  onClick,
  step,
}: ItemProps) => {
  const VariantComponent = useMemo(
    () => variants[variant] ?? variants.link,
    [variant],
  )

  return (
    <VariantComponent
      aria-disabled={disabled}
      onClick={onClick ? event => onClick(event, step ?? -1) : undefined}
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

Item.propTypes = {
  'aria-current': PropTypes.oneOf<AriaAttributes['aria-current']>([
    true,
    false,
    'false',
    'true',
    'page',
    'step',
    'location',
    'date',
    'time',
  ]),
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
  variant: PropTypes.oneOf<Variants>(breadcrumbsVariants),
}

interface BreadcrumbsProps {
  variant?: Variants
  selected?: number
  children: ReactNode
}

type BreadcrumbsType = ((props: BreadcrumbsProps) => JSX.Element) & {
  Item: typeof Item
  propTypes: WeakValidationMap<BreadcrumbsProps>
}

const Breadcrumbs: BreadcrumbsType = ({
  children,
  variant = 'link',
  selected: selectedProp,
}) => {
  const selected =
    selectedProp !== undefined ? selectedProp : Children.count(children) - 1

  return (
    <nav aria-label="breadcrumb">
      <StyledOl>
        {Children.map(children, (child, index: number) => {
          if (!isValidElement<ItemProps>(child)) {
            return child
          }

          const active = selected === index

          return cloneElement(child, {
            'aria-current': active ? 'page' : undefined,
            step: index,
            variant,
          })
        })}
      </StyledOl>
    </nav>
  )
}

Breadcrumbs.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.number,
  variant: PropTypes.oneOf<Variants>(breadcrumbsVariants),
}

Breadcrumbs.Item = Item

export default Breadcrumbs
