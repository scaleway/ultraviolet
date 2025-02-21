import type { StoryFn } from '@storybook/react'
import { ComponentProps, useState } from 'react'
import { SelectableCardOptionGroup } from '..'
import ubuntu from './assets/ubuntu.svg'
import { Text } from '../../Text'
import { Stack } from '../../Stack'
import type { SelectInputV2 } from '../../SelectInputV2'

const options: ComponentProps<typeof SelectInputV2>['options'] = [
  {
    label: 'Ubuntu 18.04 LTS',
    value: 'ubuntu-18.04',
  },
  {
    label: 'Ubuntu 20.04 LTS',
    value: 'ubuntu-20.04',
  },
]

export const Template: StoryFn<typeof SelectableCardOptionGroup> = args => {
  const [value, onChange] = useState('value-1')

  return (
    <SelectableCardOptionGroup
      {...args}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        onChange(event.currentTarget.value)
      }
    >
      <SelectableCardOptionGroup.Option
        value="value-1"
        aria-label="value1"
        options={options}
        onChange={() => {}}
      >
        <Stack
          direction="column"
          gap={1}
          justifyContent="center"
          alignItems="center"
        >
          <img width="56" src={ubuntu} alt="Ubuntu" />
          <Text as="span" variant="bodyStrong">
            Ubuntu
          </Text>
        </Stack>
      </SelectableCardOptionGroup.Option>
      <SelectableCardOptionGroup.Option
        onChange={() => {}}
        value="value-2"
        aria-label="value1"
        options={options}
      >
        Value 2
      </SelectableCardOptionGroup.Option>
    </SelectableCardOptionGroup>
  )
}

Template.args = {
  name: 'template',
  legend: 'Radio',
  helper: 'Helper content for the group',
}
