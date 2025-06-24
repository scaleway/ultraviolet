import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { InfoTable } from '..'

describe('InfoTable', () => {
  it('should work with default props', () =>
    shouldMatchEmotionSnapshot(
      <InfoTable>
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
