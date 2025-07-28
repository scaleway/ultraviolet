import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { SelectableCardOptionGroup } from '..'
import centos from './assets/centos.svg'
import debian from './assets/debian.svg'
import ubuntu from './assets/ubuntu.svg'
import { centosOptions, debianOptions, ubuntuOptions } from './constants'
import { Template } from './Template.stories'

export const Disabled: StoryFn<typeof SelectableCardOptionGroup> = args => {
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
          disabled
          tooltip="Coming soon"
        />
        <SelectableCardOptionGroup.Option
          value="debian"
          label="Debian"
          options={debianOptions}
          image={debian}
          disabled
          tooltip="Coming soon"
        />
        <SelectableCardOptionGroup.Option
          value="centos"
          label="CentOS"
          options={centosOptions}
          image={centos}
          disabled
          tooltip="Coming soon"
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

Disabled.decorators = Template.decorators
