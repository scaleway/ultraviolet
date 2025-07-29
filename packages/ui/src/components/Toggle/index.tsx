'use client'

import styled from '@emotion/styled'
import type {
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactNode,
  Ref,
} from 'react'
import { forwardRef, useId } from 'react'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

export const SIZES = {
  large: {
    ball: '200', // sizing token from theme
    height: '300',
    width: '600',
  },
  small: {
    ball: '150',
    height: '250',
    width: '500',
  },
} as const

const StyledCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &[disabled] {
    cursor: not-allowed;
  }
`

const StyledToggle = styled.div<{
  size: 'small' | 'large'
}>`
  box-sizing: content-box;
  outline: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  border: none;
  border-radius: ${({ theme }) => theme.radii.xlarge};
  position: relative;
  transition: all 300ms;
  background-color: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  width: ${({ size, theme }) => theme.sizing[SIZES[size].width]};
  height: ${({ size, theme }) => theme.sizing[SIZES[size].height]};

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.neutral.backgroundStrongHover};
  }

  &:after {
    content: "";
    position: absolute;
    top: ${({ size, theme }) => `calc(${theme.sizing[SIZES[size].height]} / 2 - ${theme.sizing[SIZES[size].ball]} / 2)`};
    left: 5px;
    width: ${({ size, theme }) => theme.sizing[SIZES[size].ball]};
    height: ${({ size, theme }) => theme.sizing[SIZES[size].ball]};
    border-radius: ${({ theme }) => theme.radii.circle};
    background-color: ${({ theme }) => theme.colors.neutral.background};
    transition: all 300ms;
  }

  &:focus-within,
  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.focusNeutral};
  }

  &[data-disabled="false"]:active:after {
    width: ${({ size, theme }) => `calc(${theme.sizing[SIZES[size].ball]} * 1.3775)`};
  }

  &:has(:checked) {
    color: ${({ theme }) => theme.colors.neutral.textStrong};
    background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};

    &:hover {
      background-color: ${({ theme }) =>
        theme.colors.primary.backgroundStrongHover};
    }

    &:after {
      left: calc(100% - 5px);
      transform: translateX(-100%);
    }

    &:focus-within,
    &:focus {
      box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
    }
  }

  &[data-disabled="true"] {
    background: ${({ theme }) => theme.colors.neutral.backgroundStrongDisabled};

    &:has(:checked) {
      background: ${({ theme }) =>
        theme.colors.primary.backgroundStrongDisabled};
    }
  }

  &[data-error="true"] {
    background-color: ${({ theme }) => theme.colors.danger.background};

    &:focus-within,
    &:focus {
      box-shadow: ${({ theme }) => theme.shadows.focusDanger};
    }

    &:has(:checked) {
      background-color: ${({ theme }) => theme.colors.danger.backgroundStrong};
    }

    &[data-disabled="true"] {
      background-color: ${({ theme }) => theme.colors.danger.backgroundDisabled};

      &:has(:checked) {
        background-color: ${({ theme }) =>
          theme.colors.danger.backgroundStrongDisabled};
      }
    }
  }
`

const StyledLabel = styled.label<{
  size: 'small' | 'large'
  labelPosition: 'left' | 'right'
}>`
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
  align-items: start;
  width: fit-content;
  cursor: pointer;
  flex-direction: ${({ labelPosition }) =>
    labelPosition === 'left' ? 'row' : 'row-reverse'};

  &:active ${StyledToggle}[data-disabled='false']:after {
  width: ${({ size, theme }) => `calc(${theme.sizing[SIZES[size].ball]} * 1.3775)`};
  }

  &[aria-disabled="true"] {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
  }
`

type ToggleProps = {
  id?: string
  checked?: boolean
  name?: string
  tooltip?: string
  /**
   * If `onChange` is given component will work as a controlled component if not it will work as an uncontrolled component.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>
  size?: 'large' | 'small'
  labelPosition?: 'left' | 'right'
  label?: ReactNode
  'aria-label'?: string
  helper?: ReactNode
  disabled?: boolean
  className?: string
  required?: boolean
  error?: boolean | string
  'data-testid'?: string
} & Pick<InputHTMLAttributes<HTMLInputElement>, 'value'>

/**
 * Toggle component is used to toggle between two states (on/off, true/false, etc.).
 */
export const Toggle = forwardRef(
  (
    {
      checked,
      disabled = false,
      id,
      name,
      onChange,
      size = 'large',
      tooltip,
      labelPosition = 'right',
      label,
      helper,
      required,
      className,
      'data-testid': dataTestId,
      value,
      error,
      'aria-label': ariaLabel,
    }: ToggleProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const uniqueId = useId()

    return (
      <Tooltip text={tooltip}>
        <StyledLabel
          aria-disabled={disabled}
          className={className}
          data-testid={dataTestId}
          labelPosition={labelPosition}
          size={size}
        >
          <Stack alignItems="baseline" gap={0.25}>
            {label ? (
              <Row alignItems="center" gap={1} templateColumns="auto 1fr">
                {typeof label === 'string' ? (
                  <Text
                    as="span"
                    prominence="default"
                    sentiment="neutral"
                    variant={size === 'large' ? 'body' : 'bodySmall'}
                  >
                    {label}
                  </Text>
                ) : (
                  label
                )}
                {required ? (
                  <Text as="sup" sentiment="danger" variant="body">
                    *
                  </Text>
                ) : null}
              </Row>
            ) : null}
            {typeof error === 'string' ? (
              <Text
                as="p"
                disabled={disabled}
                prominence="default"
                sentiment="danger"
                variant="bodySmall"
              >
                {error}
              </Text>
            ) : null}
            {helper && !error ? (
              <Text
                as="p"
                prominence="weak"
                sentiment="neutral"
                variant="caption"
              >
                {helper}
              </Text>
            ) : null}
          </Stack>
          <StyledToggle
            data-disabled={disabled}
            data-error={!!error}
            size={size}
          >
            <StyledCheckbox
              aria-invalid={!!error}
              aria-label={ariaLabel}
              checked={checked}
              disabled={disabled}
              id={id ?? uniqueId}
              name={name}
              onChange={onChange}
              ref={ref}
              required={required}
              type="checkbox"
              value={value}
            />
          </StyledToggle>
        </StyledLabel>
      </Tooltip>
    )
  },
)
