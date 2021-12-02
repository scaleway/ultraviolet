import { css } from '@emotion/react'
import styled from '@emotion/styled'
import randomName from '@scaleway/random-name'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, {
  ChangeEvent,
  FocusEventHandler,
  InputHTMLAttributes,
  KeyboardEventHandler,
  LabelHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import Box, { XStyledProps } from '../Box'
import Expandable from '../Expandable'
import Icon from '../Icon'
import Notice from '../Notice'
import Separator from '../Separator'
import Touchable from '../Touchable'
import Typography from '../Typography'

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

type TextBoxSizes = keyof typeof inputSizes

export const textBoxSizes = Object.keys(inputSizes) as TextBoxSizes[]

const StyledSeparator = styled(Separator)`
  margin-right: 8px;
  margin-top: 1px;
  height: calc(100% - 2px);
  background-color: ${({ theme: { colorsDeprecated } }) =>
    colorsDeprecated.gray350};
`
type StyledRightElementProps = {
  edit?: boolean
  touchable?: boolean
  unit?: string
}

const StyledRightElement = styled('div', {
  shouldForwardProp: props =>
    !['edit', 'touchable', 'unit'].includes(props.toString()),
})<StyledRightElementProps>`
  ${({ theme: { colorsDeprecated } }) => css`
    pointer-events: none;
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    padding: 8px;
    display: flex;
    align-items: center;
    transition: transform 150ms, color 150ms;
    color: ${colorsDeprecated.gray550};

    &:hover,
    &:focus-within {
      color: ${colorsDeprecated.gray700};
    }
  `}

  ${({ edit }) =>
    edit &&
    css`
      transform: translateY(8px);
    `}

    ${({ touchable }) =>
    touchable &&
    css`
      pointer-events: auto;
      > button {
        box-shadow: none !important;
      }
    `}

    ${({ unit }) =>
    unit &&
    css`
      padding-top: 0;
      padding-bottom: 0;
      transform: none;
      align-items: flex-start;
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
  shouldForwardProp: props =>
    !['edit', 'error', 'resizable', 'fillAvailable'].includes(props.toString()),
})<StyledLabelProps>`
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  padding-left: 8px;
  padding-right: 8px;
  pointer-events: none;
  color: ${({ theme: { colorsDeprecated } }) => colorsDeprecated.gray550};
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

  ${({ disabled, theme: { colorsDeprecated } }) =>
    disabled &&
    css`
      color: ${colorsDeprecated.gray350};
    `}

  ${({ readOnly, theme: { colorsDeprecated } }) =>
    readOnly &&
    css`
      color: ${colorsDeprecated.gray550};
    `}

  ${({ error, theme: { colorsDeprecated } }) =>
    error &&
    css`
      color: ${colorsDeprecated.warning};
    `}
`

const StyledRelativeDiv = styled.div`
  position: relative;
`

const StyledError = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colorsDeprecated.warning};
  padding-top: ${({ theme }) => theme.space['0.25']};
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
  inputSize: TextBoxSizes
} & (
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
)

type InputProps = Omit<
  Exclude<StyledInputProps, TextareaHTMLAttributes<HTMLTextAreaElement>>,
  'inputSize'
>

const StyledInput = styled('input', {
  shouldForwardProp: props =>
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
    ].includes(props.toString()),
})<StyledInputProps>`
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  appearance: none;
  background-color: ${({ theme: { colorsDeprecated } }) =>
    colorsDeprecated.white};
  background-image: none;
  border: 1px solid
    ${({ theme: { colorsDeprecated } }) => colorsDeprecated.gray350};
  border-radius: ${({ theme: { radii } }) => radii.default};
  color: ${({ theme: { colorsDeprecated } }) => colorsDeprecated.gray700};
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
    color: ${({ theme: { colorsDeprecated } }) => colorsDeprecated.gray550};
    opacity: 0;
  }

  &:hover,
  &:focus {
    border-color: ${({ theme: { colorsDeprecated } }) =>
      colorsDeprecated.ngray300};
  }

  &:focus {
    box-shadow: 0 0 0 2px
      ${({ theme: { colorsDeprecated } }) =>
        transparentize(0.75, colorsDeprecated.primary)};
    border-color: ${({ theme: { colorsDeprecated } }) =>
      colorsDeprecated.primary};
  }

  ${({ isPlaceholderVisible }) =>
    isPlaceholderVisible &&
    `&::placeholder {
      opacity: 1;
    }`}

  ${({ disabled, theme: { colorsDeprecated } }) =>
    disabled &&
    `cursor: default;
    pointer-events: none;
    background-color: ${colorsDeprecated.gray50};
    border-color: ${colorsDeprecated.gray50};
    color: ${colorsDeprecated.gray350};`}

  ${({ readOnly, theme: { colorsDeprecated } }) =>
    readOnly &&
    `background-color: ${colorsDeprecated.gray100};
    border-color: ${colorsDeprecated.gray100};
    color: ${colorsDeprecated.gray700};`}

  ${({ inputSize }) => inputSizes[inputSize]?.default}

  ${({ inputSize, hasLabel }) =>
    !!inputSize && !hasLabel && inputSizes[inputSize]?.full}

  ${({ error, theme: { colorsDeprecated } }) =>
    error &&
    `border-color: ${colorsDeprecated.warning};

    &:hover,
    &:focus {
      border-color: ${colorsDeprecated.warning};
    }

    &:focus {
      box-shadow: 0 0 0 2px ${transparentize(0.75, colorsDeprecated.warning)};
      border-color: ${colorsDeprecated.warning};
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

export type TextBoxProps = {
  'data-testid'?: string
  ariaControls?: string
  autoComplete?: string
  autoFocus?: boolean
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
  placeholder?: string
  random?: string
  readOnly?: boolean
  required?: boolean
  resizable?: boolean
  rows?: number
  size?: TextBoxSizes
  tabIndex?: number
  type?: string
  unit?: string
  unitAlignment?: 'center' | 'flex-end' | 'flex-start'
  valid?: boolean
  value?: string | number
  wrap?: string
  inputProps?: InputProps
} & (
  | Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>
  | Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>
) &
  XStyledProps

const TextBox = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | null,
  TextBoxProps
>(
  (
    {
      'data-testid': dataTestId,
      ariaControls,
      autoComplete = 'on',
      autoFocus,
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
      unitAlignment = 'flex-end',
      valid,
      value,
      wrap,
      inputProps,
      ...props
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
    const hasRightElement =
      valid || required || isPassToggleable || random || unit

    // Set the right padding to 22px when the TextBox is required. 22px allows
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

    const getRightComponent = () => {
      if (isPassToggleable && !generated)
        return (
          <Touchable
            onClick={handlePassVisibilityClick}
            onKeyDown={handlePassVisiblityKeyDown}
            title={passwordVisible ? 'Hide' : 'Show'}
          >
            <Icon name={passwordVisible ? 'eye-off' : 'eye'} />
          </Touchable>
        )
      if (random)
        return (
          <Touchable
            onClick={handleClickRandomize}
            onKeyDown={handleKeyDownRandomize}
            disabled={disabled}
            title="Randomize"
          >
            <Icon name="auto-fix" />
          </Touchable>
        )
      if (valid === false || valid === true)
        return (
          <Icon
            name={!valid ? 'close' : 'check'}
            color={!valid ? 'warning' : 'success'}
            size={20}
          />
        )
      if (unit)
        return (
          <>
            <StyledSeparator direction="vertical" />
            <Typography
              variant="bodyB"
              display="flex"
              alignSelf={unitAlignment}
              py={1}
            >
              {unit}
              {required && (
                <Icon ml="2px" name="asterisk" color="warning" size={8} />
              )}
            </Typography>
          </>
        )
      if (required) return <Icon name="asterisk" color="warning" size={10} />

      return null
    }

    return (
      <Box {...props}>
        <StyledRelativeDiv>
          <StyledInput
            aria-controls={ariaControls}
            aria-label={label && noTopLabel ? label : undefined}
            aria-labelledby={ariaControls}
            as={multiline ? 'textarea' : 'input'}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            cols={cols}
            data-testid={dataTestId}
            disabled={disabled}
            error={!!error}
            fillAvailable={fillAvailable}
            hasLabel={hasLabel}
            hasRightElement={!!hasRightElement}
            rightElementPadding={rightElementPadding}
            id={id}
            inputSize={inputSize}
            isPlaceholderVisible={isPlaceholderVisible}
            multiline={multiline}
            name={name}
            onBlur={onBlur}
            onChange={handleChange}
            onFocus={handleFocus}
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

          {hasRightElement ? (
            <StyledRightElement
              edit={!!edit}
              touchable={isPassToggleable || !!random}
              unit={unit}
            >
              {getRightComponent()}
            </StyledRightElement>
          ) : null}
        </StyledRelativeDiv>
        <Expandable height={56} overflow="hidden" opened={!!error}>
          <StyledError>{error}</StyledError>
        </Expandable>
        {notice && <Notice mt={1}>{notice}</Notice>}
      </Box>
    )
  },
)

TextBox.propTypes = {
  ariaControls: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  cols: PropTypes.number,
  'data-testid': PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  edit: PropTypes.bool,
  error: PropTypes.string,
  fillAvailable: PropTypes.bool,
  generated: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  id: PropTypes.string,
  inputProps: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string,
  multiline: PropTypes.bool,
  name: PropTypes.string,
  notice: PropTypes.string,
  noTopLabel: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  random: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  resizable: PropTypes.bool,
  rows: PropTypes.number,
  size: PropTypes.oneOf<TextBoxSizes>(textBoxSizes),
  tabIndex: PropTypes.number,
  type: PropTypes.string,
  unit: PropTypes.string,
  unitAlignment: PropTypes.oneOf(['center', 'flex-end', 'flex-start']),
  valid: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wrap: PropTypes.string,
}

export default TextBox
