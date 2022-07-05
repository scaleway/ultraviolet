import styled from '@emotion/styled'
import React, {
  AnchorHTMLAttributes,
  ElementType,
  ForwardedRef,
  HTMLAttributeAnchorTarget,
  ReactNode,
  forwardRef,
} from 'react'
import { Color } from '../../theme'
import { getTextDisabled } from '../../theme/helper'
import Icon from '../Icon'
import Text from '../Text'

type LinkSizes = 'large' | 'small'
type LinkIconPosition = 'left' | 'right'
type LinkProps = {
  children: ReactNode
  target?: HTMLAttributeAnchorTarget
  download?: string | boolean
  variant?: Color
  size?: LinkSizes
  iconPosition?: LinkIconPosition
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel']
  as?: ElementType
  to: string
}

const ICON_SIZE = 16
const BLANK_TARGET_ICON_SIZE = 14
const TRANSITION_DURATION = 250

const StyledExternalIconContainer = styled.span`
  display: inline-flex;
`
const StyledText = styled(Text)``

const StyledLink = styled('a', {
  shouldForwardProp: prop => !['variant', 'iconPosition', 'as'].includes(prop),
})<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant: Color
  }
>`
  background-color: transparent;
  border: none;
  padding: 0;
  color: ${({ theme, variant }) =>
    theme.colors[variant]?.text ?? theme.colors.neutral.text};
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: gap ${TRANSITION_DURATION}ms ease-out;
  gap: ${({ theme }) => theme.space['1']};
  position: relative;
  width: fit-content;
  cursor: pointer;

  ${StyledText} {
    color: inherit;
  }

  &::after {
    transition: background ${TRANSITION_DURATION}ms ease-out;
    content: '';
    position: absolute;
    top: calc(100% - 1px);
    height: 1px;
    left: 0;
    right: 0;
  }

  &:hover,
  &:focus {
    gap: ${({ theme }) => theme.space['0.5']};
    outline: none;
  }

  &:hover::after,
  &:focus::after {
    background-color: ${({ theme, variant }) =>
      theme.colors[variant]?.text ?? theme.colors.neutral.text};
  }

  &:active::after {
    height: 2px;
  }

  &[aria-disabled='true'] {
    pointer-events: none;
    color: ${({ theme, variant }) => getTextDisabled(theme, variant)};
`

const Link = forwardRef(
  (
    {
      children,
      to,
      target,
      download,
      variant = 'primary',
      size = 'large',
      iconPosition,
      rel,
      as,
    }: LinkProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    const isBlank = target === '_blank'
    const computedRel = rel || (isBlank ? 'noopener noreferrer' : undefined)

    return (
      <StyledLink
        as={as}
        href={to}
        target={target}
        download={download}
        ref={ref}
        variant={variant}
        rel={computedRel}
      >
        {iconPosition === 'left' ? (
          <Icon name="arrow-left" size={ICON_SIZE} />
        ) : null}
        <span>
          <StyledText
            as="span"
            variant={size === 'small' ? 'bodySmallStrong' : 'bodyStrong'}
          >
            {children}
          </StyledText>
          {isBlank ? (
            <StyledExternalIconContainer>
              <Icon name="open-in-new" size={BLANK_TARGET_ICON_SIZE} />
            </StyledExternalIconContainer>
          ) : null}
        </span>
        {iconPosition === 'right' ? (
          <Icon name="arrow-right" size={ICON_SIZE} />
        ) : null}
      </StyledLink>
    )
  },
)

export default Link
