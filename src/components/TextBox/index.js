/* eslint-disable jsx-a11y/label-has-for */
import styled from '@emotion/styled'
import randomName from '@scaleway/random-name'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Box } from '../Box'
import { Expandable } from '../Expandable'
<<<<<<< HEAD
import { Icon } from '../Icon'
import Notice from '../Notice'
=======
import Icon from '../Icon'
import { Notice } from '../Notice'
>>>>>>> refactor: migrate colors from theme in icon (#160)
import { Separator } from '../Separator'
import { Touchable } from '../Touchable'
import { Typography } from '../Typography'

const inputSizes = {
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
}

export const textBoxSizes = Object.keys(inputSizes)

const StyledSeparator = styled(Separator)`
  margin-right: 8px;
  margin-top: 1px;
  height: calc(100% - 2px);
  background-color: ${({ theme: { colors } }) => colors.gray350};
`

const StyledRightElement = styled.div`
  ${({ theme: { colors } }) => `
  pointer-events: none;
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    padding: 8px;
    display: flex;
    align-items: center;
    transition: transform 150ms, color 150ms;
    color: ${colors.gray550};

    &:hover,
    &:focus-within {
      color: ${colors.gray700};
    }`}

  ${({ edit }) => edit && `transform: translateY(8px);`}

    ${({ touchable }) =>
    touchable &&
    `
    pointer-events: auto;
    > button {
      box-shadow: none !important;
    }
    `}

    ${({ unit }) =>
    unit &&
    `
    padding-top: 0;
    padding-bottom: 0;
    transform: none;
    align-items: flex-start;
    `}
`

const StyledLabel = styled.label`
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  padding-left: 8px;
  padding-right: 8px;
  pointer-events: none;
  color: ${({ theme: { colors } }) => colors.gray550};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  height: 48px;
  font-size: 16px;
  transition: transform 150ms;
  transform: translate(0, 12px) scale(1);

  ${({ edit }) => edit && `transform: translate(-9.6%, -3px) scale(0.8);`}

  ${({ disabled, theme: { colors } }) =>
    disabled && `color: ${colors.gray350};`}

  ${({ readOnly, theme: { colors } }) =>
    readOnly && `color: ${colors.gray550};`}

  ${({ error, theme: { colors } }) => error && `color: ${colors.warning};`}
`

const StyledInput = styled.input`
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  appearance: none;
  background-color: ${({ theme: { colors } }) => colors.white};
  background-image: none;
  border: 1px solid ${({ theme: { colors } }) => colors.gray350};
  border-radius: ${({ theme: { radii } }) => radii.default};
  color: ${({ theme: { colors } }) => colors.gray700};
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
    color: ${({ theme: { colors } }) => colors.gray550};
    opacity: 0;
  }

  &:hover,
  &:focus {
    border-color: ${({ theme: { colors } }) => colors.ngray300};
  }

  &:focus {
    box-shadow: 0 0 0 2px
      ${({ theme: { colors } }) => transparentize(0.75, colors.primary)};
    border-color: ${({ theme: { colors } }) => colors.primary};
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
    background-color: ${colors.gray50};
    border-color: ${colors.gray50};
    color: ${colors.gray350};`}

  ${({ readOnly, theme: { colors } }) =>
    readOnly &&
    `background-color: ${colors.gray100};
    border-color: ${colors.gray100};
    color: ${colors.gray700};`}

  ${({ size }) => inputSizes[size]?.default}

  ${({ size, hasLabel }) => !!size && !hasLabel && inputSizes[size]?.full}

  ${({ error, theme: { colors } }) =>
    error &&
    `border-color: ${colors.warning};

    &:hover,
    &:focus {
      border-color: ${colors.warning};
    }

    &:focus {
      box-shadow: 0 0 0 2px ${transparentize(0.75, colors.warning)};
      border-color: ${colors.warning};
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

  ${({ hasRightElement }) =>
    hasRightElement &&
    `
    padding-right: 32px;
  `}
`

const TextBox = forwardRef(
  (
    {
      ariaControls,
      autoComplete,
      autoFocus,
      tabIndex,
      cols,
      'data-testid': dataTestId,
      defaultValue,
      disabled,
      edit: forceEdit,
      error,
      generated,
      id,
      label,
      multiline,
      noTopLabel,
      fillAvailable,
      name,
      notice,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      random,
      readOnly,
      required,
      resizable,
      rows,
      size,
      type,
      valid,
      value,
      height,
      unit,
      unitAlignment,
      wrap,
      ...props
    },
    ref,
  ) => {
    const controlRef = useRef()
    const [visited, setVisited] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)

    // Forward ref to parent ref
    useImperativeHandle(ref, () => controlRef)

    // Focus when password is visible
    useEffect(() => {
      if (passwordVisible) {
        controlRef.current.focus()
      }
    }, [passwordVisible])

    const togglePasswordVisibility = useCallback(
      () => setPasswordVisible(x => !x),
      [],
    )

    const handlePassVisibilityClick = useCallback(
      () => togglePasswordVisibility(),
      [togglePasswordVisibility],
    )

    const handlePassVisiblityKeyDown = useCallback(
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

    const randomize = useCallback(() => onChange(randomName(random)), [
      onChange,
      random,
    ])

    const handleRandomizeClick = useCallback(() => randomize(), [randomize])
    const handleRandomizeKeyDown = useCallback(
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

    const handleFocus = useCallback(
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

    const handleChange = useCallback(event => onChange(event.target.value), [
      onChange,
    ])

    const isPassToggleable = type === 'toggleable-password'
    const hasLabel = !!label && !noTopLabel && size === 'medium'
    const edit =
      hasLabel && (forceEdit || visited || value || error || generated)

    const isPlaceholderVisible = !hasLabel || edit
    const hasRightElement =
      valid || required || isPassToggleable || random || unit

    function getType() {
      if (isPassToggleable) {
        return passwordVisible || generated ? 'text' : 'password'
      }

      return multiline ? null : type
    }

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
            onClick={handleRandomizeClick}
            onKeyDown={handleRandomizeKeyDown}
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
        <Box position="relative">
          <StyledInput
            as={multiline ? 'textarea' : 'input'}
            ref={controlRef}
            type={getType()}
            aria-controls={ariaControls}
            aria-label={label && noTopLabel ? label : undefined}
            id={id}
            value={value}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={onBlur}
            onChange={handleChange}
            isPlaceholderVisible={isPlaceholderVisible}
            size={size}
            hasLabel={hasLabel}
            error={error}
            multiline={multiline}
            resizable={resizable}
            fillAvailable={fillAvailable}
            hasRightElement={hasRightElement}
            disabled={disabled}
            readOnly={readOnly}
            rows={rows}
            cols={cols}
            autoFocus={autoFocus}
            tabIndex={tabIndex}
            autoComplete={autoComplete}
            name={name}
            style={{ height }}
            wrap={wrap}
            data-testid={dataTestId}
          />
          {hasLabel && (
            <StyledLabel
              edit={edit}
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
              edit={edit}
              touchable={isPassToggleable || random}
              unit={unit}
            >
              {getRightComponent()}
            </StyledRightElement>
          ) : null}
        </Box>
        <Expandable height={56} overflow="hidden" opened={!!error}>
          <Box fontSize={12} color="warning" pt="2px">
            {error}
          </Box>
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
  label: PropTypes.node,
  multiline: PropTypes.bool,
  name: PropTypes.string,
  notice: PropTypes.string,
  noTopLabel: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  random: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  resizable: PropTypes.bool,
  rows: PropTypes.number,
  size: PropTypes.oneOf(textBoxSizes),
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
  unit: PropTypes.string,
  unitAlignment: PropTypes.oneOf(['center', 'flex-end', 'flex-start']),
  valid: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wrap: PropTypes.string,
}

TextBox.defaultProps = {
  ariaControls: undefined,
  autoComplete: 'on',
  autoFocus: undefined,
  tabIndex: undefined,
  cols: undefined,
  'data-testid': undefined,
  defaultValue: undefined,
  disabled: undefined,
  edit: undefined,
  error: undefined,
  fillAvailable: undefined,
  generated: undefined,
  height: undefined,
  id: undefined,
  label: undefined,
  multiline: undefined,
  name: undefined,
  notice: undefined,
  noTopLabel: false,
  onBlur: undefined,
  onChange: undefined,
  onFocus: undefined,
  placeholder: undefined,
  random: undefined,
  readOnly: undefined,
  required: undefined,
  resizable: undefined,
  rows: undefined,
  size: 'medium',
  type: 'text',
  valid: undefined,
  value: undefined,
  unit: undefined,
  unitAlignment: 'flex-end',
  wrap: undefined,
}

export { TextBox }
