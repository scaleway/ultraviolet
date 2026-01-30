import { SelectableCard, SelectInput, Stack, Text } from '@ultraviolet/ui'
import { useState } from 'react'

export const RadioSelectableCard = () => {
  const [value, setValue] = useState('')
  const [selectInputValue, setSelectInputValue] = useState('')

  return (
    <Stack flex={1} gap={1}>
      <SelectableCard
        checked={value === 'radio1'}
        label={
          <Stack direction="row" flex={1} justifyContent="space-between">
            <Text as="span" variant="bodyStrong">
              Optional radio 1
            </Text>
            <Text as="span" variant="bodyStronger">
              4.99€
            </Text>
          </Stack>
        }
        name="radio1"
        onChange={() => setValue('radio1')}
        showTick
        type="radio"
        value="radio1"
      >
        <Stack gap={1}>
          This option will cost you 1.99€ and provide you with a lot of
          happiness radio
          <SelectInput
            label="Select a sub option radio"
            onChange={(newValue: string) => setSelectInputValue(newValue)}
            options={[
              {
                label: 'Sub radio 1',
                value: 'radio1',
              },
            ]}
            value={selectInputValue}
          />
        </Stack>
      </SelectableCard>
      <SelectableCard
        checked={value === 'radio2'}
        label={
          <Stack direction="row" flex={1} justifyContent="space-between">
            <Text as="span" variant="bodyStrong">
              Optional radio 2
            </Text>
            <Text as="span" variant="bodyStronger">
              9.99€
            </Text>
          </Stack>
        }
        name="radio2"
        onChange={() => setValue('radio2')}
        showTick
        type="radio"
        value="radio2"
      >
        This option will cost you 2.99€ and provide you with a lot more of
        happiness radio
      </SelectableCard>
    </Stack>
  )
}
