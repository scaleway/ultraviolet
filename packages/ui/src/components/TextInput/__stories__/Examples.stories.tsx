import { randomName } from '@scaleway/random-name'
import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Link } from '../../Link'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { TextInput } from '..'

export const Examples: StoryFn<typeof TextInput> = args => {
  const [value, setValue] = useState<string>('Text')

  return (
    <Stack gap="2">
      <TextInput
        {...args}
        label="With prefix"
        onChange={event => setValue(event.target.value)}
        prefix="https://"
        value={value}
      />
      <TextInput
        {...args}
        label="Text input with random hook"
        onChange={event => setValue(event.target.value)}
        onRandomize={() => setValue(randomName())}
        prefix="https://"
        value={value}
      />
      <TextInput
        {...args}
        label="Password input with random hook"
        onChange={event => setValue(event.target.value)}
        onRandomize={() => setValue(randomName())}
        prefix="https://"
        type="password"
        value={value}
      />
      <TextInput
        {...args}
        clearable
        label="All at once"
        loading
        onChange={event => setValue(event.target.value)}
        onRandomize={() => setValue(randomName())}
        prefix="https://"
        success="Field has been updated!"
        suffix=".com"
        value={value}
      />
      <TextInput
        {...args}
        disabled
        helper="Notice to fill the field"
        label="With an helper but disabled"
        loading
        onChange={event => setValue(event.target.value)}
        onRandomize={() => setValue(randomName())}
        value={value}
      />
      <TextInput
        {...args}
        helper={
          <Text as="p" prominence="weak" sentiment="neutral" variant="caption">
            Notice example.{' '}
            <Link href="http://scaleway.com" size="small" target="_blank">
              Learn more
            </Link>
          </Text>
        }
        label="Complex helper"
        loading
        onChange={event => setValue(event.target.value)}
        onRandomize={() => setValue(randomName())}
        value={value}
      />
    </Stack>
  )
}
