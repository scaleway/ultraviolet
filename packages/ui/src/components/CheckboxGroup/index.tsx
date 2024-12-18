import styled from '@emotion/styled'
import { AsteriskIcon } from '@ultraviolet/icons'
import {
  type ComponentProps,
  type InputHTMLAttributes,
  type ReactNode,
  createContext,
  useContext,
  useMemo,
} from 'react'
import { Checkbox } from '../Checkbox'
import { Stack } from '../Stack'
import { Text } from '../Text'

type CheckboxGroupContextType = {
  groupName: string
  groupValues: string[]
  error: boolean
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

const CheckboxGroupContext = createContext<
  CheckboxGroupContextType | undefined
>(undefined)

const StyledCheckbox = styled(Checkbox)`
  label {
    width: fit-content;
  }
`

type CheckboxGroupCheckboxProps = Omit<
  ComponentProps<typeof Checkbox>,
  'onChange' | 'checked'
> & {
  value: string
}

export const CheckboxGroupCheckbox = ({
  onFocus,
  onBlur,
  disabled,
  error,
  name,
  value,
  children,
  helper,
  className,
  autoFocus,
  'data-testid': dataTestId,
  required,
}: CheckboxGroupCheckboxProps) => {
  const context = useContext(CheckboxGroupContext)

  if (!context) {
    throw new Error(
      'CheckboxGroup.Checkbox can only be used inside a CheckboxGroup',
    )
  }

  const { groupName, onChange, groupValues, error: errorContext } = context

  const checkboxName = `${groupName}.${name ?? ''}`
  const checkboxValue = `${value}`

  return (
    <StyledCheckbox
      onChange={onChange}
      checked={groupValues?.includes(checkboxValue)}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      error={error || errorContext}
      name={checkboxName}
      value={checkboxValue}
      helper={helper}
      className={className}
      autoFocus={autoFocus}
      data-testid={dataTestId}
      required={required}
    >
      {children}
    </StyledCheckbox>
  )
}

const FieldSet = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`

const StyledRequiredIcon = styled(AsteriskIcon)`
  vertical-align: super;
`

type CheckboxGroupProps = {
  legend: ReactNode
  value?: string[]
  className?: string
  helper?: ReactNode
  error?: ReactNode
  direction?: 'row' | 'column'
  children: ReactNode
  required?: boolean
  description?: ReactNode
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'name'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

/**
 * CheckboxGroup is a component that groups a set of checkboxes together with a legend and helper/error text.
 */
export const CheckboxGroup = ({
  legend,
  value,
  className,
  helper,
  error,
  direction = 'column',
  children,
  onChange,
  name,
  description,
  required = false,
}: CheckboxGroupProps) => {
  const contextValue = useMemo(
    () => ({
      groupName: name,
      groupValues: value ?? [],
      onChange,
      required,
      error: !!error,
    }),
    [name, value, onChange, required, error],
  )

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <Stack gap={1}>
        <FieldSet className={className}>
          <Stack gap={1.5}>
            <Stack gap={0.5}>
              <Text
                as="legend"
                variant="bodyStrong"
                sentiment="neutral"
                prominence="strong"
              >
                {legend}&nbsp;
                {required ? (
                  <StyledRequiredIcon sentiment="danger" size={8} />
                ) : null}
              </Text>
              {description ? (
                <Text
                  variant="bodySmall"
                  as={typeof description === 'string' ? 'p' : 'div'}
                  prominence="weak"
                  sentiment="neutral"
                >
                  {description}
                </Text>
              ) : null}
            </Stack>
            <Stack gap={direction === 'column' ? 1 : 2} direction={direction}>
              {children}
            </Stack>
          </Stack>
        </FieldSet>
        {helper ? (
          <Text
            as="span"
            variant="caption"
            prominence="weak"
            sentiment="neutral"
          >
            {helper}
          </Text>
        ) : null}
        {error ? (
          <Text as="span" variant="caption" sentiment="danger">
            {error}
          </Text>
        ) : null}
      </Stack>
    </CheckboxGroupContext.Provider>
  )
}

CheckboxGroup.Checkbox = CheckboxGroupCheckbox
