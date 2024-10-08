import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Row } from '..'

describe('Row', () => {
  test('renders correctly with default props', () =>
    shouldMatchEmotionSnapshot(
      <Row templateColumns="repeat(2, 1fr)">
        <div>First col</div>
        <div>Second col</div>
      </Row>,
    ))

  test('renders correctly with specific gap', () =>
    shouldMatchEmotionSnapshot(
      <Row templateColumns="repeat(2, 1fr)" gap={1}>
        <div>First col</div>
        <div>Second col</div>
      </Row>,
    ))

  test('renders correctly with specific align', () =>
    shouldMatchEmotionSnapshot(
      <Row templateColumns="repeat(2, 1fr)" gap={1} alignItems="center">
        <div>First col</div>
        <div>Second col</div>
      </Row>,
    ))

  test('renders correctly with specific padding', () =>
    shouldMatchEmotionSnapshot(
      <Row templateColumns="repeat(2, 1fr)" gap={1} padding="10px">
        <div>First col</div>
        <div>Second col</div>
      </Row>,
    ))
})
