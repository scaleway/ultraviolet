import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import Button from '../Button'
import Icon from '../Icon'
import getPageNumbers from './getPageNumbers'

const PageNumbersContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['2']};
  margin: 0 ${({ theme }) => theme.space['2']};
`

const StyledPageSwitch = styled(Button)`
  width: ${({ theme }) => theme.space['4']};
  height: ${({ theme }) => theme.space['6']};
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageSwitchContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
`

const StyledPageButton = styled.button`
  color: ${({ theme }) => theme.colors.neutral.textStrong};
  line-height: ${({ theme }) => theme.space['3']};
  width: ${({ theme }) => theme.space['6']};
  height: ${({ theme }) => theme.space['6']};
  font-size: 16px;
  font-weight: 500;
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

export type PaginationProps = {
  onChange: (newPage: number) => void
  page: number
  pageCount: number
  pageTabCount?: number
  disabled?: boolean
}

function Pagination({
  disabled = false,
  page,
  pageCount,
  onChange,
  pageTabCount = 5,
}: PaginationProps): JSX.Element {
  const goToFirstPage = () => {
    onChange(1)
  }

  const goToLastPage = () => {
    onChange(pageCount)
  }

  const goToNextPage = () => {
    onChange(page + 1)
  }

  const goToPreviousPage = () => {
    onChange(page - 1)
  }

  const pageNumbersToDisplay = useMemo(
    () => (pageCount > 1 ? getPageNumbers(page, pageCount, pageTabCount) : [1]),
    [page, pageCount, pageTabCount],
  )

  const handlePageClick = (pageNumber: number) => () => {
    onChange(pageNumber)
  }

  return (
    <div style={{ display: 'flex' }}>
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
    </div>
  )
}

Pagination.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageTabCount: PropTypes.number,
}

export default Pagination
