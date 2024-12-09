import styled from '@emotion/styled'
import { useCallback, useMemo } from 'react'
import { Button } from '../Button'
import { Text } from '../Text'
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
  width: ${({ theme }) => theme.sizing[600]};
`

const Ellipsis = styled(Text)`
  align-content: center;
  padding: ${({ theme }) => theme.space[1]};
  height: ${({ theme }) => theme.sizing[600]};
  width: ${({ theme }) => theme.sizing[600]};
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

type MakeButtonProps = {
  hasEllipsisBefore: boolean
  pageNumber: number
  disabled?: boolean
  page: number
  handlePageClick: (pageNumber: number) => () => void
}
const MakeButton = ({
  hasEllipsisBefore,
  pageNumber,
  disabled,
  page,
  handlePageClick,
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
      >
        ...
      </Ellipsis>
    ) : null}
    <PageButton
      aria-current={pageNumber === page}
      disabled={disabled}
      variant="outlined"
      sentiment={pageNumber === page ? 'primary' : 'neutral'}
      onClick={handlePageClick(pageNumber)}
      type="button"
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
          />
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
      </PageSwitchContainer>
    </StyledContainer>
  )
}
