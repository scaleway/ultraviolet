import { ThemeProvider } from '@emotion/react'
import { userEvent } from '@storybook/testing-library'
import { render, screen } from '@testing-library/react'
import type { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'
import { useState } from 'react'
import { TableV2 } from '..'
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

const columns: NonNullable<ComponentProps<typeof TableV2>['columns']> =
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

describe('TableV2', () => {
  test('Should throw an error', () => {
    const consoleErrMock = jest.spyOn(console, 'error').mockImplementation()
    expect(() => {
      renderWithTheme(
        data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <TableV2.Row key={id} id={id}>
            <TableV2.Cell>{columnA}</TableV2.Cell>
            <TableV2.Cell>{columnB}</TableV2.Cell>
            <TableV2.Cell>{columnC}</TableV2.Cell>
            <TableV2.Cell>{columnD}</TableV2.Cell>
            <TableV2.Cell>{columnE}</TableV2.Cell>
          </TableV2.Row>
        )),
      )
    }).toThrow()
    expect(consoleErrMock).toHaveBeenCalled()
    consoleErrMock.mockRestore()
  })

  test('Should render correctly', () =>
    shouldMatchEmotionSnapshot(
      <TableV2 columns={columns}>
        <TableV2.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <TableV2.Row key={id} id={id}>
              <TableV2.Cell>{columnA}</TableV2.Cell>
              <TableV2.Cell>{columnB}</TableV2.Cell>
              <TableV2.Cell>{columnC}</TableV2.Cell>
              <TableV2.Cell>{columnD}</TableV2.Cell>
              <TableV2.Cell>{columnE}</TableV2.Cell>
            </TableV2.Row>
          ))}
        </TableV2.Body>
      </TableV2>,
    ))

  test('Should render correctly with isLoading', () =>
    shouldMatchEmotionSnapshot(
      <TableV2 columns={columns} isLoading>
        <TableV2.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <TableV2.Row key={id} id={id}>
              <TableV2.Cell>{columnA}</TableV2.Cell>
              <TableV2.Cell>{columnB}</TableV2.Cell>
              <TableV2.Cell>{columnC}</TableV2.Cell>
              <TableV2.Cell>{columnD}</TableV2.Cell>
              <TableV2.Cell>{columnE}</TableV2.Cell>
            </TableV2.Row>
          ))}
        </TableV2.Body>
      </TableV2>,
    ))

  test('Should render correctly with areRowSelectable then click on first row then uncheck all, then check all', () =>
    shouldMatchEmotionSnapshot(
      <TableV2 columns={columns} areRowSelectable>
        <TableV2.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <TableV2.Row key={id} id={id}>
              <TableV2.Cell>{columnA}</TableV2.Cell>
              <TableV2.Cell>{columnB}</TableV2.Cell>
              <TableV2.Cell>{columnC}</TableV2.Cell>
              <TableV2.Cell>{columnD}</TableV2.Cell>
              <TableV2.Cell>{columnE}</TableV2.Cell>
              <TableV2.SelectBar data={data} idKey="id">
                {({ selectedItems }) => <div>{selectedItems.length} items</div>}
              </TableV2.SelectBar>
            </TableV2.Row>
          ))}
        </TableV2.Body>
      </TableV2>,
      {
        transform: () => {
          const checkboxes = screen.getAllByRole<HTMLInputElement>('checkbox')

          const firstRowCheckbox = checkboxes.find(({ value }) => value === '1')
          const allCheckbox = checkboxes.find(({ value }) => value === 'all')
          expect(firstRowCheckbox).toBeInTheDocument()
          expect(allCheckbox).toBeInTheDocument()
          if (!firstRowCheckbox) {
            fail('First checkbox is not defined')
          }
          if (!allCheckbox) {
            fail('Select all checkbox is not defined')
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
          <TableV2
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
            <TableV2.Body>
              {data.map(
                ({ id, columnA, columnB, columnC, columnD, columnE }) => (
                  <TableV2.Row key={id} id={id}>
                    <TableV2.Cell>{columnA}</TableV2.Cell>
                    <TableV2.Cell>{columnB}</TableV2.Cell>
                    <TableV2.Cell>{columnC}</TableV2.Cell>
                    <TableV2.Cell>{columnD}</TableV2.Cell>
                    <TableV2.Cell>{columnE}</TableV2.Cell>
                  </TableV2.Row>
                ),
              )}
            </TableV2.Body>
          </TableV2>
        )}
      </LocalControlValue>,
      {
        transform: () => {
          const listHeaderCells = screen.queryAllByRole<HTMLTableCellElement>(
            'button',
            {
              queryFallbacks: true,
            },
          )
          expect(listHeaderCells).toHaveLength(columns.length)

          expect(listHeaderCells[0].getAttribute('aria-sort')).toBe(null)
          userEvent.click(listHeaderCells[0])
          expect(listHeaderCells[0].getAttribute('aria-sort')).toBe('ascending')
          userEvent.click(listHeaderCells[0])
          expect(listHeaderCells[0].getAttribute('aria-sort')).toBe(
            'descending',
          )
          userEvent.click(listHeaderCells[0])
          userEvent.click(listHeaderCells[1])
          expect(listHeaderCells[0].getAttribute('aria-sort')).toBe(null)
          expect(listHeaderCells[1].getAttribute('aria-sort')).toBe('ascending')
        },
      },
    )
  })

  test('Should render correctly with bad sort value', () =>
    shouldMatchEmotionSnapshot(
      <TableV2
        // @ts-expect-error Wrong value used
        columns={columns.map(column => ({
          ...column,
          orderDirection: 'badValue',
        }))}
      >
        <TableV2.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <TableV2.Row key={id} id={id}>
              <TableV2.Cell>{columnA}</TableV2.Cell>
              <TableV2.Cell>{columnB}</TableV2.Cell>
              <TableV2.Cell>{columnC}</TableV2.Cell>
              <TableV2.Cell>{columnD}</TableV2.Cell>
              <TableV2.Cell>{columnE}</TableV2.Cell>
            </TableV2.Row>
          ))}
        </TableV2.Body>
      </TableV2>,
    ))

  test('Should render correctly with isSelectable and selectedIds but then disable/enable them', () => {
    const selectedIds = ['1']
    const { rerender } = render(
      <TableV2 columns={columns} areRowSelectable>
        <TableV2.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <TableV2.Row key={id} id={id}>
              <TableV2.Cell>{columnA}</TableV2.Cell>
              <TableV2.Cell>{columnB}</TableV2.Cell>
              <TableV2.Cell>{columnC}</TableV2.Cell>
              <TableV2.Cell>{columnD}</TableV2.Cell>
              <TableV2.Cell>{columnE}</TableV2.Cell>
            </TableV2.Row>
          ))}
        </TableV2.Body>
      </TableV2>,
      {
        wrapper: Wrapper,
      },
    )
    rerender(
      <TableV2 columns={columns} areRowSelectable>
        <TableV2.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <TableV2.Row
              selectDisabled={id === selectedIds[0]}
              key={id}
              id={id}
            >
              <TableV2.Cell>{columnA}</TableV2.Cell>
              <TableV2.Cell>{columnB}</TableV2.Cell>
              <TableV2.Cell>{columnC}</TableV2.Cell>
              <TableV2.Cell>{columnD}</TableV2.Cell>
              <TableV2.Cell>{columnE}</TableV2.Cell>
            </TableV2.Row>
          ))}
        </TableV2.Body>
      </TableV2>,
    )
  })

  test('Should render correctly with selectDisabled as a string', () =>
    shouldMatchEmotionSnapshot(
      <TableV2 columns={columns}>
        <TableV2.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <TableV2.Row key={id} selectDisabled="reason" id={id}>
              <TableV2.Cell>{columnA}</TableV2.Cell>
              <TableV2.Cell>{columnB}</TableV2.Cell>
              <TableV2.Cell>{columnC}</TableV2.Cell>
              <TableV2.Cell>{columnD}</TableV2.Cell>
              <TableV2.Cell>{columnE}</TableV2.Cell>
            </TableV2.Row>
          ))}
        </TableV2.Body>
      </TableV2>,
    ))

  test('Should render correctly with stipped', () =>
    shouldMatchEmotionSnapshot(
      <TableV2 columns={columns} stripped separated>
        <TableV2.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <TableV2.Row key={id} id={id}>
              <TableV2.Cell>{columnA}</TableV2.Cell>
              <TableV2.Cell>{columnB}</TableV2.Cell>
              <TableV2.Cell>{columnC}</TableV2.Cell>
              <TableV2.Cell>{columnD}</TableV2.Cell>
              <TableV2.Cell>{columnE}</TableV2.Cell>
            </TableV2.Row>
          ))}
        </TableV2.Body>
      </TableV2>,
    ))
})
