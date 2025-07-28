import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { SelectableCardOptionGroupField } from '../..'
import centos from './assets/centos.svg'
import debian from './assets/debian.svg'
import ubuntu from './assets/ubuntu.svg'
import { centosOptions, debianOptions, ubuntuOptions } from './constants'

export const Template: StoryFn<
  ComponentProps<typeof SelectableCardOptionGroupField>
> = args => (
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
)

Template.args = {
  helper: 'Choose the OS and version you need to install on your server',
  legend: 'Choose your OS',
  name: 'os',
}
