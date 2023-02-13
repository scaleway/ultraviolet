import { ThemeProvider } from '@emotion/react'
import { userEvent } from '@storybook/testing-library'
import { render } from '@testing-library/react'
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

export const data: FakeDataType[] = Array.from(
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

export const columns: NonNullable<ComponentProps<typeof List>['columns']> =
  Array.from({ length: 5 }, (_, index) => index + 1).map(columnNumber => ({
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
          <List.Row isHoverable={id !== '1'} key={id} id={id}>
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

  test('Should render correctly with onSelectedIdsChange', () =>
    shouldMatchEmotionSnapshot(
      <List columns={columns} selectedIds={[]} onSelectedIdsChange={jest.fn()}>
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

  test('Should render correctly with highlighted rows', () =>
    shouldMatchEmotionSnapshot(
      <List columns={columns}>
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row key={id} isHighlighted id={id}>
            <List.Cell>{columnA}</List.Cell>
            <List.Cell>{columnB}</List.Cell>
            <List.Cell>{columnC}</List.Cell>
            <List.Cell>{columnD}</List.Cell>
            <List.Cell>{columnE}</List.Cell>
          </List.Row>
        ))}
      </List>,
    ))

  test('Should render correctly with isExpandable rows', () =>
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

  test('Should render correctly with rows forceOpened', () =>
    shouldMatchEmotionSnapshot(
      <List columns={columns}>
        {data.map(
          ({ id, columnA, columnB, columnC, columnD, columnE, columnF }) => (
            <List.Row key={id} id={id} expandable={columnF} isExpanded>
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

  test('Should render correctly with skeleton', async () => {
    await shouldMatchEmotionSnapshot(
      <List columns={columns}>
        <List.Skeleton cols={columns.length} rows={18} />
      </List>,
    )
    await shouldMatchEmotionSnapshot(
      <List columns={columns}>
        <List.Skeleton rows={18} />
      </List>,
    )
    await shouldMatchEmotionSnapshot(
      <List columns={columns}>
        <List.Skeleton cols={columns.length} />
      </List>,
    )
  })

  test('Should render correctly with isSelectable then click on first row then uncheck all, then check all', () => {
    const LocalControlValue = ({
      children,
    }: {
      children: ({
        value,
        setValue,
      }: {
        value: string[]
        setValue: Dispatch<SetStateAction<string[]>>
      }) => ReactNode
    }) => {
      const [value, setValue] = useState<string[]>([])

      return <div>{children({ value, setValue })}</div>
    }

    return shouldMatchEmotionSnapshot(
      <LocalControlValue>
        {({ value, setValue }) => (
          <List
            columns={columns}
            selectedIds={value}
            onSelectedIdsChange={setValue}
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
    )
  })

  test('Should render correctly with sort then click', () => {
    const LocalControlValue = ({
      children,
    }: {
      children: ({
        value,
        setValue,
      }: {
        value: {
          column: string
          order: ComponentProps<typeof List>['columns'][number]['sort']
        }
        setValue: Dispatch<
          SetStateAction<{
            column: string
            order: ComponentProps<typeof List>['columns'][number]['sort']
          }>
        >
      }) => ReactNode
    }) => {
      const [value, setValue] = useState({ column: '', order: 'asc' } as {
        column: string
        order: ComponentProps<typeof List>['columns'][number]['sort']
      })

      return <div>{children({ value, setValue })}</div>
    }

    return shouldMatchEmotionSnapshot(
      <LocalControlValue>
        {({ value, setValue }) => (
          <List
            columns={columns.map(column => ({
              ...column,
              sort: value.column === column.id ? value.order : 'none',
              id: column.id,
              onClick: clickedSort => {
                setValue({
                  column: clickedSort.columnId,
                  order: clickedSort.newOrder,
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
          const listColumns = node.getAllByRole(
            'columnheader',
          ) as HTMLTableCellElement[]
          expect(listColumns).toHaveLength(columns.length)

          expect(listColumns[0].getAttribute('aria-sort')).toBe('none')
          userEvent.click(listColumns[0])
          expect(listColumns[0].getAttribute('aria-sort')).toBe('ascending')
          userEvent.click(listColumns[0])
          expect(listColumns[0].getAttribute('aria-sort')).toBe('descending')
          userEvent.click(listColumns[0])
          userEvent.click(listColumns[1])
          expect(listColumns[0].getAttribute('aria-sort')).toBe('none')
          expect(listColumns[1].getAttribute('aria-sort')).toBe('ascending')
        },
      },
    )
  })

  test('Should render correctly with isSelectable and selectedIds', () =>
    shouldMatchEmotionSnapshot(
      <List
        columns={columns}
        selectedIds={['1']}
        onSelectedIdsChange={jest.fn()}
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

  test('Should render correctly with isSelectable and selectedIds but then change theme', () => {
    const selectedIds = ['1']
    const { rerender } = render(
      <List
        columns={columns}
        selectedIds={selectedIds}
        onSelectedIdsChange={jest.fn()}
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
      {
        wrapper: Wrapper,
      },
    )
    rerender(
      <List
        columns={columns}
        selectedIds={selectedIds}
        onSelectedIdsChange={jest.fn()}
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
    )
    rerender(
      <List
        columns={columns}
        selectedIds={selectedIds}
        onSelectedIdsChange={jest.fn()}
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
    )
    rerender(
      <List
        columns={columns}
        selectedIds={selectedIds}
        onSelectedIdsChange={jest.fn()}
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
    )
  })

  test('Should use onSelectedIdsChange with isSelectable and selectedIds', () =>
    shouldMatchEmotionSnapshot(
      <List onSelectedIdsChange={jest.fn()} selectedIds={[]} columns={columns}>
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
          userEvent.click(allCheckbox)
          userEvent.click(allCheckbox)
        },
      },
    ))

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
            <List.Cell
              preventClick
              onClick={event => {
                event.preventDefault()
              }}
            >
              {columnE}
            </List.Cell>
          </List.Row>
        ))}
      </List>,
      {
        transform: node => {
          userEvent.click(
            node.getByText((data[0] as { columnE: string }).columnE),
          )
        },
      },
    ))

  test('Should render correctly with isExpandable and autoClose rows then click', () =>
    shouldMatchEmotionSnapshot(
      <List autoClose columns={columns}>
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
        idKey="id"
        data={data}
        // @ts-expect-error Wrong value used
        columns={columns.map(column => ({ ...column, sort: 'badValue' }))}
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
      <List
        columns={columns}
        onSelectedIdsChange={jest.fn()}
        selectedIds={selectedIds}
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
      {
        wrapper: Wrapper,
      },
    )
    rerender(
      <List
        columns={columns}
        onSelectedIdsChange={jest.fn()}
        selectedIds={selectedIds}
      >
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
      <List
        columns={columns}
        selectedIds={selectedIds}
        onSelectedIdsChange={jest.fn()}
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
    )
    rerender(
      <List
        columns={columns}
        onSelectedIdsChange={jest.fn()}
        selectedIds={selectedIds}
      >
        {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <List.Row checkboxDisabled={id === selectedIds[0]} key={id} id={id}>
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

  test("Should render correctly if column id isn't provided", () =>
    shouldMatchEmotionSnapshot(
      <List
        columns={columns.map(column => ({
          label: column.label,
          width: column.width,
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
})
