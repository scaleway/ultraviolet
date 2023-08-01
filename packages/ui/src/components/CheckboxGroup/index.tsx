import styled from '@emotion/styled'
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
  groupValue: string | number
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

const CheckboxGroupContext = createContext<
  CheckboxGroupContextType | undefined
>(undefined)

type CheckboxGroupCheckboxProps = Omit<
  ComponentProps<typeof Checkbox>,
  'onChange' | 'checked' | 'required'
> & {
  value: string | number
}

const CheckboxGroupCheckbox = ({
  onFocus,
  onBlur,
  disabled,
  error,
  name,
  value,
  children,
  //   helper,
  className,
  autoFocus,
  'data-testid': dataTestId,
}: CheckboxGroupCheckboxProps) => {
  const context = useContext(CheckboxGroupContext)

  if (!context) {
    throw new Error(
      'CheckboxGroup.Checkbox can only be used inside a CheckboxGroup',
    )
  }

  const { groupName, onChange, groupValue } = context

  const checkboxName = `${groupName}-${name ?? ''}`
  const checkboxValue = `${groupName}-${value}`

  return (
    <Checkbox
      onChange={onChange}
      checked={groupValue === checkboxName}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      error={error}
      name={checkboxName}
      value={checkboxValue}
      //   helper={helper}
      className={className}
      autoFocus={autoFocus}
      data-testid={dataTestId}
    >
      {children}
    </Checkbox>
  )
}

const FieldSet = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`

const MargedText = styled(Text)`
  margin-left: ${({ theme }) => theme.space['4']};
`

type CheckboxGroupProps = {
  label: string
  value: string | number
  className?: string
  helper?: ReactNode
  error?: ReactNode
  direction?: 'row' | 'column'
  children: ReactNode
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'name'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

export const CheckboxGroup = ({
  label,
  value,
  className,
  helper,
  error,
  direction = 'column',
  children,
  onChange,
  name,
  required = false,
}: CheckboxGroupProps) => {
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
    <CheckboxGroupContext.Provider value={contextValue}>
      <Stack gap={1}>
        <FieldSet className={className}>
          <Stack gap={1.5}>
            <Text as="p" variant="bodyStrong">
              <legend>{label}</legend>
            </Text>
            <Stack gap={direction === 'column' ? 1 : 2} direction={direction}>
              {children}
            </Stack>
          </Stack>
        </FieldSet>
        {helper ? (
          <MargedText as="p" variant="bodySmall" prominence="weak">
            {helper}
          </MargedText>
        ) : null}
        {error ? (
          <MargedText
            as="p"
            variant="bodySmall"
            color="danger"
            prominence="weak"
          >
            {error}
          </MargedText>
        ) : null}
      </Stack>
    </CheckboxGroupContext.Provider>
  )
}

CheckboxGroup.Checkbox = CheckboxGroupCheckbox
