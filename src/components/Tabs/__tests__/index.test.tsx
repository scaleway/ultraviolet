import { fireEvent } from '@testing-library/react'
import Tabs from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotWithPortal,
} from '../../../helpers/jestHelpers'
import Link from '../../Link'

describe('Tabs', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(<Tabs onChange={() => {}} />))

  test('renders correctly with Tabs with prop', async () => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      value: 500,
    })
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
      configurable: true,
      value: 600,
    })
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: () => {},
    })

    return shouldMatchEmotionSnapshotWithPortal(
      <Tabs selected={0} onChange={() => {}}>
        <Tabs.Tab value={0}>First</Tabs.Tab>
        <Tabs.Tab value={1}>Second</Tabs.Tab>
        <Tabs.Tab value={undefined}>Undefined</Tabs.Tab>
        <Tabs.Tab counter={12}>Counter</Tabs.Tab>
        <Tabs.Tab counter={12} badge="Badge">
          Conter and badge
        </Tabs.Tab>
        <Tabs.Tab badge="Badge">Badge</Tabs.Tab>
        <Tabs.Tab>Very long tab name</Tabs.Tab>
        <Tabs.Tab>Very long tab name</Tabs.Tab>
        <Tabs.Tab>Very long tab name</Tabs.Tab>
        <Tabs.Tab>Very long tab name</Tabs.Tab>
        <Tabs.Tab>Very long tab name</Tabs.Tab>
        <Tabs.Tab>Very long tab name</Tabs.Tab>
        <Tabs.Tab>Very long tab name</Tabs.Tab>
        <Tabs.Tab>Very long tab name</Tabs.Tab>
        <Tabs.Tab>Very long tab name</Tabs.Tab>
        <Tabs.Tab>Very long tab name</Tabs.Tab>
        <Tabs.Tab>Very long tab name</Tabs.Tab>
        <Tabs.Menu visible baseId="test" disclosure="Blabla">
          <Tabs.MenuItem value={3}>Test</Tabs.MenuItem>
          <Tabs.MenuItem value={4}>Test 2</Tabs.MenuItem>
        </Tabs.Menu>
      </Tabs>,
      {
        transform: node => {
          fireEvent.scroll(node.getByRole('tablist'), {})
          fireEvent.click(node.getByText('More'))
          Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
            configurable: true,
            value: 500,
          })
          fireEvent.scroll(node.getByRole('tablist'), {})
        },
      },
    )
  })

  test('renders correctly with Tabs menu selected', () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Tabs selected={4} onChange={() => {}}>
        <Tabs.Tab value={0}>First</Tabs.Tab>
        <Tabs.Tab value={1}>Second</Tabs.Tab>
        <Tabs.Tab value={2}>Very long tab name</Tabs.Tab>
        <Tabs.Menu visible baseId="test" disclosure="More">
          <Tabs.MenuItem>Test</Tabs.MenuItem>
          <Tabs.MenuItem disabled>Test</Tabs.MenuItem>
          <Tabs.MenuItem value={undefined}>Test</Tabs.MenuItem>
          <Tabs.MenuItem value={4}>Test 2</Tabs.MenuItem>
          <Tabs.MenuItem value={5}>Test 2</Tabs.MenuItem>
        </Tabs.Menu>
        <Tabs.Menu disabled disclosure="More again">
          <Tabs.MenuItem>Test again</Tabs.MenuItem>
        </Tabs.Menu>
      </Tabs>,
    ))

  test('renders correctly with Tabs and last disabled', () =>
    shouldMatchEmotionSnapshot(
      <Tabs selected={2} onChange={() => {}}>
        <Tabs.Tab value={0}>First</Tabs.Tab>
        <Tabs.Tab value={1}>Second</Tabs.Tab>
        <Tabs.Tab value={2} disabled>
          Very long tab name
        </Tabs.Tab>
      </Tabs>,
    ))

  test('renders correctly with Tabs name', () =>
    shouldMatchEmotionSnapshot(
      <Tabs selected="second" onChange={() => {}}>
        <Tabs.Tab value="first">First</Tabs.Tab>
        <Tabs.Tab value="second">Second</Tabs.Tab>
        <Tabs.Tab value="three" disabled>
          Very long tab name
        </Tabs.Tab>
      </Tabs>,
    ))

  test('renders correctly with custom Tabs component', () =>
    shouldMatchEmotionSnapshot(
      <Tabs onChange={() => {}}>
        <Tabs.Tab as="div">First</Tabs.Tab>
        <Tabs.Tab as="a">Second</Tabs.Tab>
        <Tabs.Tab as={Link} href="#" disabled>
          Very long tab name
        </Tabs.Tab>
      </Tabs>,
    ))

  test('updates tab on keydown', () => {
    const onChange = jest.fn()
    const onFirstTabClick = jest.fn()
    const { getByText } = renderWithTheme(
      <Tabs onChange={onChange}>
        <Tabs.Tab value={1} onClick={onFirstTabClick}>
          First
        </Tabs.Tab>
        <Tabs.Tab value={2}>Second</Tabs.Tab>
        <Tabs.Tab value={3} disabled>
          Disabled
        </Tabs.Tab>
        <Tabs.Tab>No value</Tabs.Tab>
      </Tabs>,
    )
    fireEvent.keyDown(getByText('First'), { code: 'Enter' })
    expect(onChange).toHaveBeenCalledTimes(1)
    fireEvent.keyDown(getByText('Second'), { code: 'Enter' })
    expect(onChange).toHaveBeenCalledTimes(2)
    onChange.mockReset()

    fireEvent.keyDown(getByText('Disabled'), { code: 'Enter' })
    expect(onChange).not.toHaveBeenCalled()
    fireEvent.keyDown(getByText('No value'), { code: 'Enter' })
    expect(onChange).not.toHaveBeenCalled()
    expect(onFirstTabClick).toHaveBeenCalledTimes(0)
  })

  test('updates tab on click', () => {
    const onChange = jest.fn()
    const onFirstTabClick = jest.fn()
    const { getByText } = renderWithTheme(
      <Tabs onChange={onChange}>
        <Tabs.Tab value="first" onClick={onFirstTabClick}>
          First
        </Tabs.Tab>
        <Tabs.Tab value="second">Second</Tabs.Tab>
        <Tabs.Tab>No value</Tabs.Tab>
        <Tabs.Tab value={3} disabled>
          Disabled
        </Tabs.Tab>
        <Tabs.Menu disclosure="More" visible>
          <Tabs.MenuItem value={1}>Item</Tabs.MenuItem>
          <Tabs.MenuItem>Item no value</Tabs.MenuItem>
        </Tabs.Menu>
      </Tabs>,
    )
    fireEvent.click(getByText('First'))
    expect(onChange).toHaveBeenLastCalledWith('first')
    fireEvent.click(getByText('Second'))
    expect(onChange).toHaveBeenLastCalledWith('second')
    fireEvent.click(getByText('Item'))
    expect(onChange).toHaveBeenLastCalledWith(1)
    onChange.mockReset()
    fireEvent.click(getByText('Item no value'))
    fireEvent.click(getByText('Disabled'))
    fireEvent.click(getByText('No value'))
    expect(onChange).not.toHaveBeenCalled()
    expect(onFirstTabClick).toHaveBeenCalledTimes(1)
  })

  test('no onChange', () => {
    const onClick = jest.fn()
    const { getByText, unmount } = renderWithTheme(
      <Tabs onChange={() => {}}>
        <Tabs.Tab value="first" onClick={onClick}>
          First
        </Tabs.Tab>
        <Tabs.Tab onClick={onClick} value="second">
          Second
        </Tabs.Tab>
        <Tabs.Tab onClick={onClick}>No value</Tabs.Tab>
        <Tabs.Tab onClick={onClick} value={3} disabled>
          Disabled
        </Tabs.Tab>
        <Tabs.Menu disclosure="More" visible>
          <Tabs.MenuItem onClick={onClick} value={1}>
            Item
          </Tabs.MenuItem>
          <Tabs.MenuItem onClick={onClick}>Item no value</Tabs.MenuItem>
        </Tabs.Menu>
      </Tabs>,
    )
    fireEvent.click(getByText('First'))
    fireEvent.click(getByText('Second'))
    fireEvent.click(getByText('No value'))
    fireEvent.click(getByText('Disabled'))
    fireEvent.click(getByText('Item'))
    fireEvent.click(getByText('Item no value'))
    expect(onClick).toHaveBeenCalledTimes(5)
    unmount()
  })
})
