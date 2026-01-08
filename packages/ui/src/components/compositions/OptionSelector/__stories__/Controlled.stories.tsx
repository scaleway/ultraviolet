import type { StoryFn } from '@storybook/react-vite'
import {
  DebianLogo,
  ProxmoxLogo,
  UbuntuLogo,
  WindowsLogo,
} from '@ultraviolet/icons/logo'
import { capitalize } from '@ultraviolet/utils'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { Stack } from '../../../Stack'
import { OptionSelector } from '..'
import type { ValueType } from '../__mock__/resources'

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
  const [value, setValue] = useState<ValueType>({
    first: '',
    second: '',
  })

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
          options: makeVersions(capitalize(value.first ?? '')),
        }}
      />
      <OptionSelector
        {...props}
        firstSelector={{
          label: 'Controlled',
          options,
        }}
        onChange={newValue => setValue(newValue)}
        secondSelector={{
          label: 'Zone',
          options: makeVersions(capitalize(value.first ?? '')),
        }}
        value={value}
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
