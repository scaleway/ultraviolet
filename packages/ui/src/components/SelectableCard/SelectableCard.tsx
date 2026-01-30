'use client'

import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type {
  ForwardedRef,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react'
import { forwardRef, useCallback, useMemo, useRef } from 'react'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'
import { IllustrationContainer } from './IllustrationContainer'
import { MultiStateInput } from './MultiStateInput'
import {
  containerSelectableCard,
  indentedCard,
  labelContainerSelectableCardLabel,
  labelContainerSelectableCardNoLabel,
  stackSelectableCard,
} from './styles.css'
import type { SelectableCardProps } from './types'
import { inputDisplay, labelDisplay, widthSelectable } from './variables.css'

/**
 * SelectableCard is a component that can be used to create a radio or checkbox card.
 * It can be used to create a list of selectable items or a single selectable item.
 */
export const SelectableCard = forwardRef(
  (
    {
      name,
      value,
      onChange,
      showTick = false,
      type = 'radio',
      checked = false,
      disabled = false,
      children,
      className,
      isError,
      onFocus,
      onBlur,
      tooltip,
      id,
      label,
      'data-testid': dataTestId,
      productIcon,
      illustration,
      'aria-label': ariaLabel,
      style,
      indented = true,
    }: SelectableCardProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const innerRef = useRef<HTMLInputElement>(null)
    const childrenRef = useRef<HTMLDivElement>(null)
    const image = useMemo(() => {
      if (illustration) {
        return 'illustration'
      }
      if (productIcon) {
        return 'icon'
      }

      return 'none'
    }, [illustration, productIcon])

    const ParentContainer = useCallback(
      ({ children: subChildren }: { children: ReactNode }) => {
        if (tooltip) {
          return (
            <Stack flex={1}>
              <Tooltip containerFullHeight text={tooltip}>
                {subChildren}
              </Tooltip>
            </Stack>
          )
        }

        return <Tooltip>{subChildren}</Tooltip>
      },
      [tooltip],
    )

    const onKeyDown: KeyboardEventHandler = useCallback(
      event => {
        if (event.key === ' ' && innerRef?.current) {
          event.preventDefault()
          innerRef.current.click()
        }
      },
      [innerRef],
    )

    const isComplexChildren = ['function', 'array', 'object'].includes(
      typeof children,
    )

    const onClickContainer: MouseEventHandler<HTMLDivElement> = useCallback(
      event => {
        if (innerRef.current && !disabled) {
          const inputElement = innerRef.current
          const labelElement = document.querySelector(
            `label[for="${inputElement.id}"]`,
          )

          const targetNode = event.target as Node

          // Check if the event target is the input element, its associated label, or the children content
          if (
            !(
              inputElement.contains(targetNode) ||
              labelElement?.contains(targetNode)
            )
          ) {
            inputElement.click()
          }
        }
      },
      [disabled],
    )

    return (
      <ParentContainer>
        <Stack
          alignItems="flex-start"
          className={cn(
            className,
            containerSelectableCard({
              cursor:
                (type === 'checkbox' || type === 'toggle') && isComplexChildren
                  ? 'default'
                  : 'custom',
              image,
            }),
            label
              ? labelContainerSelectableCardLabel
              : labelContainerSelectableCardNoLabel,
          )}
          data-checked={checked}
          data-disabled={disabled}
          data-error={isError}
          data-testid={dataTestId}
          data-type={type}
          direction={label ? 'column' : 'row'}
          flex={1}
          gap={0.5}
          onClick={
            (type === 'checkbox' || type === 'toggle') && isComplexChildren
              ? undefined
              : onClickContainer
          }
          onKeyDown={onKeyDown}
          ref={ref}
          // oxlint-disable-next-line jsx_a11y/prefer-tag-over-role
          role="button"
          style={{
            ...assignInlineVars({
              [inputDisplay]: showTick ? 'inline' : 'none',
              [labelDisplay]: showTick || label ? 'inline' : 'none',
              [widthSelectable]: label ? '100%' : 'auto',
            }),
            ...style,
          }}
          tabIndex={disabled ? undefined : 0}
        >
          <IllustrationContainer
            illustration={illustration}
            productIcon={productIcon}
          >
            <MultiStateInput
              aria-label={ariaLabel}
              checked={checked}
              data-error={isError}
              disabled={disabled}
              id={id}
              innerRef={innerRef}
              isError={isError}
              label={label}
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              onFocus={onFocus}
              type={type}
              value={value}
            />

            {children ? (
              <Stack
                className={cn(
                  stackSelectableCard,
                  !!label && showTick && indented ? indentedCard : undefined,
                )}
                data-has-default-cursor={
                  (type === 'checkbox' || type === 'toggle') &&
                  isComplexChildren
                }
                data-has-label={!!label && showTick}
                onKeyDown={event => event.stopPropagation()}
                ref={childrenRef}
                width="100%"
              >
                {typeof children === 'function'
                  ? children({ checked, disabled })
                  : children}
              </Stack>
            ) : null}
          </IllustrationContainer>
        </Stack>
      </ParentContainer>
    )
  },
)
