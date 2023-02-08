import type { Story } from '@storybook/react'
import { List } from '..'
import { SENTIMENTS } from '../../../theme'

export const Sentiments: Story = () => (
  <List
    columns={[
      { label: 'Variant name', width: '200px' },
      { label: 'Example text' },
    ]}
    autoClose
  >
    {SENTIMENTS.map(sentiment => (
      <List.Row
        key={sentiment}
        id={sentiment}
        sentiment={sentiment}
        expandable="expandable content"
      >
        <List.Cell>{sentiment}</List.Cell>
        <List.Cell>An example text...</List.Cell>
      </List.Row>
    ))}
  </List>
)

Sentiments.parameters = {
  docs: {
    storyDescription:
      'A list row can use `sentiment` props to modify its style. `isDisabled` prop will override `variant` prop',
  },
}
