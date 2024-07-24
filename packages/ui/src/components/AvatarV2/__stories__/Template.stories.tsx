import type { StoryFn } from '@storybook/react'
import { AvatarV2 } from '..'

export const Template: StoryFn<typeof AvatarV2> = args => <AvatarV2 {...args} />
