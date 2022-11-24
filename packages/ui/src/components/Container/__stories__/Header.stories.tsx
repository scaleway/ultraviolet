import { Alert } from '../../index'
import { Template } from './Template.stories'

export const Header = Template.bind({})
Header.args = {
  title: 'Title',
  header: <Alert type="info">An awesome header</Alert>,
}
Header.parameters = {
  docs: {
    storyDescription:
      'You can specify `header` prop to add an extra node or a text between the title and the content',
  },
}
