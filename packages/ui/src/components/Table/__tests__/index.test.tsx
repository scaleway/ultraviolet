import { ThemeProvider } from '@emotion/react'
import { describe, expect, jest, test } from '@jest/globals'
import { userEvent } from '@storybook/testing-library'
import { fireEvent, render, screen } from '@testing-library/react'
import type { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'
import { useState } from 'react'
import { Table } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'
import defaultTheme from '../../../theme'

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
  id: `${rowNum}`,
  columnA: `Row ${rowNum} Column 1`,
  columnB: `Row ${rowNum} Column 2`,
  columnC: `Row ${rowNum} Column 3`,
  columnD: `Row ${rowNum} Column 4`,
  columnE: `Row ${rowNum} Column 5`,
  columnF: `Row ${rowNum} expandable content`,
}))

const columns: NonNullable<ComponentProps<typeof Table>['columns']> =
  Array.from({ length: 5 }, (_, index) => index + 1).map(columnNumber => ({
    label: `Column ${columnNumber}`,
    id: `${columnNumber}`,
    width: '100px',
    minWidth: '100px',
    maxWidth: '200px',
  }))

const Wrapper = ({ theme = defaultTheme, children }: WrapperProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

describe('Table', () => {
  test('Should throw an error', () => {
    const consoleErrMock = jest.spyOn(console, 'error').mockImplementation(() =>{})
    expect(() => {
      renderWithTheme(
        data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <Table.Row key={id} id={id}>
            <Table.Cell>{columnA}</Table.Cell>
            <Table.Cell>{columnB}</Table.Cell>
            <Table.Cell>{columnC}</Table.Cell>
            <Table.Cell>{columnD}</Table.Cell>
            <Table.Cell>{columnE}</Table.Cell>
          </Table.Row>
        )),
      )
    }).toThrow()
    expect(consoleErrMock).toHaveBeenCalled()
    consoleErrMock.mockRestore()
  })

  test('Should render correctly', () =>
    shouldMatchEmotionSnapshot(
      <Table columns={columns}>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} id={id}>
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

  test('Should render correctly with loading', () =>
    shouldMatchEmotionSnapshot(
      <Table columns={columns} loading>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} id={id}>
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

  test('Should render correctly with selectable then click on first row then uncheck all, then check all', () =>
    shouldMatchEmotionSnapshot(
      <Table columns={columns} selectable>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} id={id}>
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
      {
        transform: () => {
          const checkboxes = screen.getAllByRole<HTMLInputElement>('checkbox')

          const firstRowCheckbox = checkboxes.find(({ value }) => value === '1')
          const allCheckbox = checkboxes.find(({ value }) => value === 'all')
          expect(firstRowCheckbox).toBeInTheDocument()
          expect(allCheckbox).toBeInTheDocument()
          if (!firstRowCheckbox) {
            throw new Error('First checkbox is not defined')
          }
          if (!allCheckbox) {
            throw new Error('Select all checkbox is not defined')
          }
          userEvent.click(firstRowCheckbox)
          expect(firstRowCheckbox).toBeChecked()
          userEvent.click(firstRowCheckbox)
          expect(firstRowCheckbox).not.toBeChecked()
          userEvent.click(firstRowCheckbox)
          userEvent.click(allCheckbox)
          expect(firstRowCheckbox).not.toBeChecked()
          userEvent.click(allCheckbox)
          expect(firstRowCheckbox).toBeChecked()
        },
      },
    ))

  test('Should render correctly with sort then click', () => {
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

      return <div>{children({ value, setValue })}</div>
    }

    return shouldMatchEmotionSnapshot(
      <LocalControlValue>
        {({ value, setValue }) => (
          <Table
            columns={columns.map((column, index) => ({
              ...column,
              isOrdered: value.columnIndex === index,
              orderDirection: value.order,
              onOrder: newOrder => {
                setValue({
                  columnIndex: index,
                  order: newOrder,
                })
              },
            }))}
          >
            <Table.Body>
              {data.map(
                ({ id, columnA, columnB, columnC, columnD, columnE }) => (
                  <Table.Row key={id} id={id}>
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
      {
        transform: () => {
          const tableHeaderCells = screen.queryAllByRole<HTMLTableCellElement>(
            'button',
            {
              queryFallbacks: true,
            },
          )
          expect(tableHeaderCells).toHaveLength(columns.length)
          expect(tableHeaderCells[0].getAttribute('aria-sort')).toBe(null)
          userEvent.click(tableHeaderCells[0])
          expect(tableHeaderCells[0].getAttribute('aria-sort')).toBe(
            'ascending',
          )
          fireEvent.keyDown(tableHeaderCells[0], { key: 'Enter' })
          expect(tableHeaderCells[0].getAttribute('aria-sort')).toBe(
            'descending',
          )
          fireEvent.keyDown(tableHeaderCells[0], { key: 'Space' })
          userEvent.click(tableHeaderCells[1])
          expect(tableHeaderCells[0].getAttribute('aria-sort')).toBe(null)
          expect(tableHeaderCells[1].getAttribute('aria-sort')).toBe(
            'ascending',
          )
        },
      },
    )
  })

  test('Should render correctly with bad sort value', () =>
    shouldMatchEmotionSnapshot(
      <Table
        // @ts-expect-error Wrong value used
        columns={columns.map(column => ({
          ...column,
          orderDirection: 'badValue',
        }))}
      >
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} id={id}>
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

  test('Should render correctly with isSelectable and selectedIds but then disable/enable them', () => {
    const selectedIds = ['1']
    const { rerender } = render(
      <Table columns={columns} selectable>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} id={id}>
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
            <Table.Row selectDisabled={id === selectedIds[0]} key={id} id={id}>
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

  test('Should render correctly with selectDisabled as a string', () =>
    shouldMatchEmotionSnapshot(
      <Table columns={columns}>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} selectDisabled="reason" id={id}>
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

  test('Should render correctly with stipped', () =>
    shouldMatchEmotionSnapshot(
      <Table columns={columns} stripped bordered>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} id={id}>
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

  test('Should render correctly with info', () =>
    shouldMatchEmotionSnapshot(
      <Table
        columns={[
          { label: 'Name', info: 'This column is important' },
          ...columns.slice(1, 3),
        ]}
        stripped
        bordered
      >
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} id={id}>
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
})
