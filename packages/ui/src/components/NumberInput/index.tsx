'use client'

import styled from '@emotion/styled'
import { MinusIcon, PlusIcon } from '@ultraviolet/icons'
import type { ForwardedRef, InputHTMLAttributes, ReactNode } from 'react'
import {
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import { Button } from '../Button'
import { Label } from '../Label'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

const SIZES = {
  large: '600',
  medium: '500',
  small: '400', // sizing theme tokens key
} as const

type Sizes = keyof typeof SIZES

const SideContainer = styled(Stack)`
  padding: ${({ theme }) => `${theme.space['0.25']} ${theme.space['1']}`};

  &[data-size='small'] {
    height: ${({ theme }) => theme.sizing[SIZES.small]};
  }

  &[data-size='medium'] {
    height: ${({ theme }) => theme.sizing[SIZES.medium]};
  }

  &[data-size='large'] {
    height: ${({ theme }) => theme.sizing[SIZES.large]};
    padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['1']}`};
  }
`

const InputContainer = styled(Row)`
  border-width: 0 1px 0 1px;
  border-style: solid;
  border-color: inherit;
  background: inherit;
  width: 100%;
`

const Unit = styled(Text, {
  shouldForwardProp: prop => !['size'].includes(prop),
})<{ size: Sizes }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space['1']};
  height: ${({ size }) =>
    ({ theme }) =>
      theme.sizing[SIZES[size]]};
  font-size: ${({ theme, size }) =>
    size === 'large'
      ? theme.typography.body.fontSize
      : theme.typography.bodySmall.fontSize};
`

const Input = styled.input`
  outline: none;
  border: none;
  padding: 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.neutral.text};
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
  font-family: ${({ theme }) => theme.typography.bodySmall.fontFamily};
  font-weight: ${({ theme }) => theme.typography.bodySmall.fontWeight};
  line-height: ${({ theme }) => theme.typography.bodySmall.lineHeight};
  text-align: center;
  padding: ${({ theme }) => theme.space['1']};
  background: none;

  &[data-has-unit='true'] {
    text-align: left;
    padding: ${({ theme }) =>
      `${theme.space['1']} 0 ${theme.space['1']} ${theme.space['1']}`};
  }

  // Remove native arrows from input[type=number]
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  &[data-size='small'] {
    height: ${({ theme }) => theme.sizing[SIZES.small]};
  }

  &[data-size='medium'] {
    height: ${({ theme }) => theme.sizing[SIZES.medium]};
  }

  &[data-size='large'] {
    height: ${({ theme }) => theme.sizing[SIZES.large]};
    font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};

  }

  &:read-only {
    color: ${({ theme }) => theme.colors.neutral.text};
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    border-block: 1px solid ${({ theme }) => theme.colors.neutral.border};

    & ~ ${Unit} {
      background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    }
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    cursor: not-allowed;
    border-block: 1px solid ${({ theme }) => theme.colors.neutral.borderDisabled};

    & ~ ${Unit} {
      background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
      cursor: not-allowed;
      user-select: none;
    }
  }

  &:placeholder-shown ~ ${Unit} {
    color: ${({ theme }) => theme.colors.neutral.textWeak};
    font-size: ${({ theme }) => theme.typography.body.fontSize}
  }

  &[data-controls='false'] {
  text-align: left;
}
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
  }

  &[data-success='true'] {
    border-color: ${({ theme }) => theme.colors.success.border};
  }

  &[data-error='true'] {
    border-color: ${({ theme }) => theme.colors.danger.border};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
  }

  &[data-readonly='true'] {
    border-color: ${({ theme }) => theme.colors.neutral.border};
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    cursor: not-allowed;
  }

  &[data-disabled='true'] {
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    cursor: not-allowed;
  }

  &[data-controls='false'] {
    & > ${InputContainer} {
          border-width: 0;
    };
  }

  &[data-size='small'] {
    height: ${({ theme }) => theme.sizing[SIZES.small]};
  }

  &[data-size='medium'] {
    height: ${({ theme }) => theme.sizing[SIZES.medium]};
  }

  &[data-size='large'] {
    height: ${({ theme }) => theme.sizing[SIZES.large]};
  }
`

type NumberInputProps = {
  size?: Sizes
  /**
   * Text displayed into component at the right of number value.
   */
  unit?: string
  tooltip?: string
  className?: string
  'data-testid'?: string
  label?: string
  /**
   * Label description displayed right next to the label. It allows you to customize the label content.
   */
  labelDescription?: ReactNode
  /**
   * Whether to show controls
   */
  controls?: boolean
  error?: string
  success?: string | boolean
  helper?: ReactNode
  value?: number | null
  onChange?: (newValue: number | null) => void
  min?: number
  max?: number
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'onFocus'
  | 'onBlur'
  | 'name'
  | 'id'
  | 'placeholder'
  | 'aria-label'
  | 'disabled'
  | 'step'
  | 'readOnly'
  | 'required'
  | 'autoFocus'
>

/**
 * NumberInput component is used to increment / decrement a number value by clicking on + / - buttons or
 * by typing into input. If the value is out of the min / max range, the input will automatically be the min / max value on blur.
 */
export const NumberInput = forwardRef(
  (
    {
      disabled = false,
      max = Number.MAX_SAFE_INTEGER,
      min = 0,
      name,
      onChange,
      onFocus,
      onBlur,
      size = 'large',
      step,
      unit,
      value,
      tooltip,
      className,
      label,
      labelDescription,
      id,
      controls = true,
      placeholder = '',
      error,
      success,
      helper,
      'aria-label': ariaLabel,
      'data-testid': dataTestId,
      required,
      autoFocus,
      readOnly,
    }: NumberInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const localRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => localRef.current as HTMLInputElement)

    const uniqueId = useId()
    const localId = id ?? uniqueId

    const onClickSideButton = useCallback(
      (direction: 'up' | 'down') => () => {
        if (direction === 'up') {
          localRef.current?.stepUp()
        } else if (direction === 'down') {
          localRef.current?.stepDown()
        }
        onChange?.(Number.parseFloat(localRef.current?.value ?? '') ?? min)
      },
      [localRef, min, onChange],
    )

    const isMinusDisabled = useCallback(() => {
      if (!localRef?.current?.value || localRef?.current?.value === '') {
        return false
      }

      const numericValue = Number(localRef?.current?.value)
      if (Number.isNaN(numericValue)) {
        return false
      }

      const minValue = typeof min === 'number' ? min : Number(min)

      return Number.isNaN(numericValue) || numericValue <= minValue
    }, [localRef?.current?.value, min])

    const isPlusDisabled = useCallback(() => {
      if (!localRef?.current?.value || localRef?.current?.value === '') {
        return false
      }

      const numericValue = Number(localRef?.current?.value)
      if (Number.isNaN(numericValue)) {
        return false
      }

      const maxValue = typeof max === 'number' ? max : Number(max)

      return numericValue >= maxValue
    }, [localRef?.current?.value, max])

    const helperSentiment = useMemo(() => {
      if (error) {
        return 'danger'
      }

      if (success) {
        return 'success'
      }

      return 'neutral'
    }, [error, success])

    let inputValue: string | undefined
    if (value !== undefined) {
      inputValue =
        value !== null && typeof value === 'number' ? value.toString() : ''

      if (localRef.current) {
        localRef.current.value = inputValue
      }
    }

    return (
      <Stack className={className} gap="0.5">
        {label || labelDescription ? (
          <Label
            htmlFor={id ?? localId}
            labelDescription={labelDescription}
            required={required}
            size={size}
          >
            {label}
          </Label>
        ) : null}
        <div>
          <Tooltip text={tooltip}>
            <Container
              data-controls={controls}
              data-disabled={disabled}
              data-error={!!error}
              data-readonly={readOnly}
              data-size={size}
              data-success={!!success}
              data-unit={!!unit}
            >
              {controls ? (
                <SideContainer
                  alignItems="center"
                  data-size={size}
                  justifyContent="center"
                >
                  <Button
                    aria-label="minus"
                    disabled={disabled || readOnly || isMinusDisabled()}
                    onClick={onClickSideButton('down')}
                    sentiment="neutral"
                    size={size === 'small' ? 'xsmall' : 'small'}
                    variant="ghost"
                  >
                    <MinusIcon size={size === 'large' ? 'small' : 'small'} />
                  </Button>
                </SideContainer>
              ) : null}
              <InputContainer
                alignItems="center"
                justifyContent="space-between"
                templateColumns="1fr auto"
              >
                <Input
                  aria-label={ariaLabel}
                  autoFocus={autoFocus}
                  data-controls={controls}
                  data-has-unit={!!unit}
                  data-size={size}
                  data-testid={dataTestId}
                  disabled={disabled}
                  id={localId}
                  max={max}
                  min={min}
                  name={name}
                  onBlur={event => {
                    if (value && value > max) {
                      onChange?.(max)
                    } else if (value && value < min) {
                      onChange?.(min)
                    }
                    onBlur?.(event)
                  }}
                  onChange={
                    onChange
                      ? event => {
                          const newNumber = Number.parseFloat(
                            event.target.value,
                          )
                          onChange(Number.isNaN(newNumber) ? null : newNumber)
                        }
                      : undefined
                  }
                  onFocus={onFocus}
                  placeholder={placeholder}
                  readOnly={readOnly}
                  ref={localRef}
                  required={required}
                  step={step}
                  type="number"
                  value={inputValue}
                />
                {unit ? (
                  <Unit
                    as="span"
                    disabled={disabled}
                    sentiment="neutral"
                    size={size}
                    variant="body"
                  >
                    {unit}
                  </Unit>
                ) : null}
              </InputContainer>
              {controls ? (
                <SideContainer
                  alignItems="center"
                  data-size={size}
                  justifyContent="center"
                >
                  <Button
                    aria-label="plus"
                    disabled={disabled || readOnly || isPlusDisabled()}
                    onClick={onClickSideButton('up')}
                    sentiment="neutral"
                    size={size === 'small' ? 'xsmall' : 'small'}
                    variant="ghost"
                  >
                    <PlusIcon size={size === 'large' ? 'small' : 'small'} />
                  </Button>
                </SideContainer>
              ) : null}
            </Container>
          </Tooltip>
        </div>
        {error || typeof success === 'string' || typeof helper === 'string' ? (
          <Text
            as="span"
            disabled={disabled || readOnly}
            prominence={!error && !success ? 'weak' : 'default'}
            sentiment={helperSentiment}
            variant="caption"
          >
            {error || success || helper}
          </Text>
        ) : null}
        {!error && !success && typeof helper !== 'string' && helper
          ? helper
          : null}
      </Stack>
    )
  },
)
