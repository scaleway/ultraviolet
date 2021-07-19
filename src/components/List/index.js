import PropTypes from 'prop-types'
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import orderBy from '../../utils/orderBy'
import ActivityIndicator from '../ActivityIndicator'
import Box from '../Box'
import Pagination from '../Pagination'
import usePagination from '../Pagination/usePagination'
import Placeholder from '../Placeholder'
import Typography from '../Typography'
import Cell from './Cell'
import SelectBar from './SelectBar'
import ListContext from './context'
import * as variantExplorer from './variantExplorer'
import * as variantProduct from './variantProduct'
import * as variantTable from './variantTable'

const variants = {
  explorer: variantExplorer,
  product: variantProduct,
  table: variantTable,
}

const Body = ({ children, ...props }) => {
  const {
    pageData,
    idKey,
    setRowState,
    rowsState,
    customLoader,
    isLoading,
    emptyListComponent,
    perPage,
  } = useContext(ListContext)

  const defaultLoader = useMemo(() => {
    if (perPage) {
      return <Placeholder length={perPage} variant="list" />
    }

    return (
      <Box display="flex" my={2} justifyContent="center">
        <ActivityIndicator active size={50} />
      </Box>
    )
  }, [perPage])

  if (isLoading === true) {
    return customLoader ?? defaultLoader
  }

  return (
    <Box {...props} role="list">
      {pageData.length === 0 ? emptyListComponent : null}
      {pageData.map((rowData, index) => (
        <React.Fragment key={rowData[idKey] || index}>
          {children({
            index,
            rowData,
            rowState: rowsState[rowData[idKey]] ?? {},
            setRowState,
          })}
        </React.Fragment>
      ))}
    </Box>
  )
}

Body.propTypes = {
  children: PropTypes.func.isRequired,
}

const List = forwardRef(
  (
    {
      idKey,
      isLoading,
      data: dataProp,
      initialData,
      emptyListComponent,
      columns,
      multiselect,
      children,
      customLoader,
      variant,
      selectable,
      autoClose,
      notSelectableText,
      perPage,
      page: pageProp,
      pageCount,
      onLoadPage,
      onChangePage,
      onSortClick,
      paginationProps,
      ...props
    },
    ref,
  ) => {
    const [data, setData] = useState(dataProp ?? initialData)
    const [page, setPage] = useState(pageProp || 1)
    const [rowsState, setRowsState] = useState({})
    const listRef = useRef({})
    useImperativeHandle(ref, () => listRef.current)
    const onLoadPageRef = useRef(onLoadPage)
    const [sort, setSort] = useState(() => {
      const defaultSortCol = columns.find(col => col.defaultSort)
      const indexOfDefaultSort = columns.indexOf(defaultSortCol)

      return {
        index: indexOfDefaultSort > -1 ? indexOfDefaultSort : undefined,
        onSort: defaultSortCol?.onSort,
        order: defaultSortCol?.defaultSort,
        prop: defaultSortCol?.sort,
      }
    })

    const sortedData = useMemo(
      () =>
        sort.prop
          ? [...data].sort(
              sort.onSort?.(sort.prop, sort.order) ||
                orderBy(sort.prop, sort.order),
            )
          : data,
      [data, sort],
    )

    const handleLoadPage = useCallback(
      async params => {
        const res = await onLoadPage({ ...params, sort })
        listRef.current?.pagination.setPageData(params.page, res)
      },
      [sort, onLoadPage],
    )

    const pagination = usePagination({
      data: sortedData,
      onChangePage: onChangePage || setPage,
      onLoadPage: onLoadPage ? handleLoadPage : undefined,
      page,
      pageCount,
      perPage,
    })

    const setRowState = useCallback(
      (localIdKey, state) => {
        // Close other rows if autoClose is enabled
        setRowsState(current => {
          if (autoClose && state.opened) {
            const updateRowsState = Object.keys(current).reduce((acc, id) => {
              acc[id] = { ...current[id], opened: false }

              return acc
            }, {})

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
      columnIndex => {
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
          order: newSort.order,
          page,
          pagination,
          perPage,
        })
        if (onLoadPage && pageCount) {
          pagination.goToFirstPage()
          pagination.setPaginatedData({})
        }
        setSort(newSort)
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
    const selectableItems = useMemo(() => {
      if (isLoading) {
        return {}
      }
      const filteredItems = selectable ? selectable(data) : data

      return filteredItems.reduce((acc, item) => {
        acc[item[idKey]] = true

        return acc
      }, {})
    }, [data, idKey, selectable, isLoading])

    /**
     * Unselect all rows in current page
     */
    const unselectAll = useCallback(() => {
      setRowsState(current => {
        const updateRowsState = Object.keys(current)
          .filter(id => pagination.pageData.find(item => item[idKey] === id))
          .reduce((acc, id) => {
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
      setRowsState(current => {
        const updateRowsState = pagination.pageData
          .filter(item => selectableItems[item[idKey]] === true)
          .reduce((acc, item) => {
            acc[item[idKey]] = { ...current[item[idKey]], selected: true }

            return acc
          }, {})

        return { ...current, ...updateRowsState }
      })
    }, [idKey, selectableItems, pagination])

    /**
     * All rows selected in pages
     */
    const selectedItems =
      !!Object.keys(selectableItems).length &&
      data
        .filter(item => !!selectableItems[item[idKey]])
        .every(item => rowsState[item[idKey]]?.selected)
    /**
     * Has a row selected in a page
     */
    const hasSelectedItems = useMemo(
      () =>
        multiselect &&
        !!pagination.pageData.find(item => rowsState[item.id]?.selected),
      [multiselect, pagination.pageData, rowsState],
    )
    /**
     * Is all rows selected in current page
     */
    const hasAllSelected = useMemo(
      () =>
        !!Object.keys(selectableItems).length &&
        pagination.pageData
          .filter(item => selectableItems[item[idKey]] === true)
          .every(
            item => rowsState[item[idKey]] && rowsState[item[idKey]].selected,
          ),
      [selectableItems, idKey, rowsState, pagination.pageData],
    )
    /**
     * When list is empty
     */
    const emptyListComponentToRender = useMemo(() => {
      if (emptyListComponent) return emptyListComponent

      return (
        <Typography variant="bodyA" m={2} textAlign="center">
          This list is empty.
        </Typography>
      )
    }, [emptyListComponent])

    useEffect(() => {
      onLoadPageRef.current = onLoadPage
    }, [onLoadPage])

    useEffect(() => {
      if (dataProp) setData(dataProp)
    }, [dataProp])

    const value = useMemo(() => {
      listRef.current = {
        hasAllSelected,
        hasSelectedItems,
        pagination,
        selectableItems,
        selectAll,
        selectedItems,
        unselectAll,
      }

      return {
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
        pageCount,
        ...pagination,
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

    return (
      <ListContext.Provider value={value}>
        <Box {...props}>
          {children({
            Body,
            Cell,
            data: pagination.pageData,
            SelectBar,
            ...variants[variant],
          })}
          {pagination.maxPage > 1 ? (
            <Pagination.PaginationContainer
              {...paginationProps}
              paginationState={{ ...pagination, canLoadMore: !!onLoadPage }}
            />
          ) : null}
        </Box>
      </ListContext.Provider>
    )
  },
)

List.defaultProps = {
  autoClose: false,
  customLoader: undefined,
  data: undefined,
  emptyListComponent: undefined,
  idKey: 'id',
  initialData: [],
  isLoading: false,
  multiselect: false,
  notSelectableText: "This row can't be selected",
  onChangePage: undefined,
  onLoadPage: undefined,
  onSortClick: undefined,
  page: undefined,
  pageCount: undefined,
  paginationProps: {
    LeftComponent: Pagination.LeftComponent,
    MiddleComponent: Pagination.MiddleComponent,
    pageTabCount: 5,
    RightComponent: Pagination.RightComponent,
  },
  perPage: undefined,
  selectable: undefined,
  variant: 'product',
}

List.propTypes = {
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
    }),
  ).isRequired,
  /**
   * Custom Loader to display when isLoading is true
   */
  customLoader: PropTypes.node,
  /**
   * For a controlled List
   */
  data: PropTypes.arrayOf(PropTypes.shape({})),
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
  initialData: PropTypes.arrayOf(PropTypes.shape({})),
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

export default List
