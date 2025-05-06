import type { StoryFn } from '@storybook/react'
import { DotsHorizontalIcon } from '@ultraviolet/icons'
import { Menu } from '..'
import { Button } from '../../index'

export const DefaultDisclosure = (
  <Button sentiment="neutral" variant="ghost" size="small">
    <DotsHorizontalIcon />
  </Button>
)

export const Template: StoryFn<typeof Menu> = ({
  disclosure = DefaultDisclosure,
  ...props
}) => <Menu disclosure={disclosure} {...props} />
