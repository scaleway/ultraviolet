import styled from '@emotion/styled'
import type { Dispatch, SetStateAction } from 'react'
import { SelectInputV2 } from '../SelectInputV2'
import { Stack } from '../Stack'
import { Text } from '../Text'

const optionsItemsPerPage = [
  {
    value: '10',
    label: '10',
  },
  {
    value: '25',
    label: '25',
  },
  {
    value: '50',
    label: '50',
  },
  {
    value: '100',
    label: '100',
  },
]

const StyledSelectInput = styled(SelectInputV2)`
  width: fit-content;
  min-width: none;
`

type PerPageProps = {
  perPage: number
  onChangePerPage?: (perPage: number) => void
  perPageText?: string
  setPerPage: Dispatch<SetStateAction<number>>
  numberOfItemsText?: string
  page: number
  numberOfItems: number
}

export const PerPage = ({
  perPage,
  onChangePerPage,
  perPageText,
  setPerPage,
  numberOfItemsText,
  page,
  numberOfItems,
}: PerPageProps) => {
  const handleChange = (value: string) => {
    const intValue = parseInt(value, 10)
    onChangePerPage?.(intValue)
    setPerPage(intValue)
  }

  return (
    <Stack direction="row" gap="2" alignItems="center">
      <Text as="span" variant="body" sentiment="neutral" prominence="weak">
        {perPageText ?? 'Items per page'}
      </Text>
      <StyledSelectInput
        value={perPage.toString()}
        options={optionsItemsPerPage}
        onChange={handleChange}
        name="select-items-per-page"
      />
      <Text as="span" variant="body" sentiment="neutral" prominence="weak">
        {(page - 1) * perPage + 1}-{Math.min(page * perPage, numberOfItems)}{' '}
        {numberOfItemsText ?? `of ${numberOfItems} items"`}
      </Text>
    </Stack>
  )
}
