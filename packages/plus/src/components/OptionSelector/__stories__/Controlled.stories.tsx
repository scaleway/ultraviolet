import type { StoryFn } from '@storybook/react-vite'
import {
  DebianLogo,
  ProxmoxLogo,
  UbuntuLogo,
  WindowsLogo,
} from '@ultraviolet/icons/logo'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { OptionSelector } from '../OptionSelector'

const options = [
  {
    content: 'Ubuntu',
    icon: <UbuntuLogo />,
    value: 'ubuntu',
  },
  {
    content: 'Debian',
    icon: <DebianLogo />,
    value: 'debian',
  },
  {
    content: 'Proxmox',
    icon: <ProxmoxLogo />,
    value: 'proxmox',
  },
  {
    content: 'Windows',
    icon: <WindowsLogo />,
    value: 'windows',
  },
]

const makeVersions = (os: string) => [
  {
    content: `${os} 19.01`,
    value: `19.01`,
  },
  {
    content: `${os} 20.04`,
    value: `20.04`,
  },
]

export const Controlled: StoryFn<
  ComponentProps<typeof OptionSelector>
> = props => {
  const [value, setValue] = useState({ first: '', second: '' })

  const onChangeOS = (newOs: string) => {
    setValue(oldValue => ({ first: newOs, second: oldValue.second }))
  }

  const onChangeVersion = (newVersion: string) => {
    setValue(oldValue => ({ first: oldValue.first, second: newVersion }))
  }

  return (
    <Stack direction="column" gap={1}>
      <OptionSelector
        {...props}
        firstSelector={{
          label: 'Uncontrolled',
          options,
        }}
        secondSelector={{
          label: 'Zone',
          options: makeVersions(
            String(value.first).charAt(0).toUpperCase() +
              String(value.first).slice(1),
          ),
        }}
      />
      <OptionSelector
        {...props}
        firstSelector={{
          label: 'Controlled',
          onChange: onChangeOS,
          options,
          value: value.first,
        }}
        secondSelector={{
          label: 'Zone',
          onChange: onChangeVersion,
          options: makeVersions(
            String(value.first).charAt(0).toUpperCase() +
              String(value.first).slice(1),
          ),
          value: value.second,
        }}
      />
      <ul>
        <li>Selected OS: {value.first}</li>
        <li>Selected version: {value.second}</li>
      </ul>
    </Stack>
  )
}

Controlled.parameters = {
  docs: {
    description: {
      story: 'The component must be controlled to work.',
    },
  },
}
