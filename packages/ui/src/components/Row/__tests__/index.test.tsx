import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Row } from '..'

describe('row', () => {
  test('renders correctly with default props', () =>
    shouldMatchEmotionSnapshot(
      <Row templateColumns="repeat(2, 1fr)">
        <div>First col</div>
        <div>Second col</div>
      </Row>,
    ))

  test('renders correctly with specific gap', () =>
    shouldMatchEmotionSnapshot(
      <Row gap={1} templateColumns="repeat(2, 1fr)">
        <div>First col</div>
        <div>Second col</div>
      </Row>,
    ))

  test('renders correctly with specific align', () =>
    shouldMatchEmotionSnapshot(
      <Row alignItems="center" gap={1} templateColumns="repeat(2, 1fr)">
        <div>First col</div>
        <div>Second col</div>
      </Row>,
    ))

  test('renders correctly with specific padding', () =>
    shouldMatchEmotionSnapshot(
      <Row gap={1} padding="10px" templateColumns="repeat(2, 1fr)">
        <div>First col</div>
        <div>Second col</div>
      </Row>,
    ))

  test('renders correctly with responsive values', () =>
    shouldMatchEmotionSnapshot(
      <Row
        alignItems={{ large: 'end', medium: 'center', small: 'start' }}
        gap={{ large: 3, medium: 2, small: 1 }}
        justifyContent={{ large: 'end', medium: 'center', small: 'start' }}
        padding={{ large: 2, medium: 1, small: 0 }}
        templateColumns={{
          large: '2fr 1fr',
          medium: '1fr 1fr',
          small: '1fr 2fr',
        }}
      >
        <div>First col</div>
        <div>Second col</div>
      </Row>,
    ))
})
