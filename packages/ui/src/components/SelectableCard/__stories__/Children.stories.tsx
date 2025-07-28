import type { StoryFn } from '@storybook/react-vite'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { Badge } from '../../Badge'
import { Checkbox } from '../../Checkbox'
import { SelectInput } from '../../SelectInput'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { SelectableCard } from '..'

export const Children: StoryFn = args => {
  const [value, onChange] = useState('label-9')

  return (
    <>
      <SelectableCard
        {...args}
        checked={value === 'label-9'}
        label="Left Radio"
        name="label-9"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.currentTarget.value)
        }
        type="radio"
        value="label-9"
      >
        {({ checked }) => (
          <Stack gap={1}>
            <Text as="p" prominence="weak" sentiment="neutral" variant="body">
              I am a children with a badge &nbsp;
              <Badge
                prominence={checked ? 'default' : 'strong'}
                sentiment={checked ? 'info' : 'neutral'}
              >
                info
              </Badge>
            </Text>
          </Stack>
        )}
      </SelectableCard>
      <SelectableCard
        {...args}
        checked={value === 'label-10'}
        label="Middle Radio"
        name="label-10"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.currentTarget.value)
        }
        type="radio"
        value="label-10"
      >
        <Stack gap={2}>
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            I am a children with clickable select input
            <Stack gap={1}>
              <Checkbox name="test" onChange={() => {}} value="test">
                First element
              </Checkbox>
              <Checkbox name="test" onChange={() => {}} value="test">
                Second element
              </Checkbox>
            </Stack>
            <SelectInput
              label="Select an option"
              name="options"
              options={[
                { label: 'Option 1', value: 'option-1' },
                { label: 'Option 2', value: 'option-2' },
              ]}
            />
          </Text>
        </Stack>
      </SelectableCard>
      <SelectableCard
        {...args}
        checked={value === 'label-11'}
        disabled
        label="Right Radio"
        name="label-11"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.currentTarget.value)
        }
        type="radio"
        value="label-11"
      >
        {({ disabled }) => (
          <Stack gap={1}>
            I am a children with a badge &nbsp;
            <Badge disabled={disabled}>disabled info</Badge>
          </Stack>
        )}
      </SelectableCard>
    </>
  )
}
Children.parameters = {
  docs: {
    description: {
      story:
        'If your children is more than just a text you can use given function with parameters `checked` and `disabled` to customize you child style according to SelectableCard state.',
    },
  },
}
Children.decorators = [
  StoryComponent => (
    <div style={{ height: '400px' }}>
      <Stack direction="row" gap={2}>
        <StoryComponent />
      </Stack>
    </div>
  ),
]
