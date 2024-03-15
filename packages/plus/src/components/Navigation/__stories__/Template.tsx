import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Navigation } from '..'
import logoSmall from './assets/logo-small.svg'
import logo from './assets/logo.svg'

export const Template: StoryFn<ComponentProps<typeof Navigation>> = props => (
  <Navigation {...props} />
)

Template.args = {
  logo: expanded => (
    <Stack gap={1} direction="row">
      <img src={logoSmall} alt="" height="24px" />
      {expanded ? <img src={logo} alt="" height="24px" /> : null}
    </Stack>
  ),
  pinnedFunctionality: true,
}
