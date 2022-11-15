import { useState } from 'react'
import List from '..'
import { generateData } from '../../../mocks/list'
import * as animations from '../../../utils/animations'
import Button from '../../Button'
import RichSelect, { SelectOption } from '../../RichSelect'
import Stack from '../../Stack'

const selectableAnimations = Object.keys(animations).map(animation => ({
  label: animation,
  value: animation,
}))

export const Animated = () => {
  const [currentAnimation, setCurrentAnimation] = useState<SelectOption>(
    selectableAnimations[0],
  )

  const [display, setDisplay] = useState(true)

  return (
    <Stack gap={2}>
      <RichSelect
        name="animated"
        value={currentAnimation}
        onChange={value => setCurrentAnimation(value as SelectOption)}
        options={selectableAnimations}
      />
      <Button
        onClick={() => {
          setDisplay(false)
          setTimeout(() => {
            setDisplay(true)
          }, 50)
        }}
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
                    animation={
                      currentAnimation.value as keyof typeof animations
                    }
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
}
