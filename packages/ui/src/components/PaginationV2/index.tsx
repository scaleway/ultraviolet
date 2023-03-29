import styled from '@emotion/styled'
import { useCallback, useMemo } from 'react'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { getPageNumbers } from './getPageNumbers'

const PageNumbersContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['2']};
  margin: 0 ${({ theme }) => theme.space['2']};
`

const StyledPageSwitch = styled(Button)`
  width: 32px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageSwitchContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
`

const StyledContainer = styled.div`
  display: flex;
`

const StyledPageButton = styled.button`
  color: ${({ theme }) => theme.colors.neutral.textStrong};
  line-height: ${({ theme }) => theme.typography.bodyStrong.lineHeight};
  font-size: ${({ theme }) => theme.typography.bodyStrong.fontSize};
  font-weight: ${({ theme }) => theme.typography.bodyStrong.fontWeight};
  width: 48px;
  height: 48px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.neutral.background};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.default};

  &:disabled {
    pointer-events: none;
    background-color: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
    border: 1px solid ${({ theme }) => theme.colors.neutral.borderDisabled};
  }

  &[aria-current='true']:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary.textWeak};
    border-color: ${({ theme }) => theme.colors.primary.borderWeak};
  }

  &[aria-current='false']:hover {
    color: ${({ theme }) => theme.colors.primary.textHover};
    border-color: ${({ theme }) => theme.colors.neutral.borderStrong};
  }
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
    <StyledContainer>
      <PageSwitchContainer>
        <StyledPageSwitch
          aria-label="First"
          disabled={page <= 1 || disabled}
          variant="primary-bordered"
          onClick={goToFirstPage}
        >
          <Icon name="arrow-left-double" />
        </StyledPageSwitch>
        <StyledPageSwitch
          aria-label="Back"
          disabled={page <= 1 || disabled}
          variant="primary-bordered"
          onClick={goToPreviousPage}
        >
          <Icon name="arrow-left" />
        </StyledPageSwitch>
      </PageSwitchContainer>
      <PageNumbersContainer>
        {pageNumbersToDisplay.map(pageNumber => (
          <StyledPageButton
            aria-label={`Page ${pageNumber}`}
            key={`pagination-page-${pageNumber}`}
            disabled={disabled}
            aria-current={pageNumber === page}
            onClick={handlePageClick(pageNumber)}
            type="button"
          >
            {pageNumber}
          </StyledPageButton>
        ))}
      </PageNumbersContainer>
      <PageSwitchContainer>
        <StyledPageSwitch
          aria-label="Next"
          disabled={page >= pageCount || disabled}
          variant="primary-bordered"
          onClick={goToNextPage}
        >
          <Icon name="arrow-right" />
        </StyledPageSwitch>
        <StyledPageSwitch
          aria-label="Last"
          disabled={page >= pageCount || disabled}
          variant="primary-bordered"
          onClick={goToLastPage}
        >
          <Icon name="arrow-right-double" />
        </StyledPageSwitch>
      </PageSwitchContainer>
    </StyledContainer>
  )
}
