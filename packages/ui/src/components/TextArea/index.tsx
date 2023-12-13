import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { DOMAttributes, ReactNode } from 'react'
import { forwardRef, useId } from 'react'
import { Button, SIZE_HEIGHT as ButtonSizeHeight } from '../Button'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

const STATE_ICON_SIZE = 16

const StyledTextAreaWrapper = styled.div`
  position: relative;
  display: flex;
`

const StyledTextAreaAbsoluteStack = styled(Stack)`
  position: absolute;
  top: ${({ theme }) => theme.space['1.5']};
  right: ${({ theme }) => theme.space['1']};
`

type StyledTextAreaProps = {
  isSuccess: boolean
  isError: boolean
  isClearable: boolean
}
const StyledTextArea = styled('textarea', {
  shouldForwardProp: prop =>
    !['isSuccess', 'isError', 'isClearable'].includes(prop),
})<StyledTextAreaProps>`
  width: 100%;
  resize: vertical;
  background: ${({ theme }) => theme.colors.neutral.background};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  color: ${({ theme }) => theme.colors.neutral.text};
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.textWeak};
  }
  border-radius: ${({ theme }) => theme.radii.default};
  padding: ${({ theme }) =>
    `${theme.space['1.5']} ${theme.space['1']} ${theme.space['1.5']} ${theme.space['2']}`};
  padding-right: ${({ theme, isClearable, isError, isSuccess }) =>
    /* including 1 optional if both element is visible + 1 because content is absolute 1space unit from right */
    `calc(${theme.space[isClearable && (isSuccess || isError) ? '4' : '3']} + ${
      isClearable ? `${ButtonSizeHeight.xsmall}px` : '0px'
    } + ${isSuccess || isError ? `${STATE_ICON_SIZE}px` : '0px'})`};

  ${({ theme, disabled }) =>
    !disabled
      ? `
  &:hover {
    border-color: ${theme.colors.primary.border};
  }
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.border};
    box-shadow: ${theme.shadows.focusPrimary};
  }
  `
      : ''}

  ${({ theme, isSuccess, isError, readOnly, disabled }) => {
    if (disabled) {
      return `
            background : ${theme.colors.neutral.backgroundDisabled};
            border-color : ${theme.colors.neutral.borderDisabled};
            color : ${theme.colors.neutral.textDisabled};
            &::placeholder {
              color: ${theme.colors.neutral.textWeakDisabled};
            }
            cursor: not-allowed;
        `
    }
    if (readOnly) {
      return `
            background : ${theme.colors.neutral.backgroundWeak};
            border-color : ${theme.colors.neutral.borderWeak};
        `
    }
    if (isSuccess) {
      return `
            border-color : ${theme.colors.success.border};
        `
    }
    if (isError) {
      return `
            border-color : ${theme.colors.danger.border};
        `
    }

    return ''
  }}
`

type TextAreaProps = {
  id?: string
  className?: string
  tabIndex?: number
  autoFocus?: boolean
  label: string
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
  rows?: number
  minLength?: number
  maxLength?: number
  tooltip?: string
  required?: boolean
  'data-testid'?: string
  name?: string
  onFocus?: DOMAttributes<HTMLTextAreaElement>['onFocus']
  onBlur?: DOMAttributes<HTMLTextAreaElement>['onBlur']
  clearable?: boolean
  labelDescription?: ReactNode
}

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
      clearable = false,
      labelDescription,
    },
    ref,
  ) => {
    const localId = useId()

    // Avoid conflicts between properties
    const computedReadOnly = !disabled && readOnly
    const computedSuccess = !disabled && !readOnly ? success : undefined
    const computedError = !disabled && !readOnly && !success ? error : undefined
    const computedHelper = !success && !error ? helper : undefined

    return (
      <Stack gap={1} className={className}>
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
        <Tooltip text={tooltip}>
          <StyledTextAreaWrapper>
            <StyledTextArea
              aria-invalid={!!computedError}
              id={id ?? localId}
              tabIndex={tabIndex}
              autoFocus={autoFocus}
              disabled={disabled}
              rows={rows}
              ref={ref}
              value={value}
              onChange={event => {
                onChange(event.currentTarget.value)
              }}
              isSuccess={!!computedSuccess}
              isError={!!computedError}
              isClearable={!!clearable}
              minLength={minLength}
              maxLength={maxLength}
              placeholder={placeholder}
              data-testid={dataTestId}
              name={name}
              onFocus={onFocus}
              onBlur={onBlur}
              readOnly={computedReadOnly}
            />
            <StyledTextAreaAbsoluteStack
              direction="row"
              alignItems="center"
              gap="1"
            >
              {clearable ? (
                <Button
                  aria-label="clear value"
                  variant="ghost"
                  size="xsmall"
                  icon="close"
                  onClick={() => {
                    onChange('')
                  }}
                  sentiment="neutral"
                />
              ) : null}
              {success ? (
                <Icon
                  name="checkbox-circle-outline"
                  color="success"
                  size={STATE_ICON_SIZE}
                />
              ) : null}
              {error ? <Icon name="alert" color="danger" /> : null}
            </StyledTextAreaAbsoluteStack>
          </StyledTextAreaWrapper>
        </Tooltip>

        {computedSuccess || computedError || computedHelper || maxLength ? (
          <Row templateColumns="minmax(0, 1fr) min-content" gap="1">
            <div>
              {computedSuccess ? (
                <Text as="p" variant="caption" sentiment="success">
                  {computedSuccess}
                </Text>
              ) : null}
              {computedError ? (
                <Text as="p" variant="caption" sentiment="danger">
                  {computedError}
                </Text>
              ) : null}
              {computedHelper && typeof computedHelper === 'string' ? (
                <Text
                  as="p"
                  variant="caption"
                  sentiment="neutral"
                  prominence="weak"
                  disabled={disabled}
                >
                  {computedHelper}
                </Text>
              ) : null}
              {computedHelper && typeof computedHelper !== 'string'
                ? computedHelper
                : null}
            </div>
            {maxLength ? (
              <Text
                as="div"
                sentiment="neutral"
                prominence="weak"
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
