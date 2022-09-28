import { ComponentStory } from '@storybook/react'
import Menu from '..'
import Icon from '../../Icon'
import Touchable from '../../Touchable'

const DefaultDisclosure = (
  <Touchable title="menu" name="menu">
    <Icon name="dots-horizontal" color="neutral" size={24} />
  </Touchable>
)

export const Template: ComponentStory<typeof Menu> = ({
  disclosure = DefaultDisclosure,
  ...props
}) => <Menu disclosure={disclosure} {...props} />
