import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { SelectableCardGroup } from '..'
import fr from './assets/fr.svg'
import nl from './assets/nl.svg'
import pl from './assets/pl.svg'

export const Examples: StoryFn = args => {
  const [value, onChange] = useState('label-14')
  const [value3, onChange3] = useState([''])
  const [value4, onChange4] = useState([''])

  return (
    <Stack flex={1} gap={8}>
      <SelectableCardGroup
        {...args}
        legend="First group"
        name="First group"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.currentTarget.value)
        }
        showTick
        type="radio"
        value={value}
      >
        <SelectableCardGroup.Card
          label={
            <Stack direction="row" flex={1} justifyContent="space-between">
              <Text as="span" variant="bodyStrong">
                Option 1
              </Text>
              <Text as="span" variant="bodyStronger">
                1.99€
              </Text>
            </Stack>
          }
          name="label-14"
          value="label-14"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            This option will cost you 1.99€ and provide you with a lot of
            happiness
          </Text>
        </SelectableCardGroup.Card>
        <SelectableCardGroup.Card
          label={
            <Stack direction="row" flex={1} justifyContent="space-between">
              <Text as="span" variant="bodyStrong">
                Option 2
              </Text>
              <Text as="span" variant="bodyStronger">
                2.99€
              </Text>
            </Stack>
          }
          name="label-14"
          value="label-15"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </Text>
        </SelectableCardGroup.Card>
      </SelectableCardGroup>

      <SelectableCardGroup
        {...args}
        columns={2}
        legend="Second group"
        name="label-22"
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
        showTick
        type="checkbox"
        value={value3}
      >
        <SelectableCardGroup.Card
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <Text as="span" variant="bodyStrong">
                Backup
              </Text>
              <Badge sentiment="primary" size="small">
                Recommended
              </Badge>
            </Stack>
          }
          value="label-22"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </Text>
        </SelectableCardGroup.Card>
        <SelectableCardGroup.Card
          {...args}
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <Text as="span" variant="bodyStrong">
                Redundancy
              </Text>
              <Badge sentiment="primary" size="small">
                Recommended
              </Badge>
            </Stack>
          }
          name="label-23"
          value="label-23"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </Text>
        </SelectableCardGroup.Card>

        <SelectableCardGroup.Card
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <Text as="span" variant="bodyStrong">
                Morning Reboot 9am
              </Text>
              <Badge sentiment="neutral" size="small">
                Optional
              </Badge>
            </Stack>
          }
          name="label-24"
          value="label-24"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </Text>
        </SelectableCardGroup.Card>

        <SelectableCardGroup.Card
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <Text as="span" variant="bodyStrong">
                Monitoring
              </Text>
              <Badge sentiment="neutral" size="small">
                Optional
              </Badge>
            </Stack>
          }
          name="label-25"
          value="label-25"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </Text>
        </SelectableCardGroup.Card>
      </SelectableCardGroup>

      <SelectableCardGroup
        {...args}
        columns={3}
        helper="Select one or more countries"
        legend="Choose country"
        name="label-23"
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
        showTick
        type="checkbox"
        value={value4}
      >
        <SelectableCardGroup.Card
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <img alt="fr" src={fr} width={24} />
              <Text as="span" variant="bodyStrong">
                France
              </Text>
            </Stack>
          }
          value="label-23"
        />
        <SelectableCardGroup.Card
          {...args}
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <img alt="nl" src={nl} width={24} />
              <Text as="span" variant="bodyStrong">
                Netherlands
              </Text>
            </Stack>
          }
          name="label-24"
          value="label-24"
        />

        <SelectableCardGroup.Card
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <img alt="pl" src={pl} width={24} />
              <Text as="span" variant="bodyStrong">
                Poland
              </Text>
            </Stack>
          }
          name="label-25"
          value="label-25"
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
