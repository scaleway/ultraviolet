import { ComponentStory } from '@storybook/react'
import { List } from '..'
import { Template } from './Template.stories'

export const Selectable: ComponentStory<typeof List> = Template.bind({})

Selectable.args = { ...Template.args, selectable: true }
