import type { StoryFn } from '@storybook/react-vite'
import { Checkbox } from '../../Checkbox'
import { Row } from '../../Row'
import { SelectInput } from '../../SelectInput'
import { Stack } from '../../Stack'
import { Label } from '..'

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
export const Usage: StoryFn<typeof Label> = () => (
  <Stack gap={3}>
    Using prop label inside the component :
    <Stack direction="row" gap={2} justifyContent="center">
      <SelectInput
        label="Input1"
        name="input11"
        options={values}
        size="medium"
      />
      <SelectInput
        label="Input2"
        name="input12"
        options={values}
        size="medium"
      />
      <Checkbox>Checkbox</Checkbox>
    </Stack>
    Using component Label, outside of the input component :
    <Stack direction="column" gap={0.5} justifyContent="center">
      <Row gap={2} templateColumns="1fr 1fr 1fr">
        <Label size="medium">Input1</Label>
        <Label size="medium">Input2</Label>
      </Row>
      <Row gap={2} templateColumns="1fr 1fr 1fr">
        <SelectInput name="input21" options={values} size="medium" />
        <SelectInput name="input22" options={values} size="medium" />
        <Checkbox>Checkbox</Checkbox>
      </Row>
    </Stack>
  </Stack>
)

Usage.parameters = {
  docs: {
    description: {
      story:
        'Example of a usage of this component. Here, to center the checkbox with the input and not with the input and the label, use `Label` and `Row`.',
    },
  },
}
