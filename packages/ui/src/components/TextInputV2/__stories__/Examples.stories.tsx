import randomName from '@scaleway/random-name'
import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { TextInputV2 } from '..'
import { Link } from '../../Link'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

export const Examples: StoryFn<typeof TextInputV2> = args => {
  const [value, setValue] = useState<string>('Text')

  return (
    <Stack gap="2">
      <TextInputV2
        {...args}
        label="With prefix"
        prefix="https://"
        value={value}
        onChange={setValue}
      />
      <TextInputV2
        {...args}
        label="Text input with random hook"
        prefix="https://"
        value={value}
        onChange={setValue}
        onRandomize={() => setValue(randomName())}
      />
      <TextInputV2
        {...args}
        label="Password input with random hook"
        prefix="https://"
        value={value}
        onChange={setValue}
        onRandomize={() => setValue(randomName())}
        type="password"
      />
      <TextInputV2
        {...args}
        label="All at once"
        prefix="https://"
        suffix=".com"
        value={value}
        onChange={setValue}
        onRandomize={() => setValue(randomName())}
        success="Field has been updated!"
        loading
        clearable
      />
      <TextInputV2
        {...args}
        label="With an helper but disabled"
        disabled
        helper="Notice to fill the field"
        value={value}
        onChange={setValue}
        onRandomize={() => setValue(randomName())}
        loading
      />
      <TextInputV2
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
        onRandomize={() => setValue(randomName())}
        loading
      />
    </Stack>
  )
}
