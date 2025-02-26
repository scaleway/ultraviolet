import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { SelectableCardOptionGroup } from '..'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import centos from './assets/centos.svg'
import debian from './assets/debian.svg'
import ubuntu from './assets/ubuntu.svg'
import { centosOptions, debianOptions, ubuntuOptions } from './constants'

export const Template: StoryFn<typeof SelectableCardOptionGroup> = args => {
  const [value, onChange] = useState<string>()
  const [option, onChangeOption] = useState<string>()

  return (
    <Stack direction="column" gap={8}>
      <SelectableCardOptionGroup
        {...args}
        value={value}
        optionValue={option}
        onChangeOption={(newValue: string) => {
          onChangeOption(newValue)
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          console.log('ok')
          onChange(event.currentTarget.value)
        }}
      >
        <SelectableCardOptionGroup.Option
          value="ubuntu"
          label="Ubuntu"
          options={ubuntuOptions}
          image={ubuntu}
        />
        <SelectableCardOptionGroup.Option
          value="debian"
          label="Debian"
          options={debianOptions}
          image={debian}
        />
        <SelectableCardOptionGroup.Option
          value="centos"
          label="CentOS"
          options={centosOptions}
          image={centos}
        />
      </SelectableCardOptionGroup>
      <Stack>
        <Text as="h2" variant="bodyStrong">
          Debug:
        </Text>
        <Text as="p" variant="body">
          Selected OS:{' '}
          <Text as="span" variant="bodyStrong">
            {value}
          </Text>
        </Text>
        <Text as="p" variant="body">
          Selected OS version:{' '}
          <Text as="span" variant="bodyStrong">
            {option}
          </Text>
        </Text>
      </Stack>
    </Stack>
  )
}

Template.args = {
  legend: 'Choose your OS',
  helper: 'Choose the OS and version you need to install on your server',
}

Template.decorators = [
  Story => (
    <div style={{ height: '350px' }}>
      <Story />
    </div>
  ),
]
