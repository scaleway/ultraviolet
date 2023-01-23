import type { Story } from '@storybook/react'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import type { MultiValue, SingleValue } from 'react-select'
import { SelectableCard } from '..'
import { Badge } from '../../Badge'
import { Checkbox } from '../../Checkbox'
import type { SelectOption } from '../../SelectInput'
import { SelectInput } from '../../SelectInput'
import { Stack } from '../../Stack'

export const Children: Story = () => {
  const [value, onChange] = useState('label-9')
  const [selectInputValue, selectInputOnChange] = useState<SelectOption>({
    label: 'Option 1',
    value: 'option-1',
  })

  const onSelectInputSelectChange = (
    newValue: SingleValue<SelectOption> | MultiValue<SelectOption>,
  ) => {
    selectInputOnChange(newValue as SelectOption)
  }

  return (
    <>
      <SelectableCard
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
          <>
            I am a children with a badge &nbsp;
            <Badge
              variant={checked ? 'info' : 'neutral'}
              prominence={checked ? 'default' : 'strong'}
            >
              info
            </Badge>
          </>
        )}
      </SelectableCard>
      <SelectableCard
        name="label-10"
        checked={value === 'label-10'}
        value="label-10"
        type="radio"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.currentTarget.value)
        }
        label="Middle Radio"
      >
        I am a children with clickable rich select
        <>
          <Checkbox name="test" value="test" onChange={() => {}}>
            First element
          </Checkbox>

          <SelectInput
            value={selectInputValue}
            onChange={onSelectInputSelectChange}
            options={[
              { label: 'Option 1', value: 'option-1' },
              { label: 'Option 2', value: 'option-2' },
            ]}
          />
        </>
      </SelectableCard>
      <SelectableCard
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
          <>
            I am a children with a badge &nbsp;
            <Badge disabled={disabled}>disabled info</Badge>
          </>
        )}
      </SelectableCard>
    </>
  )
}
Children.parameters = {
  docs: {
    storyDescription:
      'If your children is more than just a text you can use given function with parameters `checked` and `disabled` to customize you child style according to SelectableCard state.',
  },
}
Children.decorators = [
  StoryComponent => (
    <Stack direction="row" gap={2}>
      <StoryComponent />
    </Stack>
  ),
]
