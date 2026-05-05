import { Helper } from '..'
import { Checkbox } from '../../Checkbox'
import { Row } from '../../Row'
import { SelectInput } from '../../SelectInput'
import { Stack } from '../../Stack'

import type { StoryFn } from '@storybook/react-vite'

const values = [
  {
    label: 'Value 1',
    value: 'value1',
  },
  {
    label: 'Value 2',
    value: 'value2',
  },
  {
    label: 'Value 3',
    value: 'value3',
  },
]
export const Usage: StoryFn<typeof Helper> = () => (
  <Stack gap={3}>
    Using prop helper inside the component :
    <Stack direction="row" gap={2} justifyContent="center" alignItems="end">
      <SelectInput
        label="Input1"
        name="input11"
        options={values}
        size="medium"
        helper="Helper"
      />
      <SelectInput
        label="Input2"
        name="input12"
        options={values}
        size="medium"
        helper="Helper"
      />
      <Checkbox>Checkbox</Checkbox>
    </Stack>
    Using component Helper, outside of the input component :
    <Stack direction="column" gap={0.5} justifyContent="center">
      <Row gap={2} templateColumns="1fr 1fr 1fr" alignItems="end">
        <SelectInput
          name="input21"
          options={values}
          size="medium"
          label="Input1"
        />
        <SelectInput
          name="input22"
          options={values}
          size="medium"
          label="Input2"
        />
        <Checkbox>Checkbox</Checkbox>
      </Row>
      <Row gap={2} templateColumns="1fr 1fr 1fr">
        <Helper helper="Helper" id="id1" />
        <Helper helper="Helper" id="id2" />
      </Row>
    </Stack>
  </Stack>
)

Usage.parameters = {
  docs: {
    description: {
      story:
        'Example of a usage of this component. Here, to center the checkbox with the input and not with the input and the helper, use `Label` and `Row`. Do not forget to use prop `aria-describedby` on the input it to link the helper.',
    },
  },
}
