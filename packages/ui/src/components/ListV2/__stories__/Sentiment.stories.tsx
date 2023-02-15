import { List } from '..'
import { SENTIMENTS } from '../../../theme'
import { Template } from './Template.stories'

export const Sentiments = Template.bind({})

Sentiments.args = {
  ...Template.args,
  columns: [
    { label: 'Sentiment name', width: '60%' },
    { label: 'Example text' },
  ],
  children: (
    <>
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
      <List.Row
        id="disabled"
        sentiment="primary"
        isDisabled
        expandable="expandable content"
      >
        <List.Cell>Sentiment is ignored if row `isDisabled`</List.Cell>
        <List.Cell>An example text...</List.Cell>
      </List.Row>
    </>
  ),
}

Sentiments.parameters = {
  docs: {
    storyDescription:
      'You can provide the prop `sentiment` of a `Row`. Default value is `neutral`. `Row` prop `isDisabled` overide sentiment.',
  },
}
