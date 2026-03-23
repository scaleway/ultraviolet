import { InformationOutlineIcon } from '@ultraviolet/icons/InformationOutlineIcon'
import { LockIcon } from '@ultraviolet/icons/LockIcon'

import { InfoTable } from '..'
import { Button } from '../../../Button'
import { Card } from '../../../Card'
import { Status } from '../../../Status'
import { Tooltip } from '../../../Tooltip'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const ComplexExample: StoryFn<
  ComponentProps<typeof InfoTable>
> = props => (
  <Card header="Instance information">
    <InfoTable {...props}>
      <InfoTable.Row templateColumns="repeat(4, 1fr)">
        <InfoTable.Cell title="Status">
          <Status sentiment="success" />
          Ready
        </InfoTable.Cell>
        <InfoTable.Cell title="Type">
          GP1-S{' '}
          <Button sentiment="primary" size="xsmall" variant="ghost">
            Change offer
          </Button>
        </InfoTable.Cell>
        <InfoTable.Cell multiline title="From image">
          Ubuntu 20.04 Focal Fossa
        </InfoTable.Cell>
        <InfoTable.Cell title="Availability Zone">PAR 2</InfoTable.Cell>
      </InfoTable.Row>
      <InfoTable.Row templateColumns="repeat(4, 1fr)">
        <InfoTable.Cell
          title={
            <>
              Cores
              <Tooltip text="number of cores">
                <InformationOutlineIcon />
              </Tooltip>
            </>
          }
        >
          8
        </InfoTable.Cell>
        <InfoTable.Cell title="RAM">32 GB</InfoTable.Cell>
        <InfoTable.Cell title="Compatible Storage">
          Block / Local
        </InfoTable.Cell>
        <InfoTable.Cell title="Bandwidth">800 Mbps</InfoTable.Cell>
      </InfoTable.Row>
      <InfoTable.Row templateColumns="repeat(2, 1fr)">
        <InfoTable.CellWithCopyButton
          copyContent="this-is-an-id-3424-2342"
          title="Instance ID"
        >
          4f6be74f-84c1-4ffb-ac80-39bezefzef7808bdd0
        </InfoTable.CellWithCopyButton>
        <InfoTable.CellWithCopyButton
          copiedText="Done !"
          copyContent="this-is-an-id-3424-2342"
          copyText="Click to copy"
          onCopy={() => console.log('Copied!')}
          title="Image Id"
        >
          4f6be74f-84c1-4ffb-ac80-39bezefzef7808bdd0
        </InfoTable.CellWithCopyButton>
      </InfoTable.Row>
      <InfoTable.Row templateColumns="repeat(2, 1fr)">
        <InfoTable.Cell title="Volumes">EM-RF23R-DEZZ</InfoTable.Cell>
        <InfoTable.Cell title="Public IP">12.123.12.13</InfoTable.Cell>
      </InfoTable.Row>
      <InfoTable.Row templateColumns="repeat(1, 1fr)">
        <InfoTable.Cell title="Protected Instance option">
          <LockIcon prominence="weak" sentiment="neutral" /> Enabled
        </InfoTable.Cell>
      </InfoTable.Row>
    </InfoTable>
  </Card>
)
