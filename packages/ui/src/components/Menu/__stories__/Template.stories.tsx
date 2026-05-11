import type { StoryFn } from '@storybook/react-vite'
import { DotsHorizontalIcon } from '@ultraviolet/icons/DotsHorizontalIcon'
import { Menu } from '..'
import { Button } from '../../index'

export const DefaultDisclosure = (
  <Button sentiment="neutral" size="small" variant="ghost">
    <DotsHorizontalIcon />
  </Button>
)

export const Template: StoryFn<typeof Menu> = ({ disclosure = DefaultDisclosure, ...props }) => (
  <Menu disclosure={disclosure} {...props} />
)
