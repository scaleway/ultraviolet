import type { StoryFn } from '@storybook/react'
import { Menu } from '..'
import { Button } from '../../index'

export const DefaultDisclosure = (
  <Button icon="dots-horizontal" variant="ghost" size="small" />
)

export const Template: StoryFn<typeof Menu> = ({
  disclosure = DefaultDisclosure,
  ...props
}) => <Menu disclosure={disclosure} {...props} />
