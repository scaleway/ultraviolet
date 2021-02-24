/* eslint-disable jsx-a11y/label-has-for */
import { css } from '@emotion/react'
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
import { colors, radii } from '../../theme'
import { useUUID } from '../../utils'
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
  input: css`
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    appearance: none;
    background-color: ${colors.white};
    background-image: none;
    border: 1px solid ${colors.gray350};
    border-radius: ${radii.default};
    color: ${colors.gray700};
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
      color: ${colors.gray550};
      opacity: 0;
    }

    &:hover,
    &:focus {
      border-color: ${colors.ngray300};
    }

    &:focus {
      box-shadow: 0 0 0 2px ${transparentize(0.75, colors.primary)};
      border-color: ${colors.primary};
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
  inputDisabled: css`
    cursor: default;
    pointer-events: none;
    background-color: ${colors.gray50};
    border-color: ${colors.gray50};
    color: ${colors.gray350};
  `,
  inputReadOnly: css`
    background-color: ${colors.gray100};
    border-color: ${colors.gray100};
    color: ${colors.gray700};
  `,
  inputWithRightElement: css`
    padding-right: 32px;
  `,
  inputError: css`
    border-color: ${colors.warning};

    &:hover,
    &:focus {
      border-color: ${colors.warning};
    }

    &:focus {
      box-shadow: 0 0 0 2px ${transparentize(0.75, colors.warning)};
      border-color: ${colors.warning};
    }
  `,
  label: css`
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    padding-left: 8px;
    padding-right: 8px;
    pointer-events: none;
    color: ${colors.gray550};
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
  labelDisabled: css`
    color: ${colors.gray350};
  `,
  labelReadOnly: css`
    color: ${colors.gray550};
  `,
  labelError: css`
    color: ${colors.warning};
  `,
  rightElement: css`
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
  verticalSeparator: css`
    margin-right: 8px;
    margin-top: 1px;
    height: calc(100% - 2px);
    background-color: ${colors.gray350};
  `,
}

const TextBox = React.forwardRef(
  (
    {
      autoComplete,
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
            title="Randomize"
          >
            <Icon name="auto-fix" />
          </Touchable>
        )
      if (valid === false || valid === true)
        return (
          <Icon
            name={valid === false ? 'close' : 'check'}
            color={valid === false ? 'warning' : 'success'}
            size={20}
          />
        )
      if (unit)
        return (
          <>
            <Separator css={styles.verticalSeparator} direction="vertical" />
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
            css={[
              styles.input,
              isPlaceholderVisible && styles.inputWithPlaceholder,
              disabled && styles.inputDisabled,
              readOnly && styles.inputReadOnly,
              error && styles.inputError,
              size && inputSizes[size].default,
              size && !hasLabel && inputSizes[size].full,
              multiline && styles.inputMultiline({ resizable, fillAvailable }),
              multiline && !hasLabel && styles.inputMultilineFull,
              hasRightElement && styles.inputWithRightElement,
            ]}
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
              css={[
                styles.label,
                edit && styles.labelEdit,
                disabled && styles.labelDisabled,
                readOnly && styles.labelReadOnly,
                error && styles.labelError,
              ]}
              htmlFor={controlId}
              id={labelId}
              aria-live="assertive"
            >
              {label}
            </label>
          )}

          {hasRightElement ? (
            <div
              css={[
                styles.rightElement,
                edit && styles.rightElementEdit,
                (isPassToggleable || random) && styles.rightElementTouchable,
                unit && styles.unit,
              ]}
            >
              {getRightComponent()}
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
  },
)

TextBox.propTypes = {
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  cols: PropTypes.number,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  edit: PropTypes.bool,
  error: PropTypes.string,
  fillAvailable: PropTypes.bool,
  generated: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.node,
  multiline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  notice: PropTypes.node,
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
  autoComplete: 'on',
  autoFocus: undefined,
  tabIndex: undefined,
  cols: undefined,
  defaultValue: undefined,
  disabled: undefined,
  edit: undefined,
  error: undefined,
  generated: undefined,
  label: undefined,
  multiline: undefined,
  fillAvailable: undefined,
  notice: undefined,
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
  height: undefined,
  unit: undefined,
  unitAlignment: 'flex-end',
  wrap: undefined,
}

export { TextBox }
