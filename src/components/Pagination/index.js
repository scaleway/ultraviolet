import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import ActivityIndicator from '../ActivityIndicator'
import Box from '../Box'
import Button from '../Button'
import getPageNumbers from './getPageNumbers'
import usePagination from './usePagination'

const PaginationContext = createContext()
export const usePaginationContext = () => useContext(PaginationContext)

// START - Default Components
const DefaultLeftComponent = () => null

const StyledPageButton = styled(Button, {
  shouldForwardProp: prop => !['current'].includes(prop),
})`
  ${({ current }) =>
    current
      ? `
    text-decoration: underline;
    &:hover {
      text-decoration: underline;
    }
  `
      : ''}
`

const DefaultMiddleComponent = ({ pageTabCount, paginationState }) => {
  const {
    isLoadingPage,
    page,
    maxPage,
    canLoadMore,
    goToNextPage,
    goToFirstPage,
    goToLastPage,
    goToPage,
    goToPreviousPage,
  } = paginationState

  const pageNumbersToDisplay = useMemo(
    () => (maxPage > 1 ? getPageNumbers(page, maxPage, pageTabCount) : [1]),
    [page, maxPage, pageTabCount],
  )

  const handlePageClick = useCallback(
    pageNumber => () => {
      goToPage(pageNumber)
    },
    [goToPage],
  )

  return (
    <div>
      <Button
        mr={1}
        disabled={page === 1 || isLoadingPage}
        onClick={goToFirstPage}
        aria-label="First"
      >
        First
      </Button>
      <Button
        aria-label="Back"
        mr={1}
        disabled={page === 1 || isLoadingPage}
        onClick={goToPreviousPage}
      >
        Back
      </Button>
      {pageNumbersToDisplay.map(pageNumber => (
        <StyledPageButton
          aria-label={`Page ${pageNumber}`}
          key={`pagination-page-${pageNumber}`}
          mr={1}
          disabled={isLoadingPage}
          current={pageNumber === page}
          variant="secondary"
          onClick={handlePageClick(pageNumber)}
        >
          {pageNumber}
        </StyledPageButton>
      ))}
      <Button
        mr={1}
        aria-label="Next"
        disabled={(page === maxPage && !canLoadMore) || isLoadingPage}
        onClick={goToNextPage}
      >
        Next
      </Button>
      <Button
        aria-label="Last"
        disabled={page === maxPage || isLoadingPage}
        onClick={goToLastPage}
      >
        Last
      </Button>
    </div>
  )
}

const DefaultRightComponent = ({ paginationState: { page } }) => (
  <div>Current : {page}</div>
)

const DefaultLoaderComponent = () => (
  <Box my={2} display="flex" justifyContent="center">
    <ActivityIndicator active />
  </Box>
)

const PaginationContainer = ({
  LeftComponent,
  MiddleComponent,
  RightComponent,
  paginationState,
  pageTabCount,
}) => {
  const LeftComponentToRender =
    !LeftComponent || React.isValidElement(LeftComponent) ? (
      LeftComponent
    ) : (
      <LeftComponent
        paginationState={paginationState}
        pageTabCount={pageTabCount}
      />
    )
  const MiddleComponentToRender =
    !MiddleComponent || React.isValidElement(MiddleComponent) ? (
      MiddleComponent
    ) : (
      <MiddleComponent
        paginationState={paginationState}
        pageTabCount={pageTabCount}
      />
    )
  const RightComponentToRender =
    !RightComponent || React.isValidElement(RightComponent) ? (
      RightComponent
    ) : (
      <RightComponent
        paginationState={paginationState}
        pageTabCount={pageTabCount}
      />
    )

  return (
    <StyledMainContainer role="navigation">
      <StyledLeftContainer>{LeftComponentToRender}</StyledLeftContainer>
      <StyledMiddleContainer>{MiddleComponentToRender}</StyledMiddleContainer>
      <StyledRightContainer>{RightComponentToRender}</StyledRightContainer>
    </StyledMainContainer>
  )
}

const PaginationComponent = {
  propTypes: {},
}

DefaultLeftComponent.propTypes = PaginationComponent.propTypes
DefaultMiddleComponent.propTypes = PaginationComponent.propTypes
DefaultRightComponent.propTypes = PaginationComponent.propTypes
DefaultLoaderComponent.propTypes = PaginationComponent.propTypes
// END - Default Components

const StyledMainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  justify-content: space-between;
`

const StyledLeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const StyledMiddleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledRightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Pagination = forwardRef(
  (
    {
      children,
      data: dataProp,
      initialData,
      initialPage,
      page: pageProp,
      pageCount,
      onLoadPage,
      onChangePage,
      perPage: perPageProp,
      LeftComponent,
      MiddleComponent,
      RightComponent,
      LoaderComponent,
      pageTabCount,
    },
    ref,
  ) => {
    const paginationRef = useRef({})
    useImperativeHandle(ref, () => paginationRef.current)

    const [page, setPage] = useState(pageProp ?? initialPage)
    const [data, setData] = useState(dataProp ?? initialData)
    const onChangePageRef = useRef(onChangePage)
    const onLoadPageRef = useRef(onLoadPage)

    const handleLoadPage = useCallback(
      async ({ page: currentPage, perPage }) => {
        const res = await onLoadPageRef.current?.({
          page: currentPage,
          perPage,
        })
        if (res?.length > 0) {
          paginationRef.current.setPageData(currentPage, res)
        }
      },
      [],
    )

    const handleChangePage = useCallback(newPage => {
      if (onChangePageRef.current) {
        onChangePageRef.current(newPage)
      } else {
        setPage(newPage)
      }
    }, [])

    const {
      goToFirstPage,
      goToLastPage,
      goToNextPage,
      goToPage,
      goToPreviousPage,
      maxPage,
      page: currentPage,
      pageData,
      paginatedData,
      isLoadingPage,
      perPage,
      reloadPage,
      setPageData,
      setPaginatedData,
    } = usePagination({
      data,
      onChangePage: handleChangePage,
      onLoadPage: onLoadPage ? handleLoadPage : undefined,
      page,
      pageCount,
      perPage: perPageProp,
    })

    useEffect(() => {
      if (pageProp && pageProp !== page) {
        setPage(pageProp)
      }
    }, [pageProp, page])

    useEffect(() => {
      if (dataProp) {
        setData(dataProp)
      }
    }, [dataProp])

    const value = useMemo(() => {
      paginationRef.current = {
        canLoadMore: onLoadPageRef.current,
        data: dataProp,
        goToFirstPage,
        goToLastPage,
        goToNextPage,
        goToPage,
        goToPreviousPage,
        isLoadingPage,
        maxPage,
        page: currentPage,
        pageData,
        paginatedData,
        perPage,
        reloadPage,
        setPageData,
        setPaginatedData,
      }

      return paginationRef.current
    }, [
      goToFirstPage,
      goToLastPage,
      goToNextPage,
      goToPage,
      goToPreviousPage,
      isLoadingPage,
      dataProp,
      maxPage,
      currentPage,
      pageData,
      paginatedData,
      perPage,
      reloadPage,
      setPageData,
      setPaginatedData,
    ])

    useEffect(() => {
      onLoadPageRef.current = onLoadPage
    }, [onLoadPage])

    useEffect(() => {
      onChangePageRef.current = onChangePage
    }, [onChangePage])

    const LoaderComponentToRender =
      !LoaderComponent || React.isValidElement(LoaderComponent) ? (
        LoaderComponent
      ) : (
        <LoaderComponent paginationState={value} pageTabCount={pageTabCount} />
      )

    return (
      <PaginationContext.Provider value={value}>
        {isLoadingPage ? LoaderComponentToRender : null}
        {children && typeof children === 'function' && !isLoadingPage
          ? children(value)
          : null}
        {children && typeof children !== 'function' && !isLoadingPage
          ? children
          : null}
        <PaginationContainer
          paginationState={value}
          pageTabCount={pageTabCount}
          LeftComponent={LeftComponent}
          RightComponent={RightComponent}
          MiddleComponent={MiddleComponent}
        />
      </PaginationContext.Provider>
    )
  },
)

Pagination.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  data: PropTypes.arrayOf(PropTypes.any),
  initialData: PropTypes.arrayOf(PropTypes.any),
  initialPage: PropTypes.number,
  LeftComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  LoaderComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  MiddleComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onChangePage: PropTypes.func,
  onLoadPage: PropTypes.func,
  page: PropTypes.number,
  pageCount: PropTypes.number,
  /**
   * Number of page buttons you want for the default MiddleComponent
   */
  pageTabCount: PropTypes.number,
  perPage: PropTypes.number,
  RightComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
}

Pagination.defaultProps = {
  children: undefined,
  data: undefined,
  initialData: [],
  initialPage: 1,
  LeftComponent: DefaultLeftComponent,
  LoaderComponent: DefaultLoaderComponent,
  MiddleComponent: DefaultMiddleComponent,
  onChangePage: undefined,
  onLoadPage: undefined,
  page: undefined,
  pageCount: undefined,
  pageTabCount: 5,
  perPage: 25,
  RightComponent: DefaultRightComponent,
}

PaginationContainer.propTypes = {
  LeftComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  MiddleComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  pageTabCount: PropTypes.number,
  paginationState: PropTypes.shape({}).isRequired,
  RightComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
}

PaginationContainer.defaultProps = {
  LeftComponent: DefaultLeftComponent,
  MiddleComponent: DefaultMiddleComponent,
  pageTabCount: 5,
  RightComponent: DefaultRightComponent,
}

Pagination.PaginationContainer = PaginationContainer
Pagination.RightComponent = DefaultRightComponent
Pagination.LeftComponent = DefaultLeftComponent
Pagination.MiddleComponent = DefaultMiddleComponent
Pagination.LoaderComponent = DefaultLoaderComponent

export default Pagination
