import { act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, useEffect } from 'react'
import List, { ListRefType } from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import { generateData } from '../../../mocks/list'
import { getUUID } from '../../../utils'

type ListRowData = {
  id: string
  name: string
  description: string
  department: string
  reference: string
}

describe('List', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshot(
      <List
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))
  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshot(
      <List
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id} disabled={rowData.reference === 1}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))
  test('should render correctly variant table', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="table"
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                    <list.ExpendableContent>actions</list.ExpendableContent>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))
  test('should render correctly variant explorer', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="explorer"
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))
  test('should render correctly multiselect', () =>
    shouldMatchEmotionSnapshot(
      <List
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
        multiselect
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))
  test('should render correctly multiselect table', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        variant="table"
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))
  test('should render correctly multiselect explorer', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="explorer"
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))
  test('should render correctly multiselect with condition', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        selectable={data => data.filter(({ name }) => name.includes('1'))}
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly multiselect with condition, table variant', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="table"
        multiselect
        selectable={data => data.filter(({ name }) => name.includes('1'))}
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly multiselect and with click', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name' },
          { label: 'Description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
            <list.SelectBar>{() => <>Test SelectBar</>}</list.SelectBar>
          </>
        )}
      </List>,
      {
        transform: async node => {
          expect(node.getByTestId('row-0')).toBeInTheDocument()
          const checkboxes = node.getAllByRole('checkbox', {
            hidden: true,
          }) as HTMLInputElement[]
          expect(checkboxes[0].name).toBe('select-rows')
          expect(checkboxes[0].value).toBe('all')
          await userEvent.click(checkboxes[0])
          expect(node.getByText('items selected'))
          await userEvent.click(checkboxes[0])

          expect(checkboxes[1].name).toBe('select-rows')
          expect(checkboxes[1].value).toBe('0')
          await userEvent.click(checkboxes[1])

          expect(node.getByText('item selected'))

          await userEvent.click(checkboxes[2])
          expect(node.getByText('items selected'))
        },
      },
    ))

  test('should render correctly multiselect and click indeterminate', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name' },
          { label: 'Description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
            <list.SelectBar>{() => <>Test SelectBar</>}</list.SelectBar>
          </>
        )}
      </List>,
      {
        transform: async node => {
          expect(node.getByTestId('row-0')).toBeInTheDocument()
          const checkboxes = node.getAllByRole('checkbox', {
            hidden: true,
          }) as HTMLInputElement[]
          expect(checkboxes[0].name).toBe('select-rows')
          expect(checkboxes[0].value).toBe('all')
          await userEvent.click(checkboxes[1])
          await userEvent.click(checkboxes[2])
          expect(node.getByText('items selected'))
          await userEvent.click(checkboxes[0])
        },
      },
    ))

  test('should render correctly multiselect and with click and not functional SelectBar children', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name' },
          { label: 'Description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
            <list.SelectBar>Test SelectBar</list.SelectBar>
          </>
        )}
      </List>,
      {
        transform: async node => {
          expect(node.getByTestId('row-0')).toBeInTheDocument()
          const checkboxes = node.getAllByRole('checkbox', {
            hidden: true,
          }) as HTMLInputElement[]
          expect(checkboxes[0].name).toBe('select-rows')
          expect(checkboxes[0].value).toBe('all')
          await userEvent.click(checkboxes[0])
          await userEvent.click(checkboxes[0])
          expect(checkboxes[1].name).toBe('select-rows')
          expect(checkboxes[1].value).toBe('0')
          await userEvent.click(checkboxes[1])
          expect(node.getByText('item selected'))
          await userEvent.click(checkboxes[2])
          expect(node.getByText('items selected'))
        },
      },
    ))

  test('should render correctly multiselect and with sort click', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
      {
        transform: async node => {
          const nameHeader = node.getByRole('button', {
            name: 'sort Name',
          })

          const iconContainer = node.getAllByTitle('ascending')[0]
            .parentElement as HTMLDivElement
          expect(iconContainer.getAttribute('aria-sort')).toBe('none')
          await userEvent.click(nameHeader)
          expect(iconContainer.getAttribute('aria-sort')).toBe('ascending')
          await userEvent.click(nameHeader)
          expect(iconContainer.getAttribute('aria-sort')).toBe('descending')
          await userEvent.type(nameHeader, '{enter}')
          await userEvent.type(nameHeader, '{enter}')

          const departmentHeader = node.getByRole('button', {
            name: 'sort Department',
          })
          await userEvent.click(departmentHeader)

          const referenceHeader = node.getByRole('button', {
            name: 'sort Reference',
          })
          await userEvent.click(referenceHeader)

          const lastHeader = node.getByRole('button', {
            name: 'sort 4',
          })
          await userEvent.click(lastHeader)
          await userEvent.type(lastHeader, '{space}')
        },
      },
    ))

  test('should render correctly multiselect and with custom sort click', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: item => (item as ListRowData).name },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
      {
        transform: async node => {
          const nameHeader = node.getByRole('button', {
            name: 'sort Name',
          })
          await userEvent.click(nameHeader)
          await userEvent.click(nameHeader)
        },
      },
    ))

  test('should render correctly multiselect and click indeterminate, table variant', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="table"
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name' },
          { label: 'Description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
            <list.SelectBar>{() => <>Test SelectBar</>}</list.SelectBar>
          </>
        )}
      </List>,
      {
        transform: async node => {
          expect(node.getByTestId('row-0')).toBeInTheDocument()
          const checkboxes = node.getAllByRole('checkbox', {
            hidden: true,
          }) as HTMLInputElement[]
          expect(checkboxes[0].name).toBe('select-rows')
          expect(checkboxes[0].value).toBe('all')
          await userEvent.click(checkboxes[1])
          await userEvent.click(checkboxes[2])
          expect(node.getByText('items selected'))
          await userEvent.click(checkboxes[0])
        },
      },
    ))

  test('should render correctly multiselect, table variant and with sort click', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="table"
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
      {
        transform: async node => {
          const nameHeader = node.getByRole('button', {
            name: 'sort Name',
          })

          const iconContainer = node.getAllByTitle('ascending')[0]
            .parentElement as HTMLDivElement
          expect(iconContainer.getAttribute('aria-sort')).toBe('none')
          await userEvent.click(nameHeader)
          expect(iconContainer.getAttribute('aria-sort')).toBe('ascending')
          await userEvent.click(nameHeader)
          expect(iconContainer.getAttribute('aria-sort')).toBe('descending')
          await userEvent.type(nameHeader, '{enter}')
          await userEvent.type(nameHeader, '{enter}')

          const departmentHeader = node.getByRole('button', {
            name: 'sort Department',
          })
          await userEvent.click(departmentHeader)

          const referenceHeader = node.getByRole('button', {
            name: 'sort Reference',
          })
          await userEvent.click(referenceHeader)

          const lastHeader = node.getByRole('button', {
            name: 'sort 4',
          })
          await userEvent.click(lastHeader)
          await userEvent.type(lastHeader, '{enter}')
        },
      },
    ))
  test('should render correctly multiselect, table variant and with click', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="table"
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name' },
          { label: 'Description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
            <list.SelectBar>{() => <>Test SelectBar</>}</list.SelectBar>
          </>
        )}
      </List>,
      {
        transform: async node => {
          expect(node.getByTestId('row-0')).toBeInTheDocument()
          const checkboxes = node.getAllByRole('checkbox', {
            hidden: true,
          }) as HTMLInputElement[]
          expect(checkboxes[0].name).toBe('select-rows')
          expect(checkboxes[0].value).toBe('all')
          await userEvent.click(checkboxes[0])
          await userEvent.click(checkboxes[0])
          expect(checkboxes[1].name).toBe('select-rows')
          expect(checkboxes[1].value).toBe('0')
          await userEvent.click(checkboxes[1])
          expect(node.getByText('item selected'))
          await userEvent.click(checkboxes[2])
          expect(node.getByText('items selected'))
        },
      },
    ))

  test('should render correctly multiselect and click indeterminate, explorer variant', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="explorer"
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name' },
          { label: 'Description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
            <list.SelectBar>{() => <>Test SelectBar</>}</list.SelectBar>
          </>
        )}
      </List>,
      {
        transform: async node => {
          expect(node.getByTestId('row-0')).toBeInTheDocument()
          const checkboxes = node.getAllByRole('checkbox', {
            hidden: true,
          }) as HTMLInputElement[]
          expect(checkboxes[0].name).toBe('select-rows')
          expect(checkboxes[0].value).toBe('all')
          await userEvent.click(checkboxes[1])
          await userEvent.click(checkboxes[2])
          expect(node.getByText('items selected'))
          await userEvent.click(checkboxes[0])
        },
      },
    ))

  test('should render correctly multiselect, explorer variant and with click', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="explorer"
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name' },
          { label: 'Description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
            <list.SelectBar>{() => <>Test SelectBar</>}</list.SelectBar>
          </>
        )}
      </List>,
      {
        transform: async node => {
          expect(node.getByTestId('row-0')).toBeInTheDocument()
          const checkboxes = node.getAllByRole('checkbox', {
            hidden: true,
          }) as HTMLInputElement[]
          expect(checkboxes[0].name).toBe('select-rows')
          expect(checkboxes[0].value).toBe('all')
          await userEvent.click(checkboxes[0])
          await userEvent.click(checkboxes[0])
          expect(checkboxes[1].name).toBe('select-rows')
          expect(checkboxes[1].value).toBe('0')
          await userEvent.click(checkboxes[1])
          expect(node.getByText('item selected'))
          await userEvent.click(checkboxes[2])
          expect(node.getByText('items selected'))
        },
      },
    ))

  test('should render correctly multiselect, explorer variant and with sort click', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="explorer"
        multiselect
        idKey="id"
        data={[
          ...generateData(5).reverse(),
          {
            department: `Front`,
            description: `Fake message for row 6`,
            id: `6`,
            name: `Scaler 1`,
            reference: 1,
          },
        ]}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
      {
        transform: async node => {
          const nameHeader = node.getByRole('button', {
            name: 'sort Name',
          })

          const iconContainer = node.getAllByTitle('ascending')[0]
            .parentElement as HTMLDivElement
          expect(iconContainer.getAttribute('aria-sort')).toBe('none')
          await userEvent.click(nameHeader)
          expect(iconContainer.getAttribute('aria-sort')).toBe('ascending')
          await userEvent.click(nameHeader)
          expect(iconContainer.getAttribute('aria-sort')).toBe('descending')
          await userEvent.type(nameHeader, '{enter}')
          await userEvent.type(nameHeader, '{enter}')

          const departmentHeader = node.getByRole('button', {
            name: 'sort Department',
          })
          await userEvent.click(departmentHeader)

          const referenceHeader = node.getByRole('button', {
            name: 'sort Reference',
          })
          await userEvent.click(referenceHeader)

          const lastHeader = node.getByRole('button', {
            name: 'sort 4',
          })
          await userEvent.click(lastHeader)
          await userEvent.type(lastHeader, '{enter}')
        },
      },
    ))

  test('should render correctly with isLoading', () =>
    shouldMatchEmotionSnapshot(
      <List
        isLoading
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with ExpendableContent', () =>
    shouldMatchEmotionSnapshot(
      <List
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row
                    id={rowData.id}
                    expandableClassName="expandableClass"
                  >
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                    <list.ExpendableContent>
                      {() => <>ExpendableContent {rowData.id}</>}
                    </list.ExpendableContent>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
      {
        transform: async node => {
          const firstRow = node.getByTestId('row-0') as HTMLDetailsElement
          expect(firstRow.open).toBeFalsy()

          if (!firstRow.firstElementChild) throw new Error('No first child')

          await userEvent.click(firstRow.firstElementChild)
          expect(firstRow.open).toBeTruthy()
          await userEvent.click(firstRow.firstElementChild)
          expect(firstRow.open).toBeFalsy()
        },
      },
    ))

  test('should render correctly with autoClose and ExpendableContent', () =>
    shouldMatchEmotionSnapshot(
      <List
        autoClose
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                    <list.ExpendableContent>
                      ExpendableContent {rowData.id}
                    </list.ExpendableContent>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
      {
        transform: async node => {
          const firstRow = node.getByTestId('row-0') as HTMLDetailsElement
          const secondRow = node.getByTestId('row-1') as HTMLDetailsElement
          expect(firstRow.open).toBeFalsy()
          expect(secondRow.open).toBeFalsy()
          await act(async () => {
            await userEvent.click(firstRow.firstElementChild as Element)
          })
          expect(secondRow.open).toBeFalsy()
          expect(firstRow.open).toBeTruthy()
          await act(async () => {
            await userEvent.click(secondRow.firstElementChild as Element)
          })
          await waitFor(() => expect(firstRow.open).toBeTruthy())
          expect(secondRow.open).toBeTruthy()
        },
      },
    ))
  test('should render correctly with unusual props', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row
                    id={rowData.id}
                    alert={rowData.id === '1'}
                    locked={rowData.id === '2'}
                  >
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                    <list.ExpendableContent>
                      {() => <>ExpendableContent {rowData.id}</>}
                    </list.ExpendableContent>
                  </list.Row>
                )
              }}
            </list.Body>
            <list.SelectBar text="Hello">{() => <>Test</>}</list.SelectBar>
          </>
        )}
      </List>,
      {
        transform: async node => {
          expect(node.getByTestId('row-0')).toBeInTheDocument()
          const checkboxes = node.getAllByRole('checkbox', {
            hidden: true,
          }) as HTMLInputElement[]
          expect(checkboxes[0].name).toBe('select-rows')
          await userEvent.click(checkboxes[0])
          await userEvent.click(checkboxes[0])
        },
      },
    ))

  test('should render correctly with no data', () =>
    shouldMatchEmotionSnapshot(
      <List<Record<string, string>>
        emptyListComponent="Test"
        multiselect
        idKey="id"
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                    <list.ExpendableContent>
                      {() => <>ExpendableContent {rowData.id}</>}
                    </list.ExpendableContent>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with empty data', () =>
    shouldMatchEmotionSnapshot(
      <List<ReturnType<typeof generateData>[0]>
        multiselect
        idKey="id"
        data={[]}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                    <list.ExpendableContent>
                      {() => <>ExpendableContent {rowData.id}</>}
                    </list.ExpendableContent>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with bad idKey', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        idKey="badKey"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                    <list.ExpendableContent>
                      {() => <>ExpendableContent {rowData.id}</>}
                    </list.ExpendableContent>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with defaultSort', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        data={generateData(5)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                    <list.ExpendableContent>
                      {() => <>ExpendableContent {rowData.id}</>}
                    </list.ExpendableContent>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with alert', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row alert id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                    <list.ExpendableContent>
                      {() => <>ExpendableContent {rowData.id}</>}
                    </list.ExpendableContent>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with animated', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row animated id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                    <list.ExpendableContent>
                      {() => <>ExpendableContent {rowData.id}</>}
                    </list.ExpendableContent>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with animated, table variant', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="table"
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row animated id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with disabled', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="table"
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row disabled id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with disabled', () => {
    const data = generateData(2)
    const ref = createRef<ListRefType<typeof data[number]>>()

    return shouldMatchEmotionSnapshot(
      <List
        ref={ref}
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row disabled id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    )
  })

  test('should render correctly with isHoverable', () =>
    shouldMatchEmotionSnapshot(
      <List
        data={generateData(3)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row isHoverable id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with highlighted', () =>
    shouldMatchEmotionSnapshot(
      <List
        data={generateData(3)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData, setRowState, rowState } = props
                useEffect(() => {
                  if (rowData.id.includes('1') && !rowState.highlighted) {
                    setRowState?.(rowData.id, {
                      highlighted: true,
                    })
                  }
                }, [rowData.id, setRowState, rowState])

                return (
                  <list.Row isHoverable id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with highlighted, table variant', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="table"
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData, setRowState, rowState } = props
                useEffect(() => {
                  if (rowData.id.includes('1') && !rowState.highlighted) {
                    setRowState?.(rowData.id, {
                      highlighted: true,
                    })
                  }
                }, [rowData.id, setRowState, rowState])

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with highlighted, explorer variant', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="explorer"
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData, setRowState, rowState } = props
                useEffect(() => {
                  if (rowData.id.includes('1') && !rowState.highlighted) {
                    setRowState?.(rowData.id, {
                      highlighted: true,
                    })
                  }
                }, [rowData.id, setRowState, rowState])

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with highlighted and selected', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData, setRowState, rowState } = props
                useEffect(() => {
                  if (rowData.id.includes('1') && !rowState.highlighted) {
                    setRowState?.(rowData.id, {
                      highlighted: true,
                      selected: true,
                    })
                  }
                }, [rowData.id, setRowState, rowState])

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with highlighted and selected, table variant', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="table"
        multiselect
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData, setRowState, rowState } = props

                useEffect(() => {
                  if (rowData.id.includes('1') && !rowState.highlighted) {
                    setRowState?.(rowData.id, {
                      highlighted: true,
                      selected: true,
                    })
                  }
                }, [rowData.id, setRowState, rowState])

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with highlighted and selected, explorer variant', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="explorer"
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData, setRowState, rowState } = props
                useEffect(() => {
                  if (rowData.id.includes('1') && !rowState.highlighted) {
                    setRowState?.(rowData.id, {
                      highlighted: true,
                      selected: true,
                    })
                  }
                }, [rowData.id, setRowState, rowState])

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with custom loader', () =>
    shouldMatchEmotionSnapshot(
      <List
        data={generateData(2)}
        isLoading
        customLoader={<div>Loading....</div>}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with pagination', async () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
    await shouldMatchEmotionSnapshot(
      <List
        perPage={5}
        onLoadPage={({ perPage }) =>
          new Promise(resolve => {
            setTimeout(() => {
              const newData = generateData(perPage, getUUID())
              resolve(newData)
            }, 300)
          })
        }
        multiselect
        idKey="id"
        notSelectableText="Can't select"
        data={generateData(20)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description' },
          { label: 'Department' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    )
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  test('should render correctly with pagination and bad idKey', () =>
    shouldMatchEmotionSnapshot(
      <List
        perPage={5}
        idKey="badKey"
        data={generateData(20)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description' },
          { label: 'Department' },
        ]}
        customLoader={<div>Loading...</div>}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with pagination and page loading', () =>
    shouldMatchEmotionSnapshot(
      <List<ReturnType<typeof generateData>[0]>
        perPage={5}
        pageCount={10}
        onLoadPage={({ perPage }) =>
          new Promise(resolve => {
            setTimeout(() => {
              const newData = generateData(perPage, getUUID())
              resolve(newData)
            }, 300)
          })
        }
        idKey="id"
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description' },
          { label: 'Department' },
        ]}
        customLoader={<div>Loading...</div>}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
      {
        transform: async node => {
          await node.findByRole('button', {
            name: 'sort Name',
          })
          const nameHeader = node.getByRole('button', {
            name: 'sort Name',
          }) as HTMLButtonElement

          await waitFor(async () => userEvent.click(nameHeader))
          await waitFor(() =>
            expect(
              (
                node.getByRole('button', {
                  name: 'Next',
                }) as HTMLButtonElement
              ).disabled,
            ).toBe(false),
          )
          await userEvent.click(
            node.getByRole('button', {
              name: 'Next',
            }),
          )
        },
      },
    ))

  test('should render correctly with animation on Row', () =>
    shouldMatchEmotionSnapshot(
      <List
        idKey="id"
        data={generateData(1)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description' },
          { label: 'Department' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {props => {
                const { rowData } = props

                return (
                  <list.Row
                    id={rowData.id}
                    animated
                    animation="pulse"
                    animationDuration={700}
                  >
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))
})
