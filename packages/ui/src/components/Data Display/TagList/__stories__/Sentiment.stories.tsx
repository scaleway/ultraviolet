import { Template } from './Template.stories'

export const Sentiment = Template.bind({})

Sentiment.args = {
  tags: ['smooth', 'code', 'hello', 'world'],
  threshold: 2,
  sentiment: 'primary',
}
