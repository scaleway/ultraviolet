import { Template } from './Template.stories'

export const Date = Template.bind({})

Date.args = {
  children: '2024-02-14',
}

Date.parameters = {
  docs: {
    description: {
      story:
        'You can easily add the date of the conversation using the `Conversation.Date` subcomponent.',
    },
  },
}
