import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

type ListContextValue<T = Record<string, unknown>> = {
  template: string
  selectable?: boolean
  selectedIds: string[]
  setSelectedIds: Dispatch<SetStateAction<string[]>>
  expandedIds: string[]
  setExpandedIds: Dispatch<SetStateAction<string[]>>
  data: T[]
  idKey: string
  autoClose: boolean
}

const ListContext = createContext<ListContextValue>({} as ListContextValue)

type ListProviderProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  template?: string
  selectable?: boolean
  children: ReactNode
  onSelectedIdsChange?: (selectedIds: string[]) => void
  selectedIds?: string[]
  data: T[]
  idKey?: keyof T
  autoClose?: boolean
}

export const ListProvider = ({
  template = 'repeat(12, 1fr)',
  children,
  selectable,
  selectedIds: selectedIdsProp,
  onSelectedIdsChange,
  data,
  idKey = 'id',
  autoClose = false,
}: ListProviderProps) => {
  const [selectedIds, setSelectedIds] = useState(selectedIdsProp ?? [])
  const [expandedIds, setExpandedIds] = useState<string[]>([])
  const onSelectedIdsChangeRef = useRef(onSelectedIdsChange)

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

export const useListContext = () => useContext(ListContext)
