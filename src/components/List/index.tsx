import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import {
  ForwardedRef,
  Fragment,
  ReactElement,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import orderBy from '../../utils/orderBy'
import Box from '../Box'
import Pagination from '../Pagination'
import type { PaginationProps } from '../Pagination'
import usePagination, { UsePaginationReturn } from '../Pagination/usePagination'
import Placeholder from '../Placeholder'
import Text from '../Text'
import SelectBar, { ListSelectBarProps } from './SelectBar'
import ListContext, { useListContext } from './context'
import type {
  ExpandedContentProps,
  ListColumn,
  ListOrder,
  ListRowProps,
  ListRowState,
  ListSort,
} from './types'
import * as variantExplorer from './variantExplorer'
import * as variantProduct from './variantProduct'
import * as variantTable from './variantTable'

const variants = {
  explorer: variantExplorer,
  product: variantProduct,
  table: variantTable,
}
type ListVariant = keyof typeof variants
type ListRowStates = Record<string, ListRowState>

export type ListRefType<DataType> = {
  hasAllSelected: boolean
  hasSelectedItems: boolean
  pagination: UsePaginationReturn<DataType>
  selectableItems: { [x: string]: boolean }
  selectAll: () => void
  selectedItems: []
  unselectAll: () => void
}

export type ListBodyRenderProps<DataType> = {
  index: number
  rowData: DataType
  rowState: ListRowState
  setRowState: (localIdKey: string, state: ListRowState) => void
}

type BodyProps<DataType> = {
  children: (props: ListBodyRenderProps<DataType>) => JSX.Element
}

const CenteredText = styled(Text)`
  text-align: center;
  margin: ${({ theme }) => theme.space['2']};
`

function Body<DataType extends Record<string, unknown>>({
  children,
  ...props
}: BodyProps<DataType>) {
  const {
    pageData,
    idKey,
    setRowState,
    rowsState,
    customLoader,
    isLoading,
    emptyListComponent,
    perPage,
    columns,
  } = useListContext<DataType>()

  if (isLoading) {
    return (
      (customLoader as JSX.Element) ?? (
        <Placeholder length={perPage} col={columns.length} variant="list" />
      )
    )
  }

  return (
    <Box {...props} role="list">
      {pageData.length === 0 ? emptyListComponent : null}
      {pageData.map((rowData, index) => (
        <Fragment key={(rowData[idKey] as string) || index}>
          {children({
            index,
            rowData,
            rowState: rowsState[rowData[idKey] as keyof typeof rowsState] ?? {},
            setRowState,
          } as ListBodyRenderProps<DataType>)}
        </Fragment>
      ))}
    </Box>
  )
}

Body.propTypes = {
  children: PropTypes.func.isRequired,
}

export type ListProps<DataType> = {
  idKey?: string
  isLoading?: boolean
  data?: DataType[]
  initialData?: DataType[]
  emptyListComponent?: ReactNode
  columns: ListColumn<DataType>[]
  multiselect?: boolean
  children: (props: {
    Body: (props: BodyProps<DataType>) => JSX.Element
    Cell:
      | ((props: { children: ReactNode }) => ReactElement | null)
      | ((props: { children: ReactNode }) => ReactElement | null)
    data: DataType[]
    SelectBar: (props: ListSelectBarProps<DataType>) => JSX.Element | null
    Header: () => JSX.Element
    Row: (props: ListRowProps) => JSX.Element
    ExpendableContent: (props: ExpandedContentProps) => JSX.Element
  }) => ReactElement
  customLoader?: ReactNode
  variant?: ListVariant
  selectable?: (data: DataType[]) => DataType[]
  autoClose?: boolean
  notSelectableText?: string
  perPage?: number
  page?: number
  pageCount?: number
  onLoadPage?: (params: {
    page: number
    perPage?: number
    sort: ListSort<DataType>
  }) => Promise<void | DataType[]>
  onChangePage?: (newPage: number) => void
  onSortClick?: (params: {
    field?: string | ((item: DataType) => string) | null
    order: ListOrder
    page: number
    // TODO Change this when Pagination migration is merged
    pagination: unknown
    perPage?: number
  }) => void
  // TODO Change this when Pagination migration is merged
  paginationProps?: Partial<PaginationProps<DataType>>
}

function List<DataType extends Record<string, unknown>>(
  {
    idKey = 'id',
    isLoading = false,
    data: dataProp,
    initialData = [],
    emptyListComponent,
    columns,
    multiselect = false,
    children,
    customLoader,
    variant = 'product',
    selectable,
    autoClose,
    notSelectableText = "This row can't be selected",
    perPage,
    page: pageProp,
    pageCount,
    onLoadPage,
    onChangePage,
    onSortClick,
    paginationProps = {
      pageTabCount: 5,
    },
    ...props
  }: ListProps<DataType>,
  ref: ForwardedRef<ListRefType<DataType>>,
) {
  const [data, setData] = useState(dataProp ?? initialData)
  const [page, setPage] = useState(pageProp || 1)
  const [rowsState, setRowsState] = useState({} as ListRowStates)
  const listRef = useRef({} as ListRefType<DataType>)
  useImperativeHandle(ref, () => listRef.current)
  const onLoadPageRef = useRef(onLoadPage)
  const [sort, setSort] = useState<ListSort<DataType>>(() => {
    const defaultSortCol = columns.find(col => col.defaultSort)
    let indexOfDefaultSort = -1
    if (defaultSortCol) {
      indexOfDefaultSort = columns.indexOf(defaultSortCol)
    }

    return {
      index: indexOfDefaultSort,
      onSort: defaultSortCol?.onSort,
      order: defaultSortCol?.defaultSort || undefined,
      prop: defaultSortCol?.sort || undefined,
    }
  })

  const sortedData = useMemo(
    () =>
      sort.prop
        ? [...data].sort(
            sort.onSort?.(sort.prop, sort.order as 'asc' | 'desc') ||
              orderBy(sort.prop, sort.order as 'asc' | 'desc'),
          )
        : data,
    [data, sort],
  )

  const handleLoadPage = useCallback(
    async (params: { page: number; perPage?: number }) => {
      const res = (await onLoadPage?.({ ...params, sort })) as DataType[]
      listRef.current?.pagination.setPageData(params.page, res)
    },
    [sort, onLoadPage],
  )

  const pagination = usePagination({
    data: sortedData,
    isListLoading: isLoading,
    onChangePage: onChangePage || setPage,
    onLoadPage: onLoadPage ? handleLoadPage : undefined,
    page,
    pageCount,
    perPage,
  })

  const setRowState = useCallback(
    (localIdKey: string, state: ListRowState) => {
      // Close other rows if autoClose is enabled
      setRowsState((current: ListRowStates) => {
        if (autoClose && state.opened) {
          const updateRowsState = Object.keys(current).reduce<ListRowStates>(
            (acc, id) => {
              acc[id] = { ...current[id], opened: false }

              return acc
            },
            {},
          )

          return {
            ...updateRowsState,
            [localIdKey]: { ...current[localIdKey], ...state },
          }
        }

        return {
          ...current,
          [localIdKey]: { ...current[localIdKey], ...state },
        }
      })
    },
    [autoClose],
  )

  const onSort = useCallback(
    (columnIndex: number) => {
      const newSort = {
        index: columnIndex,
        onSort: columns[columnIndex].onSort,
        order:
          columns[columnIndex].sort === sort.prop && sort.order === 'asc'
            ? 'desc'
            : 'asc',
        prop: columns[columnIndex].sort,
      }
      onSortClick?.({
        field: newSort.prop,
        order: newSort.order as ListOrder,
        page,
        pagination,
        perPage,
      })
      if (onLoadPage && pageCount) {
        pagination.goToFirstPage()
        pagination.setPaginatedData({})
      }
      setSort(newSort as ListSort<DataType>)
    },
    [
      columns,
      sort.order,
      sort.prop,
      onSortClick,
      perPage,
      pageCount,
      page,
      pagination,
      onLoadPage,
    ],
  )

  // Define which row are selectable
  const selectableItems = useMemo<{
    [x: string]: boolean
  }>(() => {
    if (isLoading) {
      return {}
    }
    const filteredItems = selectable ? selectable(data) : data

    return filteredItems.reduce<Record<string, boolean>>((acc, item) => {
      acc[item[idKey] as string] = true

      return acc
    }, {})
  }, [data, idKey, selectable, isLoading])

  /**
   * Unselect all rows in current page
   */
  const unselectAll = useCallback(() => {
    setRowsState((current: ListRowStates) => {
      const updateRowsState = Object.keys(current)
        .filter(id =>
          (pagination.pageData as []).find(item => item[idKey] === id),
        )
        .reduce<ListRowStates>((acc, id) => {
          acc[id] = { ...current[id], selected: false }

          return acc
        }, {})

      return { ...current, ...updateRowsState }
    })
  }, [idKey, pagination])

  /**
   * Select all rows in current page
   */
  const selectAll = useCallback(() => {
    setRowsState((current: ListRowStates) => {
      const updateRowsState = pagination.pageData
        .filter(
          item => selectableItems[item[idKey] as keyof typeof selectableItems],
        )
        .reduce<ListRowStates>((acc, item) => {
          acc[item[idKey] as keyof typeof acc] = {
            ...current[item[idKey] as string],
            selected: !current[item[idKey] as string]?.disabled,
          }

          return acc
        }, {})

      return { ...current, ...updateRowsState }
    })
  }, [idKey, selectableItems, pagination])

  /**
   * All rows selected in pages
   */
  const selectedItems = useMemo<DataType[]>(
    () =>
      Object.keys(selectableItems).length > 0
        ? data.filter(
            item =>
              !!selectableItems[item[idKey] as string] &&
              rowsState[item[idKey] as string]?.selected,
          )
        : [],
    [data, idKey, rowsState, selectableItems],
  )

  /**
   * Has a row selected in a page
   */
  const hasSelectedItems = useMemo(
    () =>
      multiselect &&
      !!(pagination.pageData as []).find(
        item => rowsState[item[idKey] as string]?.selected,
      ),
    [multiselect, pagination.pageData, rowsState, idKey],
  )
  /**
   * Is all rows selected in current page
   */
  const hasAllSelected = useMemo(
    () =>
      Object.keys(selectableItems).length > 0 &&
      (pagination.pageData as [])
        .filter(item => selectableItems[item[idKey] as string] === true)
        .every(
          item =>
            rowsState[item[idKey] as string] &&
            (rowsState[item[idKey] as string].selected ||
              rowsState[item[idKey] as string].disabled),
        ),
    [selectableItems, idKey, rowsState, pagination.pageData],
  )
  /**
   * When list is empty
   */
  const emptyListComponentToRender = useMemo(() => {
    if (emptyListComponent) return emptyListComponent

    return (
      <CenteredText variant="body" as="p">
        This list is empty.
      </CenteredText>
    )
  }, [emptyListComponent])

  useEffect(() => {
    onLoadPageRef.current = onLoadPage
  }, [onLoadPage])

  useEffect(() => {
    if (dataProp) setData(dataProp)
  }, [dataProp])

  useEffect(() => {
    if (pageProp) setPage(pageProp)
  }, [pageProp])

  const value = useMemo(() => {
    listRef.current = {
      hasAllSelected,
      hasSelectedItems,
      pagination,
      selectableItems,
      selectAll,
      selectedItems: selectedItems as [],
      unselectAll,
    }

    return {
      ...pagination,
      columns,
      customLoader,
      data: sortedData,
      emptyListComponent: emptyListComponentToRender,
      hasAllSelected,
      hasSelectedItems,
      idKey,
      isLoading: isLoading || pagination.isLoadingPage,
      multiselect,
      notSelectableText,
      onSort,
      page,
      pageCount: pageCount ?? 1,
      perPage,
      rowsState,
      selectableItems,
      selectAll,
      selectedItems,
      setRowState,
      sortedIndex: sort.index,
      sortOrder: sort.order,
      unselectAll,
    }
  }, [
    columns,
    customLoader,
    emptyListComponentToRender,
    hasAllSelected,
    hasSelectedItems,
    idKey,
    isLoading,
    multiselect,
    notSelectableText,
    onSort,
    page,
    pageCount,
    pagination,
    perPage,
    rowsState,
    selectableItems,
    selectAll,
    selectedItems,
    setRowState,
    sort.order,
    sort.index,
    sortedData,
    unselectAll,
  ])

  const childrenProps = useMemo(() => {
    const variantFound = variants[variant]

    return {
      Body,
      SelectBar: SelectBar<DataType>,
      ...variantFound,
      Cell: variantFound.Cell,
      ExpendableContent:
        (variantFound as typeof variantProduct).ExpendableContent ??
        (() => null),
    }
  }, [variant])

  return (
    <ListContext.Provider value={value}>
      <Box {...props}>
        {children({
          data: pagination.pageData,
          ...childrenProps,
        })}
        {pagination.maxPage > 1 ? (
          <Pagination.PaginationContainer
            {...paginationProps}
            // @ts-expect-error Pagination types are funky and does not allow generics yet
            paginationState={{ ...pagination, canLoadMore: !!onLoadPage }}
          />
        ) : null}
      </Box>
    </ListContext.Provider>
  )
}

const propTypes = {
  /**
   * Auto close opened ExpandableContent when clicking on another row
   */
  autoClose: PropTypes.bool,
  /**
   * @param {{
   *  Body,
   *  Row,
   *  Cell,
   *  ExpendableContent,
   *  SelectBar,
   *  data
   * }} list Components to build your list. `ExpandableContent` is only available with `product` variant.
   * @returns {JSX.Element} The React component to render
   */
  children: PropTypes.func.isRequired,
  /**
   * Columns of the list.
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      justifyContent: PropTypes.string,
      label: PropTypes.string,
      onSort: PropTypes.func,
      padding: PropTypes.string,
      sort: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      width: PropTypes.string,
    }).isRequired,
  ).isRequired,
  /**
   * Custom Loader to display when isLoading is true
   */
  customLoader: PropTypes.node,
  /**
   * For a controlled List
   */
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array,
  /**
   * Custom empty list component
   */
  emptyListComponent: PropTypes.node,
  /**
   * Used to manage row state. Enter an unique property of your row
   */
  idKey: PropTypes.string,
  /**
   * For an uncontrolled List
   */
  // eslint-disable-next-line react/forbid-prop-types
  initialData: PropTypes.array,
  /**
   * Display a Loader
   */
  isLoading: PropTypes.bool,
  /**
   * Does the list need to display a checkbox
   */
  multiselect: PropTypes.bool,
  /**
   * Text to display in a tooltip on rows that can't be selected
   */
  notSelectableText: PropTypes.string,
  /**
   * @param {number} newPage The new page
   */
  onChangePage: PropTypes.func,
  /**
   * @param {{page, perPage, sort, order}} params The params to load the page
   * @returns {*} The array or object to store in the page
   */
  onLoadPage: PropTypes.func,
  /**
   * @param {{page, perPage, sort, order}} params The params to sort the list
   */
  onSortClick: PropTypes.func,
  /**
   * Initial page (needs perPage)
   */
  page: PropTypes.number,
  /**
   * If you known the page you have (needs perPage)
   */
  pageCount: PropTypes.number,
  /**
   * Additional props to pass to the Pagination component
   */
  paginationProps: PropTypes.shape(Pagination.propTypes),
  /**
   * Number of item per page
   */
  perPage: PropTypes.number,
  /**
   * @param {Array} data The list of all items
   * @returns {Array} The list of items that can be selected
   */
  selectable: PropTypes.func,
  variant: PropTypes.oneOf(['product', 'table', 'explorer']),
}

const ForwardedList = forwardRef(List) as <DataType>(
  props: ListProps<DataType> & { ref?: ForwardedRef<ListRefType<DataType>> },
) => ReturnType<typeof List>

// @ts-expect-error proptypes funky
ForwardedList.propTypes = propTypes

export default ForwardedList
