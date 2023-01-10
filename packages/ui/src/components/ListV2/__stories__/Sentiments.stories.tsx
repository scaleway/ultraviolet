import type { Story } from '@storybook/react'
import { List } from '..'
import { LIST_ROW_SENTIMENTS } from '../ListRow'

export const Sentiments: Story = () => (
  <List
    columns={[
      { label: 'Variant name', width: '200px' },
      { label: 'Example text' },
    ]}
    autoClose
  >
    {LIST_ROW_SENTIMENTS.map(sentiment => (
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
