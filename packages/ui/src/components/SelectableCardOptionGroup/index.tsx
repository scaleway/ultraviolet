import type { ReactNode } from 'react'
import { Option } from './components/Option'
import { Stack } from '../Stack'
import { Text } from '../Text'
import styled from '@emotion/styled'
import { Label, Row } from '..'

const FieldSet = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`

type SelectableCardOptionGroupProps = {
  legend?: string
  legendDescription?: ReactNode
  className?: string
  required?: boolean
  columns?: number
  children: ReactNode
  helper?: ReactNode
  error?: ReactNode
}

/**
 * SelectableCardOptionGroup gives you a group of SelectInput within a SelectableCard component. It's an input that provide the choice of one value and sub options to choose from.
 */
export const SelectableCardOptionGroup = ({
  legend,
  legendDescription,
  className,
  required,
  columns = 3,
  children,
  helper,
  error,
}: SelectableCardOptionGroupProps) => (
  <Stack gap={1}>
    <FieldSet className={className}>
      <Stack gap={1.5}>
        {legend ? (
          <Label required={required} labelDescription={legendDescription}>
            {legend}
          </Label>
        ) : null}
        <Row
          gap={2}
          templateColumns={
            columns ? `repeat(${columns}, minmax(0, 1fr))` : 'auto'
          }
        >
          {children}
        </Row>
      </Stack>
    </FieldSet>
    {helper ? (
      <Text as="span" variant="caption" prominence="weak" sentiment="neutral">
        {helper}
      </Text>
    ) : null}
    {error ? (
      <Text as="span" variant="caption" sentiment="danger">
        {error}
      </Text>
    ) : null}
  </Stack>
)

SelectableCardOptionGroup.Option = Option
SelectableCardOptionGroup.OptionLabel = Label
