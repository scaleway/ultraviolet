'use client'

import styled from '@emotion/styled'
import type {
  ChangeEvent,
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactNode,
  Ref,
} from 'react'
import { forwardRef, useCallback, useEffect, useId, useState } from 'react'
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

const StyledToggle = styled.div<{
  'data-checked': boolean
  'data-disabled': boolean
  size: 'small' | 'large'
  'data-error': boolean
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

  &[data-checked="true"] {
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

    &[data-checked="true"] {
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

    &[data-checked="true"] {
      background-color: ${({ theme }) => theme.colors.danger.backgroundStrong};
    }

    &[data-disabled="true"] {
      background-color: ${({ theme }) => theme.colors.danger.backgroundDisabled};

      &[data-checked="true"] {
        background-color: ${({ theme }) =>
          theme.colors.danger.backgroundStrongDisabled};
      }
    }
  }
`

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
      checked = false,
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
    const [state, setState] = useState(checked)
    const uniqueId = useId()

    const onLocalChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange?.(event)
        else setState(event.target.checked)
      },
      [onChange, setState],
    )

    useEffect(() => {
      setState(checked)
    }, [checked, setState])

    return (
      <Tooltip text={tooltip}>
        <StyledLabel
          aria-disabled={disabled}
          size={size}
          onClick={evt => evt.stopPropagation()}
          className={className}
          data-testid={dataTestId}
          labelPosition={labelPosition}
        >
          <Stack gap={0.25} alignItems="baseline">
            {label ? (
              <Row templateColumns="auto 1fr" gap={1} alignItems="center">
                {typeof label === 'string' ? (
                  <Text
                    as="span"
                    variant={size === 'large' ? 'body' : 'bodySmall'}
                    prominence="default"
                    sentiment="neutral"
                  >
                    {label}
                  </Text>
                ) : (
                  label
                )}
                {required ? (
                  <Text as="sup" variant="body" sentiment="danger">
                    *
                  </Text>
                ) : null}
              </Row>
            ) : null}
            {typeof error === 'string' ? (
              <Text
                as="p"
                variant="bodySmall"
                prominence="default"
                sentiment="danger"
                disabled={disabled}
              >
                {error}
              </Text>
            ) : null}
            {helper && !error ? (
              <Text
                as="p"
                variant="caption"
                prominence="weak"
                sentiment="neutral"
              >
                {helper}
              </Text>
            ) : null}
          </Stack>
          <StyledToggle
            size={size}
            data-checked={state}
            data-disabled={disabled}
            data-error={!!error}
          >
            <StyledCheckbox
              id={id || uniqueId}
              checked={state}
              aria-checked={state}
              disabled={disabled}
              name={name}
              onChange={onLocalChange}
              type="checkbox"
              ref={ref}
              value={value}
              aria-label={ariaLabel}
            />
          </StyledToggle>
        </StyledLabel>
      </Tooltip>
    )
  },
)
