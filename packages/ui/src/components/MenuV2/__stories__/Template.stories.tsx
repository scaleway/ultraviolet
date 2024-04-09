import type { StoryFn } from '@storybook/react'
import { MenuV2 } from '..'
import { Button } from '../../index'

export const DefaultDisclosure = (
  <Button
    icon="dots-horizontal"
    sentiment="neutral"
    variant="ghost"
    size="small"
  />
)

export const Template: StoryFn<typeof MenuV2> = ({
  disclosure = DefaultDisclosure,
  ...props
}) => <MenuV2 disclosure={disclosure} {...props} />
