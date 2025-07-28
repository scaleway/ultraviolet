import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectableCardGroup } from '..'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import fr from './assets/fr.svg'
import nl from './assets/nl.svg'
import pl from './assets/pl.svg'

export const Examples: StoryFn = args => {
  const [value, onChange] = useState('label-14')
  const [value3, onChange3] = useState([''])
  const [value4, onChange4] = useState([''])

  return (
    <Stack gap={8} flex={1}>
      <SelectableCardGroup
        {...args}
        type="radio"
        legend="First group"
        name="First group"
        showTick
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.currentTarget.value)
        }
      >
        <SelectableCardGroup.Card
          name="label-14"
          value="label-14"
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
        </SelectableCardGroup.Card>
        <SelectableCardGroup.Card
          name="label-14"
          value="label-15"
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
        </SelectableCardGroup.Card>
      </SelectableCardGroup>

      <SelectableCardGroup
        {...args}
        name="label-22"
        legend="Second group"
        value={value3}
        type="checkbox"
        columns={2}
        showTick
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const data = [...value3]
          if (data.includes(event.currentTarget.value)) {
            data.splice(data.indexOf(event.currentTarget?.value), 1)
          } else {
            data.push(event.currentTarget.value)
          }
          onChange3(data)
          // oxlint-disable-next-line eslint/no-console
          console.log(data)
        }}
      >
        <SelectableCardGroup.Card
          value="label-22"
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
        </SelectableCardGroup.Card>
        <SelectableCardGroup.Card
          {...args}
          name="label-23"
          value="label-23"
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
        </SelectableCardGroup.Card>

        <SelectableCardGroup.Card
          name="label-24"
          value="label-24"
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
        </SelectableCardGroup.Card>

        <SelectableCardGroup.Card
          name="label-25"
          value="label-25"
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
        </SelectableCardGroup.Card>
      </SelectableCardGroup>

      <SelectableCardGroup
        {...args}
        name="label-23"
        legend="Choose country"
        helper="Select one or more countries"
        value={value4}
        type="checkbox"
        columns={3}
        showTick
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const data = [...value4]
          if (data.includes(event.currentTarget.value)) {
            data.splice(data.indexOf(event.currentTarget?.value), 1)
          } else {
            data.push(event.currentTarget.value)
          }
          onChange4(data)
          // oxlint-disable-next-line eslint/no-console
          console.log(data)
        }}
      >
        <SelectableCardGroup.Card
          value="label-23"
          label={
            <Stack direction="row" gap={1} flex={1} alignItems="center">
              <img src={fr} alt="fr" width={24} />
              <Text variant="bodyStrong" as="span">
                France
              </Text>
            </Stack>
          }
        />
        <SelectableCardGroup.Card
          {...args}
          name="label-24"
          value="label-24"
          label={
            <Stack direction="row" gap={1} flex={1} alignItems="center">
              <img src={nl} alt="nl" width={24} />
              <Text variant="bodyStrong" as="span">
                Netherlands
              </Text>
            </Stack>
          }
        />

        <SelectableCardGroup.Card
          name="label-25"
          value="label-25"
          label={
            <Stack direction="row" gap={1} flex={1} alignItems="center">
              <img src={pl} alt="pl" width={24} />
              <Text variant="bodyStrong" as="span">
                Poland
              </Text>
            </Stack>
          }
        />
      </SelectableCardGroup>
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
