import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { TextInput } from '..'
import { Link } from '../../Link'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

export const Examples: StoryFn<typeof TextInput> = args => {
  const [value, setValue] = useState<string>('Text')

  return (
    <Stack gap="2">
      <TextInput
        {...args}
        label="With prefix"
        prefix="https://"
        value={value}
        onChange={setValue}
      />
      <TextInput
        {...args}
        label="Text input with random hook"
        prefix="https://"
        value={value}
        onChange={setValue}
        onRandomize={() => {}}
      />
      <TextInput
        {...args}
        label="Password input with random hook"
        prefix="https://"
        value={value}
        onChange={setValue}
        onRandomize={() => {}}
        type="password"
      />
      <TextInput
        {...args}
        label="All at once"
        prefix="https://"
        suffix=".com"
        value={value}
        onChange={setValue}
        onRandomize={() => {}}
        success="Field has been updated!"
        loading
        clearable
      />
      <TextInput
        {...args}
        label="With an helper but disabled"
        disabled
        helper="Notice to fill the field"
        value={value}
        onChange={setValue}
        onRandomize={() => {}}
        loading
      />
      <TextInput
        {...args}
        label="Complex helper"
        helper={
          <Text as="p" variant="caption" sentiment="neutral" prominence="weak">
            Notice example.{' '}
            <Link href="http://scaleway.com" target="_blank" size="small">
              Learn more
            </Link>
          </Text>
        }
        value={value}
        onChange={setValue}
        onRandomize={() => {}}
        loading
      />
    </Stack>
  )
}
