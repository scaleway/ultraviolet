import { SelectInput, SelectableCard, Stack, Text } from '@ultraviolet/ui'
import { useState } from 'react'

const CheckboxSelectableCard = () => {
  const [value, setValue] = useState({ option1: false, option2: false })
  const [selectInputValue, setSelectInputValue] = useState('')

  return (
    <Stack gap={1} flex={1}>
      <SelectableCard
        name="option1"
        checked={value.option1}
        value="option1"
        type="checkbox"
        onChange={event =>
          setValue({ ...value, option1: event.currentTarget.checked })
        }
        showTick
        label={
          <Stack direction="row" justifyContent="space-between" flex={1}>
            <Text variant="bodyStrong" as="span">
              Optional option 1
            </Text>
            <Text variant="bodyStronger" as="span">
              4.99€
            </Text>
          </Stack>
        }
      >
        <Stack gap={1}>
          This option will cost you 1.99€ and provide you with a lot of
          happiness checkbox
          <SelectInput
            value={selectInputValue}
            onChange={(newValue: string) => setSelectInputValue(newValue)}
            label="Select a sub option checkbox"
            options={[
              {
                label: 'Sub option 1',
                value: 'option1',
              },
            ]}
          />
        </Stack>
      </SelectableCard>
      <SelectableCard
        name="option2"
        checked={value.option2}
        value="option2"
        type="checkbox"
        onChange={event =>
          setValue({ ...value, option2: event.currentTarget.checked })
        }
        showTick
        label={
          <Stack direction="row" justifyContent="space-between" flex={1}>
            <Text variant="bodyStrong" as="span">
              Optional option 2
            </Text>
            <Text variant="bodyStronger" as="span">
              9.99€
            </Text>
          </Stack>
        }
      >
        This option will cost you 2.99€ and provide you with a lot more of
        happiness checkbox
      </SelectableCard>
    </Stack>
  )
}

const RadioSelectableCard = () => {
  const [value, setValue] = useState('')
  const [selectInputValue, setSelectInputValue] = useState('')

  return (
    <Stack gap={1} flex={1}>
      <SelectableCard
        name="option1"
        checked={value === 'option1'}
        value="option1"
        type="radio"
        onChange={() => setValue('option1')}
        showTick
        label={
          <Stack direction="row" justifyContent="space-between" flex={1}>
            <Text variant="bodyStrong" as="span">
              Optional option 1
            </Text>
            <Text variant="bodyStronger" as="span">
              4.99€
            </Text>
          </Stack>
        }
      >
        <Stack gap={1}>
          This option will cost you 1.99€ and provide you with a lot of
          happiness radio
          <SelectInput
            value={selectInputValue}
            onChange={(newValue: string) => setSelectInputValue(newValue)}
            label="Select a sub option radio"
            options={[
              {
                label: 'Sub option 1',
                value: 'option1',
              },
            ]}
          />
        </Stack>
      </SelectableCard>
      <SelectableCard
        name="option2"
        checked={value === 'option2'}
        value="option2"
        type="radio"
        onChange={() => setValue('option2')}
        showTick
        label={
          <Stack direction="row" justifyContent="space-between" flex={1}>
            <Text variant="bodyStrong" as="span">
              Optional option 2
            </Text>
            <Text variant="bodyStronger" as="span">
              9.99€
            </Text>
          </Stack>
        }
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
