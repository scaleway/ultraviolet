import type { ComponentStory } from '@storybook/react'
import { Menu } from '..'
import { Button } from '../../Button'

export const DefaultDisclosure = (
  <Button action icon="dots-horizontal" iconSize={24} variant="transparent" />
)

export const Template: ComponentStory<typeof Menu> = ({
  disclosure = DefaultDisclosure,
  ...props
}) => <Menu disclosure={disclosure} {...props} />
