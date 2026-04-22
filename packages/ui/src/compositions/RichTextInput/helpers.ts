import { liftListItem, wrapInList } from 'prosemirror-schema-list'

import type { NodeType } from 'prosemirror-model'
import type { EditorState, Transaction } from 'prosemirror-state'

export const escapeHtml = (text: string) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

export const isSelectionInNodeType = (
  state: EditorState,
  nodeType: NodeType,
) => {
  const { $from } = state.selection

  for (let d = $from.depth; d > 0; d -= 1) {
    if ($from.node(d).type === nodeType) {
      return true
    }
  }

  return false
}

export const createToggleListCommand =
  (listItemType: NodeType, listType: NodeType) =>
  (state: EditorState, dispatch?: (tr: Transaction) => void) => {
    const isInListItem = isSelectionInNodeType(state, listItemType)
    const isInTargetList = isSelectionInNodeType(state, listType)

    return (
      isInTargetList && isInListItem
        ? liftListItem(listItemType)
        : wrapInList(listType)
    )(state, dispatch)
  }
