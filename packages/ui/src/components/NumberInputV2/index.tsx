import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { ForwardedRef, InputHTMLAttributes, ReactNode } from 'react'
import {
  createRef,
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useMemo,
} from 'react'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

const SIZES = {
  small: '34px',
  medium: '40px',
  large: '48px',
}

type Sizes = keyof typeof SIZES

const SideContainer = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop),
})<{ size: Sizes }>`
  &[data-position='left'] {
    border-right: 1px solid ${({ theme }) => theme.colors.neutral.border};
    border-radius: ${({ theme }) => theme.radii.default} 0 0
      ${({ theme }) => theme.radii.default};
  }

  &[data-position='right'] {
    border-left: 1px solid ${({ theme }) => theme.colors.neutral.border};
    border-radius: 0 ${({ theme }) => theme.radii.default}
      ${({ theme }) => theme.radii.default} 0;
  }

  padding: ${({ theme, size }) =>
    size === 'large'
      ? theme.space['1']
      : `${theme.space['0.5']} ${theme.space['1']}`};
`

const Unit = styled(Text)`
  padding: 0 ${({ theme }) => theme.space['1']};
`

const Input = styled('input', {
  shouldForwardProp: prop => !['unit'].includes(prop),
})<{ unit?: string }>`
  outline: none;
  border: none;
  text-align: center;
  padding: 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.neutral.text};

  ${({ unit, theme }) =>
    unit
      ? `padding-left: calc(${unit.length} * ${theme.typography.body.fontSize} + ${theme.space['1']});`
      : ''}

  // Remove native arrows from input[type=number]
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & {
    -moz-appearance: textfield;
  }

  &[data-size='small'] {
    height: ${SIZES.small};
  }

  &[data-size='medium'] {
    height: ${SIZES.medium};
  }

  &[data-size='large'] {
    height: ${SIZES.large};
  }

  &:read-only {
    color: ${({ theme }) => theme.colors.neutral.text};
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    cursor: not-allowed;
  }

  &:placeholder-shown ~ ${Unit} {
    color: ${({ theme }) => theme.colors.neutral.textWeak};
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

    & ${SideContainer} {
      border-color: ${({ theme }) => theme.colors.primary.borderHover};
    }
  }

  &[data-success='true'] {
    border-color: ${({ theme }) => theme.colors.success.border};

    & ${SideContainer} {
      border-color: ${({ theme }) => theme.colors.success.border};
    }
  }

  &[data-error='true'] {
    border-color: ${({ theme }) => theme.colors.danger.border};

    & ${SideContainer} {
      border-color: ${({ theme }) => theme.colors.danger.border};
    }
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};

    & ${SideContainer} {
      border-color: ${({ theme }) => theme.colors.primary.borderHover};
    }
  }

  &[data-readOnly='true'] {
    border-color: ${({ theme }) => theme.colors.neutral.border};
    box-shadow: none;

    & ${SideContainer} {
      border-color: ${({ theme }) => theme.colors.neutral.border};
      background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
      cursor: not-allowed;
    }
  }

  &[data-disabled='true'] {
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};

    & ${SideContainer} {
      border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
      background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
      cursor: not-allowed;
    }
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
  error?: string
  success?: string
  helper?: string
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'onChange'
  | 'value'
  | 'defaultValue'
  | 'onFocus'
  | 'onBlur'
  | 'name'
  | 'id'
  | 'placeholder'
  | 'aria-label'
  | 'aria-describedby'
  | 'min'
  | 'max'
  | 'disabled'
  | 'step'
  | 'readOnly'
  | 'required'
  | 'autoFocus'
>

/**
 * NumberInputV2 component is used to increment / decrement a number value by clicking on + / - buttons or
 * by typing into input.
 */
export const NumberInputV2 = forwardRef(
  (
    {
      disabled = false,
      max = Infinity,
      min = 0,
      name,
      onChange,
      onFocus,
      onBlur,
      size = 'medium',
      step,
      unit,
      value,
      tooltip,
      className,
      label,
      labelDescription,
      id,
      placeholder,
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
    const localRef = createRef<HTMLInputElement>()
    useImperativeHandle(ref, () => localRef.current as HTMLInputElement)

    console.log(unit, unit?.length)

    const uniqueId = useId()
    const localId = id ?? uniqueId

    const onClickSideButton = useCallback(
      (direction: 'up' | 'down') => () => {
        if (direction === 'up') {
          localRef.current?.stepUp()
        }

        if (direction === 'down') {
          localRef.current?.stepDown()
        }
      },
      [localRef],
    )

    const helperSentiment = useMemo(() => {
      if (error) {
        return 'danger'
      }

      if (success) {
        return 'success'
      }

      return 'neutral'
    }, [error, success])

    return (
      <Stack gap="0.5">
        <Stack direction="row" gap="1" alignItems="center">
          <Stack direction="row" gap="0.5" alignItems="start">
            <Text
              as="label"
              variant="bodySmallStrong"
              sentiment="neutral"
              htmlFor={id ?? localId}
            >
              {label}
            </Text>
            {required ? <Icon name="asterisk" color="danger" size={8} /> : null}
          </Stack>
          {labelDescription ?? null}
        </Stack>
        <div>
          <Tooltip text={tooltip}>
            <Container
              data-disabled={disabled}
              data-readOnly={readOnly}
              data-error={!!error}
              data-success={!!success}
              className={className}
            >
              <SideContainer size={size} data-position="left">
                <Button
                  sentiment="neutral"
                  variant="ghost"
                  icon="minus"
                  size={size === 'small' ? 'xsmall' : 'small'}
                  disabled={disabled || readOnly}
                  onClick={onClickSideButton('down')}
                />
              </SideContainer>
              <Stack
                direction="row"
                justifyContent="space-between"
                flex={1}
                alignItems="center"
              >
                <Input
                  ref={localRef}
                  type="number"
                  name={name}
                  id={localId}
                  placeholder={placeholder}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  onChange={onChange}
                  value={value}
                  data-size={size}
                  step={step}
                  disabled={disabled}
                  aria-label={ariaLabel}
                  data-testid={dataTestId}
                  min={min}
                  max={max}
                  required={required}
                  autoFocus={autoFocus}
                  readOnly={readOnly}
                  unit={unit}
                />
                {unit ? (
                  <Unit
                    variant="body"
                    sentiment="neutral"
                    as="span"
                    disabled={disabled}
                  >
                    {unit}
                  </Unit>
                ) : null}
              </Stack>
              <SideContainer size={size} data-position="right">
                <Button
                  sentiment="neutral"
                  variant="ghost"
                  icon="plus"
                  size={size === 'small' ? 'xsmall' : 'small'}
                  disabled={disabled || readOnly}
                  onClick={onClickSideButton('up')}
                />
              </SideContainer>
            </Container>
          </Tooltip>
        </div>
        {error || success || helper ? (
          <Text
            variant="caption"
            as="span"
            prominence="weak"
            sentiment={helperSentiment}
          >
            {error || success || helper}
          </Text>
        ) : null}
      </Stack>
    )
  },
)
