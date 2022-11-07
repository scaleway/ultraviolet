// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from 'react'
import List from '..'
import ControlValue from '../../../__stories__/components/ControlValue'
import { generateData } from '../../../mocks/list'
import * as animations from '../../../utils/animations'
import Button from '../../Button'
import RichSelect, { SelectOption } from '../../RichSelect'
import Stack from '../../Stack'

export const Animated = () => (
  <ControlValue<SelectOption> value={{ label: 'fadeIn', value: 'fadeIn' }}>
    {({ value, onChange }) => {
      const [options] = useState(
        Object.keys(animations).map(animation => ({
          label: animation,
          value: animation,
        })),
      )

      const [display, setDisplay] = useState(true)

      return (
        <Stack gap={2}>
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
                        animation={value.value as keyof typeof animations}
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
        </Stack>
      )
    }}
  </ControlValue>
)
