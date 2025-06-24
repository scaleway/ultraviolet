import { Drawer } from '../../Drawer'
import { Separator } from '../../Separator'
import { DefaultDisclosure, Template } from './Template.stories'

export const NoPadding = Template.bind({})

NoPadding.args = {
  disclosure: DefaultDisclosure,
  header: 'With a nopadding content',
  size: 'small',
  noPadding: true,
  children: (
    <div>
      <Drawer.Content>first part</Drawer.Content>
      <Separator />
      <Drawer.Content>second part</Drawer.Content>
    </div>
  ),
}

NoPadding.parameters = {
  docs: {
    description: {
      story:
        'You can specify `noPadding` to avoid having padding in your content container. You can use Drawer.Content subcomponent if you need to apply it later.',
    },
  },
}
