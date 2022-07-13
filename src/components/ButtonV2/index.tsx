import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React, { Ref, forwardRef } from 'react'
import { Color } from '../../theme'
import Icon, { IconName } from '../Icon'
import Loader from '../Loader'
import Text from '../Text'
import Tooltip from '../Tooltip'

const sizes = {
  large: ({ theme }: { theme: Theme }) => `
      height: 48px;
      padding: 0 ${theme.space[2]};
    `,
  small: ({ theme }: { theme: Theme }) => `
      height: 32px;
      padding: 0 ${theme.space[1]};
    `,
} as const
type ButtonSize = keyof typeof sizes
export const buttonSizes = Object.keys(sizes) as ButtonSize[]

export type ButtonProps = {
  ariaLabel?: string
  disabled?: boolean
  className?: string
  extend?: boolean
  icon?: IconName
  iconPosition?: 'left' | 'right'
  innerRef?: Ref<HTMLButtonElement>
  isLoading?: boolean
  onClick?: () => void
  prominence?: 'strong' | 'weak'
  size?: ButtonSize
  text?: string
  tooltip?: string
  tooltipBaseId?: string
  type?: 'button' | 'submit'
  variant?: Color
}

type StyledButtonProps = Required<
  Pick<
    ButtonProps,
    'disabled' | 'variant' | 'size' | 'prominence' | 'extend' | 'iconPosition'
  >
>
const StyledButton = styled('button', {
  shouldForwardProp: prop =>
    !['disabled', 'variant', 'size', 'prominence', 'extend'].includes(prop),
})<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]};
  border-radius: 4px;

  ${({ size }) => sizes[size]};

  ${({ theme, disabled, variant, prominence, extend, iconPosition, size }) => {
    const backgroundValue: keyof typeof theme.colors.primary = `background${
      prominence === 'strong' ? 'Strong' : 'Weak'
    }${disabled ? 'Disabled' : ''}`
    const colorValue: keyof typeof theme.colors.primary = `text${
      prominence === 'strong' ? 'Strong' : 'Weak'
    }${disabled ? 'Disabled' : ''}`

    return `
      background: ${
        variant === 'neutral'
          ? theme.colors.neutral.background
          : theme.colors[variant][backgroundValue]
      };
      color: ${
        variant === 'neutral'
          ? theme.colors.neutral.text
          : theme.colors[variant][colorValue]
      };
      border: ${
        variant === 'neutral' || prominence === 'weak'
          ? `1px solid ${theme.colors[variant].borderWeak}`
          : 'none'
      };
      
      ${
        !disabled
          ? `
        cursor: pointer;
        &:hover,:focus-visible {
          box-shadow: ${theme.shadows.dropdown};
          outline : 0;
          background: ${
            variant === 'neutral'
              ? theme.colors.neutral.backgroundWeakHover
              : theme.colors[variant][
                  `${backgroundValue}Hover` as keyof typeof theme.colors.primary
                ]
          };
          color: ${
            variant === 'neutral'
              ? theme.colors.neutral.textHover
              : theme.colors[variant][
                  `${colorValue}Hover` as keyof typeof theme.colors.primary
                ]
          };
          border: ${
            variant === 'neutral' || prominence === 'weak'
              ? `1px solid ${theme.colors[variant].borderWeakHover}`
              : 'none'
          };
        }

        &:active {
          outline : 3px solid #4F059940;
        }
      `
          : /* Disabled */ `
          cursor: not-allowed;
          color : ${
            variant === 'neutral'
              ? theme.colors.neutral.textDisabled
              : theme.colors[variant][colorValue]
          };
          border: ${
            variant === 'neutral' || prominence === 'weak'
              ? `1px solid ${
                  variant === 'neutral'
                    ? theme.colors.neutral.borderDisabled
                    : theme.colors[variant].borderWeakDisabled
                }`
              : 'none'
          };
          `
      }

      ${
        extend
          ? `

          max-width: ${size === 'large' ? '48px' : '32px'};
          justify-content: ${
            iconPosition === 'right' ? 'flex-end' : 'flex-start'
          };

          .button-text { 
            transition: max-width 0.5s linear;
            overflow: hidden;
            max-width: 0;
            visibility: hidden;
          }

          &:hover, &:focus {

            max-width: none;

            .button-text {
              visibility: visible;
              max-width: 250px;
            }
          }
      `
          : ''
      }
    `
  }};
`

const ButtonV2 = ({
  ariaLabel,
  disabled = false,
  className,
  extend = false,
  icon,
  iconPosition = 'left',
  innerRef,
  isLoading = false,
  onClick,
  prominence = 'strong',
  size = 'large',
  text,
  tooltip,
  tooltipBaseId,
  type = 'button',
  variant = 'primary',
}: ButtonProps) => (
  <Tooltip id={tooltipBaseId} text={tooltip}>
    <StyledButton
      aria-disabled={disabled}
      aria-label={ariaLabel || text}
      className={className}
      ref={innerRef}
      variant={variant}
      size={size}
      extend={extend}
      prominence={variant === 'neutral' ? 'weak' : prominence}
      iconPosition={iconPosition}
      disabled={disabled || isLoading}
      onClick={!disabled && !isLoading ? onClick : undefined}
      type={type}
    >
      {icon && !isLoading && iconPosition === 'left' ? (
        <Icon name={icon} />
      ) : null}
      {text ? (
        <Text
          as="div"
          variant="body"
          color={variant}
          prominence={variant === 'neutral' ? 'default' : prominence}
          disabled={disabled}
          className="button-text"
        >
          {text}
        </Text>
      ) : null}
      {icon && !isLoading && iconPosition === 'right' ? (
        <Icon name={icon} />
      ) : null}
      {isLoading ? (
        <Loader
          active
          trailColor="transparent"
          color="currentColor"
          size="1em"
        />
      ) : null}
    </StyledButton>
  </Tooltip>
)

export const ForwattedButtonV2 = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'innerRef'>
>(
  // eslint-disable-next-line react/jsx-props-no-spreading
  (props, ref) => <ButtonV2 {...props} innerRef={ref} />,
)

ForwattedButtonV2.displayName = 'fwd(ButtonV2)'

export default ForwattedButtonV2
