import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectInput } from '../../SelectInput'
import { Separator } from '../../Separator'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { SelectableCard } from '..'

export const Indented: StoryFn = args => {
  const [value2, onChange2] = useState({ 'label-20': true, 'label-21': false })

  return (
    <Stack flex={1} gap={8}>
      <Stack flex={1} gap={1}>
        <SelectableCard
          {...args}
          checked={value2['label-20']}
          label={
            <Stack direction="row" flex={1} justifyContent="space-between">
              <Text as="span" variant="bodyStrong">
                Default layout (indented is set to true)
              </Text>
              <Text as="span" variant="bodyStronger">
                4.99€
              </Text>
            </Stack>
          }
          name="label-20"
          onChange={event =>
            onChange2(prevState => ({
              ...prevState,
              'label-20': event.currentTarget.checked,
            }))
          }
          showTick
          type="checkbox"
          value="label-20"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            <Stack gap={3} width="100%">
              This option will cost you 1.99€ and provide you with a lot of
              happiness
              <Separator />
              <SelectInput
                label="Select a sub option"
                options={[
                  {
                    label: 'Sub option 1',
                    value: 'option1',
                  },
                ]}
              />{' '}
            </Stack>
          </Text>
        </SelectableCard>
        <SelectableCard
          {...args}
          checked={value2['label-21']}
          indented={false}
          label={
            <Stack direction="row" flex={1} justifyContent="space-between">
              <Text as="span" variant="bodyStrong">
                Intended set to false
              </Text>
              <Text as="span" variant="bodyStronger">
                4.99€
              </Text>
            </Stack>
          }
          name="label-21"
          onChange={event =>
            onChange2(prevState => ({
              ...prevState,
              'label-21': event.currentTarget.checked,
            }))
          }
          showTick
          type="checkbox"
          value="label-21"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            <Stack gap={3} width="100%">
              This option will cost you 1.99€ and provide you with a lot of
              happiness
              <Separator />
              <SelectInput
                label="Select a sub option"
                options={[
                  {
                    label: 'Sub option 1',
                    value: 'option1',
                  },
                ]}
              />
            </Stack>
          </Text>
        </SelectableCard>
      </Stack>
    </Stack>
  )
}

Indented.decorators = [
  StoryComponent => (
    <Stack direction="row" gap={2}>
      <StoryComponent />
    </Stack>
  ),
]

Indented.parameters = {
  docs: {
    description: {
      story:
        'By default, the content of the card (children) is aligned with the label when `showTick` is set to `true`. It is possible to disabled this alignment by setting prop `indented` to `false`.',
    },
  },
}
