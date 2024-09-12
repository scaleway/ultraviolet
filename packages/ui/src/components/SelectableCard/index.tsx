import styled from '@emotion/styled'
import * as ProductIcon from '@ultraviolet/icons/product'
import type {
  ChangeEventHandler,
  FocusEventHandler,
  ForwardedRef,
  KeyboardEventHandler,
  ReactNode,
} from 'react'
import { forwardRef, useCallback, useRef } from 'react'
import type { PascalToCamelCaseWithoutSuffix } from '../../types'
import { Checkbox, CheckboxContainer } from '../Checkbox'
import { Radio, RadioStack } from '../Radio'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'

const Container = styled(Stack)`
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

  &[data-has-illustration="true"] {
    padding: ${({ theme }) => theme.space[0]};
  }
  &[data-has-icon="true"] {
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

  ${RadioStack}, ${CheckboxContainer} {
    width: 100%;
  }
`
const StyledDiv = styled.div`
flex:1 1 220px;
height: auto;
overflow: hidden;
display: flex;
position: relative;
align-items: center;
`

const StyledImg = styled.img`
object-fit: cover;
position: absolute;
min-width:220px;
height: auto;
left: ${({ theme }) => theme.space[1]};

`

const IllustrationStack = styled(Stack)`
padding: ${({ theme }) => theme.space[2]};
max-width:  calc(100% - 160px);
flex: 0 1 auto;
`

const StyledStack = styled(Stack)`
  &[data-has-label='true'] {
    padding-left: ${({ theme }) => theme.space['4']};
  }

  &[data-has-label='false'] {
    display: contents;
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

const StyledRadio = StyledElement.withComponent(Radio)
const OverloadedCheckbox = StyledElement.withComponent(Checkbox)
const StyledCheckbox = styled(OverloadedCheckbox)`
  label {
    width: 100%;
  }

  pointer-events: none; // Prevents the label from being clickable as we want the container to be clickable
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
  label?: ReactNode
  'data-testid'?: string
  productIcon?: PascalToCamelCaseWithoutSuffix<
    keyof typeof ProductIcon,
    'ProductIcon'
  >
  illustration?: string
}

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
    }: SelectableCardProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const innerRef = useRef<HTMLInputElement>(null)
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
              <Tooltip text={tooltip}>{subChildren}</Tooltip>
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
              flex={1}
              direction="row"
              justifyContent="space-between"
              width="100%"
              alignItems="stretch"
            >
              <IllustrationStack>{subChildren}</IllustrationStack>
              <Stack justifyContent="center">
                {ProductIconUsed ? <ProductIconUsed size="large" /> : null}
              </Stack>

              {illustration ? (
                <StyledDiv>
                  <StyledImg
                    src={illustration}
                    alt="illustration"
                    width={220}
                  />
                </StyledDiv>
              ) : null}
            </Stack>
          )
        }

        return subChildren
      },
      [ProductIconUsed, illustration],
    )

    const onKeyDown: KeyboardEventHandler = useCallback(
      event => {
        if (event.key === ' ') {
          if (innerRef?.current) {
            event.preventDefault()
            innerRef.current.click()
          }
        }
      },
      [innerRef],
    )

    return (
      <ParentContainer>
        <Container
          onClick={() => {
            if (innerRef?.current) {
              innerRef.current.click()
            }
          }}
          onKeyDown={onKeyDown}
          className={className}
          data-checked={checked}
          data-disabled={disabled}
          data-error={isError}
          data-testid={dataTestId}
          data-type={type}
          data-has-label={!!label}
          data-has-illustration={!!illustration}
          data-has-icon={productIcon && !illustration}
          ref={ref}
          alignItems="start"
          direction="column"
          gap={0.5}
          flex={1}
          tabIndex={disabled ? undefined : 0}
          role="button"
        >
          <IllustrationContainer>
            {type === 'radio' ? (
              <StyledRadio
                name={name}
                value={value}
                onChange={onChange}
                showTick={showTick}
                checked={checked}
                disabled={disabled}
                error={isError}
                onFocus={onFocus}
                onBlur={onBlur}
                hasLabel={!!label}
                id={id}
                ref={innerRef}
                data-error={isError}
                label={label}
                tabIndex={!showTick ? -1 : undefined}
              />
            ) : (
              <StyledCheckbox
                name={name}
                value={value}
                onChange={onChange}
                showTick={showTick}
                checked={checked}
                disabled={disabled}
                error={isError}
                onFocus={onFocus}
                onBlur={onBlur}
                hasLabel={!!label}
                id={id}
                ref={innerRef}
                data-error={isError}
              >
                {label}
              </StyledCheckbox>
            )}
            {children ? (
              <StyledStack data-has-label={!!label && showTick} width="100%">
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
