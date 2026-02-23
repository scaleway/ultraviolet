import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { InfoTable } from '..'
import { Stack } from '../../../Stack'

export const MultiLine: StoryFn<ComponentProps<typeof InfoTable>> = props => (
  <InfoTable {...props}>
    <InfoTable.Row templateColumns="repeat(2, 1fr)">
      <InfoTable.Cell title="without multiLine">
        <Stack>
          cell cell cell cell cell cell cell cell cell cell cell cell cell cell
          cell cell cell cell cell cell cell cell cell cell cell cell cell cell
          cell cell cell cell cell cell cell cell cell cell cell cell cell cell
          cell cell
        </Stack>
      </InfoTable.Cell>
      <InfoTable.Cell multiline title="with multiLine">
        cell cell cell cell cell cell cell cell cell cell cell cell cell cell
        cell cell cell cell cell cell cell cell cell cell cell cell cell cell
        cell cell cell cell cell cell cell cell cell cell cell cell cell cell
        cell cell
      </InfoTable.Cell>
    </InfoTable.Row>
  </InfoTable>
)

MultiLine.parameters = {
  docs: {
    description: {
      story:
        'Setting `multiLine` to true ensures the content is displayed on a multiple lines. Otherwise, there is an ellipsis and a tooltip for overflowed text.',
    },
  },
}
