import type { Dispatch, SetStateAction } from 'react'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

export type UsePaginationParams<T> = {
  data: T[]
  page: number
  pageCount?: number
  isLoading?: boolean
  onLoadPage?: (params: {
    page: number
    perPage?: number
  }) => Promise<void | T | T[]>
  onChangePage?: (newPage: number) => void
  perPage?: number
}

export type UsePaginationReturn<T> = {
  goToFirstPage: () => void
  goToLastPage: () => void
  goToNextPage: () => void
  goToPage: (newPage: number) => void
  goToPreviousPage: () => void
  isLoadingPage: boolean
  maxPage: number
  page: number
  pageData: T[]
  paginatedData: Record<number, T[]>
  perPage?: number | null
  reloadPage: () => Promise<void | T | T[]> | undefined
  setPageData: (pageToUpdate: number, data: T[]) => void
  setPaginatedData: Dispatch<SetStateAction<Record<number, T[]>>>
}

const usePagination = <T>({
  data,
  page,
  pageCount,
  isLoading,
  onLoadPage,
  onChangePage,
  perPage,
}: UsePaginationParams<T>): UsePaginationReturn<T> => {
  const onChangePageRef = useRef(onChangePage)
  const onLoadPageRef = useRef(onLoadPage)
  const isMounted = useRef(false)
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false)
  const [paginatedData, setPaginatedData] = useState<Record<number, T[]>>(
    perPage
      ? Array.from(
          { length: Math.ceil(data.length / perPage) || 1 },
          (_, index) => index,
        ).reduce((acc, index) => {
          const initialIndex = index * perPage

          return {
            ...acc,
            [index + 1]: data.slice(initialIndex, initialIndex + perPage),
          }
        }, {})
      : { [page]: data },
  )
  const [maxPage, setMaxPage] = useState<number>(
    pageCount ??
      Math.max(...Object.keys(paginatedData).map(value => parseInt(value, 10))),
  )

  useEffect(() => {
    if (isLoading) return
    setMaxPage(
      pageCount ??
        Math.max(
          ...Object.keys(paginatedData).map(value => parseInt(value, 10)),
        ),
    )
  }, [isLoading, pageCount, paginatedData])

  const goToPage = useCallback(
    (wantedPage: number) => {
      if (wantedPage === page) {
        onChangePageRef.current?.(page)
      } else if (wantedPage > maxPage && !onLoadPageRef.current) {
        onChangePageRef.current?.(maxPage)
      } else if (wantedPage < 1) {
        onChangePageRef.current?.(1)
      } else {
        onChangePageRef.current?.(wantedPage)
      }
    },
    [maxPage, page],
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

  const loadPageData = useCallback(
    (pageToLoad: number) => {
      setIsLoadingPage(true)
      onLoadPageRef.current?.({ page: pageToLoad, perPage }).finally(() => {
        if (isMounted.current) {
          setIsLoadingPage(false)
        }
      })
    },
    [perPage],
  )

  useEffect(() => {
    // If it is possible to load a page and not already loading one
    if (
      !isLoadingPage &&
      onLoadPageRef.current &&
      !paginatedData[page]?.length
    ) {
      loadPageData(page)
    }
    // If it's not possible to load page
    if (!onLoadPageRef.current) {
      if (page > maxPage && maxPage > 0) {
        onChangePageRef.current?.(maxPage)
      }
      if (page <= 0) {
        onChangePageRef.current?.(1)
      }
    }
  }, [maxPage, page, perPage, paginatedData, isLoadingPage, loadPageData])

  const setPageData = useCallback(
    (pageToUpdate: number, additionalData: T[]) => {
      setPaginatedData(current => ({
        ...current,
        [pageToUpdate]: additionalData,
      }))
    },
    [],
  )

  useEffect(() => {
    setPaginatedData(
      perPage
        ? Array.from(
            { length: Math.ceil(data.length / perPage) || 1 },
            (_, index) => index,
          ).reduce((acc, index) => {
            const initialIndex = index * perPage

            return {
              ...acc,
              [index + 1]: data.slice(initialIndex, initialIndex + perPage),
            }
          }, {})
        : { [page]: data },
    )
  }, [perPage, data, page])

  useEffect(() => {
    onLoadPageRef.current = onLoadPage
  }, [onLoadPage])

  useEffect(() => {
    onChangePageRef.current = onChangePage
  }, [onChangePage])

  useLayoutEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return {
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
    reloadPage: () => onLoadPageRef.current?.({ page, perPage }),
    setPageData,
    setPaginatedData,
  }
}

export default usePagination
