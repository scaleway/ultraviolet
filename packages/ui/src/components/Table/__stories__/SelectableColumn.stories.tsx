import type { StoryFn } from '@storybook/react-vite'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { Table } from '..'
import { Checkbox } from '../../Checkbox'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

const CHANNELS = ['email', 'app', 'sms']

const selectableCell = (
  channel: string,
  subject: string,
  items: string[],
  setter: Dispatch<SetStateAction<string[]>>,
) => (
  <Checkbox
    aria-label={`select ${subject} notifications for this row`}
    checked={items.includes(channel)}
    onChange={() => {
      setter(current => {
        const index = current.indexOf(channel)

        return index === -1
          ? [...current, channel]
          : [...current.slice(0, index), ...current.slice(index + 1)]
      })
    }}
  />
)

export const SelectableColumn: StoryFn = () => {
  const [incidentNotifications, setIndicentNotifications] = useState<string[]>(
    [],
  )
  const [technicalNotifications, setTechnicalNotifications] = useState<
    string[]
  >([])
  const [billingNotifications, setBillingNotifications] = useState<string[]>([])

  const getAllState = (items: string[]) => {
    if (items.length === 0) {
      return false
    }
    if (items.length === CHANNELS.length) {
      return true
    }

    return 'indeterminate'
  }

  const selectAll = (setState: Dispatch<SetStateAction<string[]>>) => {
    setState(current => (current.length === 0 ? [...CHANNELS] : []))
  }

  return (
    <Stack gap={1}>
      <Table
        stripped
        columns={[
          { label: 'Channel', width: '100px' },
          {
            label: (
              <Checkbox
                onChange={() => selectAll(setIndicentNotifications)}
                checked={getAllState(incidentNotifications)}
                id="incident"
              >
                <Text as="span" variant="bodySmall" htmlFor="incident">
                  Incident notifications
                </Text>
              </Checkbox>
            ),
          },
          {
            label: (
              <Stack direction="row" gap={1} alignItems="center">
                <Checkbox
                  onChange={() => selectAll(setTechnicalNotifications)}
                  checked={getAllState(technicalNotifications)}
                  id="technical"
                >
                  <Text as="span" variant="bodySmall" htmlFor="technical">
                    Technical notifications
                  </Text>
                </Checkbox>
              </Stack>
            ),
          },
          {
            label: (
              <Checkbox
                onChange={() => selectAll(setBillingNotifications)}
                checked={getAllState(billingNotifications)}
              >
                <Text as="span" variant="bodySmall">
                  Billing notifications
                </Text>
              </Checkbox>
            ),
          },
        ]}
      >
        <Table.Body>
          {CHANNELS.map(channel => (
            <Table.Row key={channel} id={channel}>
              <Table.Cell>{channel}</Table.Cell>
              <Table.Cell>
                {selectableCell(
                  channel,
                  'incident',
                  incidentNotifications,
                  setIndicentNotifications,
                )}
              </Table.Cell>
              <Table.Cell>
                {selectableCell(
                  channel,
                  'technical',
                  technicalNotifications,
                  setTechnicalNotifications,
                )}
              </Table.Cell>
              <Table.Cell>
                {selectableCell(
                  channel,
                  'billing',
                  billingNotifications,
                  setBillingNotifications,
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div>
        Incident notifications channels :{' '}
        {incidentNotifications.length > 0
          ? incidentNotifications.join(',')
          : 'none'}
      </div>
      <div>
        Technical notifications channels :{' '}
        {technicalNotifications.length > 0
          ? technicalNotifications.join(',')
          : 'none'}
      </div>
      <div>
        Billing notifications channels :{' '}
        {billingNotifications.length > 0
          ? billingNotifications.join(',')
          : 'none'}
      </div>
    </Stack>
  )
}

SelectableColumn.parameters = {
  docs: {
    description: {
      story:
        'This is an exemple which show usage of checkbox for each column. You can check the story code on the repository : https://github.com/scaleway/ultraviolet/blob/main/packages/ui/src/components/Table/__stories__/SelectableColumn.stories.tsx',
    },
  },
}
