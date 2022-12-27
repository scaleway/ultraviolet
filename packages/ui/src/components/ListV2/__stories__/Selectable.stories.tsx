import type { ComponentStory } from '@storybook/react'
import type { List } from '..'
import { Template } from './Template.stories'

export const Selectable: ComponentStory<typeof List> = Template.bind({})

Selectable.args = { ...Template.args, isSelectable: true }
