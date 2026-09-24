import type { StoryFn } from '@storybook/react-vite'
import { ProfileIcon } from '@ultraviolet/icons'
import { TagLink } from '..'

export const Template: StoryFn<typeof TagLink> = args => <TagLink {...args} />

Template.args = {
  prefixText: 'id',
  link: 'link',
  prefixIcon: <ProfileIcon />,
  href: '/',
}
