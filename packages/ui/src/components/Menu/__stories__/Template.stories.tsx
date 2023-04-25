import type { ComponentStory } from '@storybook/react'
import { Menu } from '..'
import { Button } from '../../index'

export const DefaultDisclosure = (
  <Button icon="dots-horizontal" variant="ghost" size="medium" />
)

export const Template: ComponentStory<typeof Menu> = ({
  disclosure = DefaultDisclosure,
  ...props
}) => <Menu disclosure={disclosure} {...props} />
