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
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Toggle } from '../Toggle'

type ToggleGroupContextType = {
  groupName: string
  groupValues: string[]
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

const ToggleGroupContext = createContext<ToggleGroupContextType | undefined>(
  undefined,
)

type ToggleGroupToggleProps = Omit<
  ComponentProps<typeof Toggle>,
  'onChange' | 'checked' | 'required'
> & {
  value: string
}

/**
 * ToggleGroup is a component that allows you to group a set of Toggle components together under the same legend.
 */
export const ToggleGroupToggle = ({
  disabled,
  name,
  value,
  label,
  helper,
  className,
  'data-testid': dataTestId,
}: ToggleGroupToggleProps) => {
  const context = useContext(ToggleGroupContext)

  if (!context) {
    throw new Error('ToggleGroup.Toggle can only be used inside a ToggleGroup')
  }

  const { groupName, onChange, groupValues } = context

  const ToggleName = `${groupName}.${name}`
  const ToggleValue = `${value}`

  return (
    <Toggle
      onChange={onChange}
      checked={groupValues?.includes(ToggleValue)}
      disabled={disabled}
      name={ToggleName}
      value={ToggleValue}
      helper={helper}
      className={className}
      data-testid={dataTestId}
      label={label}
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

type ToggleGroupProps = {
  legend: string
  value?: string[]
  className?: string
  helper?: ReactNode
  error?: ReactNode
  direction?: 'row' | 'column'
  children: ReactNode
  required?: boolean
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'name'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

export const ToggleGroup = ({
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
}: ToggleGroupProps) => {
  const contextValue = useMemo(
    () => ({
      groupName: name,
      groupValues: value ?? [],
      onChange,
    }),
    [name, value, onChange],
  )

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <Stack gap={1}>
        <FieldSet className={className}>
          <Stack gap={1.5}>
            <Text as="legend" variant="bodyStrong">
              {legend}&nbsp;
              {required ? (
                <StyledRequiredIcon name="asterisk" color="danger" size={8} />
              ) : null}
            </Text>
            <Stack gap={2} direction={direction}>
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
    </ToggleGroupContext.Provider>
  )
}

ToggleGroup.Toggle = ToggleGroupToggle
