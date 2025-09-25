'use client'

import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import * as ProductIcon from '@ultraviolet/icons/product'
import type {
  ChangeEventHandler,
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
import {
  checkboxContainer,
  icon as checkboxIcon,
  checkboxInput,
  innerCheckbox,
} from '../Checkbox/styles.css'
import { Radio } from '../Radio'
import {
  innerCircleRing,
  radio as radioInput,
  radioStack,
  ring,
} from '../Radio/styles.css'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'

const Container = styled(Stack)`
  position: relative;
  // This is to remove the gap when there is no label because if we do not there
  // will be an empty space above the children due to the invisible input
  // if you find a better way to do this feel free to do it
  &[data-has-label='false'] > :first-child {
    margin-bottom: -${({ theme }) => theme.space['0.5']};
  }

  padding: ${({ theme }) => theme.space['2']};
  border-radius: ${({ theme }) => theme.radii.default};
  transition:
    border-color 200ms ease,
    box-shadow 200ms ease;
  cursor: pointer;
  &[data-has-default-cursor='true'] {
    cursor: default;
  }
  background: ${({ theme }) => theme.colors.neutral.background};

  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  color: ${({ theme }) => theme.colors.neutral.text};

  &[data-checked='true'] {
    border: 1px solid ${({ theme }) => theme.colors.primary.border};
  }

  &[data-error='true'] {
    border: 1px solid ${({ theme }) => theme.colors.danger.border};
  }

  &[data-disabled='true'] {
    border: 1px solid ${({ theme }) => theme.colors.neutral.borderDisabled};
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    cursor: not-allowed;
  }

  &[data-image="illustration"] {
    padding: ${({ theme }) => theme.space[0]};
  }

  &[data-image="icon"] {
    padding: ${({ theme }) => theme.space[0]};
    padding-right: ${({ theme }) => theme.space['2']};
  }
  &:hover,
  &:active {
    &:not([data-error='true']):not([data-disabled='true']) {
      border: 1px solid ${({ theme }) => theme.colors.primary.border};

      &[data-cheked='false'] {
        box-shadow: ${({ theme }) => theme.shadows.hoverPrimary};
      }
    }
  }

  &[data-has-label='true'] {
    ${radioStack}, ${checkboxContainer} {
      width: 100%;
    }
  }
`
const StyledDiv = styled.div`
  display: flex;
  gap: 0;
  flex-flow: column;
  align-items: normal;
  justify-content: center;
  min-width: 11.25rem;
  position: relative;
  overflow: hidden;
`

const StyledImg = styled.img`
  object-fit: cover;
  position: absolute;
  min-width: 13.75rem;
  height: auto;
  left: ${({ theme }) => theme.space[1]};
`

const StyledSVG = styled.div`
  object-fit: cover;
  position: absolute;
  min-width: 13.75rem;
  height: auto;
  left: ${({ theme }) => theme.space[1]};
`

const IllustrationStack = styled(Stack)`
  padding: ${({ theme }) => theme.space[2]};
  max-width:  calc(100% - 10rem);
  flex: 0 1 auto;
`

const StyledStack = styled(Stack)`
  &[data-has-label='true'] {
    padding-left: ${({ theme }) => theme.space['4']};
  }
  &[data-has-label='false'] {
    display: contents;
  }
  &[data-has-default-cursor='true'] {
    cursor: default;
  }
`

const StyledElement = styled('div', {
  shouldForwardProp: prop => !['showTick', 'hasLabel'].includes(prop),
})<{ showTick?: boolean; hasLabel?: boolean }>`
  display: inline-flex;
  align-items: start;

  &[data-checked='true'] {
    color: ${({ theme }) => theme.colors.primary.text};
  }

  &[data-error='true'] {
    color: ${({ theme }) => theme.colors.danger.text};
  }

  &[aria-disabled='true'] {
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
  }

  input + svg {
    ${({ showTick }) => (!showTick ? `display: none;` : null)}
  }

  label {
    ${({ showTick, hasLabel }) =>
      !showTick && !hasLabel ? `display: none;` : null}
  }
`

const OverloadedRadio = StyledElement.withComponent(Radio)
const StyledRadio = styled(OverloadedRadio)`
  &:hover[aria-disabled='false']:not([data-checked='true']) {
    ${radioInput} + ${ring} {
      fill: ${({ theme }) => theme.colors.neutral.border};
      ${innerCircleRing} {
        fill: ${({ theme }) => theme.colors.neutral.background};
      }
    }

    ${radioInput}[aria-invalid='true'] + ${ring} {
      fill: ${({ theme }) => theme.colors.danger.border};
      ${innerCircleRing} {
        fill: ${({ theme }) => theme.colors.neutral.background};
      }
    }
  }

  &:hover[aria-disabled='false'] {
    ${radioInput} + ${ring} {
      fill: ${({ theme }) => theme.colors.primary.border};
      ${innerCircleRing} {
        fill: ${({ theme }) => theme.colors.neutral.background};
      }
    }

    ${radioInput}[aria-invalid='true'] + ${ring} {
      fill: ${({ theme }) => theme.colors.danger.border};
      ${innerCircleRing} {
        fill: ${({ theme }) => theme.colors.neutral.background};
      }
    }
  }

  ${radioInput} {
    &[aria-disabled='false']:active + ${ring} {
      background: none;
      fill: ${({ theme }) => theme.colors.primary.backgroundStrong};
      ${innerCircleRing} {
        fill: ${({ theme }) => theme.colors.neutral.background};
      }
    }
  }
`

const OverloadedCheckbox = StyledElement.withComponent(Checkbox)
const StyledCheckbox = styled(OverloadedCheckbox)`
  label {
    width: 100%;
  }

  &:hover[aria-disabled='false'] {
    ${checkboxInput}[aria-invalid='false'] {
      &[aria-checked='false'] + ${checkboxIcon} ${innerCheckbox} {
        fill: ${({ theme }) => theme.colors.neutral.background};
        stroke: ${({ theme }) => theme.colors.neutral.border};
      }

      &[aria-checked='true'] + ${checkboxIcon} ${innerCheckbox} {
        stroke: ${({ theme }) => theme.colors.primary.borderStrong};
        fill: ${({ theme }) => theme.colors.primary.backgroundStrong};
      }

      &[aria-checked='mixed'] + ${checkboxIcon} ${innerCheckbox} {
        stroke: ${({ theme }) => theme.colors.primary.borderStrong};
        fill: ${({ theme }) => theme.colors.primary.backgroundStrong};
      }
    }
  }

  ${checkboxInput} {
    &:focus + ${checkboxIcon}, &:active + ${checkboxIcon} {
      outline: none;
      background-color: ${({ theme }) => theme.colors.neutral.background};
      fill: ${({ theme }) => theme.colors.neutral.background};
    }

    &[aria-checked='false'] {
      ${innerCheckbox} {
        fill: ${({ theme }) => theme.colors.neutral.background};
        stroke: ${({ theme }) => theme.colors.neutral.border};
      }
    }
  }
`

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
              <IllustrationStack>{subChildren}</IllustrationStack>
              <Stack justifyContent="center">
                {ProductIconUsed ? <ProductIconUsed size="large" /> : null}
              </Stack>

              {illustration ? (
                <StyledDiv>
                  {illustration.endsWith('.svg') && svgContent ? (
                    <StyledSVG
                      // oxlint-disable-next-line  react/no-danger
                      dangerouslySetInnerHTML={{ __html: svgContent }}
                    />
                  ) : (
                    <StyledImg
                      alt="illustration"
                      src={illustration}
                      width={220}
                    />
                  )}
                </StyledDiv>
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
        <Container
          alignItems="start"
          className={className}
          data-checked={checked}
          data-disabled={disabled}
          data-error={isError}
          data-has-default-cursor={type === 'checkbox' && isComplexChildren}
          data-has-label={!!label}
          data-image={image}
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
          role="button"
          tabIndex={disabled ? undefined : 0}
        >
          <IllustrationContainer>
            {type === 'radio' ? (
              <StyledRadio
                checked={checked}
                data-error={isError}
                disabled={disabled}
                error={isError}
                hasLabel={!!label}
                id={id}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                ref={innerRef}
                showTick={showTick}
                tabIndex={-1}
                value={value}
                {...(label ? { label } : { 'aria-label': ariaLabel as string })}
              />
            ) : (
              <StyledCheckbox
                checked={checked}
                data-error={isError}
                disabled={disabled}
                error={isError}
                hasLabel={!!label}
                id={id}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                ref={innerRef}
                showTick={showTick}
                tabIndex={-1}
                value={value}
                {...(label
                  ? { 'aria-label': undefined, children: label }
                  : { 'aria-label': ariaLabel as string })}
              />
            )}
            {children ? (
              <StyledStack
                data-has-default-cursor={
                  type === 'checkbox' && isComplexChildren
                }
                data-has-label={!!label && showTick}
                ref={childrenRef}
                width="100%"
              >
                {typeof children === 'function'
                  ? children({ checked, disabled })
                  : children}
              </StyledStack>
            ) : null}
          </IllustrationContainer>
        </Container>
      </ParentContainer>
    )
  },
)
