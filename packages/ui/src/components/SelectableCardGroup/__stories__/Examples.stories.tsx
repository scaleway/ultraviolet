import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { SelectableCardGroup } from '..'
import { Badge } from '../../Badge'
import { Row } from '../../Row'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

export const Examples: StoryFn = args => {
  const [value, onChange] = useState('label-14')
  const [value3, onChange3] = useState([''])

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
          This option will cost you 1.99€ and provide you with a lot of
          happiness
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
          This option will cost you 2.99€ and provide you with a lot more of
          happiness
        </SelectableCardGroup.Card>
      </SelectableCardGroup>

      <Row templateColumns="repeat(2, auto)" gap={1}>
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
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
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
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
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
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
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
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </SelectableCardGroup.Card>
        </SelectableCardGroup>
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
