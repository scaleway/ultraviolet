import { Template } from './Template.stories'

export const MaxLength = Template.bind({})

MaxLength.parameters = {
  docs: {
    description: {
      story:
        '`maxLength` prop restricts the threshold based on character count',
    },
  },
}

MaxLength.args = {
  maxLength: 40,
  tags: [
    'very',
    ...new Array<string>(50).fill('large'),
    'tooltip',
    'scaleway',
    'paris',
    'cloud',
  ],
  threshold: undefined,
}
