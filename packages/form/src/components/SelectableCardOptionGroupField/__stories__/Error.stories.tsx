import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../..'
import { SelectableCardOptionGroupField } from '..'
import centos from './assets/centos.svg'
import debian from './assets/debian.svg'
import ubuntu from './assets/ubuntu.svg'
import { centosOptions, debianOptions, ubuntuOptions } from './constants'

export const Error: StoryFn<
  ComponentProps<typeof SelectableCardOptionGroupField>
> = args => (
  <Stack gap={1}>
    <SelectableCardOptionGroupField {...args}>
      <SelectableCardOptionGroupField.Option
        image={ubuntu}
        label="Ubuntu"
        options={ubuntuOptions}
        value="ubuntu"
      />
      <SelectableCardOptionGroupField.Option
        image={debian}
        label="Debian"
        options={debianOptions}
        value="debian"
      />
      <SelectableCardOptionGroupField.Option
        image={centos}
        label="CentOS"
        options={centosOptions}
        value="centos"
      />
    </SelectableCardOptionGroupField>
    <Submit>Submit</Submit>
  </Stack>
)

Error.args = {
  error: 'Select at list one OS',
  helper: 'Choose the OS and version you need to install on your server',
  legend: 'Choose your OS',
  name: 'os',
  required: true,
}
