import { Template } from './Template.stories'

export const DateStory = Template.bind({})

DateStory.args = {
  children: '2024-02-14',
}

DateStory.parameters = {
  docs: {
    description: {
      story:
        'You can easily add the date of the conversation using the `Conversation.Date` subcomponent.',
    },
  },
}
