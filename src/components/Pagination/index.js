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
import usePaginatedData from './usePaginatedData'

const PaginationContext = createContext()
export const usePagination = () => useContext(PaginationContext)

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

const DefaultMiddleComponent = ({ pageTabCount }) => {
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
  } = usePagination()

  const pageNumbersToDisplay = useMemo(
    () => getPageNumbers(page, maxPage, pageTabCount),
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

const DefaultRightComponent = () => {
  const { page } = usePagination()

  return <div>Current : {page}</div>
}

const DefaultLoaderComponent = () => (
  <Box my={2} display="flex" justifyContent="center">
    <ActivityIndicator active />
  </Box>
)

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
      data,
      initialData,
      initialPage,
      page: pageProp,
      pageCount,
      onLoadPage,
      onChangePage,
      perPage,
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

    const onChangePageRef = useRef(onChangePage)
    const [canLoadMore, setCanLoadMore] = useState(!!onLoadPage)
    const [page, setPage] = useState(pageProp ?? initialPage)
    const { paginatedData, setPageData, loadPageData, setPaginatedData } =
      usePaginatedData({
        data,
        initialData,
        onLoadPage,
        perPage,
      })
    const [isLoadingPage, setIsLoadingPage] = useState(false)

    const maxPage = useMemo(() => {
      if (pageCount) return pageCount
      const pageDataCount = Math.max(...Object.keys(paginatedData))

      return pageDataCount
    }, [pageCount, paginatedData])

    const goToPage = useCallback(
      wantedPage => {
        if (!pageProp)
          setPage(current => {
            if (wantedPage === current) {
              return current
            }
            let futurePage = wantedPage
            if (futurePage > maxPage && !canLoadMore) {
              futurePage = maxPage
            }
            if (futurePage < 1) {
              futurePage = 1
            }

            return futurePage
          })
        else onChangePageRef.current?.(wantedPage)
      },
      [maxPage, canLoadMore, pageProp],
    )

    const goToFirstPage = useCallback(() => {
      goToPage(1)
    }, [goToPage])

    const goToLastPage = useCallback(() => {
      goToPage(maxPage)
    }, [maxPage, goToPage])

    const goToNextPage = useCallback(() => {
      goToPage(page + 1)
    }, [page, goToPage])

    const goToPreviousPage = useCallback(() => {
      goToPage(page - 1)
    }, [goToPage, page])

    const loadPage = useCallback(async () => {
      setIsLoadingPage(true)
      const res = await loadPageData(page)
      if (!res || (Array.isArray(res) && res.length === 0)) {
        setPage(page > 1 ? page - 1 : 1)
        setCanLoadMore(false)
      }
      setIsLoadingPage(false)
    }, [loadPageData, page])

    useEffect(() => {
      // If it is possible to load a page and not already loading one
      if (!isLoadingPage && canLoadMore && !paginatedData[page]?.length) {
        loadPage()
      }
      // If it's not possible to load page
      if (!canLoadMore) {
        if (page > maxPage) {
          setPage(maxPage)
        }
        if (page <= 0) {
          setPage(1)
        }
      }
    }, [canLoadMore, isLoadingPage, loadPage, maxPage, page, paginatedData])

    useEffect(() => {
      onChangePageRef.current = onChangePage
    }, [onChangePage])

    useEffect(() => {
      if (pageProp && pageProp !== page) {
        setPage(pageProp)
      }
    }, [pageProp, page, goToPage])

    const value = useMemo(() => {
      paginationRef.current = {
        canLoadMore,
        goToFirstPage,
        goToLastPage,
        goToNextPage,
        goToPage,
        goToPreviousPage,
        isLoadingPage,
        maxPage,
        page,
        pageData: paginatedData[page] || [],
        paginatedData,
        perPage,
        reloadPage: loadPage,
        setPageData,
        setPaginatedData,
      }

      return paginationRef.current
    }, [
      canLoadMore,
      isLoadingPage,
      maxPage,
      page,
      paginatedData,
      perPage,
      goToFirstPage,
      goToLastPage,
      goToNextPage,
      goToPage,
      goToPreviousPage,
      setPageData,
      setPaginatedData,
      loadPage,
    ])

    const LeftComponentToRender =
      !LeftComponent || React.isValidElement(LeftComponent) ? (
        LeftComponent
      ) : (
        <LeftComponent {...value} pageTabCount={pageTabCount} />
      )
    const MiddleComponentToRender =
      !MiddleComponent || React.isValidElement(MiddleComponent) ? (
        MiddleComponent
      ) : (
        <MiddleComponent {...value} pageTabCount={pageTabCount} />
      )
    const RightComponentToRender =
      !RightComponent || React.isValidElement(RightComponent) ? (
        RightComponent
      ) : (
        <RightComponent {...value} pageTabCount={pageTabCount} />
      )
    const LoaderComponentToRender =
      !LoaderComponent || React.isValidElement(LoaderComponent) ? (
        LoaderComponent
      ) : (
        <LoaderComponent {...value} pageTabCount={pageTabCount} />
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
        <StyledMainContainer role="navigation">
          <StyledLeftContainer>{LeftComponentToRender}</StyledLeftContainer>
          <StyledMiddleContainer>
            {MiddleComponentToRender}
          </StyledMiddleContainer>
          <StyledRightContainer>{RightComponentToRender}</StyledRightContainer>
        </StyledMainContainer>
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

export default Pagination
