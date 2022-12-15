import type { ComponentStory } from '@storybook/react'
import List from '..'
import type { MockData } from '../../../mocks/list'
import { generateData } from '../../../mocks/list'
import { defaultColumns } from './helper'

export const Template: ComponentStory<typeof List<MockData>> = ({
  children,
  columns,
  data,
  ...props
}) => (
  <List<MockData>
    columns={columns ?? defaultColumns}
    data={data ?? generateData(3)}
    {...props}
  >
    {children ??
      (list => (
        <>
          <list.Header />
          <list.Body>
            {({ rowData }) => (
              <list.Row id={rowData.id}>
                <list.Cell>{rowData.name}</list.Cell>
                <list.Cell>{rowData.description}</list.Cell>
                <list.Cell>{rowData.department}</list.Cell>
                <list.ExpendableContent>
                  {() => <>ExpendableContent of {rowData.name}</>}
                </list.ExpendableContent>
              </list.Row>
            )}
          </list.Body>
        </>
      ))}
  </List>
)
