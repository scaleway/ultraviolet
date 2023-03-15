import { ThemeProvider } from '@emotion/react'
import { userEvent } from '@storybook/testing-library'
import { fireEvent, render } from '@testing-library/react'
import type { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'
import { useState } from 'react'
import { List } from '..'
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

const columns: NonNullable<ComponentProps<typeof List>['columns']> = Array.from(
  { length: 5 },
  (_, index) => index + 1,
).map(columnNumber => ({
  label: `Column ${columnNumber}`,
  id: `${columnNumber}`,
}))

const Wrapper = ({ theme = defaultTheme, children }: WrapperProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

describe('ListV2', () => {
  test('Should throw an error', () => {
    const consoleErrMock = jest.spyOn(console, 'error').mockImplementation()
    expect(() => {
      renderWithTheme(
        data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        )),
      )
    }).toThrow()
    expect(consoleErrMock).toHaveBeenCalled()
    consoleErrMock.mockRestore()
  })

  test('Should render correctly', () =>
    shouldMatchEmotionSnapshot(
      <List columns={columns}>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
    ))

  test('Should render correctly with sort', () =>
    shouldMatchEmotionSnapshot(
      <List columns={columns.map(column => ({ ...column, sort: 'none' }))}>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
    ))

  test('Should render correctly with areRowSelectable', () =>
    shouldMatchEmotionSnapshot(
      <List columns={columns} areRowSelectable>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
    ))

  test('Should render correctly with isLoading', () =>
    shouldMatchEmotionSnapshot(
      <List columns={columns} isLoading>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
    ))

  test('Should render correctly with isLoading with areRowSelectable', () =>
    shouldMatchEmotionSnapshot(
      <List columns={columns} isLoading areRowSelectable>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
    ))

  test('Should render correctly with disabled rows', () =>
    shouldMatchEmotionSnapshot(
      <List columns={columns}>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} isDisabled id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
    ))

  test('Should render correctly with expandable rows', () =>
    shouldMatchEmotionSnapshot(
      <List columns={columns}>
        {data.map(
          ({ id, columnA, columnB, columnC, columnD, columnE, columnF }) => (
            <List.Row key={id} id={id} expandable={columnF}>
              <List.Cell>{columnA}</List.Cell>
              <List.Cell>{columnB}</List.Cell>
              <List.Cell>{columnC}</List.Cell>
              <List.Cell>{columnD}</List.Cell>
              <List.Cell>{columnE}</List.Cell>
            </List.Row>
          ),
        )}
      </List>,
    ))

  test('Should render correctly with areRowSelectable then click on first row then uncheck all, then check all', () =>
    shouldMatchEmotionSnapshot(
      <List columns={columns} areRowSelectable>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
            <List.SelectBar data={data} idKey="id">
              {({ selectedItems }) => <div>{selectedItems.length} items</div>}
            </List.SelectBar>
          </List.Row>
        ))}
      </List>,
      {
        transform: node => {
          const checkboxes = node.getAllByRole('checkbox') as HTMLInputElement[]

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
          <List
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
            {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
              <List.Row key={id} id={id}>
                <List.Cell>{columnA}</List.Cell>
                <List.Cell>{columnB}</List.Cell>
                <List.Cell>{columnC}</List.Cell>
                <List.Cell>{columnD}</List.Cell>
                <List.Cell>{columnE}</List.Cell>
              </List.Row>
            ))}
          </List>
        )}
      </LocalControlValue>,
      {
        transform: node => {
          const listHeaderCells = node.queryAllByRole('button', {
            queryFallbacks: true,
          }) as HTMLTableCellElement[]
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

  test('Should render correctly with areRowSelectable but then change theme', () => {
    const { rerender } = render(
      <List columns={columns} areRowSelectable>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
      {
        wrapper: Wrapper,
      },
    )
    rerender(
      <List columns={columns} areRowSelectable>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
    )
    rerender(
      <List columns={columns} areRowSelectable>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
    )
    rerender(
      <List columns={columns} areRowSelectable>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
    )
  })

  test('Should render correctly with isExpandable rows then click', () =>
    shouldMatchEmotionSnapshot(
      <List columns={columns}>
        {data.map(
          ({ id, columnA, columnB, columnC, columnD, columnE, columnF }) => (
            <List.Row key={id} id={id} expandable={columnF}>
              <List.Cell>{columnA}</List.Cell>
              <List.Cell>{columnB}</List.Cell>
              <List.Cell>{columnC}</List.Cell>
              <List.Cell>{columnD}</List.Cell>
              <List.Cell>{columnE}</List.Cell>
            </List.Row>
          ),
        )}
      </List>,
      {
        transform: node => {
          userEvent.click(node.getAllByRole('button')[0])
          userEvent.click(node.getAllByRole('button')[0])
        },
      },
    ))

  test('Should render correctly with preventClick cell then click but event is prevented', () =>
    shouldMatchEmotionSnapshot(
      <List columns={columns}>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell preventClick>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
      {
        transform: node => {
          const cell = node.getByText(data[0].columnE)
          userEvent.click(cell)
        },
      },
    ))

  test('Should render correctly with isExpandable and autoClose rows then click', () =>
    shouldMatchEmotionSnapshot(
      <List autoCollapse columns={columns}>
        {data.map(
          ({ id, columnA, columnB, columnC, columnD, columnE, columnF }) => (
            <List.Row key={id} id={id} expandable={columnF}>
              <List.Cell>{columnA}</List.Cell>
              <List.Cell>{columnB}</List.Cell>
              <List.Cell>{columnC}</List.Cell>
              <List.Cell>{columnD}</List.Cell>
              <List.Cell>{columnE}</List.Cell>
            </List.Row>
          ),
        )}
      </List>,
      {
        transform: node => {
          userEvent.click(node.getAllByRole('button')[0])
          userEvent.click(node.getAllByRole('button')[0])
          userEvent.click(node.getAllByRole('button')[0])
          userEvent.click(node.getAllByRole('button')[1])
        },
      },
    ))

  test('Should render correctly with bad sort value', () =>
    shouldMatchEmotionSnapshot(
      <List
        // @ts-expect-error Wrong value used
        columns={columns.map(column => ({
          ...column,
          orderDirection: 'badValue',
        }))}
      >
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
    ))

  test('Should render correctly with isSelectable and selectedIds but then disable/enable them', () => {
    const selectedIds = ['1']
    const { rerender } = render(
      <List columns={columns} areRowSelectable>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
      {
        wrapper: Wrapper,
      },
    )
    rerender(
      <List columns={columns} areRowSelectable>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row isDisabled={id === selectedIds[0]} key={id} id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
    )
    rerender(
      <List columns={columns} areRowSelectable>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
    )
    rerender(
      <List columns={columns} areRowSelectable>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row isSelectDisabled={id === selectedIds[0]} key={id} id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
    )
  })

  test('Should unregister expandable row if unmount', () => {
    const { rerender } = render(
      <List columns={columns}>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} id={id} expandable="test">
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
      {
        wrapper: Wrapper,
      },
    )
    rerender(
      <List columns={columns} areRowSelectable>
        {data
          .filter((_, index) => index !== 0)
          .map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <List.Row key={id} id={id} expandable="test">
              <List.Cell>{columnA}</List.Cell>
              <List.Cell>{columnB}</List.Cell>
              <List.Cell>{columnC}</List.Cell>
              <List.Cell>{columnD}</List.Cell>
              <List.Cell>{columnE}</List.Cell>
            </List.Row>
          ))}
      </List>,
    )
  })

  test('Should expand a row by pressing Space', () =>
    shouldMatchEmotionSnapshot(
      <List autoCollapse columns={columns}>
        {data.map(
          ({ id, columnA, columnB, columnC, columnD, columnE, columnF }) => (
            <List.Row key={id} id={id} expandable={columnF}>
              <List.Cell>{columnA}</List.Cell>
              <List.Cell>{columnB}</List.Cell>
              <List.Cell>{columnC}</List.Cell>
              <List.Cell>{columnD}</List.Cell>
              <List.Cell>{columnE}</List.Cell>
            </List.Row>
          ),
        )}
      </List>,
      {
        transform: node => {
          const rows = node.getAllByRole('button')
          const firstRow = rows[0]
          expect(firstRow).toHaveAttribute('tabIndex', '0')
          // Testing expanding by pressing space key
          expect(firstRow).toHaveAttribute('aria-expanded', 'false')
          fireEvent.keyDown(firstRow, { charCode: 32, code: 'Space', key: ' ' })
          expect(firstRow).toHaveAttribute('aria-expanded', 'true')
          // Testing collapsing by pressing space key
          fireEvent.keyDown(firstRow, { charCode: 32, code: 'Space', key: ' ' })
          expect(firstRow).toHaveAttribute('aria-expanded', 'false')
          // Testing another key
          fireEvent.keyDown(firstRow, { charCode: 65, code: 'KeyA', key: 'a' })
          expect(firstRow).toHaveAttribute('aria-expanded', 'false')
        },
      },
    ))
})
