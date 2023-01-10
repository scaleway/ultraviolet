import type { Story } from '@storybook/react'
import { List } from '..'
import type { Color } from '../../../theme'

const variants: Color[] = [
  'primary',
  'neutral',
  'success',
  'info',
  'warning',
  'danger',
]

export const Variants: Story = () => (
  <List
    columns={[
      { label: 'Variant name', width: '200px' },
      { label: 'Example text' },
    ]}
    autoClose
  >
    <List.Body>
      {variants.map(variant => (
        <List.Row key={variant} id={variant} variant={variant}>
          <List.Cell>{variant}</List.Cell>
          <List.Cell>An example text...</List.Cell>
        </List.Row>
      ))}
    </List.Body>
  </List>
)

Variants.parameters = {
  docs: {
    storyDescription:
      'A list row can use `variant` props to modify its style. `isDisabled` prop will override `variant` prop',
  },
}
