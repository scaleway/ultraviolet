import { Meta, Story } from '@storybook/react'
import React, { useRef, useState } from 'react'
import List, { ListProps, ListRefType } from '..'
import ControlValue from '../../../__stories__/components/ControlValue'
import { generateData } from '../../../mocks/list'
import * as animations from '../../../utils/animations'
import { getUUID } from '../../../utils/ids'
import Button from '../../Button'
import RichSelect from '../../RichSelect'

export default {
  component: List,
  parameters: {
    docs: {
      description: {
        component: 'Display a list of your data.',
      },
    },
  },
  title: 'Components/List',
} as Meta

const Template: Story<ListProps<ReturnType<typeof generateData>[0]>> = ({
  data = [],
  columns = [{ label: 'Name' }],
  ...props
}) => (
  <List data={data} columns={columns} {...props}>
    {list => (
      <>
        <list.Header />
        <list.Body>
          {({ rowData }) => (
            <list.Row id={rowData.id}>
              <list.Cell>{rowData.name}</list.Cell>
              <list.Cell>actions</list.Cell>
              <list.ExpendableContent>
                {() => <>ExpendableContent of {rowData.name}</>}
              </list.ExpendableContent>
            </list.Row>
          )}
        </list.Body>
      </>
    )}
  </List>
)

export const Default = Template.bind({})

export const EmptyText = Template.bind({})
EmptyText.decorators = [
  () => (
    <List<ReturnType<typeof generateData>[0]>
      emptyListComponent={
        <div>This list is empty and display a custom component.</div>
      }
      idKey="id"
      data={[]}
      columns={[
        { label: 'Name', sort: 'name' },
        { label: 'Description', sort: 'description', width: '50%' },
        { label: 'Department', sort: 'department', width: '120px' },
        { justifyContent: 'center', width: '128px' },
      ]}
    >
      {list => (
        <>
          <list.Header />
          <list.Body>
            {({ rowData }) => (
              <list.Row id={rowData.id}>
                <list.Cell>{rowData.name}</list.Cell>
                <list.Cell>{rowData.description}</list.Cell>
                <list.Cell>{rowData.department}</list.Cell>
                <list.Cell>actions</list.Cell>
                <list.ExpendableContent>
                  {() => <>ExpendableContent of {rowData.name}</>}
                </list.ExpendableContent>
              </list.Row>
            )}
          </list.Body>
        </>
      )}
    </List>
  ),
]

export const AutoClose = Template.bind({})
AutoClose.decorators = [
  () => (
    <List
      autoClose
      idKey="id"
      data={generateData(10)}
      columns={[
        { label: 'Name', sort: 'name' },
        { label: 'Description', sort: 'description', width: '50%' },
        { label: 'Department', sort: 'department', width: '120px' },
        { justifyContent: 'center', width: '128px' },
      ]}
    >
      {list => (
        <>
          <list.Header />
          <list.Body>
            {({ rowData }) => (
              <list.Row animated id={rowData.id}>
                <list.Cell>{rowData.name}</list.Cell>
                <list.Cell>{rowData.description}</list.Cell>
                <list.Cell>{rowData.department}</list.Cell>
                <list.Cell>actions</list.Cell>
                <list.ExpendableContent>
                  {() => <>ExpendableContent of {rowData.name}</>}
                </list.ExpendableContent>
              </list.Row>
            )}
          </list.Body>
        </>
      )}
    </List>
  ),
]

export const Sorting = Template.bind({})
Sorting.decorators = [
  () => (
    <List
      autoClose
      idKey="id"
      data={generateData(10)}
      columns={[
        { label: 'Name', sort: 'name' },
        { label: 'Description', sort: 'description', width: '50%' },
        { label: 'Department', sort: 'department', width: '120px' },
        { justifyContent: 'center', width: '128px' },
      ]}
    >
      {list => (
        <>
          <list.Header />
          <list.Body>
            {({ rowData }) => (
              <list.Row animated id={rowData.id}>
                <list.Cell>{rowData.name}</list.Cell>
                <list.Cell>{rowData.description}</list.Cell>
                <list.Cell>{rowData.department}</list.Cell>
                <list.Cell>actions</list.Cell>
                <list.ExpendableContent>
                  {() => <>ExpendableContent of {rowData.name}</>}
                </list.ExpendableContent>
              </list.Row>
            )}
          </list.Body>
        </>
      )}
    </List>
  ),
]

export const RowVariants = Template.bind({})
RowVariants.decorators = [
  () => (
    <List
      autoClose
      idKey="id"
      multiselect
      data={generateData(5)}
      columns={[
        { label: 'Name', sort: 'name' },
        { label: 'Description', sort: 'description', width: '50%' },
        { label: 'Department', sort: 'department', width: '120px' },
        { justifyContent: 'center', width: '128px' },
      ]}
    >
      {list => (
        <>
          <list.Header />
          <list.Body>
            {({ rowData }) => (
              <list.Row
                alert={rowData.id === '1'}
                locked={rowData.id === '2'}
                animated
                id={rowData.id}
              >
                <list.Cell>{rowData.name}</list.Cell>
                <list.Cell>{rowData.description}</list.Cell>
                <list.Cell>{rowData.department}</list.Cell>
                <list.Cell>actions</list.Cell>
                <list.ExpendableContent>
                  {() => <>ExpendableContent of {rowData.name}</>}
                </list.ExpendableContent>
              </list.Row>
            )}
          </list.Body>
        </>
      )}
    </List>
  ),
]

export const Multiselect = Template.bind({})
Multiselect.decorators = [
  () => (
    <List
      idKey="id"
      data={generateData(10)}
      columns={[
        { label: 'Name', sort: 'name' },
        { label: 'Description', sort: 'description', width: '25%' },
        { label: 'Department', width: '120px' },
        { justifyContent: 'center', width: '128px' },
      ]}
      multiselect
    >
      {list => (
        <>
          <list.Header />
          <list.Body>
            {({ rowData }) => (
              <list.Row id={rowData.id}>
                <list.Cell>{rowData.name}</list.Cell>
                <list.Cell>{rowData.description}</list.Cell>
                <list.Cell>{rowData.department}</list.Cell>
                <list.Cell>actions</list.Cell>
                <list.ExpendableContent>
                  {() => <>ExpendableContent of {rowData.name}</>}
                </list.ExpendableContent>
              </list.Row>
            )}
          </list.Body>
          <list.SelectBar>{() => <>Hello SelectBar</>}</list.SelectBar>
        </>
      )}
    </List>
  ),
]

export const Loading = Template.bind({})
Loading.parameters = {
  docs: {
    storyDescription:
      'By put `loader` prop to `true` in `list.Body` tag you can display an `Loader`',
  },
}
Loading.decorators = [
  () => (
    <List
      isLoading
      idKey="id"
      data={generateData(10)}
      columns={[
        { label: 'Name', sort: 'name' },
        { label: 'Description', sort: 'description', width: '25%' },
        { label: 'Department', width: '120px' },
        { justifyContent: 'center', width: '128px' },
      ]}
      multiselect
    >
      {list => (
        <>
          <list.Header />
          <list.Body>
            {({ rowData }) => (
              <list.Row id={rowData.id}>
                <list.Cell>{rowData.name}</list.Cell>
                <list.Cell>{rowData.description}</list.Cell>
                <list.Cell>{rowData.department}</list.Cell>
                <list.Cell>actions</list.Cell>
                <list.ExpendableContent>
                  {() => <>ExpendableContent of {rowData.name}</>}
                </list.ExpendableContent>
              </list.Row>
            )}
          </list.Body>
          <list.SelectBar>{() => <>Hello SelectBar</>}</list.SelectBar>
        </>
      )}
    </List>
  ),
]

export const TableVariant = Template.bind({})
TableVariant.decorators = [
  () => (
    <List
      idKey="id"
      variant="table"
      data={generateData(10)}
      columns={[
        { label: 'Name', sort: 'name', width: '50%' },
        { label: 'Description', sort: 'description', width: '25%' },
        { label: 'Department', width: '120px' },
        { justifyContent: 'flex-end' },
      ]}
    >
      {list => (
        <>
          <list.Header />
          <list.Body>
            {({ rowData }) => (
              <list.Row id={rowData.id}>
                <list.Cell>{rowData.name}</list.Cell>
                <list.Cell>{rowData.description}</list.Cell>
                <list.Cell>{rowData.department}</list.Cell>
                <list.Cell>actions</list.Cell>
              </list.Row>
            )}
          </list.Body>
        </>
      )}
    </List>
  ),
]

export const ExplorerVariant = Template.bind({})
ExplorerVariant.decorators = [
  () => (
    <List
      idKey="id"
      variant="explorer"
      data={generateData(10)}
      columns={[
        { label: 'Name' },
        { label: 'Description' },
        { label: 'Department' },
      ]}
    >
      {list => (
        <>
          <list.Header />
          <list.Body>
            {({ rowData }) => (
              <list.Row id={rowData.id}>
                <list.Cell>{rowData.name}</list.Cell>
                <list.Cell>{rowData.description}</list.Cell>
                <list.Cell>{rowData.department}</list.Cell>
              </list.Row>
            )}
          </list.Body>
        </>
      )}
    </List>
  ),
]

export const Ref = Template.bind({})
Ref.parameters = {
  docs: {
    storyDescription: `By passing a \`ref\` prop it will be hydrated with:

- hasSelectedItems : Return true if at least one row is selected
- selectAll() : Select all rows
- selectableItems : List of all rows that can be selected
- selectedItems : Return selected items
- unselectAll() : Unselect all rows
- hasAllSelected: True if all rows are selected`,
  },
}
Ref.decorators = [
  () => {
    const ref = useRef<ListRefType<ReturnType<typeof generateData>[0]>>(null)
    const handleClick = () => {
      ref.current?.unselectAll()
    }

    return (
      <>
        <Button onClick={handleClick}>Reset selected</Button>
        <List
          multiselect
          ref={ref}
          idKey="id"
          data={generateData(10)}
          columns={[
            { label: 'Name' },
            { label: 'Description' },
            { label: 'Department' },
          ]}
        >
          {list => (
            <>
              <list.Header />
              <list.Body>
                {({ rowData }) => (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                  </list.Row>
                )}
              </list.Body>
            </>
          )}
        </List>
      </>
    )
  },
]

export const PaginationPrefetchedData = Template.bind({})
PaginationPrefetchedData.decorators = [
  () => (
    <List
      perPage={5}
      multiselect
      idKey="id"
      data={generateData(30)}
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
            {({ rowData }) => (
              <list.Row id={rowData.id}>
                <list.Cell>{rowData.name}</list.Cell>
                <list.Cell>{rowData.description}</list.Cell>
                <list.Cell>{rowData.department}</list.Cell>
              </list.Row>
            )}
          </list.Body>
        </>
      )}
    </List>
  ),
]

export const PaginationLoading = Template.bind({})
PaginationLoading.decorators = [
  () => {
    const [data, setData] = useState(generateData(30))

    return (
      <List
        perPage={5}
        onLoadPage={({ perPage }) =>
          new Promise(resolve => {
            setTimeout(() => {
              const newData = generateData(perPage, getUUID())
              setData([...data, ...newData])
              resolve(newData)
            }, 3000)
          })
        }
        multiselect
        idKey="id"
        data={data}
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
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>
    )
  },
]

export const PaginationLoadingPageCount = Template.bind({})
PaginationLoadingPageCount.decorators = [
  () => {
    const [data, setData] = useState(generateData(30))

    return (
      <List
        perPage={5}
        onLoadPage={({ perPage }) =>
          new Promise(resolve => {
            setTimeout(() => {
              const newData = generateData(perPage, getUUID())
              setData([...data, ...newData])
              resolve(newData)
            }, 3000)
          })
        }
        pageCount={20}
        multiselect
        idKey="id"
        initialData={data}
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
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                </list.Row>
              )}
            </list.Body>
            <list.SelectBar>{() => null}</list.SelectBar>
          </>
        )}
      </List>
    )
  },
]

export const Animated = Template.bind({})
Animated.decorators = [
  () => (
    <ControlValue value={{ label: 'fadeIn', value: 'fadeIn' }}>
      {({ value, onChange }) => {
        const [options] = useState(
          Object.keys(animations).map(animation => ({
            label: animation,
            value: animation,
          })),
        )

        const [display, setDisplay] = useState(true)

        return (
          <>
            <RichSelect
              name="animated"
              value={value}
              onChange={onChange}
              options={options}
            />
            <Button
              onClick={() => {
                setDisplay(false)
                setTimeout(() => {
                  setDisplay(true)
                }, 50)
              }}
              mt={1}
            >
              Trigger
            </Button>
            <List
              idKey="id"
              data={generateData(1)}
              columns={[
                { label: 'Name', sort: 'name' },
                { label: 'Description', sort: 'description', width: '25%' },
                { label: 'Department', width: '120px' },
                { justifyContent: 'center', width: '128px' },
              ]}
              multiselect
            >
              {list => (
                <>
                  <list.Header />
                  {display ? (
                    <list.Body>
                      {({ rowData }) => (
                        <list.Row
                          id={rowData.id}
                          animated
                          animation={value.value}
                        >
                          <list.Cell>{rowData.name}</list.Cell>
                          <list.Cell>{rowData.description}</list.Cell>
                          <list.Cell>{rowData.department}</list.Cell>
                          <list.Cell>actions</list.Cell>
                          <list.ExpendableContent>
                            {() => <>ExpendableContent of {rowData.name}</>}
                          </list.ExpendableContent>
                        </list.Row>
                      )}
                    </list.Body>
                  ) : null}
                  <list.SelectBar>{() => <>Hello SelectBar</>}</list.SelectBar>
                </>
              )}
            </List>
          </>
        )
      }}
    </ControlValue>
  ),
]
