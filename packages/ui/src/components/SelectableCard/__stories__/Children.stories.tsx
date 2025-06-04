import type { StoryFn } from '@storybook/react'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { SelectableCard } from '..'
import { Badge } from '../../Badge'
import { Checkbox } from '../../Checkbox'
import { SelectInputV2 } from '../../SelectInputV2'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

export const Children: StoryFn = args => {
  const [value, onChange] = useState('label-9')

  return (
    <>
      <SelectableCard
        {...args}
        name="label-9"
        checked={value === 'label-9'}
        value="label-9"
        type="radio"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.currentTarget.value)
        }
        label="Left Radio"
      >
        {({ checked }) => (
          <Stack gap={1}>
            <Text as="p" variant="body" prominence="weak" sentiment="neutral">
              I am a children with a badge &nbsp;
              <Badge
                sentiment={checked ? 'info' : 'neutral'}
                prominence={checked ? 'default' : 'strong'}
              >
                info
              </Badge>
            </Text>
          </Stack>
        )}
      </SelectableCard>
      <SelectableCard
        {...args}
        name="label-10"
        checked={value === 'label-10'}
        value="label-10"
        type="radio"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.currentTarget.value)
        }
        label="Middle Radio"
      >
        <Stack gap={2}>
          <Text as="p" variant="body" prominence="weak" sentiment="neutral">
            I am a children with clickable select input
            <Stack gap={1}>
              <Checkbox name="test" value="test" onChange={() => {}}>
                First element
              </Checkbox>
              <Checkbox name="test" value="test" onChange={() => {}}>
                Second element
              </Checkbox>
            </Stack>
            <SelectInputV2
              name="options"
              label="Select an option"
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
        name="label-11"
        checked={value === 'label-11'}
        value="label-11"
        type="radio"
        disabled
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.currentTarget.value)
        }
        label="Right Radio"
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
