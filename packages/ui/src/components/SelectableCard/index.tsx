'use client'

// oxlint-disable-next-line import/no-namespace
import * as ProductIcon from '@ultraviolet/icons/product'
import { useTheme } from '@ultraviolet/themes'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type {
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
  ForwardedRef,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react'
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { LabelProp, PascalToCamelCaseWithoutSuffix } from '../../types'
import { Checkbox } from '../Checkbox'
import { Radio } from '../Radio'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'
import {
  containerSelectableCard,
  divSelectableCard,
  illustrationSelectableCard,
  imageSelectableCard,
  indentedCard,
  labelContainerSelectableCard,
  selectableElementSelectableCard,
  stackSelectableCard,
} from './styles.css'
import { inputDisplay, labelDisplay, widthSelectable } from './variables.css'

export type SelectableCardProps = {
  name?: string
  children?:
    | (({
        disabled,
        checked,
      }: Pick<SelectableCardProps, 'checked' | 'disabled'>) => ReactNode)
    | ReactNode
  value: string | number
  onChange: ChangeEventHandler<HTMLInputElement>
  showTick?: boolean
  type?: 'radio' | 'checkbox'
  disabled?: boolean
  checked?: boolean
  className?: string
  isError?: boolean
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  id?: string
  tooltip?: string
  'data-testid'?: string
  style?: CSSProperties
  indented?: boolean
} & (
  | {
      illustration?: string
      productIcon?: never
    }
  | {
      productIcon?: PascalToCamelCaseWithoutSuffix<
        keyof typeof ProductIcon,
        'ProductIcon'
      >
      illustration?: never
    }
) &
  LabelProp

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
    const theme = useTheme()
    const innerRef = useRef<HTMLInputElement>(null)
    const childrenRef = useRef<HTMLDivElement>(null)
    const [svgContent, setSvgContent] = useState<string | null>(null)
    const image = useMemo(() => {
      if (illustration) {
        return 'illustration'
      }
      if (productIcon) {
        return 'icon'
      }

      return 'none'
    }, [illustration, productIcon])

    useEffect(() => {
      // Check if the illustration ends with .svg to handle it as an SVG to ensure the 'fill' property and "width" are correct by changing them directly to what we want
      if (illustration?.endsWith('.svg')) {
        fetch(illustration)
          .then(response => response.text())
          .then(svg => {
            const updatedSvg = svg
              .replace(
                /fill="[^"]*"/g,
                `fill="${theme.colors.neutral.backgroundStronger}"`,
              ) // adapt fill property to theme
              .replace(/width="[^"]*"/g, `width="220px"`) // fixed width
              .replace(/height="[^"]*"/g, `height="220px"`) // fixed height

            setSvgContent(updatedSvg)
          })
          .catch(() => null)
      }
    })

    const ProductIconUsed = productIcon
      ? ProductIcon[
          `${
            productIcon.charAt(0).toUpperCase() + productIcon.slice(1)
          }ProductIcon` as keyof typeof ProductIcon
        ]
      : null

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
    const IllustrationContainer = useCallback(
      ({ children: subChildren }: { children: ReactNode }) => {
        if (ProductIconUsed || illustration) {
          return (
            <Stack
              alignItems="stretch"
              direction="row"
              flex={1}
              justifyContent="space-between"
              width="100%"
            >
              <Stack className={illustrationSelectableCard}>
                {subChildren}
              </Stack>
              <Stack justifyContent="center">
                {ProductIconUsed ? <ProductIconUsed size="large" /> : null}
              </Stack>

              {illustration ? (
                <div className={divSelectableCard}>
                  {illustration.endsWith('.svg') && svgContent ? (
                    <div
                      className={imageSelectableCard}
                      // oxlint-disable-next-line  react/no-danger
                      dangerouslySetInnerHTML={{ __html: svgContent }}
                    />
                  ) : (
                    <img
                      alt="illustration"
                      className={imageSelectableCard}
                      src={illustration}
                      width={220}
                    />
                  )}
                </div>
              ) : null}
            </Stack>
          )
        }

        return subChildren
      },
      [ProductIconUsed, illustration, svgContent],
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
            !inputElement.contains(targetNode) &&
            !labelElement?.contains(targetNode)
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
                type === 'checkbox' && isComplexChildren ? 'default' : 'custom',
              image,
            }),
            labelContainerSelectableCard[label ? 'label' : 'noLabel'],
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
            type === 'checkbox' && isComplexChildren
              ? undefined
              : onClickContainer
          }
          onKeyDown={onKeyDown}
          ref={ref}
          // oxlint-disable-next-line jsx_a11y/prefer-tag-over-role
          role="button"
          style={{
            ...assignInlineVars({
              [inputDisplay]: !showTick ? 'none' : 'inline',
              [labelDisplay]: !showTick && !label ? 'none' : 'inline',
              [widthSelectable]: label ? '100%' : 'auto',
            }),
            ...style,
          }}
          tabIndex={disabled ? undefined : 0}
        >
          <IllustrationContainer>
            {type === 'radio' ? (
              <Radio
                checked={checked}
                className={selectableElementSelectableCard}
                data-error={isError}
                disabled={disabled}
                error={isError}
                id={id}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                ref={innerRef}
                tabIndex={-1}
                value={value}
                {...(label ? { label } : { 'aria-label': ariaLabel as string })}
              />
            ) : (
              <Checkbox
                checked={checked}
                className={selectableElementSelectableCard}
                data-error={isError}
                disabled={disabled}
                error={isError}
                id={id}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                ref={innerRef}
                tabIndex={-1}
                value={value}
                {...(label
                  ? { 'aria-label': undefined, children: label }
                  : { 'aria-label': ariaLabel as string })}
              />
            )}
            {children ? (
              <Stack
                className={cn(
                  stackSelectableCard,
                  !!label && showTick && indented ? indentedCard : undefined,
                )}
                data-has-default-cursor={
                  type === 'checkbox' && isComplexChildren
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
