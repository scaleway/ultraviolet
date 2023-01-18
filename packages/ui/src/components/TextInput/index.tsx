import { css } from '@emotion/react'
import styled from '@emotion/styled'
import randomName from '@scaleway/random-name'
import type {
  ChangeEvent,
  FocusEventHandler,
  InputHTMLAttributes,
  KeyboardEventHandler,
  LabelHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Button } from '../Button'
import { Expandable } from '../Expandable'
import { Icon } from '../Icon'
import { Notice } from '../Notice'
import { Separator } from '../Separator'
import { Stack } from '../Stack'
import { Text } from '../Text'

const inputSizes = {
  medium: {
    default: `
      height: 48px;
      padding-left: 8px;
      padding-right: 20px;
      padding-top: 14px;
    `,
    full: `
      padding: 8px;
    `,
  },
  small: {
    default: `
      height: 30px;
      padding-left: 8px;
      padding-right: 8px;
      padding-top: 14px;
      font-size: 14px;
    `,
    full: `
      padding: 4px 8px;
    `,
  },
}

type TextInputSizes = keyof typeof inputSizes

export const textInputSizes = Object.keys(inputSizes) as TextInputSizes[]

const StyledSeparator = styled(Separator)`
  margin-top: 1px;
  height: calc(100% - 2px);
  background-color: ${({ theme: { colors } }) =>
    colors.neutral.backgroundStrong};
`
type StyledRightElementProps = {
  edit?: boolean
  touchable?: boolean
}

const StyledRightElement = styled('div', {
  shouldForwardProp: prop => !['edit', 'touchable'].includes(prop),
})<StyledRightElementProps>`
  ${({ theme: { colors, space } }) => css`
    pointer-events: none;
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    padding: 0 ${space['1']};
    display: flex;
    gap: ${space['1']};
    align-items: center;
    transition: transform 150ms, color 150ms;
    color: ${colors.neutral.textWeak};

    &:hover,
    &:focus-within {
      color: ${colors.neutral.textWeakHover};
    }
  `}

  ${({ touchable }) =>
    touchable &&
    css`
      pointer-events: auto;
      > button {
        box-shadow: none !important;
      }
    `}
`
type StyledLabelProps = {
  'aria-label'?: string
  'aria-live': string
  disabled?: boolean
  edit?: boolean
  error?: boolean
  readOnly?: boolean
  resizable?: boolean
  fillAvailable?: boolean
} & LabelHTMLAttributes<HTMLLabelElement>

const StyledLabel = styled('label', {
  shouldForwardProp: prop =>
    !['edit', 'error', 'resizable', 'fillAvailable'].includes(prop),
})<StyledLabelProps>`
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  padding-left: 8px;
  padding-right: 8px;
  pointer-events: none;
  color: ${({ theme: { colors } }) => colors.neutral.textWeak};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  height: 48px;
  font-size: 16px;
  transition: transform 150ms;
  transform: translate(0, 12px) scale(1);

  ${({ edit }) =>
    edit &&
    css`
      transform: translate(-9.6%, -3px) scale(0.8);
    `}

  ${({ disabled, theme: { colors } }) =>
    disabled &&
    css`
      color: ${colors.neutral.textDisabled};
    `}

  ${({ readOnly, theme: { colors } }) =>
    readOnly &&
    css`
      color: ${colors.neutral.textDisabled};
    `}

  ${({ error, theme: { colors } }) =>
    error &&
    css`
      color: ${colors.danger.textWeak};
    `}
`

const StyledRelativeDiv = styled.div`
  position: relative;
`

const StyledError = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger.textWeak};
  padding-top: ${({ theme }) => theme.space['0.25']};
`

const StyledNotice = styled(Notice)`
  margin-top: ${({ theme }) => theme.space['1']};
`

type StyledInputProps = {
  disabled?: boolean
  error?: boolean
  fillAvailable?: boolean
  hasLabel?: boolean
  hasRightElement?: boolean
  rightElementPadding?: number
  isPlaceholderVisible?: boolean
  multiline?: boolean
  resizable?: boolean
  inputSize: TextInputSizes
} & (
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
)

type InputProps = Omit<
  Exclude<StyledInputProps, TextareaHTMLAttributes<HTMLTextAreaElement>>,
  'inputSize'
>

const ExpandableWithHiddenOverflow = styled(Expandable)`
  overflow: hidden;
`

const StyledInput = styled('input', {
  shouldForwardProp: prop =>
    ![
      'as',
      'error',
      'fillAvailable',
      'hasLabel',
      'hasRightElement',
      'isPlaceholderVisible',
      'multiline',
      'resizable',
      'inputSize',
      'rightElementPadding',
    ].includes(prop),
})<StyledInputProps>`
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  appearance: none;
  background-color: ${({ theme: { colors } }) => colors.neutral.backgroundWeak};
  background-image: none;
  border: 1px solid ${({ theme: { colors } }) => colors.neutral.borderWeak};
  border-radius: ${({ theme: { radii } }) => radii.default};
  color: ${({ theme: { colors } }) => colors.neutral.text};
  display: block;
  max-width: 100%;
  outline: none;
  position: relative;
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 14px;
  font-size: 16px;
  line-height: 24px;

  &::placeholder {
    color: ${({ theme: { colors } }) => colors.neutral.textWeak};
    opacity: 0;
  }

  &:hover,
  &:focus {
    border-color: ${({ theme: { colors } }) => colors.primary.borderWeakHover};
  }

  &:focus {
    box-shadow: ${({ theme: { shadows } }) => shadows.focusPrimary};
    border-color: ${({ theme: { colors } }) => colors.primary.borderWeakHover};
  }

  ${({ isPlaceholderVisible }) =>
    isPlaceholderVisible &&
    `&::placeholder {
      opacity: 1;
    }`}

  ${({ disabled, theme: { colors } }) =>
    disabled &&
    `cursor: default;
    pointer-events: none;
    background-color: ${colors.neutral.backgroundDisabled};
    border-color: ${colors.neutral.borderDisabled};
    color: ${colors.neutral.textDisabled};`}

  ${({ readOnly, theme: { colors } }) =>
    readOnly &&
    `background-color: ${colors.neutral.backgroundDisabled};
    border-color: ${colors.neutral.borderDisabled};
    color: ${colors.neutral.text};`}

  ${({ inputSize }) => inputSizes[inputSize]?.default}

  ${({ inputSize, hasLabel }) =>
    !!inputSize && !hasLabel && inputSizes[inputSize]?.full}

  ${({ error, theme: { colors, shadows } }) =>
    error &&
    `border-color: ${colors.danger.borderWeak};

    &:hover,
    &:focus {
      border-color: ${colors.danger.borderHover};
    }

    &:focus {
      box-shadow: ${shadows.focusDanger};
      border-color: ${colors.danger.borderWeakHover};
    }`}

    ${({ multiline, resizable, fillAvailable }) =>
    multiline &&
    `
    padding-top: 20px;
    height: ${fillAvailable ? '100%' : 'initial'};
    resize: ${resizable === false ? 'none' : 'vertical'};
  `}

  ${({ multiline, hasLabel }) =>
    multiline &&
    !hasLabel &&
    `
    padding-top: 8px;
  `}

  ${({ hasRightElement, rightElementPadding }) =>
    hasRightElement &&
    `
    padding-right: ${rightElementPadding || 32}px;
  `}
`

const RightComponent = styled(Stack)`
  min-width: 24px;
`

type TextInputProps = {
  'data-testid'?: string
  ariaControls?: string
  autoComplete?: string
  autoFocus?: boolean
  className?: string
  cols?: number
  defaultValue?: string
  disabled?: boolean
  edit?: boolean
  error?: string
  fillAvailable?: boolean
  generated?: boolean
  height?: string | number
  id?: string
  label?: string
  multiline?: boolean
  name?: string
  notice?: string
  noTopLabel?: boolean
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onChange?: (value: string) => void
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onKeyUp?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  placeholder?: string
  random?: string
  readOnly?: boolean
  required?: boolean
  resizable?: boolean
  rows?: number
  size?: TextInputSizes
  tabIndex?: number
  type?: string
  unit?: string
  valid?: boolean
  value?: string | number
  wrap?: string
  inputProps?: InputProps
  max?: InputHTMLAttributes<HTMLInputElement>['max']
  min?: InputHTMLAttributes<HTMLInputElement>['min']
} & (
  | Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>
  | Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>
)

const UnitLabel = styled(Text)`
  padding: ${({ theme }) => theme.space['1']} 0;
  line-height: 18px;
`

export const TextInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | null,
  TextInputProps
>(
  (
    {
      'data-testid': dataTestId,
      ariaControls,
      autoComplete = 'on',
      autoFocus,
      className,
      cols,
      defaultValue,
      disabled,
      edit: forceEdit,
      error,
      fillAvailable,
      generated,
      height,
      id,
      label,
      multiline,
      name,
      notice,
      noTopLabel = false,
      onBlur,
      onChange,
      onFocus,
      onKeyUp,
      onKeyDown,
      placeholder,
      random,
      readOnly,
      required,
      resizable,
      rows,
      size = 'medium',
      tabIndex,
      type = 'text',
      unit,
      valid,
      value,
      wrap,
      inputProps,
    },
    ref,
  ): JSX.Element => {
    const controlRef = useRef<HTMLInputElement>(null)

    const [visited, setVisited] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const togglePasswordVisibility = useCallback(
      () => setPasswordVisible(x => !x),
      [],
    )

    // Forward ref to parent ref
    useImperativeHandle<unknown, unknown>(ref, () => controlRef, [])

    // Focus when password is visible
    useEffect(() => {
      if (passwordVisible) {
        controlRef?.current?.focus()
      }
    }, [passwordVisible])

    const handlePassVisibilityClick = useCallback(
      () => togglePasswordVisibility(),
      [togglePasswordVisibility],
    )

    const handlePassVisiblityKeyDown: KeyboardEventHandler<
      HTMLButtonElement | HTMLDivElement
    > = useCallback(
      event => {
        const keyCode = event.key.charCodeAt(0)
        // SPACE key is pressed
        if (keyCode === 32) {
          event.preventDefault()
          togglePasswordVisibility()
        }
      },
      [togglePasswordVisibility],
    )

    const randomize = useCallback(
      () => onChange?.(randomName(random)),
      [onChange, random],
    )

    const handleClickRandomize = useCallback(() => randomize(), [randomize])

    const handleKeyDownRandomize: KeyboardEventHandler<
      HTMLButtonElement | HTMLDivElement
    > = useCallback(
      event => {
        const keyCode = event.key.charCodeAt(0)
        // SPACE key is pressed
        if (keyCode === 32) {
          event.preventDefault()
          randomize()
        }
      },
      [randomize],
    )

    const handleFocus: FocusEventHandler<
      HTMLInputElement | HTMLTextAreaElement
    > = useCallback(
      event => {
        if (!visited && !readOnly) {
          setVisited(true)
        }

        if (onFocus) {
          onFocus(event)
        }
      },
      [visited, readOnly, onFocus],
    )

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        onChange?.(event.target.value),
      [onChange],
    )

    const isPassToggleable = type === 'toggleable-password'
    const hasLabel = !!label && !noTopLabel && size === 'medium'
    const edit =
      hasLabel && (forceEdit || visited || value || error || generated)

    const isPlaceholderVisible = !hasLabel || !!edit
    const hasRightElement = !!(
      valid !== undefined ||
      isPassToggleable ||
      random ||
      unit
    )

    // Set the right padding to 22px when the TextInput is required. 22px allows
    // keeping the required star icon centered, since it is smaller than valid or
    // unit icons which have a right padding of 32px.
    const rightElementPadding = required ? 22 : undefined

    const getType = () => {
      if (isPassToggleable) {
        return passwordVisible || generated ? 'text' : 'password'
      }

      return multiline ? undefined : type
    }

    const inputSize = size

    const rightComponentsArray = useMemo(() => {
      const rightComponents = []

      if (isPassToggleable && !generated) {
        rightComponents.push(
          <Button
            action
            onClick={handlePassVisibilityClick}
            onKeyDown={handlePassVisiblityKeyDown}
            title={passwordVisible ? 'Hide' : 'Show'}
            variant="transparent"
            icon={passwordVisible ? 'eye-off' : 'eye'}
          />,
        )
      }
      if (random) {
        rightComponents.push(
          <Button
            action
            onClick={handleClickRandomize}
            onKeyDown={handleKeyDownRandomize}
            disabled={disabled}
            title="Randomize"
            icon="auto-fix"
            variant="transparent"
          />,
        )
      }
      if (valid === false || valid === true) {
        rightComponents.push(
          <Icon
            name={!valid ? 'close' : 'check'}
            color={!valid ? 'danger' : 'success'}
            size={20}
          />,
        )
      }
      if (unit) {
        rightComponents.push(
          <UnitLabel variant="bodySmall" as="p" prominence="weak">
            {unit}
          </UnitLabel>,
        )
      }

      return rightComponents
    }, [
      disabled,
      generated,
      handleClickRandomize,
      handleKeyDownRandomize,
      handlePassVisibilityClick,
      handlePassVisiblityKeyDown,
      isPassToggleable,
      passwordVisible,
      random,
      unit,
      valid,
    ])

    return (
      <div className={className}>
        <StyledRelativeDiv>
          <StyledInput
            aria-controls={ariaControls}
            aria-label={label || undefined}
            aria-labelledby={hasLabel ? ariaControls : undefined}
            as={multiline ? 'textarea' : 'input'}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            cols={cols}
            data-testid={dataTestId}
            defaultValue={defaultValue}
            disabled={disabled}
            error={!!error}
            fillAvailable={fillAvailable}
            hasLabel={hasLabel}
            hasRightElement={hasRightElement}
            rightElementPadding={rightElementPadding}
            id={id}
            inputSize={inputSize}
            isPlaceholderVisible={isPlaceholderVisible}
            multiline={multiline}
            name={name}
            onBlur={onBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            readOnly={readOnly}
            ref={controlRef}
            resizable={resizable}
            rows={rows}
            style={{ height }}
            tabIndex={tabIndex}
            type={getType()}
            value={value}
            wrap={wrap}
            {...inputProps}
          />
          {hasLabel && (
            <StyledLabel
              edit={!!edit}
              disabled={disabled}
              readOnly={readOnly}
              error={!!error}
              id={ariaControls}
              htmlFor={id}
              aria-live="assertive"
            >
              {label}
            </StyledLabel>
          )}

          {hasRightElement || required ? (
            <StyledRightElement
              edit={!!edit}
              touchable={isPassToggleable || !!random}
            >
              {required ? (
                <Icon name="asterisk" color="danger" size={10} />
              ) : null}
              {(required && hasRightElement) || unit ? (
                <StyledSeparator direction="vertical" />
              ) : null}
              {rightComponentsArray.length > 0 ? (
                <RightComponent
                  justifyContent="center"
                  direction="row"
                  alignItems="center"
                >
                  {rightComponentsArray}
                </RightComponent>
              ) : null}
            </StyledRightElement>
          ) : null}
        </StyledRelativeDiv>
        <ExpandableWithHiddenOverflow height={56} opened={!!error}>
          <StyledError>{error}</StyledError>
        </ExpandableWithHiddenOverflow>
        {notice ? <StyledNotice>{notice}</StyledNotice> : null}
      </div>
    )
  },
)
