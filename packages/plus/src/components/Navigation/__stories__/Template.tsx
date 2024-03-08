import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Navigation } from '..'
import logoSmall from './assets/logo-small.png'
import logo from './assets/logo.png'

export const Template: StoryFn<ComponentProps<typeof Navigation>> = props => (
  <Navigation {...props} />
)

Template.args = {
  logo: expanded => (
    <img
      src={expanded ? logo : logoSmall}
      alt="Logo"
      width={expanded ? '150px' : '26px'}
    />
  ),
}
