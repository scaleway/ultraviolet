import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

type ListContextValue<T extends Record<string, unknown>> = {
  template: string
  selectable?: boolean
  selectedIds: string[]
  setSelectedIds: Dispatch<SetStateAction<string[]>>
  expandedIds: string[]
  setExpandedIds: Dispatch<SetStateAction<string[]>>
  data: T[]
  idKey: keyof T extends string ? keyof T : string
  autoClose: boolean
  disabledRowsRef: MutableRefObject<string[]>
}

const ListContext = createContext<
  ListContextValue<Record<string, unknown>> | undefined
>(undefined)

type ListProviderProps<T extends Record<string, unknown>> = {
  template?: string
  selectable?: boolean
  children: ReactNode
  onSelectedIdsChange?: (selectedIds: string[]) => void
  selectedIds?: string[]
  data: T[]
  idKey: keyof T extends string ? keyof T : string
  autoClose?: boolean
}

export const ListProvider = <T extends Record<string, unknown>>({
  template = 'repeat(12, 1fr)',
  children,
  selectable,
  selectedIds: selectedIdsProp,
  onSelectedIdsChange,
  data,
  idKey,
  autoClose = false,
}: ListProviderProps<T>) => {
  const [selectedIds, setSelectedIds] = useState(selectedIdsProp ?? [])
  const [expandedIds, setExpandedIds] = useState<string[]>([])
  const onSelectedIdsChangeRef = useRef(onSelectedIdsChange)
  const disabledRowsRef = useRef<string[]>([])

  useEffect(() => {
    if (selectedIds && onSelectedIdsChangeRef.current) {
      onSelectedIdsChangeRef.current(selectedIds)
    }
  }, [selectedIds])

  useEffect(() => {
    setSelectedIds(current =>
      selectedIdsProp && current !== selectedIdsProp
        ? selectedIdsProp
        : current,
    )
  }, [selectedIdsProp])

  useEffect(() => {
    onSelectedIdsChangeRef.current = onSelectedIdsChange
  }, [onSelectedIdsChange])

  const computedTemplate = useMemo(
    () => (selectable ? `50px ${template}` : template),
    [selectable, template],
  )

  const value = useMemo(
    () => ({
      template: computedTemplate,
      autoClose,
      expandedIds,
      setExpandedIds,
      selectable,
      setSelectedIds,
      selectedIds,
      data,
      idKey,
      disabledRowsRef,
    }),
    [
      computedTemplate,
      expandedIds,
      selectable,
      selectedIds,
      data,
      idKey,
      autoClose,
    ],
  )

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>
}

export const useListContext = <
  T extends Record<string, unknown> = Record<string, unknown>,
>() => {
  const context = useContext(ListContext) as ListContextValue<T>
  if (!context) {
    throw new Error('useListContext should be used inside a List component')
  }

  return context
}
