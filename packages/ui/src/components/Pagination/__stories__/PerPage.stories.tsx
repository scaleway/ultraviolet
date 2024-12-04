import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Pagination } from '..'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'

const NUMBER_OF_ITEMS = 134
const StyledList = styled.ul`
  height: 210px;
  overflow-y: auto;
  border: ${({ theme }) => theme.colors.neutral.border} 1px solid;
  padding: ${({ theme }) => theme.space[1]};
`
export const PerPage: StoryFn = props => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const computeNumberOfPages = Math.ceil(NUMBER_OF_ITEMS / perPage)

  return (
    <Stack gap={1}>
      <StyledList>
        {Array.from({ length: perPage }).map((_, index) => {
          const itemNumber = perPage * (page - 1) + index + 1
          if (itemNumber <= NUMBER_OF_ITEMS)
            return <li key={itemNumber}>Item #{itemNumber}</li>

          return null
        })}
      </StyledList>
      <Pagination
        {...props}
        onChange={setPage}
        page={page}
        perPage={perPage}
        pageCount={computeNumberOfPages}
        onChangePerPage={setPerPage}
        numberOfItems={NUMBER_OF_ITEMS}
      />
    </Stack>
  )
}

PerPage.args = {
  value: 40,
  labelDescription: (
    <Badge sentiment="primary" size="small">
      New
    </Badge>
  ),
  label: 'Label',
  numberOfItemsText: `of ${NUMBER_OF_ITEMS} items`,
}

PerPage.parameters = {
  docs: {
    description: {
      story: 'Define number of elements to show per page',
    },
  },
}

PerPage.decorators = [
  StoryComponent => (
    <div style={{ height: '500px' }}>
      <StoryComponent />
    </div>
  ),
]
