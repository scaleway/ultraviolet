import { RowV2 } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('RowV2', () => {
  test('renders correctly with default props', () =>
    shouldMatchEmotionSnapshot(
      <RowV2 templateColumns="repeat(2, 1fr)">
        <div>First col</div>
        <div>Second col</div>
      </RowV2>,
    ))

  test('renders correctly with specific gap', () =>
    shouldMatchEmotionSnapshot(
      <RowV2 templateColumns="repeat(2, 1fr)" gap={1}>
        <div>First col</div>
        <div>Second col</div>
      </RowV2>,
    ))

  test('renders correctly with specific align', () =>
    shouldMatchEmotionSnapshot(
      <RowV2 templateColumns="repeat(2, 1fr)" gap={1} alignItems="center">
        <div>First col</div>
        <div>Second col</div>
      </RowV2>,
    ))
})
