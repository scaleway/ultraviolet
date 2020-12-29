/* eslint-disable jsx-a11y/label-has-for */
import { css } from '@emotion/core'
import randomName from '@scaleway/random-name'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {
  borderRadius,
  gray100,
  gray350,
  gray50,
  gray550,
  gray700,
  ngray300,
  primary,
  warning,
  white,
} from '../../theming'
import { cx, useUUID } from '../../utils'
import { Box } from '../Box'
import { Expandable } from '../Expandable'
import { Icon } from '../Icon'
import { Notice } from '../Notice'
import { Separator } from '../Separator'
import { Touchable } from '../Touchable'
import { Typography } from '../Typography'

const inputSizes = {
  small: {
    default: css`
      height: 30px;
      padding-left: 8px;
      padding-right: 8px;
      padding-top: 14px;
      font-size: 14px;
    `,
    full: css`
      padding: 4px 8px;
    `,
  },
  medium: {
    default: css`
      height: 48px;
      padding-left: 8px;
      padding-right: 20px;
      padding-top: 14px;
    `,
    full: css`
      padding: 8px;
    `,
  },
}

export const textBoxSizes = Object.keys(inputSizes)

const styles = {
  input: p => css`
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    appearance: none;
    background-color: ${white(p)};
    background-image: none;
    border: 1px solid ${gray350(p)};
    border-radius: ${borderRadius(p)};
    color: ${gray700(p)};
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
      color: ${gray550(p)};
      opacity: 0;
    }

    &:hover,
    &:focus {
      border-color: ${ngray300(p)};
    }

    &:focus {
      box-shadow: 0 0 0 2px ${transparentize(0.75, primary(p))};
      border-color: ${primary(p)};
    }
  `,
  inputMultiline: ({ resizable, fillAvailable }) => css`
    padding-top: 20px;
    height: ${fillAvailable ? '100%' : 'initial'};
    resize: ${resizable === false ? 'none' : 'vertical'};
  `,
  inputMultilineFull: css`
    padding-top: 8px;
  `,
  inputWithPlaceholder: css`
    &::placeholder {
      opacity: 1;
    }
  `,
  inputDisabled: p => css`
    cursor: default;
    pointer-events: none;
    background-color: ${gray50(p)};
    border-color: ${gray50(p)};
    color: ${gray350(p)};
  `,
  inputReadOnly: p => css`
    background-color: ${gray100(p)};
    border-color: ${gray100(p)};
    color: ${gray700(p)};
  `,
  inputWithRightElement: css`
    padding-right: 32px;
  `,
  inputError: p => css`
    border-color: ${warning(p)};

    &:hover,
    &:focus {
      border-color: ${warning(p)};
    }

    &:focus {
      box-shadow: 0 0 0 2px ${transparentize(0.75, warning(p))};
      border-color: ${warning(p)};
    }
  `,
  label: p => css`
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    padding-left: 8px;
    padding-right: 8px;
    pointer-events: none;
    color: ${gray550(p)};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    height: 48px;
    font-size: 16px;
    transition: transform 150ms;
    transform: translate(0, 12px) scale(1);
  `,
  labelEdit: css`
    transform: translate(-9.6%, -3px) scale(0.8);
  `,
  labelDisabled: p => css`
    color: ${gray350(p)};
  `,
  labelReadOnly: p => css`
    color: ${gray550(p)};
  `,
  labelError: p => css`
    color: ${warning(p)};
  `,
  rightElement: p => css`
    pointer-events: none;
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    padding: 8px;
    display: flex;
    align-items: center;
    transition: transform 150ms, color 150ms;
    color: ${gray550(p)};

    &:hover,
    &:focus-within {
      color: ${gray700(p)};
    }
  `,
  rightElementEdit: css`
    transform: translateY(8px);
  `,
  rightElementTouchable: css`
    pointer-events: auto;

    > button {
      box-shadow: none !important;
    }
  `,
  unit: css`
    padding-top: 0;
    padding-bottom: 0;
    transform: none;
    align-items: flex-start;
  `,
  verticalSeparator: p => css`
    margin-right: 8px;
    margin-top: 1px;
    height: calc(100% - 2px);
    background-color: ${gray350(p)};
  `,
}

function TextBox(
  {
    autoComplete = 'on',
    autoFocus,
    tabIndex,
    cols,
    defaultValue,
    disabled,
    edit: forceEdit,
    error,
    generated,
    label,
    multiline,
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
    size = 'medium',
    type = 'text',
    valid,
    value,
    height,
    unit,
    unitAlignment = 'flex-end',
    wrap,
    ...props
  },
  ref,
) {
  const labelId = useUUID('label')
  const controlId = useUUID('input')
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

  const ControlComponent = multiline ? 'textarea' : 'input'
  const isPassToggleable = type === 'toggleable-password'
  const hasLabel = Boolean((error || label) && size === 'medium')
  const edit = Boolean(
    hasLabel && (forceEdit || visited || value || error || generated),
  )
  const isPlaceholderVisible = Boolean(!hasLabel || edit)
  const hasRightElement = Boolean(
    valid || required || isPassToggleable || random || unit,
  )

  function getType() {
    if (isPassToggleable) {
      return passwordVisible || generated ? 'text' : 'password'
    }

    return multiline ? null : type
  }

  return (
    <Box {...props}>
      <Box position="relative">
        <ControlComponent
          ref={controlRef}
          type={getType()}
          aria-controls={hasLabel ? labelId : undefined}
          id={controlId}
          value={value}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={onBlur}
          onChange={handleChange}
          css={cx([
            styles.input,
            isPlaceholderVisible && styles.inputWithPlaceholder,
            disabled && styles.inputDisabled,
            readOnly && styles.inputReadOnly,
            hasRightElement && styles.inputWithRightElement,
            error && styles.inputError,
            size && inputSizes[size].default,
            size && !hasLabel && inputSizes[size].full,
            multiline && styles.inputMultiline({ resizable, fillAvailable }),
            multiline && !hasLabel && styles.inputMultilineFull,
          ])}
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
        />
        {hasLabel && (
          <label
            css={cx([
              styles.label,
              edit && styles.labelEdit,
              disabled && styles.labelDisabled,
              readOnly && styles.labelReadOnly,
              error && styles.labelError,
            ])}
            htmlFor={controlId}
            id={labelId}
            aria-live="assertive"
          >
            {label}
          </label>
        )}

        {hasRightElement ? (
          <div
            css={cx([
              styles.rightElement,
              edit && styles.rightElementEdit,
              (isPassToggleable || random) && styles.rightElementTouchable,
              unit && styles.unit,
            ])}
          >
            {isPassToggleable && !generated ? (
              <Touchable
                onClick={handlePassVisibilityClick}
                onKeyDown={handlePassVisiblityKeyDown}
                title={passwordVisible ? 'Hide' : 'Show'}
              >
                <Icon name={passwordVisible ? 'eye-off' : 'eye'} />
              </Touchable>
            ) : random ? (
              <Touchable
                onClick={handleRandomizeClick}
                onKeyDown={handleRandomizeKeyDown}
                title="Randomize"
              >
                <Icon name="auto-fix" />
              </Touchable>
            ) : valid === false || valid === true ? (
              <Icon
                name={valid === false ? 'close' : 'check'}
                color={valid === false ? 'warning' : 'success'}
                size={20}
              />
            ) : unit ? (
              <>
                <Separator
                  css={cx(styles.verticalSeparator)}
                  direction="vertical"
                />
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
            ) : required ? (
              <Icon name="asterisk" color="warning" size={10} />
            ) : null}
          </div>
        ) : null}
      </Box>
      <Expandable height={56} overflow="hidden" opened={Boolean(error)}>
        <Box fontSize={12} color="warning" pt="2px">
          {error}
        </Box>
      </Expandable>
      {notice && <Notice mt={1}>{notice}</Notice>}
    </Box>
  )
}

// eslint-disable-next-line no-func-assign
TextBox = React.forwardRef(TextBox)

TextBox.propTypes = {
  size: PropTypes.oneOf(textBoxSizes),
  multiline: PropTypes.bool,
  resizable: PropTypes.bool,
  notice: PropTypes.node,
  valid: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.node,
  edit: PropTypes.bool,
  fillAvailable: PropTypes.bool,
  required: PropTypes.bool,
  unitAlignment: PropTypes.oneOf(['center', 'flex-end', 'flex-start']),
  wrap: PropTypes.string,
}

export { TextBox }
