import { shouldMatchSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Row } from '..'

describe('row', () => {
  test('renders correctly with default props', () =>
    shouldMatchSnapshot(
      <Row templateColumns="repeat(2, 1fr)">
        <div>First col</div>
        <div>Second col</div>
      </Row>,
    ))

  test('renders correctly with specific gap', () =>
    shouldMatchSnapshot(
      <Row gap={1} templateColumns="repeat(2, 1fr)">
        <div>First col</div>
        <div>Second col</div>
      </Row>,
    ))

  test('renders correctly with specific align', () =>
    shouldMatchSnapshot(
      <Row alignItems="center" gap={1} templateColumns="repeat(2, 1fr)">
        <div>First col</div>
        <div>Second col</div>
      </Row>,
    ))

  test('renders correctly with specific padding', () =>
    shouldMatchSnapshot(
      <Row gap={1} padding="10px" templateColumns="repeat(2, 1fr)">
        <div>First col</div>
        <div>Second col</div>
      </Row>,
    ))

  test('renders correctly with responsive values', () =>
    shouldMatchSnapshot(
      <Row
        alignItems={{
          large: 'flex-end',
          medium: 'center',
          small: 'flex-start',
        }}
        gap={{ large: 3, medium: 2, small: 1 }}
        justifyContent={{
          large: 'flex-end',
          medium: 'center',
          small: 'flex-start',
        }}
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
