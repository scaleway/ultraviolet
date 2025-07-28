import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { InfoTable } from '..'

describe('InfoTable', () => {
  it('should work with default props', () =>
    shouldMatchEmotionSnapshot(
      <InfoTable>
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
            cell cell cell cell cell cell cell cell cell cell cell cell cell
            cell cell cell cell cell cell cell cell cell cell cell cell cell
            cell cell cell cell
          </InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
      </InfoTable>,
    ))

  it('should work with multiLine', () =>
    shouldMatchEmotionSnapshot(
      <InfoTable>
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
          <InfoTable.Cell title="title" multiline>
            cell cell cell cell cell cell cell cell cell cell cell cell cell
            cell cell cell cell cell cell cell cell cell cell cell cell cell
            cell cell cell cell
          </InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
      </InfoTable>,
    ))

  it('should work with width', () =>
    shouldMatchEmotionSnapshot(
      <InfoTable width="30%">
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
            cell cell cell cell cell cell cell cell cell cell cell cell cell
            cell cell cell cell cell cell cell cell cell cell cell cell cell
            cell cell cell cell
          </InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
      </InfoTable>,
    ))
})
