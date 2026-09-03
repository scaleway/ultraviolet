'use client'

import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import { useTheme } from '@ultraviolet/themes'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react'
import type { ReactNode } from 'react'
import { hasHelperText } from '../../helpers/hasHelperText'
import type { BaseFormComponentProps, LabelProps } from '../../types'
import { Button } from '../Button'
import { SIZE_HEIGHT as buttonSizeHeight } from '../Button/constants'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'
import { STATE_ICON_SIZE } from './constant'
import { SuccessErrorIcon } from './Icon'
import { Notice } from './Notice'
import { paddingRightVar, textAreaStyle } from './styles.css'

type TextAreaProps = BaseFormComponentProps<HTMLTextAreaElement> &
  LabelProps & {
    tabIndex?: number
    value?: string
    onChange: (newValue: string) => void
    placeholder?: string
    /**
     * Override others properties : success, error.
     * Ignored if following props are provided : disabled.
     */
    readOnly?: boolean
    /**
     * Override others properties : error, helper.
     * Ignored if following props are provided : disabled, readyOnly.
     */
    success?: string
    /**
     * Override others properties : helper.
     * Ignored if following props are provided : disabled, readyOnly, success.
     */
    error?: string
    /**
     * Number of rows to display. If 'auto', the textarea will grow with the content
     */
    rows?: number | 'auto'
    /**
     * Text area will grow with the content with a maximum number of rows.
     */
    maxRows?: number
    minLength?: number
    maxLength?: number
    size?: 'small' | 'medium' | 'large'
    tooltip?: string
    clearable?: boolean
    labelDescription?: ReactNode
  }

const BORDERS_WIDTH = '2px'
const AUTO_ROWS = 2

/**
 * This component offers an extended textarea HTML
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      'aria-describedby': ariaDescribedBy,
      'aria-label': ariaLabel,
      'data-testid': dataTestId,
      autoFocus,
      className,
      clearable = false,
      disabled = false,
      error,
      helper,
      id,
      label,
      labelDescription,
      maxLength,
      maxRows,
      minLength,
      name,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      placeholder,
      readOnly = false,
      required = false,
      rows = 3,
      size = 'large',
      style,
      success,
      tabIndex,
      tooltip,
      value,
    },
    ref,
  ) => {
    const localId = useId()
    const helperId = useId()

    const theme = useTheme()
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    useImperativeHandle(ref, () => textAreaRef.current!)

    // native automatic resize
    useEffect(() => {
      if (textAreaRef.current && CSS?.supports?.('field-sizing', 'content')) {
        textAreaRef.current.style.fieldSizing = rows === 'auto' ? 'content' : 'fixed'
      }
    }, [rows])

    // fallback for older browsers
    useEffect(() => {
      const textArea = textAreaRef.current
      if (!textArea || rows !== 'auto') {
        return
      }

      const userResized = textArea.style.height.match(/^\d+px$/)
      const hasNativeAutoResize = textArea.style.fieldSizing === 'content'
      if (userResized || hasNativeAutoResize) {
        return
      }

      textArea.style.height = `calc(${textArea.scrollHeight}px + ${BORDERS_WIDTH})`
    }, [value, rows])

    // Set min and max heights
    useEffect(() => {
      const textArea = textAreaRef.current
      if (!textArea) {
        return
      }

      const padding = theme.space['1.5']
      const lineHeight = Number.parseFloat(getComputedStyle(textArea).lineHeight)

      if (maxRows) {
        textArea.style.maxBlockSize = `calc(${maxRows * lineHeight}px + 2*${padding} + ${BORDERS_WIDTH})`
      }

      const minRows = rows === 'auto' ? AUTO_ROWS : rows
      textArea.style.minBlockSize = `calc(${minRows * lineHeight}px + 2*${padding} + ${BORDERS_WIDTH})`
    }, [maxRows, rows, theme.space])

    const nonDefaultState = success || error

    const computedClearable = clearable && !!value
    const defaultPadding = theme.space[1]
    const spaceForClearButton = computedClearable ? theme.sizing[buttonSizeHeight.xsmall] : '0px'
    const spaceForStateIcon = nonDefaultState ? theme.sizing[STATE_ICON_SIZE] : '0px'
    const gapBetweenButtons = computedClearable && nonDefaultState ? theme.space['1'] : '0px'
    const gapButtonsContent = computedClearable || nonDefaultState ? theme.space[0.5] : '0px'

    return (
      <Stack className={className} gap="0.5">
        {label || labelDescription ? (
          <Label htmlFor={id ?? localId} labelDescription={labelDescription} required={required} size={size}>
            {label}
          </Label>
        ) : null}
        <Tooltip text={tooltip}>
          <div className={textAreaStyle.wrapper}>
            <textarea
              aria-describedby={ariaDescribedBy || (hasHelperText(helper, error, success) ? helperId : undefined)}
              aria-invalid={!!error}
              aria-label={ariaLabel}
              autoFocus={autoFocus} // oxlint-disable-line jsx_a11y/no-autofocus
              className={textAreaStyle.textArea({
                error: !!error,
                success: !!success,
                size,
              })}
              data-testid={dataTestId}
              disabled={disabled}
              id={id ?? localId}
              maxLength={maxLength}
              minLength={minLength}
              name={name}
              onBlur={onBlur}
              onChange={event => {
                onChange(event.currentTarget.value)
              }}
              onFocus={onFocus}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              readOnly={!!readOnly}
              ref={textAreaRef}
              rows={rows === 'auto' ? AUTO_ROWS : rows}
              style={{
                ...assignInlineVars({
                  [paddingRightVar]: `calc(${defaultPadding} + ${
                    spaceForClearButton
                  } + ${spaceForStateIcon} + ${gapBetweenButtons} + ${gapButtonsContent}) `,
                }),
                ...style,
              }}
              tabIndex={tabIndex}
              value={value}
            />
            <Stack alignItems="center" className={textAreaStyle.clearableContainer} direction="row" gap="1">
              {computedClearable ? (
                <Button
                  accessibleLabel="clear value"
                  onClick={() => {
                    onChange('')
                  }}
                  sentiment="neutral"
                  size="xsmall"
                  variant="ghost"
                  disabled={disabled || readOnly}
                >
                  <CloseIcon />
                </Button>
              ) : null}
              <SuccessErrorIcon error={!!error} success={!!success} />
            </Stack>
          </div>
        </Tooltip>
        {nonDefaultState || helper || maxLength ? (
          <Notice
            disabled={disabled}
            error={error}
            helper={helper}
            id={ariaDescribedBy ?? helperId}
            maxLength={maxLength}
            success={success}
            value={value}
          />
        ) : null}
      </Stack>
    )
  },
)

TextArea.displayName = 'TextArea'
