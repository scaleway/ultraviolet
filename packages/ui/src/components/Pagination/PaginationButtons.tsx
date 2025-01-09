import styled from '@emotion/styled'
import { useCallback, useMemo } from 'react'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { getPageNumbers } from './getPageNumbers'

const PageNumbersContainer = styled(Stack)`
  margin: 0 ${({ theme }) => theme.space['1']};
`

const PageButton = styled(Button, {
  shouldForwardProp: prop => !['width'].includes(prop),
})<{ width: string }>`
  width: ${({ theme, width }) => (width === 'small' ? theme.sizing[400] : theme.sizing[500])};
`

const Ellipsis = styled(Text, {
  shouldForwardProp: prop => !['width'].includes(prop),
})<{ size: string }>`
  align-content: center;
  padding: ${({ theme }) => theme.space[1]};
  height: ${({ theme, size }) => (size === 'small' ? theme.sizing[400] : theme.sizing[500])};
  width: ${({ theme, size }) => (size === 'small' ? theme.sizing[400] : theme.sizing[500])};
`

type PaginationButtonsProps = {
  page: number
  disabled: boolean
  onChange: (newPage: number) => void
  pageCount: number
  pageTabCount?: number
  className?: string
  'data-testid'?: string
  perPage: boolean
}

type MakeButtonProps = {
  hasEllipsisBefore: boolean
  pageNumber: number
  disabled?: boolean
  page: number
  handlePageClick: (pageNumber: number) => () => void
  perPage: boolean
}
const MakeButton = ({
  hasEllipsisBefore,
  pageNumber,
  disabled,
  page,
  handlePageClick,
  perPage,
}: MakeButtonProps) => (
  <>
    {hasEllipsisBefore ? (
      <Ellipsis
        aria-label="ellipsis"
        disabled={disabled}
        variant="body"
        sentiment="neutral"
        prominence="default"
        as="span"
        placement="center"
        size={perPage ? 'small' : 'medium'}
      >
        ...
      </Ellipsis>
    ) : null}
    <PageButton
      aria-current={pageNumber === page}
      disabled={disabled}
      variant={pageNumber === page ? 'filled' : 'outlined'}
      sentiment={pageNumber === page ? 'primary' : 'neutral'}
      onClick={handlePageClick(pageNumber)}
      type="button"
      size={perPage ? 'small' : 'medium'}
      width={perPage ? 'small' : 'medium'}
    >
      {pageNumber}
    </PageButton>
  </>
)

export const PaginationButtons = ({
  page,
  disabled,
  onChange,
  pageCount,
  pageTabCount,
  'data-testid': dataTestId,
  className,
  perPage,
}: PaginationButtonsProps) => {
  const goToNextPage = useCallback(() => {
    onChange(page + 1)
  }, [onChange, page])

  const goToPreviousPage = useCallback(() => {
    onChange(page - 1)
  }, [onChange, page])

  const pageNumbersToDisplay = useMemo(
    () => (pageCount > 1 ? getPageNumbers(page, pageCount, pageTabCount) : [1]),
    [page, pageCount, pageTabCount],
  )

  const handlePageClick = useCallback(
    (pageNumber: number) => () => {
      onChange(pageNumber)
    },
    [onChange],
  )

  return (
    <Stack className={className} data-testid={dataTestId} direction="row">
      <Stack gap={1}>
        <Button
          aria-label="Back"
          disabled={page <= 1 || disabled}
          variant="outlined"
          sentiment="primary"
          onClick={goToPreviousPage}
          icon="arrow-left"
          size={perPage ? 'small' : 'medium'}
        />
      </Stack>
      <PageNumbersContainer direction="row" gap={1}>
        {pageNumbersToDisplay.map((pageNumber, index) => (
          <MakeButton
            hasEllipsisBefore={
              !(
                index === 0 ||
                pageNumbersToDisplay[index - 1] === pageNumber - 1
              )
            }
            page={page}
            pageNumber={pageNumber}
            handlePageClick={handlePageClick}
            disabled={disabled}
            key={pageNumber}
            perPage={perPage}
          />
        ))}
      </PageNumbersContainer>
      <Stack gap={1}>
        <Button
          aria-label="Next"
          disabled={page >= pageCount || disabled}
          variant="outlined"
          sentiment="primary"
          onClick={goToNextPage}
          icon="arrow-right"
          size={perPage ? 'small' : 'medium'}
        />
      </Stack>
    </Stack>
  )
}
