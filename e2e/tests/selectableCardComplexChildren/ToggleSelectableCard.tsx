import {
  SelectableCard,
  SelectInput,
  Slider,
  Stack,
  Text,
  TextArea,
} from '@ultraviolet/ui'
import { useState } from 'react'

export const ToggleSelectableCard = () => {
  const [value, setValue] = useState({
    toggle1: false,
    toggle2: false,
    toggle3: false,
  })
  const [selectInputValue, setSelectInputValue] = useState('')

  return (
    <Stack flex={1} gap={1}>
      <SelectableCard
        checked={value.toggle1}
        label={
          <Stack direction="row" flex={1} justifyContent="space-between">
            <Text as="span" variant="bodyStrong">
              Optional toggle 1
            </Text>
            <Text as="span" variant="bodyStronger">
              4.99€
            </Text>
          </Stack>
        }
        name="toggle1"
        onChange={event =>
          setValue({ ...value, toggle1: event.currentTarget.checked })
        }
        showTick
        type="toggle"
        value="toggle1"
      >
        <Stack gap={1}>
          This option will cost you 1.99€ and provide you with a lot of
          happiness toggle
          <SelectInput
            label="Select a sub option toggle"
            onChange={(newValue: string) => setSelectInputValue(newValue)}
            options={[
              {
                label: 'Sub toggle 1',
                value: 'toggle1',
              },
            ]}
            value={selectInputValue}
          />
        </Stack>
      </SelectableCard>
      <SelectableCard
        checked={value.toggle2}
        label={
          <Stack direction="row" flex={1} justifyContent="space-between">
            <Text as="span" variant="bodyStrong">
              Optional toggle 2
            </Text>
            <Text as="span" variant="bodyStronger">
              9.99€
            </Text>
          </Stack>
        }
        name="toggle2"
        onChange={event =>
          setValue({ ...value, toggle2: event.currentTarget.checked })
        }
        showTick
        type="toggle"
        value="toggle2"
      >
        This option will cost you 2.99€ and provide you with a lot more of
        happiness toggle
      </SelectableCard>
      <SelectableCard
        checked={value.toggle3}
        label={
          <Stack direction="row" flex={1} justifyContent="space-between">
            <Text as="span" variant="bodyStrong">
              Optional toggle 3
            </Text>
            <Text as="span" variant="bodyStronger">
              9.99€
            </Text>
          </Stack>
        }
        name="toggle3"
        onChange={event =>
          setValue({ ...value, toggle3: event.currentTarget.checked })
        }
        showTick
        type="toggle"
        value="toggle3"
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
