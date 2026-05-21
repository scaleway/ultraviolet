import { renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Row } from '..'

describe('row', () => {
  it('renders correctly with default props', () => {
    const { asFragment } = renderWithTheme(
      <Row templateColumns="repeat(2, 1fr)">
        <div>First col</div>
        <div>Second col</div>
      </Row>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with specific gap', () => {
    const { asFragment } = renderWithTheme(
      <Row gap={1} templateColumns="repeat(2, 1fr)">
        <div>First col</div>
        <div>Second col</div>
      </Row>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with specific align', () => {
    const { asFragment } = renderWithTheme(
      <Row alignItems="center" gap={1} templateColumns="repeat(2, 1fr)">
        <div>First col</div>
        <div>Second col</div>
      </Row>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with specific padding', () => {
    const { asFragment } = renderWithTheme(
      <Row gap={1} padding="10px" templateColumns="repeat(2, 1fr)">
        <div>First col</div>
        <div>Second col</div>
      </Row>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with responsive values', () => {
    const { asFragment } = renderWithTheme(
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
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
