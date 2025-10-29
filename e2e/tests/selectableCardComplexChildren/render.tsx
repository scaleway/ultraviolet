import {
  SelectableCard,
  SelectInput,
  Slider,
  Stack,
  Text,
  TextArea,
} from '@ultraviolet/ui'
import { useState } from 'react'

const CheckboxSelectableCard = () => {
  const [value, setValue] = useState({
    option1: false,
    option2: false,
    option3: false,
  })
  const [selectInputValue, setSelectInputValue] = useState('')

  return (
    <Stack flex={1} gap={1}>
      <SelectableCard
        checked={value.option1}
        label={
          <Stack direction="row" flex={1} justifyContent="space-between">
            <Text as="span" variant="bodyStrong">
              Optional option 1
            </Text>
            <Text as="span" variant="bodyStronger">
              4.99€
            </Text>
          </Stack>
        }
        name="option1"
        onChange={event =>
          setValue({ ...value, option1: event.currentTarget.checked })
        }
        showTick
        type="checkbox"
        value="option1"
      >
        <Stack gap={1}>
          This option will cost you 1.99€ and provide you with a lot of
          happiness checkbox
          <SelectInput
            label="Select a sub option checkbox"
            onChange={(newValue: string) => setSelectInputValue(newValue)}
            options={[
              {
                label: 'Sub option 1',
                value: 'option1',
              },
            ]}
            value={selectInputValue}
          />
        </Stack>
      </SelectableCard>
      <SelectableCard
        checked={value.option2}
        label={
          <Stack direction="row" flex={1} justifyContent="space-between">
            <Text as="span" variant="bodyStrong">
              Optional option 2
            </Text>
            <Text as="span" variant="bodyStronger">
              9.99€
            </Text>
          </Stack>
        }
        name="option2"
        onChange={event =>
          setValue({ ...value, option2: event.currentTarget.checked })
        }
        showTick
        type="checkbox"
        value="option2"
      >
        This option will cost you 2.99€ and provide you with a lot more of
        happiness checkbox
      </SelectableCard>
      <SelectableCard
        checked={value.option3}
        label={
          <Stack direction="row" flex={1} justifyContent="space-between">
            <Text as="span" variant="bodyStrong">
              Optional option 3
            </Text>
            <Text as="span" variant="bodyStronger">
              9.99€
            </Text>
          </Stack>
        }
        name="option3"
        onChange={event =>
          setValue({ ...value, option3: event.currentTarget.checked })
        }
        showTick
        type="checkbox"
        value="option3"
      >
        <Stack gap={1}>
          When clicking on the slider and typing in the input, the event does
          not bubble up the the SelectableCard
          <TextArea label="TextArea" onChange={() => {}} />
          <Slider input label="Slider" value={32} />
        </Stack>
      </SelectableCard>
    </Stack>
  )
}

const RadioSelectableCard = () => {
  const [value, setValue] = useState('')
  const [selectInputValue, setSelectInputValue] = useState('')

  return (
    <Stack flex={1} gap={1}>
      <SelectableCard
        checked={value === 'option1'}
        label={
          <Stack direction="row" flex={1} justifyContent="space-between">
            <Text as="span" variant="bodyStrong">
              Optional option 1
            </Text>
            <Text as="span" variant="bodyStronger">
              4.99€
            </Text>
          </Stack>
        }
        name="option1"
        onChange={() => setValue('option1')}
        showTick
        type="radio"
        value="option1"
      >
        <Stack gap={1}>
          This option will cost you 1.99€ and provide you with a lot of
          happiness radio
          <SelectInput
            label="Select a sub option radio"
            onChange={(newValue: string) => setSelectInputValue(newValue)}
            options={[
              {
                label: 'Sub option 1',
                value: 'option1',
              },
            ]}
            value={selectInputValue}
          />
        </Stack>
      </SelectableCard>
      <SelectableCard
        checked={value === 'option2'}
        label={
          <Stack direction="row" flex={1} justifyContent="space-between">
            <Text as="span" variant="bodyStrong">
              Optional option 2
            </Text>
            <Text as="span" variant="bodyStronger">
              9.99€
            </Text>
          </Stack>
        }
        name="option2"
        onChange={() => setValue('option2')}
        showTick
        type="radio"
        value="option2"
      >
        This option will cost you 2.99€ and provide you with a lot more of
        happiness radio
      </SelectableCard>
    </Stack>
  )
}

const Render = () => (
  <Stack gap={2}>
    <CheckboxSelectableCard />
    <RadioSelectableCard />
  </Stack>
)

export default Render
