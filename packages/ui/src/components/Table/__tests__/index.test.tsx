import { fireEvent, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ThemeProvider } from '@ultraviolet/themes'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import type { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'
import { useState } from 'react'
import { describe, expect, test, vi } from 'vitest'
import defaultTheme from '../../../theme'
import { Table } from '..'

type WrapperProps = {
  theme?: typeof defaultTheme
  children: ReactNode
}

type FakeDataType = {
  id: string
  columnA: string
  columnB: string
  columnC: string
  columnD: string
  columnE: string
  columnF: string
}

const data: FakeDataType[] = Array.from(
  { length: 10 },
  (_, index) => index + 1,
).map(rowNum => ({
  columnA: `Row ${rowNum} Column 1`,
  columnB: `Row ${rowNum} Column 2`,
  columnC: `Row ${rowNum} Column 3`,
  columnD: `Row ${rowNum} Column 4`,
  columnE: `Row ${rowNum} Column 5`,
  columnF: `Row ${rowNum} expandable content`,
  id: `${rowNum}`,
}))

const columns: NonNullable<ComponentProps<typeof Table>['columns']> =
  Array.from({ length: 5 }, (_, index) => index + 1).map(columnNumber => ({
    id: `${columnNumber}`,
    label: `Column ${columnNumber}`,
    maxWidth: '200px',
    minWidth: '100px',
    width: '100px',
  }))

const Wrapper = ({ theme = defaultTheme, children }: WrapperProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

describe('table', () => {
  test.skip('should throw an error', () => {
    const consoleErrMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    expect(() =>
      renderWithTheme(
        data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <Table.Row id={id} key={id}>
            <Table.Cell>{columnA}</Table.Cell>
            <Table.Cell>{columnB}</Table.Cell>
            <Table.Cell>{columnC}</Table.Cell>
            <Table.Cell>{columnD}</Table.Cell>
            <Table.Cell>{columnE}</Table.Cell>
          </Table.Row>
        )),
      ),
    ).toThrow()
    expect(consoleErrMock).toHaveBeenCalled()
    consoleErrMock.mockRestore()
  })

  test('should render correctly', () =>
    shouldMatchSnapshot(
      <Table columns={columns}>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row id={id} key={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    ))

  test('should render correctly with loading', () =>
    shouldMatchSnapshot(
      <Table columns={columns} loading>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row id={id} key={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    ))

  test('should render correctly with selectable then click on first row then uncheck all, then check all', async () => {
    const { asFragment } = renderWithTheme(
      <Table columns={columns} selectable>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row id={id} key={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
              <Table.SelectBar data={data} idKey="id">
                {({ selectedItems }) => <div>{selectedItems.length} items</div>}
              </Table.SelectBar>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    )
    const checkboxes = screen.getAllByRole<HTMLInputElement>('checkbox')

    const firstRowCheckbox = checkboxes.find(({ value }) => value === '1')
    const secondRowCheckbox = checkboxes.find(({ value }) => value === '2')
    const allCheckbox = checkboxes.find(({ value }) => value === 'all')
    expect(firstRowCheckbox).toBeInTheDocument()
    expect(allCheckbox).toBeInTheDocument()
    if (!firstRowCheckbox) {
      throw new Error('First checkbox is not defined')
    }
    if (!allCheckbox) {
      throw new Error('Select all checkbox is not defined')
    }
    await userEvent.click(firstRowCheckbox)
    expect(firstRowCheckbox).toBeChecked()
    await userEvent.click(firstRowCheckbox)
    expect(firstRowCheckbox).not.toBeChecked()
    await userEvent.click(firstRowCheckbox)
    //  mixed | indeterminated state
    await userEvent.click(allCheckbox)
    expect(firstRowCheckbox).not.toBeChecked()
    expect(allCheckbox).not.toBeChecked()
    await userEvent.click(allCheckbox)
    expect(firstRowCheckbox).toBeChecked()
    expect(secondRowCheckbox).toBeChecked()
    expect(allCheckbox).toBeChecked()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with sort then click', async () => {
    const LocalControlValue = ({
      children,
    }: {
      children: ({
        value,
        setValue,
      }: {
        value: {
          columnIndex?: number
          order?: 'asc' | 'desc'
        }
        setValue: Dispatch<
          SetStateAction<{
            columnIndex?: number
            order?: 'asc' | 'desc'
          }>
        >
      }) => ReactNode
    }) => {
      const [value, setValue] = useState(
        {} as {
          columnIndex?: number
          order?: 'asc' | 'desc'
        },
      )

      return <div>{children({ setValue, value })}</div>
    }

    const { asFragment } = renderWithTheme(
      <LocalControlValue>
        {({ value, setValue }) => (
          <Table
            columns={columns.map((column, index) => ({
              ...column,
              isOrdered: value.columnIndex === index,
              onOrder: newOrder => {
                setValue({
                  columnIndex: index,
                  order: newOrder,
                })
              },
              orderDirection: value.order,
            }))}
          >
            <Table.Body>
              {data.map(
                ({ id, columnA, columnB, columnC, columnD, columnE }) => (
                  <Table.Row id={id} key={id}>
                    <Table.Cell>{columnA}</Table.Cell>
                    <Table.Cell>{columnB}</Table.Cell>
                    <Table.Cell>{columnC}</Table.Cell>
                    <Table.Cell>{columnD}</Table.Cell>
                    <Table.Cell>{columnE}</Table.Cell>
                  </Table.Row>
                ),
              )}
            </Table.Body>
          </Table>
        )}
      </LocalControlValue>,
    )
    const tableHeaderCells = screen.queryAllByRole<HTMLTableCellElement>(
      'button',
      {
        queryFallbacks: true,
      },
    )
    expect(tableHeaderCells).toHaveLength(columns.length)
    if (tableHeaderCells[0] && tableHeaderCells[1]) {
      expect(tableHeaderCells[0]?.getAttribute('aria-sort')).toBe(null)
      await userEvent.click(tableHeaderCells[0])
      expect(tableHeaderCells[0]?.getAttribute('aria-sort')).toBe('ascending')
      if (tableHeaderCells[0]) {
        fireEvent.keyDown(tableHeaderCells[0], { key: 'Enter' })
      }
      expect(tableHeaderCells[0]?.getAttribute('aria-sort')).toBe('descending')
      fireEvent.keyDown(tableHeaderCells[0], { key: 'Space' })
      await userEvent.click(tableHeaderCells[1])
      expect(tableHeaderCells[0]?.getAttribute('aria-sort')).toBe(null)
      expect(tableHeaderCells[1]?.getAttribute('aria-sort')).toBe('ascending')
      expect(asFragment()).toMatchSnapshot()
    }
  })

  test('should render correctly with bad sort value', () => {
    const { asFragment } = renderWithTheme(
      <Table
        // @ts-expect-error Wrong value used
        columns={columns.map(column => ({
          ...column,
          orderDirection: 'badValue',
        }))}
      >
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row id={id} key={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with isSelectable and selectedIds but then disable/enable them', () => {
    const selectedIds = ['1']
    const { rerender } = render(
      <Table columns={columns} selectable>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row id={id} key={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
      {
        wrapper: Wrapper,
      },
    )
    rerender(
      <Table columns={columns} selectable>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row id={id} key={id} selectDisabled={id === selectedIds[0]}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    )
  })

  test('should render correctly with selectDisabled as a string', () =>
    shouldMatchSnapshot(
      <Table columns={columns}>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row id={id} key={id} selectDisabled="reason">
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    ))

  test('should render correctly with stipped', () =>
    shouldMatchSnapshot(
      <Table bordered columns={columns} stripped>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row id={id} key={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    ))

  test('should render correctly with info', () =>
    shouldMatchSnapshot(
      <Table
        bordered
        columns={[
          { info: 'This column is important', label: 'Name' },
          ...columns.slice(1, 3),
        ]}
        stripped
      >
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row id={id} key={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    ))

  test('should render correctly with highlight animation on Table.Row', () =>
    shouldMatchSnapshot(
      <Table
        columns={[
          { info: 'This column is important', label: 'Name' },
          ...columns.slice(1, 3),
        ]}
      >
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row highlightAnimation id={id} key={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    ))

  test('should render correctly with selectable and shift click', async () => {
    const { asFragment } = renderWithTheme(
      <Table columns={columns} selectable>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row id={id} key={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
              <Table.SelectBar data={data} idKey="id">
                {({ selectedItems }) => <div>{selectedItems.length} items</div>}
              </Table.SelectBar>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    )
    const checkboxes = screen.getAllByRole<HTMLInputElement>('checkbox')

    const firstRowCheckbox = checkboxes.find(({ value }) => value === '1')
    const secondRowCheckbox = checkboxes.find(({ value }) => value === '2')
    const thirdRowCheckbox = checkboxes.find(({ value }) => value === '3')

    expect(firstRowCheckbox).toBeInTheDocument()
    if (!firstRowCheckbox) {
      throw new Error('First checkbox is not defined')
    }
    if (!secondRowCheckbox) {
      throw new Error('Second checkbox is not defined')
    }

    if (!thirdRowCheckbox) {
      throw new Error('Third checkbox is not defined')
    }

    await userEvent.click(firstRowCheckbox)

    fireEvent.click(thirdRowCheckbox, { shiftKey: true })
    expect(thirdRowCheckbox).toBeChecked()

    expect(asFragment()).toMatchSnapshot()
  })
})
