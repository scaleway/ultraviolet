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
import Pagination, { usePagination } from '../Pagination'
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

const Body = ({ children, emptyListText, ...props }) => {
  const { data, idKey, setRowState, rowsState, customLoader, isLoading } =
    useContext(ListContext)

  if (isLoading === true) {
    return (
      customLoader ?? (
        <Box display="flex" my={2} justifyContent="center" {...props}>
          <ActivityIndicator active size={50} />
        </Box>
      )
    )
  }

  return (
    <Box {...props} role="list">
      {data.length === 0 ? (
        <Typography variant="bodyA" m={2} textAlign="center">
          {emptyListText}
        </Typography>
      ) : null}
      {data.map((rowData, index) => (
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
  /**
   * Text to display when having no data or empty data
   */
  emptyListText: PropTypes.string,
}

Body.defaultProps = {
  emptyListText: 'This list is empty.',
}
const PaginatedBody = ({ children, emptyListText, ...props }) => {
  const { idKey, setRowState, rowsState } = useContext(ListContext)
  const { pageData, perPage } = usePagination()

  return (
    <Box {...props} role="list">
      {pageData.length === 0 ? (
        <Placeholder length={perPage} variant="list" />
      ) : null}
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

PaginatedBody.propTypes = {
  children: PropTypes.func.isRequired,
  /**
   * Text to display when having no data or empty data
   */
  emptyListText: PropTypes.string,
}

PaginatedBody.defaultProps = {
  emptyListText: 'This list is empty.',
}

const List = forwardRef(
  (
    {
      idKey,
      isLoading,
      data,
      columns,
      multiselect,
      children,
      customLoader,
      variant,
      selectable,
      autoClose,
      notSelectableText,
      perPage,
      page,
      pageCount,
      onLoadPage,
      onSortClick,
      ...props
    },
    ref,
  ) => {
    const paginationRef = useRef(null)
    // Used to make listRef methods available outside
    const listRef = useRef(null)
    useImperativeHandle(ref, () => listRef.current)

    // Used to handle List with page loading
    const onLoadPageRef = useRef(onLoadPage)

    // Define which row/item are selectable
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

    // BEGIN: Row status
    // Row Status (selected, opened ....)
    const [rowsState, setRowsState] = useState({})

    const setRowState = useCallback(
      (localIdKey, state) => {
        // Close other rows if autoClose is enabled
        if (autoClose && state.opened) {
          const updateRowsState = Object.keys(rowsState).reduce((acc, id) => {
            acc[id] = { ...rowsState[id], opened: false }

            return acc
          }, {})
          setRowsState({
            ...updateRowsState,
            [localIdKey]: { ...rowsState[localIdKey], ...state },
          })
        } else {
          setRowsState({
            ...rowsState,
            [localIdKey]: { ...rowsState[localIdKey], ...state },
          })
        }
      },
      [autoClose, rowsState],
    )
    // END: Row status

    //
    // BEGIN: Data sorting
    //
    const defaultSortCol = columns.find(col => col.defaultSort)
    const indexOfDefaultSort = columns.indexOf(defaultSortCol)

    const [sort, setSort] = useState({
      index: indexOfDefaultSort > -1 ? indexOfDefaultSort : undefined,
      onSort: defaultSortCol?.onSort,
      order: defaultSortCol?.defaultSort,
      prop: defaultSortCol?.sort,
    })

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
          page: paginationRef.current?.page,
          pagination: paginationRef.current,
          perPage,
        })
        if (onLoadPageRef.current && pageCount) {
          paginationRef.current?.goToFirstPage()
          paginationRef.current?.setPaginatedData({})
        }
        setSort(newSort)
      },
      [columns, sort.order, sort.prop, onSortClick, perPage, pageCount],
    )

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
    //
    // END: Data Sorting
    //

    const handleLoadPage = useCallback(
      params => onLoadPageRef.current?.({ ...params, sort }),
      [sort],
    )

    /**
     * Unselect all row (only with mutliselect enabled)
     */
    const unselectAll = useCallback(() => {
      const updateRowsState = Object.keys(rowsState).reduce((acc, id) => {
        acc[id] = { ...rowsState[id], selected: false }

        return acc
      }, {})
      setRowsState(updateRowsState)
    }, [rowsState])

    /**
     * Select all row (only with mutliselect enabled)
     */
    const selectAll = useCallback(() => {
      const updateRowsState = data
        .filter(item => selectableItems[item[idKey]] === true)
        .reduce((acc, item) => {
          acc[item[idKey]] = { ...rowsState[item[idKey]], selected: true }

          return acc
        }, {})
      setRowsState({ ...rowsState, ...updateRowsState })
    }, [idKey, data, rowsState, selectableItems])

    /**
     * Get all selected rows (only with mutliselect enabled)
     */
    const selectedItems =
      !!Object.keys(selectableItems).length &&
      data
        .filter(item => !!selectableItems[item[idKey]])
        .every(item => rowsState[item[idKey]]?.selected)

    /**
     * True or false if there is at least one item selected (only with mutliselect enabled)
     */
    const hasSelectedItems = useMemo(
      () => multiselect && !!data.find(item => rowsState[item.id]?.selected),
      [multiselect, data, rowsState],
    )

    const hasAllSelected =
      !!Object.keys(selectableItems).length &&
      data
        .filter(item => selectableItems[item[idKey]] === true)
        .every(
          item => rowsState[item[idKey]] && rowsState[item[idKey]].selected,
        )

    useEffect(() => {
      onLoadPageRef.current = onLoadPage
    }, [onLoadPage])

    const value = useMemo(() => {
      listRef.current = {
        hasAllSelected,
        hasSelectedItems,
        paginationRef,
        selectAll,
        selectableItems,
        selectedItems,
        unselectAll,
      }

      return {
        columns,
        customLoader,
        data: sortedData,
        hasAllSelected,
        hasSelectedItems,
        idKey,
        isLoading,
        multiselect,
        notSelectableText,
        onSort,
        page,
        pageCount,
        paginationRef,
        perPage,
        rowsState,
        selectAll,
        selectableItems,
        selectedItems,
        setRowState,
        sortOrder: sort.order,
        sortedIndex: sort.index,
        unselectAll,
      }
    }, [
      columns,
      customLoader,
      hasAllSelected,
      hasSelectedItems,
      idKey,
      isLoading,
      multiselect,
      notSelectableText,
      onSort,
      page,
      pageCount,
      perPage,
      rowsState,
      selectAll,
      selectableItems,
      selectedItems,
      setRowState,
      sort.order,
      sort.index,
      sortedData,
      unselectAll,
    ])

    if (perPage) {
      return (
        <ListContext.Provider value={value}>
          <Pagination
            data={onLoadPage ? undefined : sortedData}
            ref={paginationRef}
            perPage={perPage}
            pageCount={pageCount}
            page={page}
            onLoadPage={handleLoadPage}
            canLoadMore={!!onLoadPage}
            LoaderComponent={() =>
              customLoader ?? (
                <>
                  <Placeholder length={perPage} variant="list" />
                  <SelectBar />
                </>
              )
            }
          >
            <Box {...props}>
              {children({
                Body: PaginatedBody,
                Cell,
                SelectBar,
                data,
                ...variants[variant],
              })}
            </Box>
          </Pagination>
        </ListContext.Provider>
      )
    }

    return (
      <ListContext.Provider value={value}>
        <Box {...props}>
          {children({
            Body,
            Cell,
            SelectBar,
            data,
            ...variants[variant],
          })}
        </Box>
      </ListContext.Provider>
    )
  },
)

List.defaultProps = {
  autoClose: false,
  customLoader: undefined,
  data: [],
  idKey: 'id',
  isLoading: false,
  multiselect: false,
  notSelectableText: "This row can't be selected",
  onLoadPage: undefined,
  onSortClick: undefined,
  page: undefined,
  pageCount: undefined,
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
  data: PropTypes.arrayOf(PropTypes.shape({})),
  /**
   * Used to manage row state. Enter an unique property of your row
   */
  idKey: PropTypes.string,
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
