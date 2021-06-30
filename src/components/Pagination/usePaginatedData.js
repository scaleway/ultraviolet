import { useCallback, useEffect, useRef, useState } from 'react'

const usePaginatedData = ({
  data: dataProp,
  initialData,
  perPage,
  onLoadPage,
}) => {
  const onLoadPageRef = useRef(onLoadPage)
  const [data, setData] = useState(() => {
    const init = dataProp || initialData

    return Array.from(
      { length: Math.ceil(init.length / perPage) || 1 },
      (_, index) => index,
    ).reduce((acc, index) => {
      const initialIndex = index * perPage

      return {
        ...acc,
        [index + 1]: init.slice(initialIndex, initialIndex + perPage),
      }
    }, {})
  })

  const setPageData = useCallback((page, additionalData) => {
    setData(current => ({
      ...current,
      [page]: additionalData,
    }))
  }, [])

  const loadPageData = useCallback(
    async page => {
      const newData = await onLoadPageRef.current?.({ page, perPage })
      if (newData) {
        setData(current => ({
          ...current,
          [page]: newData,
        }))
      }

      return newData
    },
    [perPage],
  )

  useEffect(() => {
    if (dataProp)
      setData(
        Array.from(
          { length: Math.ceil(dataProp.length / perPage) || 1 },
          (_, index) => index,
        ).reduce((acc, index) => {
          const initialIndex = index * perPage

          return {
            ...acc,
            [index + 1]: dataProp.slice(initialIndex, initialIndex + perPage),
          }
        }, {}),
      )
  }, [perPage, dataProp])

  useEffect(() => {
    onLoadPageRef.current = onLoadPage
  }, [onLoadPage])

  return {
    loadPageData,
    paginatedData: data,
    setPageData,
    setPaginatedData: setData,
  }
}

export default usePaginatedData
