import { fireEvent, screen } from '@testing-library/react'
import { consoleLightTheme } from '@ultraviolet/themes'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { Link } from '../../Link'
import { Tabs } from '..'

describe('Tabs', () => {
  test('renders correctly', () => {
    const { asFragment } = renderWithTheme(<Tabs onChange={() => {}} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with Tabs with prop', () => {
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

    const { asFragment } = renderWithTheme(
      <Tabs selected={0} onChange={() => {}}>
        <Tabs.Tab value={0} counter={2}>
          First
        </Tabs.Tab>
        <Tabs.Tab value={1}>Second</Tabs.Tab>
        <Tabs.Tab value={undefined}>Undefined</Tabs.Tab>
        <Tabs.Tab counter={12}>Counter</Tabs.Tab>
        <Tabs.Tab value={2} counter={0}>
          Counter no items
        </Tabs.Tab>
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
        <Tabs.Menu visible id="test" disclosure="Blabla">
          <Tabs.MenuItem value={3}>Test</Tabs.MenuItem>
          <Tabs.MenuItem value={4}>Test 2</Tabs.MenuItem>
        </Tabs.Menu>
      </Tabs>,
      consoleLightTheme,
      {
        container: document.body,
      },
    )
    fireEvent.scroll(screen.getByRole('tablist'), {})
    fireEvent.click(screen.getByText('More'))
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
      configurable: true,
      value: 500,
    })
    fireEvent.scroll(screen.getByRole('tablist'), {})
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with Tabs menu selected', () => {
    const { asFragment } = renderWithTheme(
      <Tabs selected={4} onChange={() => {}}>
        <Tabs.Tab value={0}>First</Tabs.Tab>
        <Tabs.Tab value={1}>Second</Tabs.Tab>
        <Tabs.Tab value={2}>Very long tab name</Tabs.Tab>
        <Tabs.Menu visible id="test" disclosure="More">
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
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with Tabs and last disabled', () => {
    shouldMatchEmotionSnapshot(
      <Tabs selected={2} onChange={() => {}}>
        <Tabs.Tab value={0}>First</Tabs.Tab>
        <Tabs.Tab value={1}>Second</Tabs.Tab>
        <Tabs.Tab value={2} disabled>
          Very long tab name
        </Tabs.Tab>
      </Tabs>,
    )
  })

  test('renders correctly with Tabs name', () => {
    shouldMatchEmotionSnapshot(
      <Tabs selected="second" onChange={() => {}}>
        <Tabs.Tab value="first">First</Tabs.Tab>
        <Tabs.Tab value="second">Second</Tabs.Tab>
        <Tabs.Tab value="three" disabled>
          Very long tab name
        </Tabs.Tab>
      </Tabs>,
    )
  })

  test('renders correctly with custom Tabs component', () => {
    shouldMatchEmotionSnapshot(
      <Tabs onChange={() => {}}>
        <Tabs.Tab as="div">First</Tabs.Tab>
        <Tabs.Tab as="a">Second</Tabs.Tab>
        <Tabs.Tab as={Link} href="#" disabled>
          Very long tab name
        </Tabs.Tab>
      </Tabs>,
    )
  })

  test('updates tab on keydown', () => {
    const onChange = vi.fn()
    const onFirstTabClick = vi.fn()
    renderWithTheme(
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
    fireEvent.keyDown(screen.getByText('First'), { code: 'Enter' })
    expect(onChange).toHaveBeenCalledTimes(1)
    fireEvent.keyDown(screen.getByText('Second'), { code: 'Enter' })
    expect(onChange).toHaveBeenCalledTimes(2)
    onChange.mockReset()

    fireEvent.keyDown(screen.getByText('Disabled'), { code: 'Enter' })
    expect(onChange).not.toHaveBeenCalled()
    fireEvent.keyDown(screen.getByText('No value'), { code: 'Enter' })
    expect(onChange).not.toHaveBeenCalled()
    expect(onFirstTabClick).toHaveBeenCalledTimes(0)
  })

  test('updates tab on click', () => {
    const onChange = vi.fn()
    const onFirstTabClick = vi.fn()
    renderWithTheme(
      <Tabs onChange={onChange}>
        <Tabs.Tab value="first" onClick={onFirstTabClick}>
          First
        </Tabs.Tab>
        <Tabs.Tab value="second">Second</Tabs.Tab>
        <Tabs.Tab>No value</Tabs.Tab>
        <Tabs.Tab value={3} disabled>
          Disabled
        </Tabs.Tab>
        <Tabs.Tab value={4} subtitle="subtitle" disabled>
          Disabled with Subtitle
        </Tabs.Tab>
        <Tabs.Menu disclosure="More" visible>
          <Tabs.MenuItem value={1}>Item</Tabs.MenuItem>
          <Tabs.MenuItem>Item no value</Tabs.MenuItem>
        </Tabs.Menu>
      </Tabs>,
    )
    fireEvent.click(screen.getByText('First'))
    expect(onChange).toHaveBeenLastCalledWith('first')
    fireEvent.click(screen.getByText('Second'))
    expect(onChange).toHaveBeenLastCalledWith('second')
    fireEvent.click(screen.getByText('Item'))
    expect(onChange).toHaveBeenLastCalledWith(1)
    onChange.mockReset()
    fireEvent.click(screen.getByText('Item no value'))
    fireEvent.click(screen.getByText('Disabled'))
    fireEvent.click(screen.getByText('No value'))
    expect(onChange).not.toHaveBeenCalled()
    expect(onFirstTabClick).toHaveBeenCalledTimes(1)
  })

  test('no onChange', () => {
    const onClick = vi.fn()
    const { unmount } = renderWithTheme(
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
    fireEvent.click(screen.getByText('First'))
    fireEvent.click(screen.getByText('Second'))
    fireEvent.click(screen.getByText('No value'))
    fireEvent.click(screen.getByText('Disabled'))
    fireEvent.click(screen.getByText('Item'))
    fireEvent.click(screen.getByText('Item no value'))
    expect(onClick).toHaveBeenCalledTimes(5)
    unmount()
  })
})
