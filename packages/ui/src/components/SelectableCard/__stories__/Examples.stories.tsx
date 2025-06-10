import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { SelectableCard } from '..'
import { Badge } from '../../Badge'
import { Row } from '../../Row'
import { SelectInput } from '../../SelectInput'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import fr from './assets/fr.svg'
import nl from './assets/nl.svg'
import pl from './assets/pl.svg'

export const Examples: StoryFn = args => {
  const [value, onChange] = useState('label-29')
  const [value2, onChange2] = useState({ 'label-20': true, 'label-21': false })
  const [value3, onChange3] = useState({
    'label-22': true,
    'label-23': false,
    'label-24': false,
    'label-25': false,
  })
  const [value4, onChange4] = useState({
    'label-26': true,
    'label-27': false,
    'label-28': false,
  })

  return (
    <Stack gap={8} flex={1}>
      <Stack gap={1} flex={1}>
        <SelectableCard
          {...args}
          name="label-29"
          checked={value === 'label-29'}
          value="label-29"
          type="radio"
          onChange={event => onChange(event.currentTarget.value)}
          showTick
          label={
            <Stack direction="row" justifyContent="space-between" flex={1}>
              <Text variant="bodyStrong" as="span">
                Option 1
              </Text>
              <Text variant="bodyStronger" as="span">
                1.99€
              </Text>
            </Stack>
          }
        >
          <Text as="p" variant="body" prominence="weak" sentiment="neutral">
            This option will cost you 1.99€ and provide you with a lot of
            happiness
          </Text>
        </SelectableCard>
        <SelectableCard
          {...args}
          name="label-15"
          checked={value === 'label-15'}
          value="label-15"
          type="radio"
          onChange={event => onChange(event.currentTarget.value)}
          showTick
          label={
            <Stack direction="row" justifyContent="space-between" flex={1}>
              <Text variant="bodyStrong" as="span">
                Option 2
              </Text>
              <Text variant="bodyStronger" as="span">
                2.99€
              </Text>
            </Stack>
          }
        >
          <Text as="p" variant="body" prominence="weak" sentiment="neutral">
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </Text>
        </SelectableCard>
      </Stack>
      <Stack gap={1} flex={1}>
        <SelectableCard
          {...args}
          name="label-20"
          checked={value2['label-20']}
          value="label-20"
          type="checkbox"
          onChange={event =>
            onChange2({ ...value2, 'label-20': event.currentTarget.checked })
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
            <Text as="p" variant="body" prominence="weak" sentiment="neutral">
              This option will cost you 1.99€ and provide you with a lot of
              happiness
              <SelectInput
                label="Select a sub option"
                options={[
                  {
                    label: 'Sub option 1',
                    value: 'option1',
                  },
                ]}
              />
            </Text>
          </Stack>
        </SelectableCard>
        <SelectableCard
          {...args}
          name="label-21"
          checked={value2['label-21']}
          value="label-21"
          type="checkbox"
          onChange={event =>
            onChange2({ ...value2, 'label-21': event.currentTarget.checked })
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
          <Text as="p" variant="body" prominence="weak" sentiment="neutral">
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </Text>
        </SelectableCard>
      </Stack>

      <Row templateColumns="repeat(2, auto)" gap={1}>
        <SelectableCard
          {...args}
          name="label-22"
          checked={value3['label-22']}
          value="label-22"
          type="checkbox"
          onChange={event =>
            onChange3({ ...value3, 'label-22': event.currentTarget.checked })
          }
          showTick
          label={
            <Stack direction="row" gap={1} flex={1} alignItems="center">
              <Text variant="bodyStrong" as="span">
                Backup
              </Text>
              <Badge sentiment="primary" size="small">
                Recommended
              </Badge>
            </Stack>
          }
        >
          <Text as="p" variant="body" prominence="weak" sentiment="neutral">
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </Text>
        </SelectableCard>
        <SelectableCard
          {...args}
          name="label-23"
          checked={value3['label-23']}
          value="label-23"
          type="checkbox"
          onChange={event =>
            onChange3({ ...value3, 'label-23': event.currentTarget.checked })
          }
          showTick
          label={
            <Stack direction="row" gap={1} flex={1} alignItems="center">
              <Text variant="bodyStrong" as="span">
                Redundancy
              </Text>
              <Badge sentiment="primary" size="small">
                Recommended
              </Badge>
            </Stack>
          }
        >
          <Text as="p" variant="body" prominence="weak" sentiment="neutral">
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </Text>
        </SelectableCard>

        <SelectableCard
          {...args}
          name="label-24"
          checked={value3['label-24']}
          value="label-24"
          type="checkbox"
          onChange={event =>
            onChange3({ ...value3, 'label-24': event.currentTarget.checked })
          }
          showTick
          label={
            <Stack direction="row" gap={1} flex={1} alignItems="center">
              <Text variant="bodyStrong" as="span">
                Morning Reboot 9am
              </Text>
              <Badge sentiment="neutral" size="small">
                Optional
              </Badge>
            </Stack>
          }
        >
          <Text as="p" variant="body" prominence="weak" sentiment="neutral">
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </Text>
        </SelectableCard>

        <SelectableCard
          {...args}
          name="label-25"
          checked={value3['label-25']}
          value="label-25"
          type="checkbox"
          onChange={event =>
            onChange3({ ...value3, 'label-25': event.currentTarget.checked })
          }
          showTick
          label={
            <Stack direction="row" gap={1} flex={1} alignItems="center">
              <Text variant="bodyStrong" as="span">
                Monitoring
              </Text>
              <Badge sentiment="neutral" size="small">
                Optional
              </Badge>
            </Stack>
          }
        >
          <Text as="p" variant="body" prominence="weak" sentiment="neutral">
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </Text>
        </SelectableCard>
      </Row>

      <Row templateColumns="repeat(3, auto)" gap={1}>
        <SelectableCard
          {...args}
          name="label-26"
          checked={value4['label-26']}
          value="label-26"
          type="checkbox"
          onChange={event =>
            onChange4({ ...value4, 'label-26': event.currentTarget.checked })
          }
          showTick
          label={
            <Stack direction="row" gap={1} flex={1} alignItems="center">
              <img src={fr} alt="fr" width={24} />
              <Text variant="bodyStrong" as="span">
                France
              </Text>
            </Stack>
          }
        />
        <SelectableCard
          {...args}
          name="label-27"
          checked={value4['label-27']}
          value="label-27"
          type="checkbox"
          onChange={event =>
            onChange4({ ...value4, 'label-27': event.currentTarget.checked })
          }
          showTick
          label={
            <Stack direction="row" gap={1} flex={1} alignItems="center">
              <img src={nl} alt="nl" width={24} />
              <Text variant="bodyStrong" as="span">
                Netherlands
              </Text>
            </Stack>
          }
        />

        <SelectableCard
          {...args}
          name="label-28"
          checked={value4['label-28']}
          value="label-28"
          type="checkbox"
          onChange={event =>
            onChange4({ ...value4, 'label-28': event.currentTarget.checked })
          }
          showTick
          label={
            <Stack direction="row" gap={1} flex={1} alignItems="center">
              <img src={pl} alt="pl" width={24} />
              <Text variant="bodyStrong" as="span">
                Poland
              </Text>
            </Stack>
          }
        />
      </Row>
    </Stack>
  )
}

Examples.decorators = [
  StoryComponent => (
    <Stack direction="row" gap={2}>
      <StoryComponent />
    </Stack>
  ),
]
