'use client'

import { AlertCircleIcon, CheckCircleIcon, CloseIcon } from '@ultraviolet/icons'
import { useTheme } from '@ultraviolet/themes'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { DOMAttributes, ReactNode } from 'react'
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import { Button } from '../Button'
import { SIZE_HEIGHT as ButtonSizeHeight } from '../Button/constants'
import { Label } from '../Label'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import {
  paddingRightVar,
  textAreaClearableContainer,
  textArea as textAreaStyle,
  textareaWrapper,
} from './styles.css'

const STATE_ICON_SIZE = 'small'

type LabelProps =
  | {
      label: string
      'aria-label'?: never
    }
  | {
      label?: never
      'aria-label': string
    }

type TextAreaProps = {
  id?: string
  className?: string
  tabIndex?: number
  autoFocus?: boolean
  value?: string
  onChange: (newValue: string) => void
  placeholder?: string
  /**
   * Override others properties : readyOnly, success, error.
   */
  disabled?: boolean
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
   * Ignored if following props are provided : readyOnly, success.
   */
  helper?: ReactNode
  /**
   * Number of rows to display. If 'auto', the textarea will grow with the content and won't be resizable
   */
  rows?: number | 'auto'
  /**
   * Text area will grow with the content with a maximum number of rows.
   */
  maxRows?: number
  minLength?: number
  maxLength?: number
  tooltip?: string
  required?: boolean
  'data-testid'?: string
  name?: string
  onFocus?: DOMAttributes<HTMLTextAreaElement>['onFocus']
  onBlur?: DOMAttributes<HTMLTextAreaElement>['onBlur']
  onKeyDown?: DOMAttributes<HTMLTextAreaElement>['onKeyDown']
  clearable?: boolean
  labelDescription?: ReactNode
} & LabelProps

/**
 * This component offers an extended textarea HTML
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      className,
      tabIndex,
      value,
      onChange,
      placeholder,
      rows = 3,
      maxRows,
      disabled = false,
      readOnly = false,
      success,
      error,
      helper,
      minLength,
      maxLength,
      tooltip,
      label,
      autoFocus,
      required = false,
      'data-testid': dataTestId,
      name,
      onFocus,
      onBlur,
      onKeyDown,
      clearable = false,
      labelDescription,
      'aria-label': ariaLabel,
    },
    ref,
  ) => {
    const localId = useId()
    const theme = useTheme()
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    useImperativeHandle(ref, () => textAreaRef.current as HTMLTextAreaElement)

    useEffect(() => {
      const textArea = textAreaRef.current
      const padding = theme.space['1.5']
      if (!textArea) {
        return
      }
      const updateHeight = () => {
        if (textArea && rows === 'auto' && !maxRows) {
          textArea.style.height = 'auto'
          textArea.style.resize = 'none'
          textArea.style.height = `${textArea.scrollHeight + 2}px`
        } else if (textArea && maxRows) {
          const lineHeight = Number.parseFloat(
            getComputedStyle(textArea).lineHeight,
          )

          textArea.style.height = 'auto'
          const maxHeight = maxRows * lineHeight

          textArea.style.height = `${textArea.scrollHeight + 2}px`
          textArea.style.maxHeight = `calc(${maxHeight}px + 2*${padding})`

          if (typeof rows === 'number') {
            const minHeight = rows * lineHeight
            textArea.style.minHeight = `calc(${minHeight}px + 2*${padding})`
          }
        }
      }

      requestAnimationFrame(updateHeight)
    }, [value, rows, theme, maxRows, textAreaRef.current?.value])

    const sentiment = useMemo(() => {
      if (error) {
        return 'danger'
      }

      if (success) {
        return 'success'
      }

      return 'neutral'
    }, [error, success])
    const notice = success || error || helper

    const computedClearable = clearable && !!value

    return (
      <Stack className={className} gap="0.5">
        {label || labelDescription ? (
          <Label
            htmlFor={id ?? localId}
            labelDescription={labelDescription}
            required={required}
          >
            {label}
          </Label>
        ) : null}
        <Tooltip text={tooltip}>
          <div className={textareaWrapper}>
            <textarea
              aria-invalid={!!error}
              aria-label={ariaLabel}
              autoFocus={autoFocus}
              className={textAreaStyle({ error: !!error, success: !!success })}
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
              rows={rows !== 'auto' ? rows : 1}
              style={assignInlineVars({
                [paddingRightVar]: `calc(${theme.space[computedClearable && (!!success || !!error) ? '4' : '3']} + ${
                  computedClearable ? `${ButtonSizeHeight.xsmall}px` : '0px'
                } + ${!!success || !!error ? `${STATE_ICON_SIZE}px` : '0px'})`,
              })}
              tabIndex={tabIndex}
              value={value}
            />
            <Stack
              alignItems="center"
              className={textAreaClearableContainer}
              direction="row"
              gap="1"
            >
              {computedClearable ? (
                <Button
                  aria-label="clear value"
                  onClick={() => {
                    onChange('')
                  }}
                  sentiment="neutral"
                  size="xsmall"
                  variant="ghost"
                >
                  <CloseIcon />
                </Button>
              ) : null}
              {success && !error ? (
                <CheckCircleIcon sentiment="success" size={STATE_ICON_SIZE} />
              ) : null}
              {error ? <AlertCircleIcon sentiment="danger" /> : null}
            </Stack>
          </div>
        </Tooltip>

        {notice || maxLength ? (
          <Row gap="1" templateColumns="minmax(0, 1fr) min-content">
            <div>
              {error || success || typeof helper === 'string' ? (
                <Text
                  as="p"
                  disabled={disabled}
                  prominence={!error && !success ? 'weak' : 'default'}
                  sentiment={sentiment}
                  variant="caption"
                >
                  {error || success || helper}
                </Text>
              ) : null}
              {!error && !success && typeof helper !== 'string' && helper
                ? helper
                : null}
            </div>
            {maxLength ? (
              <Text
                as="div"
                prominence="weak"
                sentiment="neutral"
                variant="caption"
              >
                {value?.length ?? 0}/{maxLength}
              </Text>
            ) : null}
          </Row>
        ) : null}
      </Stack>
    )
  },
)
