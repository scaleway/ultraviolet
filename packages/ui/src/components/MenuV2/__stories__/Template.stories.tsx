import type { StoryFn } from '@storybook/react'
import { DotsHorizontalIcon } from '@ultraviolet/icons'
import { MenuV2 } from '..'
import { Button } from '../../index'

export const DefaultDisclosure = (
  <Button sentiment="neutral" variant="ghost" size="small">
    <DotsHorizontalIcon />
  </Button>
)

export const Template: StoryFn<typeof MenuV2> = ({
  disclosure = DefaultDisclosure,
  ...props
}) => <MenuV2 disclosure={disclosure} {...props} />
