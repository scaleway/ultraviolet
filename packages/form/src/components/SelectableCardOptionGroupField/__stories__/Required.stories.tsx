import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { SelectableCardOptionGroupField } from '..'
import { Submit } from '../..'
import centos from './assets/centos.svg'
import debian from './assets/debian.svg'
import ubuntu from './assets/ubuntu.svg'
import { centosOptions, debianOptions, ubuntuOptions } from './constants'

export const Required: StoryFn<
  ComponentProps<typeof SelectableCardOptionGroupField>
> = args => (
  <Stack gap={1}>
    <SelectableCardOptionGroupField {...args}>
      <SelectableCardOptionGroupField.Option
        value="ubuntu"
        label="Ubuntu"
        options={ubuntuOptions}
        image={ubuntu}
      />
      <SelectableCardOptionGroupField.Option
        value="debian"
        label="Debian"
        options={debianOptions}
        image={debian}
      />
      <SelectableCardOptionGroupField.Option
        value="centos"
        label="CentOS"
        options={centosOptions}
        image={centos}
      />
    </SelectableCardOptionGroupField>
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  name: 'os',
  legend: 'Choose your OS',
  helper: 'Choose the OS and version you need to install on your server',
  required: true,
}
