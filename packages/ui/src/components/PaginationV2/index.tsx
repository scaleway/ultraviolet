import styled from '@emotion/styled'
import { useCallback, useMemo } from 'react'
import { Button } from '../Button'
import { getPageNumbers } from './getPageNumbers'

const PageNumbersContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['2']};
  margin: 0 ${({ theme }) => theme.space['2']};
`

const PageSwitchContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
`

const StyledContainer = styled.div`
  display: flex;
`

type PaginationProps = {
  /**
    Event function called when changing the page
  */
  onChange: (newPage: number) => void
  /**
    The current page
  */
  page: number
  /**
    Number of page you have
  */
  pageCount: number
  /**
    How many page button you want to have
  */
  pageTabCount?: number
  /**
    Disable all buttons
  */
  disabled?: boolean
  className?: string
  'data-testid'?: string
}

/**
 * Display multiple buttons to allow navigation between a paginated resource
 */
export const Pagination = ({
  disabled = false,
  page,
  pageCount,
  onChange,
  pageTabCount = 5,
  className,
  'data-testid': dataTestId,
}: PaginationProps): JSX.Element => {
  const goToFirstPage = useCallback(() => {
    onChange(1)
  }, [onChange])

  const goToLastPage = useCallback(() => {
    onChange(pageCount)
  }, [onChange, pageCount])

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
    <StyledContainer className={className} data-testid={dataTestId}>
      <PageSwitchContainer>
        <Button
          aria-label="First"
          disabled={page <= 1 || disabled}
          variant="outlined"
          sentiment="primary"
          onClick={goToFirstPage}
          icon="arrow-left-double"
        />
        <Button
          aria-label="Back"
          disabled={page <= 1 || disabled}
          variant="outlined"
          sentiment="primary"
          onClick={goToPreviousPage}
          icon="arrow-left"
        />
      </PageSwitchContainer>
      <PageNumbersContainer>
        {pageNumbersToDisplay.map(pageNumber => (
          <Button
            aria-label={`Page ${pageNumber}`}
            aria-current={pageNumber === page}
            key={`pagination-page-${pageNumber}`}
            disabled={disabled}
            variant="outlined"
            sentiment={pageNumber === page ? 'primary' : 'neutral'}
            onClick={handlePageClick(pageNumber)}
            type="button"
          >
            {pageNumber}
          </Button>
        ))}
      </PageNumbersContainer>
      <PageSwitchContainer>
        <Button
          aria-label="Next"
          disabled={page >= pageCount || disabled}
          variant="outlined"
          sentiment="primary"
          onClick={goToNextPage}
          icon="arrow-right"
        />
        <Button
          aria-label="Last"
          disabled={page >= pageCount || disabled}
          variant="outlined"
          sentiment="primary"
          onClick={goToLastPage}
          icon="arrow-right-double"
        />
      </PageSwitchContainer>
    </StyledContainer>
  )
}
