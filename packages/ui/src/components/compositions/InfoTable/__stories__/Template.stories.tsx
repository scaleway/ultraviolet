import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { InfoTable } from '..'

export const Template: StoryFn<ComponentProps<typeof InfoTable>> = props => (
  <InfoTable {...props}>
    <InfoTable.Row templateColumns="repeat(3, 1fr)">
      <InfoTable.Cell title="title">cell</InfoTable.Cell>
      <InfoTable.Cell title="title">cell</InfoTable.Cell>
      <InfoTable.Cell title="title">cell</InfoTable.Cell>
    </InfoTable.Row>
    <InfoTable.Row templateColumns="2fr 1fr">
      <InfoTable.Cell title="title">cell with more text</InfoTable.Cell>
      <InfoTable.Cell title="title">cell</InfoTable.Cell>
    </InfoTable.Row>
    <InfoTable.Row templateColumns="1fr">
      <InfoTable.Cell title="title">cell</InfoTable.Cell>
    </InfoTable.Row>
    <InfoTable.Row templateColumns="repeat(3, 1fr)">
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
