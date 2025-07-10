import type { StoryFn } from '@storybook/react'
import { LockIcon } from '@ultraviolet/icons'
import { Button, Card, CopyButton, Stack, Status } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { InfoTable } from '../InfoTable'

export const ComplexExample: StoryFn<
  ComponentProps<typeof InfoTable>
> = props => (
  <Card header="Instance information">
    <InfoTable {...props}>
      <InfoTable.Row templateColumns="repeat(4, 1fr)">
        <InfoTable.Cell title="Status">
          <Stack direction="row" alignItems="center" gap={1}>
            <Status sentiment="success" />
            Ready
          </Stack>
        </InfoTable.Cell>
        <InfoTable.Cell title="Type">
          GP1-S{' '}
          <Button variant="ghost" size="xsmall" sentiment="primary">
            Change offer
          </Button>
        </InfoTable.Cell>
        <InfoTable.Cell title="From image">
          Ubuntu 20.04 Focal Fossa
        </InfoTable.Cell>
        <InfoTable.Cell title="Availability Zone">PAR 2</InfoTable.Cell>
      </InfoTable.Row>
      <InfoTable.Row templateColumns="repeat(4, 1fr)">
        <InfoTable.Cell title="Cores">8</InfoTable.Cell>
        <InfoTable.Cell title="RAM">32 GB</InfoTable.Cell>
        <InfoTable.Cell title="Compatible Storage">
          Block / Local
        </InfoTable.Cell>
        <InfoTable.Cell title="Bandwidth">800 Mbps</InfoTable.Cell>
      </InfoTable.Row>
      <InfoTable.Row templateColumns="repeat(2, 1fr)">
        <InfoTable.Cell title="Instance ID">
          <Stack direction="row" alignItems="center" gap={1}>
            4f6be74f-84c1-4ffb-ac80-39befzef808bdd0
            <CopyButton value="this-is-an-id-3424-2342" sentiment="neutral" />
          </Stack>
        </InfoTable.Cell>
        <InfoTable.Cell title="Image Id">
          {' '}
          <Stack direction="row" alignItems="center" gap={1}>
            4f6be74f-84c1-4ffb-ac80-39bezefzef7808bdd0
            <CopyButton value="this-is-an-id-3424-2342" sentiment="neutral" />
          </Stack>
        </InfoTable.Cell>
      </InfoTable.Row>
      <InfoTable.Row templateColumns="repeat(2, 1fr)">
        <InfoTable.Cell title="Volumes">EM-RF23R-DEZZ</InfoTable.Cell>
        <InfoTable.Cell title="Public IP">12.123.12.13</InfoTable.Cell>
      </InfoTable.Row>
      <InfoTable.Row templateColumns="repeat(1, 1fr)">
        <InfoTable.Cell title="Protected Instance option">
          <LockIcon sentiment="neutral" prominence="weak" /> Enabled
        </InfoTable.Cell>
      </InfoTable.Row>
    </InfoTable>
  </Card>
)
