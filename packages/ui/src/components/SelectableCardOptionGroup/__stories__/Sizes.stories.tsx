import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { SelectableCardOptionGroup } from '..'
import centos from './assets/centos.svg'
import debian from './assets/debian.svg'
import ubuntu from './assets/ubuntu.svg'
import { centosOptions, debianOptions, ubuntuOptions } from './constants'

export const Sizes: StoryFn<typeof SelectableCardOptionGroup> = args => {
  const [value, onChange] = useState<string>()
  const [option, onChangeOption] = useState<string>()

  return (
    <Stack direction="column" gap={8}>
      <Stack direction="column" gap={4}>
        <SelectableCardOptionGroup
          {...args}
          legend={`${args.legend} (large)`}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(event.currentTarget.value)
          }
          onChangeOption={(newValue: string) => onChangeOption(newValue)}
          optionValue={option}
          size="large"
          value={value}
        >
          <SelectableCardOptionGroup.Option
            image={ubuntu}
            label="Ubuntu"
            options={ubuntuOptions}
            value="ubuntu"
          />
          <SelectableCardOptionGroup.Option
            image={debian}
            label="Debian"
            options={debianOptions}
            value="debian"
          />
          <SelectableCardOptionGroup.Option
            image={centos}
            label="CentOS"
            options={centosOptions}
            value="centos"
          />
        </SelectableCardOptionGroup>
        <SelectableCardOptionGroup
          {...args}
          legend={`${args.legend} (medium)`}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(event.currentTarget.value)
          }
          onChangeOption={(newValue: string) => onChangeOption(newValue)}
          optionValue={option}
          size="medium"
          value={value}
        >
          <SelectableCardOptionGroup.Option
            image={ubuntu}
            label="Ubuntu"
            options={ubuntuOptions}
            value="ubuntu"
          />
          <SelectableCardOptionGroup.Option
            image={debian}
            label="Debian"
            options={debianOptions}
            value="debian"
          />
          <SelectableCardOptionGroup.Option
            image={centos}
            label="CentOS"
            options={centosOptions}
            value="centos"
          />
        </SelectableCardOptionGroup>
      </Stack>
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

Sizes.args = {
  helper: 'Choose the OS and version you need to install on your server',
  legend: 'Choose your OS',
}

Sizes.decorators = [
  Story => (
    <div style={{ height: '600px' }}>
      <Story />
    </div>
  ),
]
