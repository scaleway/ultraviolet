import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import {
  FunctionComponent,
  ReactNode,
  VoidFunctionComponent,
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
import Button from '../Button'
import getPageNumbers from './getPageNumbers'
import usePagination, { UsePaginationReturn } from './usePagination'

export type PaginationState<T = unknown> = {
  canLoadMore: boolean
  data?: T[] | null
} & UsePaginationReturn<T>

const PaginationContext = createContext<PaginationState>({} as PaginationState)

export const usePaginationContext = <T,>(): PaginationState<T> =>
  useContext(PaginationContext) as PaginationState<T>

// START - Default Components
const DefaultLeftComponent: VoidFunctionComponent<
  PaginationComponentProps
> = () => null

const StyledPageButton = styled(Button, {
  shouldForwardProp: prop => !['current'].includes(prop.toString()),
})<{ current?: boolean }>`
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

export type PaginationComponentProps<T = unknown> = {
  // eslint-disable-next-line react/no-unused-prop-types
  pageTabCount?: number
  paginationState: PaginationState<T>
}

const DefaultMiddleComponent: VoidFunctionComponent<
  PaginationComponentProps
> = ({ pageTabCount, paginationState }) => {
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
    (pageNumber: number) => () => {
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

const DefaultRightComponent: VoidFunctionComponent<
  PaginationComponentProps
> = ({ paginationState: { page } }) => <div>Current : {page}</div>

const StyledActivityContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => `${theme.space['2']} 0`};
`

const DefaultLoaderComponent: VoidFunctionComponent<
  PaginationComponentProps
> = () => (
  <StyledActivityContainer>
    <ActivityIndicator active />
  </StyledActivityContainer>
)

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

type PaginationContainerProps<T = unknown> = PaginationComponentProps<T> & {
  RightComponent?: FunctionComponent<PaginationComponentProps<T>>
  LeftComponent?: FunctionComponent<PaginationComponentProps<T>>
  MiddleComponent?: FunctionComponent<PaginationComponentProps<T>>
}

const PaginationContainer: VoidFunctionComponent<PaginationContainerProps> = ({
  LeftComponent = DefaultLeftComponent,
  MiddleComponent = DefaultMiddleComponent,
  RightComponent = DefaultRightComponent,
  paginationState,
  pageTabCount = 5,
}) => (
  <StyledMainContainer role="navigation">
    <StyledLeftContainer>
      <LeftComponent
        paginationState={paginationState}
        pageTabCount={pageTabCount}
      />
    </StyledLeftContainer>
    <StyledMiddleContainer>
      <MiddleComponent
        paginationState={paginationState}
        pageTabCount={pageTabCount}
      />
    </StyledMiddleContainer>
    <StyledRightContainer>
      <RightComponent
        paginationState={paginationState}
        pageTabCount={pageTabCount}
      />
    </StyledRightContainer>
  </StyledMainContainer>
)

const PaginationComponent = {
  propTypes: {},
}

DefaultLeftComponent.propTypes = PaginationComponent.propTypes
DefaultMiddleComponent.propTypes = PaginationComponent.propTypes
DefaultRightComponent.propTypes = PaginationComponent.propTypes
DefaultLoaderComponent.propTypes = PaginationComponent.propTypes
// END - Default Components

export type PaginationProps<T = unknown> = {
  onLoadPage?: (params: {
    page: number
    perPage?: number
  }) => Promise<void | T | T[]>
  onChangePage?: (newPage: number) => void
  perPage?: number
  data?: T[]
  initialData?: T[]
  initialPage?: number
  page?: number
  pageCount?: number
  RightComponent?: FunctionComponent<PaginationComponentProps<T>>
  LeftComponent?: FunctionComponent<PaginationComponentProps<T>>
  MiddleComponent?: FunctionComponent<PaginationComponentProps<T>>
  LoaderComponent?: FunctionComponent<PaginationComponentProps<T>>
  children: ReactNode
  /**
   * Number of page buttons you want for the default MiddleComponent
   */
  pageTabCount?: number
}

export const PaginationForwardFn = forwardRef<PaginationState, PaginationProps>(
  (
    {
      children,
      data: dataProp,
      initialData = [],
      initialPage = 1,
      page: pageProp,
      pageCount,
      onLoadPage,
      onChangePage,
      perPage: perPageProp = 25,
      LeftComponent = DefaultLeftComponent,
      MiddleComponent = DefaultMiddleComponent,
      RightComponent = DefaultRightComponent,
      LoaderComponent = DefaultLoaderComponent,
      pageTabCount = 5,
    },
    ref,
  ) => {
    const paginationRef = useRef<PaginationState>({} as PaginationState)
    useImperativeHandle(ref, () => paginationRef.current)

    const [page, setPage] = useState(pageProp ?? initialPage)
    const [data, setData] = useState(dataProp ?? initialData)
    const onChangePageRef = useRef(onChangePage)
    const onLoadPageRef = useRef(onLoadPage)

    const handleLoadPage = useCallback(
      async ({
        page: currentPage,
        perPage,
      }: {
        page: number
        perPage?: number
      }) => {
        const res = (await onLoadPageRef.current?.({
          page: currentPage,
          perPage,
        })) as []
        if (res?.length > 0) {
          paginationRef.current.setPageData(currentPage, res)
        }
      },
      [],
    )

    const handleChangePage = useCallback((newPage: number) => {
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
        canLoadMore: onLoadPageRef.current !== undefined,
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

    const TypedPaginationContainer =
      PaginationContainer as FunctionComponent<PaginationContainerProps>

    return (
      <PaginationContext.Provider value={value}>
        {isLoadingPage ? (
          <LoaderComponent
            paginationState={value}
            pageTabCount={pageTabCount}
          />
        ) : null}
        {children && typeof children === 'function' && !isLoadingPage
          ? children(value)
          : null}
        {children && typeof children !== 'function' && !isLoadingPage
          ? children
          : null}
        <TypedPaginationContainer
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

PaginationForwardFn.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.arrayOf(PropTypes.any),
  // eslint-disable-next-line react/forbid-prop-types
  initialData: PropTypes.arrayOf(PropTypes.any),
  initialPage: PropTypes.number,
  LeftComponent: PropTypes.oneOfType([PropTypes.func]),
  LoaderComponent: PropTypes.oneOfType([PropTypes.func]),
  MiddleComponent: PropTypes.oneOfType([PropTypes.func]),
  onChangePage: PropTypes.func,
  onLoadPage: PropTypes.func,
  page: PropTypes.number,
  pageCount: PropTypes.number,
  pageTabCount: PropTypes.number,
  perPage: PropTypes.number,
  RightComponent: PropTypes.oneOfType([PropTypes.func]),
}

PaginationContainer.propTypes = {
  LeftComponent: PropTypes.func,
  MiddleComponent: PropTypes.func,
  pageTabCount: PropTypes.number,
  paginationState: PropTypes.shape({
    canLoadMore: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.arrayOf(PropTypes.any),
    goToFirstPage: PropTypes.func.isRequired,
    goToLastPage: PropTypes.func.isRequired,
    goToNextPage: PropTypes.func.isRequired,
    goToPage: PropTypes.func.isRequired,
    goToPreviousPage: PropTypes.func.isRequired,
    isLoadingPage: PropTypes.bool.isRequired,
    maxPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    pageData: PropTypes.arrayOf(PropTypes.any).isRequired,
    paginatedData: PropTypes.shape({}).isRequired,
    perPage: PropTypes.number,
    reloadPage: PropTypes.func.isRequired,
    setPageData: PropTypes.func.isRequired,
    setPaginatedData: PropTypes.func.isRequired,
  }).isRequired,
  RightComponent: PropTypes.func,
}

type PaginationType<
  T extends Record<string, unknown> = Record<string, string>,
> = typeof PaginationForwardFn & {
  RightComponent: FunctionComponent<PaginationComponentProps<T>>
  LeftComponent: FunctionComponent<PaginationComponentProps<T>>
  PaginationContainer: FunctionComponent<PaginationComponentProps<T>>
  MiddleComponent: FunctionComponent<PaginationComponentProps<T>>
  LoaderComponent: FunctionComponent<PaginationComponentProps<T>>
}

export default {
  ...PaginationForwardFn,
  LeftComponent: DefaultLeftComponent,
  LoaderComponent: DefaultLoaderComponent,
  MiddleComponent: DefaultMiddleComponent,
  PaginationContainer,
  RightComponent: DefaultRightComponent,
} as PaginationType
