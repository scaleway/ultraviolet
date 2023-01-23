import { Badge } from '../../index'
import { Template } from './Template.stories'

export const Subtitle = Template.bind({})
Subtitle.args = {
  title: 'Title',
  subtitle: (
    <Badge size="small" variant="info">
      example
    </Badge>
  ),
}
Subtitle.parameters = {
  docs: {
    storyDescription:
      'You can specify `subtitle` prop to add an extra info next to the title, it can be a text or a node',
  },
}
