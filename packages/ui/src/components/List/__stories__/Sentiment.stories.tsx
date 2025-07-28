import { SENTIMENTS } from '../../../theme'
import { List } from '..'
import { Template } from './Template.stories'

export const Sentiments = Template.bind({})

Sentiments.args = {
  ...Template.args,
  children: (
    <>
      {SENTIMENTS.map(sentiment => (
        <List.Row
          expandable="expandable content"
          id={sentiment}
          key={sentiment}
          sentiment={sentiment}
        >
          <List.Cell>{sentiment}</List.Cell>
          <List.Cell>An example text...</List.Cell>
        </List.Row>
      ))}
      <List.Row
        disabled
        expandable="expandable content"
        id="disabled"
        sentiment="primary"
      >
        <List.Cell>Sentiment is ignored if row `disabled`</List.Cell>
        <List.Cell>An example text...</List.Cell>
      </List.Row>
    </>
  ),
  columns: [
    { label: 'Sentiment name', width: '60%' },
    { label: 'Example text' },
  ],
}

Sentiments.parameters = {
  docs: {
    description: {
      story:
        'You can provide the prop `sentiment` of a `Row`. Default value is `neutral`. `Row` prop `disabled` overide sentiment.',
    },
  },
}
