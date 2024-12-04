import styled from '@emotion/styled'
import React, { useCallback, useMemo } from 'react'
import { Button } from '../Button'
import { getPageNumbers } from './getPageNumbers'

const PageNumbersContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
  margin: 0 ${({ theme }) => theme.space['1']};
`

const PageSwitchContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
`

const StyledContainer = styled.div`
  display: flex;
`
const PageButton = styled(Button)`
  width: ${({ theme }) => theme.space[6]};
`

const Ellipsis = styled(PageButton)`

  &:hover {
    background: none;
    cursor: default;
  }

  &:active, &:focus {
    box-shadow: none;
    cursor: default;
    background: none;
  }

`
type PaginationButtonsProps = {
  page: number
  disabled: boolean
  onChange: (newPage: number) => void
  pageCount: number
  pageTabCount?: number
  className?: string
  'data-testid'?: string
}

export const PaginationButtons = ({
  page,
  disabled,
  onChange,
  pageCount,
  pageTabCount,
  'data-testid': dataTestId,
  className,
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
    <StyledContainer className={className} data-testid={dataTestId}>
      <PageSwitchContainer>
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
        {pageNumbersToDisplay.map((pageNumber, index) => {
          if (
            index === 0 ||
            pageNumbersToDisplay[index - 1] === pageNumber - 1
          ) {
            return (
              <PageButton
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
              </PageButton>
            )
          }

          return (
            <React.Fragment key={pageNumber}>
              <Ellipsis
                aria-label="ellipsis"
                key={`ellipsis-page-${pageNumber}`}
                disabled={disabled}
                variant="ghost"
                sentiment="neutral"
                type="button"
                tabIndex={-1}
              >
                ...
              </Ellipsis>
              <PageButton
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
              </PageButton>
            </React.Fragment>
          )
        })}
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
      </PageSwitchContainer>
    </StyledContainer>
  )
}
