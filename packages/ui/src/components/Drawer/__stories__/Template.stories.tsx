import type { StoryFn } from '@storybook/react'
import { Drawer } from '..'
import { Button } from '../../Button'

export const DefaultDisclosure = <Button>Open Modal</Button>

export const Template: StoryFn<typeof Drawer> = args => <Drawer {...args} />

Template.args = {
  header: 'Drawer',
}
