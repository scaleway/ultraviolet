import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { SelectInputV2 } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Template } from './Template.stories'
import { dataUnGrouped } from './resources'

export const ChangeValue: StoryFn<typeof SelectInputV2> = () => {
  const [valueSingle, setValueSingle] =
    useState<(typeof dataUnGrouped)[number]['value']>('uranus')
  const [valueMulti, setValueMulti] = useState<
    (typeof dataUnGrouped)[number]['value'][]
  >(['neptune', 'uranus'])

  return (
    <Stack width="50%" direction="column" gap={2}>
      <Button
        onClick={() => {
          setValueSingle('mercury')
          setValueMulti(['mercury', 'jupiter'])
        }}
      >
        Change Value
      </Button>
      <SelectInputV2
        name="single"
        options={dataUnGrouped}
        value={valueSingle}
        multiselect={false}
        onChange={value => setValueSingle(value)}
      />
      <SelectInputV2
        name="multi"
        options={dataUnGrouped}
        value={valueMulti}
        multiselect
        onChange={value => setValueMulti(value)}
      />
    </Stack>
  )
}
ChangeValue.args = {
  ...Template.args,
}
ChangeValue.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]

ChangeValue.parameters = {
  docs: {
    description: {
      story: 'Set a custom `EmptyState` when no option is available.',
    },
  },
}
