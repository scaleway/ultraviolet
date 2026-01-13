import { fireEvent, screen } from '@testing-library/react'
import { consoleLightTheme } from '@ultraviolet/themes'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { Link } from '../../Link'
import { Tabs } from '..'

describe('tabs', () => {
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
      <Tabs onChange={() => {}} selected={0}>
        <Tabs.Tab counter={2} value={0}>
          First
        </Tabs.Tab>
        <Tabs.Tab value={1}>Second</Tabs.Tab>
        <Tabs.Tab value={undefined}>Undefined</Tabs.Tab>
        <Tabs.Tab counter={12}>Counter</Tabs.Tab>
        <Tabs.Tab counter={0} value={2}>
          Counter no items
        </Tabs.Tab>
        <Tabs.Tab badge="Badge" counter={12}>
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
        <Tabs.Menu disclosure="Blabla" id="test" visible>
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
      <Tabs onChange={() => {}} selected={4}>
        <Tabs.Tab value={0}>First</Tabs.Tab>
        <Tabs.Tab value={1}>Second</Tabs.Tab>
        <Tabs.Tab value={2}>Very long tab name</Tabs.Tab>
        <Tabs.Menu disclosure="More" id="test" visible>
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
    shouldMatchSnapshot(
      <Tabs onChange={() => {}} selected={2}>
        <Tabs.Tab value={0}>First</Tabs.Tab>
        <Tabs.Tab value={1}>Second</Tabs.Tab>
        <Tabs.Tab disabled value={2}>
          Very long tab name
        </Tabs.Tab>
      </Tabs>,
    )
  })

  test('renders correctly with Tabs name', () => {
    shouldMatchSnapshot(
      <Tabs onChange={() => {}} selected="second">
        <Tabs.Tab value="first">First</Tabs.Tab>
        <Tabs.Tab value="second">Second</Tabs.Tab>
        <Tabs.Tab disabled value="three">
          Very long tab name
        </Tabs.Tab>
      </Tabs>,
    )
  })

  test('renders correctly with custom Tabs component', () => {
    shouldMatchSnapshot(
      <Tabs onChange={() => {}}>
        <Tabs.Tab as="div">First</Tabs.Tab>
        <Tabs.Tab as="a">Second</Tabs.Tab>
        <Tabs.Tab as={Link} disabled href="#">
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
        <Tabs.Tab onClick={onFirstTabClick} value={1}>
          First
        </Tabs.Tab>
        <Tabs.Tab value={2}>Second</Tabs.Tab>
        <Tabs.Tab disabled value={3}>
          Disabled
        </Tabs.Tab>
        <Tabs.Tab>No value</Tabs.Tab>
      </Tabs>,
    )
    fireEvent.keyDown(screen.getByText('First'), { code: 'Enter' })
    expect(onChange).toHaveBeenCalledOnce()
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
        <Tabs.Tab onClick={onFirstTabClick} value="first">
          First
        </Tabs.Tab>
        <Tabs.Tab value="second">Second</Tabs.Tab>
        <Tabs.Tab>No value</Tabs.Tab>
        <Tabs.Tab disabled value={3}>
          Disabled
        </Tabs.Tab>
        <Tabs.Tab disabled subtitle="subtitle" value={4}>
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
    expect(onFirstTabClick).toHaveBeenCalledOnce()
  })

  test('no onChange', () => {
    const onClick = vi.fn()
    const { unmount } = renderWithTheme(
      <Tabs onChange={() => {}}>
        <Tabs.Tab onClick={onClick} value="first">
          First
        </Tabs.Tab>
        <Tabs.Tab onClick={onClick} value="second">
          Second
        </Tabs.Tab>
        <Tabs.Tab onClick={onClick}>No value</Tabs.Tab>
        <Tabs.Tab disabled onClick={onClick} value={3}>
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
