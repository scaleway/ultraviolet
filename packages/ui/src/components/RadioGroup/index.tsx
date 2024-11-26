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
import { Radio } from '../Radio'
import { Stack } from '../Stack'
import { Text } from '../Text'

type RadioGroupContextType = {
  groupName: string
  groupValue: string | number
  error: boolean
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(
  undefined,
)

type RadioGroupRadioProps = Omit<
  ComponentProps<typeof Radio>,
  'onChange' | 'checked' | 'required'
> & {
  /**
   * @deprecated you don't need to use `name` anymore, the name will be passed from the parent `RadioGroup`.
   */
  name?: string
}

const RadioGroupRadio = ({
  onFocus,
  onBlur,
  disabled,
  error,
  name,
  value,
  label,
  helper,
  className,
  autoFocus,
  onKeyDown,
  tooltip,
  'data-testid': dataTestId,
}: RadioGroupRadioProps) => {
  const context = useContext(RadioGroupContext)

  if (!context) {
    throw new Error('RadioGroup.Radio can only be used inside a RadioGroup')
  }

  const { groupName, onChange, groupValue, error: errorContext } = context

  return (
    <Radio
      onChange={onChange}
      checked={groupValue === value}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      error={error || errorContext}
      name={groupName ?? name}
      value={value}
      label={label}
      helper={helper}
      className={className}
      autoFocus={autoFocus}
      onKeyDown={onKeyDown}
      data-testid={dataTestId}
      tooltip={tooltip}
    />
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

type RadioGroupProps = {
  legend: string
  value: string | number
  className?: string
  helper?: ReactNode
  error?: ReactNode
  direction?: 'row' | 'column'
  children: ReactNode
  description?: ReactNode
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'name'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

/**
 * RadioGroup is a component that allows users to select one option from a list of options using radio.
 */
export const RadioGroup = ({
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
}: RadioGroupProps) => {
  const contextValue = useMemo(
    () => ({
      groupName: name,
      groupValue: value,
      onChange,
      required,
      error: !!error,
    }),
    [name, value, onChange, required, error],
  )

  return (
    <RadioGroupContext.Provider value={contextValue}>
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
            <Stack
              gap={direction === 'column' ? 1 : 2}
              direction={direction}
              alignItems="start"
            >
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
    </RadioGroupContext.Provider>
  )
}

RadioGroup.Radio = RadioGroupRadio
