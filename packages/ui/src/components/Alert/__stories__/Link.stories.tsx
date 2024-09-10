import { Link as UVLink } from '../../Link'
import { Stack } from '../../Stack'
import { Template } from './Template.stories'

export const Link = Template.bind({})

Link.args = {
  sentiment: 'info',
  title: 'Information',
  children: (
    <Stack direction="row" justifyContent="space-between" flex="1 1 auto">
      <p>You cannot create a ressource here</p>
      <UVLink href="scaleway.com">Read more</UVLink>
    </Stack>
  ),
}

Link.parameters = {
  docs: {
    description: {
      story:
        'If you need you can add a link into the Alert component. You will need to add a Stack as children of the Alert component to align the link at the end.',
    },
  },
}
