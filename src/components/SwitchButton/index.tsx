import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import {
  ChangeEventHandler,
  FocusEventHandler,
  FunctionComponent,
  LabelHTMLAttributes,
  ReactNode,
} from 'react'
import { Radio } from 'reakit'
import Box, { BoxProps } from '../Box'
import Tooltip from '../Tooltip'

const variants = {
  segment: (theme: Theme) => css`
    &[data-variant='segment'] {
      font-size: 14;
      height: 40px;
      transition: none;
      border-radius: 4px;
      box-shadow: none;
      border-color: transparent;
      color: ${theme.colors.neutral.text};

      &:hover,
      &:focus {
        border-color: transparent;
        box-shadow: none;
      }

      &[aria-checked='true'] {
        background-color: ${theme.colors.primary.backgroundStrong};
        color: ${theme.colors.primary.textStrong};
      }

      &[aria-disabled='true'] {
        color: ${theme.colors.neutral.textWeakDisabled};

        &[aria-checked='true'] {
          color: ${theme.colors.neutral.textWeakDisabled};
          background-color: ${theme.colors.neutral.backgroundWeakDisabled};
        }
      }

      &:not([aria-checked='true']):not([aria-disabled='true']) {
        &:hover,
        &:focus {
          border-color: transparent;
          box-shadow: none;
        }
      }
    }
  `,
} as const

type Variants = keyof typeof variants

const switchButtonVariants = Object.keys(variants) as Variants[]

type StyledSwitchProps = BoxProps & LabelHTMLAttributes<HTMLLabelElement>

const StyledSwitch = styled(Box, {
  shouldForwardProp: prop => !['variant'].includes(prop.toString()),
})<StyledSwitchProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 4px;
  align-items: center;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.neutral.borderWeak};
  border-width: 1px;
  padding: 16px;
  transition: color 0.2s, border-color 0.2s, box-shadow 0.2s;
  user-select: none;
  touch-action: manipulation;
  color: ${({ theme }) => theme.colors.neutral.textWeak};
  font-size: 16px;
  line-height: 22px;
  position: relative;
  font-weight: 500;
  cursor: pointer;

  &[aria-checked='true'] {
    cursor: auto;
    color: ${({ theme }) => theme.colors.primary.text};
    border-color: ${({ theme }) => theme.colors.primary.border};
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.neutral.textWeakDisabled};
    background-color: ${({ theme }) =>
      theme.colors.neutral.backgroundWeakDisabled};
    border-color: ${({ theme }) => theme.colors.neutral.borderWeakDisabled};
    pointer-events: none;

    &[aria-checked='true'] {
      color: ${({ theme }) => theme.colors.neutral.textWeakDisabled};
      border-color: ${({ theme }) => theme.colors.neutral.borderWeakDisabled};
    }
  }

  &:not([aria-checked='true']):not([aria-disabled='true']) {
    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.border};
    }

    &:hover {
      box-shadow: 0 0 8px 2px
        ${({ theme }) => transparentize(0.9, theme.colors.primary.border)};
    }

    &:focus {
      box-shadow: 0 0 1px 2px
        ${({ theme }) => transparentize(0.9, theme.colors.primary.border)};
    }
  }

  ${({ theme }) => Object.values(variants).map(variantFn => variantFn(theme))}
`

const StyledRadio = styled(Radio)`
  position: absolute;
  opacity: 0.01;
`

type SwitchButtonProps = Omit<StyledSwitchProps, 'onChange'> & {
  children:
    | ReactNode
    | (({
        checked,
        disabled,
      }: {
        checked: boolean
        disabled: boolean
      }) => JSX.Element)
  name: string
  onBlur?: FocusEventHandler
  onChange: ChangeEventHandler
  onFocus?: FocusEventHandler
  tooltip?: string
  value: string
  checked?: boolean
  disabled?: boolean
  variant?: Variants
}

const SwitchButton: FunctionComponent<SwitchButtonProps> = ({
  checked = false,
  disabled = false,
  onChange,
  onFocus,
  onBlur,
  name,
  value,
  children,
  tooltip,
  variant,
  ...props
}) => (
  <Tooltip text={tooltip}>
    <StyledSwitch
      as="label"
      htmlFor={`${name}-${value}`}
      aria-checked={checked}
      aria-disabled={disabled}
      data-variant={variant}
      {...props}
    >
      {typeof children === 'function'
        ? children({ checked, disabled })
        : children}
      <StyledRadio
        checked={checked}
        disabled={disabled}
        id={`${name}-${value}`}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        type="radio"
        value={value}
      />
    </StyledSwitch>
  </Tooltip>
)

SwitchButton.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  tooltip: PropTypes.string,
  value: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(switchButtonVariants),
}

export default SwitchButton
