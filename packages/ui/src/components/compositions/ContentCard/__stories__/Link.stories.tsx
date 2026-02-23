import { Template } from './Template.stories'

export const Link = Template.bind({})

Link.parameters = {
  docs: {
    description: {
      story:
        'You can easily add a link onto ContentCard by passing `href` and `target` props. An icon will be added at the bottom right of the card.',
    },
  },
}

Link.decorators = [
  StoryComponent => (
    <div style={{ width: '320px' }}>
      <StoryComponent />
    </div>
  ),
]

Link.args = { ...Template.args, href: 'https://scaleway.com', target: '_blank' }
