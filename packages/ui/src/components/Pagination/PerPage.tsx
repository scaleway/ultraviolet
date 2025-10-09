'use client'

import type { Dispatch, SetStateAction } from 'react'
import { SelectInput } from '../SelectInput'
import { Stack } from '../Stack'
import { Text } from '../Text'

const optionsItemsPerPage = [
  {
    label: '10',
    value: '10',
  },
  {
    label: '25',
    value: '25',
  },
  {
    label: '50',
    value: '50',
  },
  {
    label: '100',
    value: '100',
  },
]

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
    const intValue = Number.parseInt(value, 10)
    onChangePerPage?.(intValue)
    setPerPage(intValue)
  }

  return (
    <Stack alignItems="center" direction="row" gap="2">
      <Text as="span" prominence="weak" sentiment="neutral" variant="body">
        {perPageText ?? 'Items per page'}
      </Text>
      <SelectInput
        name="select-items-per-page"
        onChange={handleChange}
        options={optionsItemsPerPage}
        size="small"
        style={{
          width: 'fit-content',
        }}
        value={perPage.toString()}
      />
      <Text as="span" prominence="weak" sentiment="neutral" variant="body">
        {(page - 1) * perPage + 1}-{Math.min(page * perPage, numberOfItems)}{' '}
        {numberOfItemsText ?? `of ${numberOfItems} items"`}
      </Text>
    </Stack>
  )
}
