import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { SelectableCard } from '..'
import { Badge } from '../../Badge'
import { Row } from '../../Row'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

export const Examples: StoryFn = args => {
  const [value, onChange] = useState('label-14')
  const [value2, onChange2] = useState({ 'label-20': true, 'label-21': false })
  const [value3, onChange3] = useState({
    'label-22': true,
    'label-23': false,
    'label-24': false,
    'label-25': false,
  })

  return (
    <Stack gap={8} flex={1}>
      <Stack gap={1} flex={1}>
        <SelectableCard
          {...args}
          name="label-14"
          checked={value === 'label-14'}
          value="label-14"
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
          This option will cost you 1.99€ and provide you with a lot of
          happiness
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
          This option will cost you 2.99€ and provide you with a lot more of
          happiness
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
            onChange2({ ...value2, 'label-20': !event.currentTarget.checked })
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
          This option will cost you 1.99€ and provide you with a lot of
          happiness
        </SelectableCard>
        <SelectableCard
          {...args}
          name="label-21"
          checked={value2['label-21']}
          value="label-21"
          type="checkbox"
          onChange={event =>
            onChange2({ ...value2, 'label-21': !event.currentTarget.checked })
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
          happiness
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
            onChange3({ ...value3, 'label-22': !event.currentTarget.checked })
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
          This option will cost you 2.99€ and provide you with a lot more of
          happiness
        </SelectableCard>
        <SelectableCard
          {...args}
          name="label-23"
          checked={value3['label-23']}
          value="label-23"
          type="checkbox"
          onChange={event =>
            onChange3({ ...value3, 'label-23': !event.currentTarget.checked })
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
          This option will cost you 2.99€ and provide you with a lot more of
          happiness
        </SelectableCard>

        <SelectableCard
          {...args}
          name="label-24"
          checked={value3['label-24']}
          value="label-24"
          type="checkbox"
          onChange={event =>
            onChange3({ ...value3, 'label-24': !event.currentTarget.checked })
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
          This option will cost you 2.99€ and provide you with a lot more of
          happiness
        </SelectableCard>

        <SelectableCard
          {...args}
          name="label-25"
          checked={value3['label-25']}
          value="label-25"
          type="checkbox"
          onChange={event =>
            onChange3({ ...value3, 'label-25': !event.currentTarget.checked })
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
          This option will cost you 2.99€ and provide you with a lot more of
          happiness
        </SelectableCard>
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
