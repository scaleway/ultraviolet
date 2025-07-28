import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Drawer } from '..'

export const DefaultDisclosure = <Button>Open Drawer</Button>

export const Template: StoryFn<typeof Drawer> = args => <Drawer {...args} />

Template.args = {
  header: 'Drawer',
}
