import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { SelectInput } from '..'
import { dataUnGrouped } from './resources'
import { Template } from './Template.stories'

export const Controlled: StoryFn<typeof SelectInput> = () => {
  const [valueSingle, setValueSingle] =
    useState<(typeof dataUnGrouped)[number]['value']>('uranus')
  const [valueMulti, setValueMulti] = useState<
    (typeof dataUnGrouped)[number]['value'][]
  >(['neptune', 'uranus'])

  return (
    <Stack direction="column" gap={2} width="50%">
      <Button
        onClick={() => {
          setValueSingle('mercury')
          setValueMulti(['mercury', 'jupiter'])
        }}
      >
        Change Value
      </Button>
      <SelectInput
        multiselect={false}
        name="single"
        onChange={value => setValueSingle(value)}
        options={dataUnGrouped}
        value={valueSingle}
      />
      <SelectInput
        multiselect
        name="multi"
        onChange={value => setValueMulti(value)}
        options={dataUnGrouped}
        value={valueMulti}
      />
    </Stack>
  )
}
Controlled.args = {
  ...Template.args,
}
Controlled.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]

Controlled.parameters = {
  docs: {
    description: {
      story: 'Controlled SelectInput.',
    },
  },
}
