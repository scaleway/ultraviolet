import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { InfoTable } from '../InfoTable'

export const Template: StoryFn<ComponentProps<typeof InfoTable>> = props => (
  <InfoTable {...props}>
    <InfoTable.Row templateColumn="repeat(3, 1fr)">
      <InfoTable.Cell title="title">cell</InfoTable.Cell>
      <InfoTable.Cell title="title">cell</InfoTable.Cell>
      <InfoTable.Cell title="title">cell</InfoTable.Cell>
    </InfoTable.Row>
    <InfoTable.Row templateColumn="2fr 1fr">
      <InfoTable.Cell title="title">cell with more text</InfoTable.Cell>
      <InfoTable.Cell title="title">cell</InfoTable.Cell>
    </InfoTable.Row>
    <InfoTable.Row templateColumn="1fr">
      <InfoTable.Cell title="title">cell</InfoTable.Cell>
    </InfoTable.Row>
    <InfoTable.Row templateColumn="repeat(3, 1fr)">
      <InfoTable.Cell title="title">
        cell cell cell cell cell cell cell cell cell cell cell cell cell cell
        cell cell cell cell cell cell cell cell cell cell cell cell cell cell
        cell cell
      </InfoTable.Cell>
      <InfoTable.Cell title="title">cell</InfoTable.Cell>
      <InfoTable.Cell title="title">cell</InfoTable.Cell>
    </InfoTable.Row>
  </InfoTable>
)
