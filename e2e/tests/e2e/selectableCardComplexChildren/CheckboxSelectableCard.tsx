import {
  SelectableCard,
  SelectInput,
  Slider,
  Stack,
  Text,
  TextArea,
} from '@ultraviolet/ui'
import { useState } from 'react'

export const CheckboxSelectableCard = () => {
  const [value, setValue] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  })
  const [selectInputValue, setSelectInputValue] = useState('')

  return (
    <Stack flex={1} gap={1}>
      <SelectableCard
        checked={value.checkbox1}
        label={
          <Stack direction="row" flex={1} justifyContent="space-between">
            <Text as="span" variant="bodyStrong">
              Optional checkbox 1
            </Text>
            <Text as="span" variant="bodyStronger">
              4.99€
            </Text>
          </Stack>
        }
        name="checkbox1"
        onChange={event =>
          setValue({ ...value, checkbox1: event.currentTarget.checked })
        }
        showTick
        type="checkbox"
        value="checkbox1"
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
        checked={value.checkbox2}
        label={
          <Stack direction="row" flex={1} justifyContent="space-between">
            <Text as="span" variant="bodyStrong">
              Optional checkbox 2
            </Text>
            <Text as="span" variant="bodyStronger">
              9.99€
            </Text>
          </Stack>
        }
        name="option2"
        onChange={event =>
          setValue({ ...value, checkbox2: event.currentTarget.checked })
        }
        showTick
        type="checkbox"
        value="option2"
      >
        This option will cost you 2.99€ and provide you with a lot more of
        happiness checkbox
      </SelectableCard>
      <SelectableCard
        checked={value.checkbox3}
        label={
          <Stack direction="row" flex={1} justifyContent="space-between">
            <Text as="span" variant="bodyStrong">
              Optional checkbox 3
            </Text>
            <Text as="span" variant="bodyStronger">
              9.99€
            </Text>
          </Stack>
        }
        name="option3"
        onChange={event =>
          setValue({ ...value, checkbox3: event.currentTarget.checked })
        }
        showTick
        type="checkbox"
        value="option3"
      >
        <Stack gap={1}>
          When clicking on the slider and typing in the input, the event does
          not bubble up the the SelectableCard
          <TextArea label="TextArea Checkbox" onChange={() => {}} />
          <Slider input label="Slider" value={32} />
        </Stack>
      </SelectableCard>
    </Stack>
  )
}
