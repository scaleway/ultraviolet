import type { StoryFn } from '@storybook/react-vite'
import { DotsHorizontalIcon } from '@ultraviolet/icons/DotsHorizontalIcon'
import { Button } from '../../index'
import { Menu } from '..'

export const DefaultDisclosure = (
  <Button sentiment="neutral" size="small" variant="ghost">
    <DotsHorizontalIcon />
  </Button>
)

export const Template: StoryFn<typeof Menu> = ({
  disclosure = DefaultDisclosure,
  ...props
}) => <Menu disclosure={disclosure} {...props} />
