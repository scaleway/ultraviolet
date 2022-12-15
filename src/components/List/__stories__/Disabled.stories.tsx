import List from '..'
import type { MockData } from '../../../mocks/list'
import { generateData } from '../../../mocks/list'
import { defaultColumns } from './helper'

export const Disabled = () => (
  <List<MockData> columns={defaultColumns} data={generateData(3)}>
    {list => (
      <>
        <list.Header />
        <list.Body>
          {({ rowData }) => (
            <list.Row disabled={rowData.id === '1'} animated id={rowData.id}>
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
    )}
  </List>
)
