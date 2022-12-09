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
import { ListDataObject } from './types'

type ListContextValue<T> = {
  template: string
  isSelectable?: boolean
  selectedIds: string[]
  setSelectedIds: Dispatch<SetStateAction<string[]>>
  expandedIds: string[]
  setExpandedIds: Dispatch<SetStateAction<string[]>>
  data: T[]
  idKey: T extends ListDataObject ? keyof T : string
  autoClose: boolean
  disabledRowsRef: MutableRefObject<string[]>
}

const ListContext = createContext<ListContextValue<unknown> | undefined>(
  undefined,
)

type ListProviderProps<T> = {
  template?: string
  isSelectable?: boolean
  children: ReactNode
  onSelectedIdsChange?: (selectedIds: string[]) => void
  selectedIds?: string[]
  data: T[]
  idKey: T extends ListDataObject ? keyof T : string
  autoClose?: boolean
}

export const ListProvider = <T,>({
  template = 'repeat(12, 1fr)',
  children,
  isSelectable,
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
    () => (isSelectable ? `50px ${template}` : template),
    [isSelectable, template],
  )

  const value = useMemo(
    () => ({
      template: computedTemplate,
      autoClose,
      expandedIds,
      setExpandedIds,
      isSelectable,
      setSelectedIds,
      selectedIds,
      data,
      idKey,
      disabledRowsRef,
    }),
    [
      computedTemplate,
      expandedIds,
      isSelectable,
      selectedIds,
      data,
      idKey,
      autoClose,
    ],
  )

  return (
    <ListContext.Provider value={value as ListContextValue<unknown>}>
      {children}
    </ListContext.Provider>
  )
}

export const useListContext = <T extends ListDataObject = ListDataObject>() => {
  const context = useContext(ListContext)
  if (!context) {
    throw new Error('useListContext should be used inside a List component')
  }

  return context as ListContextValue<T>
}
