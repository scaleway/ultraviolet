import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
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
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(
  undefined,
)

type RadioGroupRadioProps = Omit<
  ComponentProps<typeof Radio>,
  'onChange' | 'checked' | 'required'
>

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
  'data-testid': dataTestId,
}: RadioGroupRadioProps) => {
  const context = useContext(RadioGroupContext)

  if (!context) {
    throw new Error('RadioGroup.Radio can only be used inside a RadioGroup')
  }

  const { groupName, onChange, groupValue } = context
  const radioName = `${groupName}-${name ?? ''}`

  return (
    <Radio
      onChange={onChange}
      checked={`${groupName}-${groupValue}` === radioName}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      error={error}
      name={radioName}
      value={value}
      label={label}
      helper={helper}
      className={className}
      autoFocus={autoFocus}
      onKeyDown={onKeyDown}
      data-testid={dataTestId}
    />
  )
}

const FieldSet = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`

const StyledRequiredIcon = styled(Icon)`
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
  required = false,
}: RadioGroupProps) => {
  const contextValue = useMemo(
    () => ({
      groupName: name,
      groupValue: value,
      onChange,
      required,
    }),
    [name, value, onChange, required],
  )

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <Stack gap={1}>
        <FieldSet className={className}>
          <Stack gap={1.5}>
            <Text as="legend" variant="bodyStrong">
              {legend}&nbsp;
              {required ? (
                <StyledRequiredIcon name="asterisk" color="danger" size={8} />
              ) : null}
            </Text>
            <Stack gap={direction === 'column' ? 1 : 2} direction={direction}>
              {children}
            </Stack>
          </Stack>
        </FieldSet>
        {helper ? (
          <Text as="p" variant="bodySmall" prominence="weak">
            {helper}
          </Text>
        ) : null}
        {error ? (
          <Text as="p" variant="bodySmall" sentiment="danger" prominence="weak">
            {error}
          </Text>
        ) : null}
      </Stack>
    </RadioGroupContext.Provider>
  )
}

RadioGroup.Radio = RadioGroupRadio
