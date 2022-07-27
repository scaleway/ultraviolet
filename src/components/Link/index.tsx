import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import React, {
  AnchorHTMLAttributes,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from 'react'
import { Color } from '../../theme'
import Icon from '../Icon'
import Text from '../Text'

type LinkSizes = 'large' | 'small'
type LinkIconPosition = 'left' | 'right'
type LinkProps = {
  children: ReactNode
  variant?: Color
  size?: LinkSizes
  iconPosition?: LinkIconPosition
  to?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

const ICON_SIZE = 16
const BLANK_TARGET_ICON_SIZE = 14
const TRANSITION_DURATION = 250

const StyledExternalIconContainer = styled.span`
  display: inline-flex;
`
const StyledText = styled(Text)``

export const StyledLink = styled('a', {
  shouldForwardProp: prop => !['variant', 'iconPosition', 'as'].includes(prop),
})<{
  variant: Color
  to?: string
}>`
  background-color: transparent;
  border: none;
  padding: 0;
  color: ${({ theme, variant }) =>
    theme.colors[variant]?.text ?? theme.colors.neutral.text};
  text-decoration: none;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  transition: gap ${TRANSITION_DURATION}ms ease-out;
  gap: ${({ theme }) => theme.space['1']};
  position: relative;
  width: fit-content;
  cursor: pointer;

  ${StyledText} {
    color: inherit;
    align-items: center;
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
    text-decoration: none;
    color: ${({ theme, variant }) =>
      theme.colors[variant]?.text ?? theme.colors.neutral.text};
  }

  &:hover::after,
  &:focus::after {
    background-color: ${({ theme, variant }) =>
      theme.colors[variant]?.text ?? theme.colors.neutral.text};
  }

  &:active::after {
    height: 2px;
  }
`

const Link = forwardRef(
  (
    {
      children,
      to,
      target,
      variant = 'primary',
      size = 'large',
      iconPosition,
      rel,
      ...props
    }: LinkProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    const isBlank = target === '_blank'
    const computedRel = rel || (isBlank ? 'noopener noreferrer' : undefined)

    const { linkComponent } = useTheme()

    return (
      <StyledLink
        as={to && linkComponent ? linkComponent : 'a'}
        target={target}
        ref={ref}
        variant={variant}
        rel={computedRel}
        to={linkComponent ? to : undefined}
        {...props}
      >
        {!isBlank && iconPosition === 'left' ? (
          <Icon name="arrow-left" size={ICON_SIZE} />
        ) : null}

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

        {!isBlank && iconPosition === 'right' ? (
          <Icon name="arrow-right" size={ICON_SIZE} />
        ) : null}
      </StyledLink>
    )
  },
)

export default Link
