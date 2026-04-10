import {
  useEditorEventCallback,
  useEditorState,
} from '@handlewithcare/react-prosemirror'
import {
  BoldIcon,
  ItalicIcon,
  ListBulletIcon,
  ListNumberIcon,
  UnderlineIcon,
} from '@ultraviolet/icons'
import { toggleMark } from 'prosemirror-commands'
import { liftListItem, wrapInList } from 'prosemirror-schema-list'

import { Button } from '../../components/Button'
import { Stack } from '../../components/Stack'

import { isSelectionInNodeType } from './helpers'

import type { MarkType } from 'prosemirror-model'
import type { EditorState, Transaction } from 'prosemirror-state'

type ToolbarProps = {
  disabled?: boolean
  showList: boolean
  showMarks: boolean
}
type EditorCommand = (
  state: EditorState,
  dispatch?: (tr: Transaction) => void,
) => boolean

const isMarkActive = (state: EditorState, markType?: MarkType) => {
  if (!markType) {
    return false
  }

  const { from, $from, to, empty } = state.selection

  if (empty) {
    const marks = state.storedMarks ?? $from.marks()

    return Boolean(markType.isInSet(marks))
  }

  return state.doc.rangeHasMark(from, to, markType)
}

export const Toolbar = ({ disabled, showList, showMarks }: ToolbarProps) => {
  const editorState = useEditorState()
  const runCommand = useEditorEventCallback((view, command: EditorCommand) => {
    command(view.state, view.dispatch)
  })

  const strongMark = editorState.schema.marks['strong']
  const emMark = editorState.schema.marks['em']
  const underlineMark = editorState.schema.marks['underline']

  const bulletList = editorState.schema.nodes['bullet_list']
  const orderedList = editorState.schema.nodes['ordered_list']
  const listItem = editorState.schema.nodes['list_item']
  const isInBulletList = isSelectionInNodeType(editorState, bulletList)
  const isInOrderedList = isSelectionInNodeType(editorState, orderedList)

  return (
    <Stack alignItems="center" direction="row" gap={1}>
      {showMarks ? (
        <Stack alignItems="center" direction="row" gap={1}>
          <Button
            disabled={disabled}
            size="small"
            variant={isMarkActive(editorState, strongMark) ? 'filled' : 'ghost'}
            onMouseDown={event => {
              event.preventDefault()
              if (strongMark) {
                runCommand(toggleMark(strongMark))
              }
            }}
          >
            <BoldIcon />
          </Button>
          <Button
            disabled={disabled}
            size="small"
            variant={isMarkActive(editorState, emMark) ? 'filled' : 'ghost'}
            onMouseDown={event => {
              event.preventDefault()
              if (emMark) {
                runCommand(toggleMark(emMark))
              }
            }}
          >
            <ItalicIcon />
          </Button>
          <Button
            disabled={disabled}
            size="small"
            variant={
              isMarkActive(editorState, underlineMark) ? 'filled' : 'ghost'
            }
            onMouseDown={event => {
              event.preventDefault()
              if (underlineMark) {
                runCommand(toggleMark(underlineMark))
              }
            }}
          >
            <UnderlineIcon />
          </Button>
        </Stack>
      ) : null}
      {showList ? (
        <Stack alignItems="center" direction="row" gap={1}>
          <Button
            disabled={disabled || isInOrderedList}
            size="small"
            variant={isInBulletList ? 'filled' : 'ghost'}
            onMouseDown={event => {
              event.preventDefault()
              runCommand(
                isInBulletList
                  ? liftListItem(listItem)
                  : wrapInList(bulletList),
              )
            }}
          >
            <ListBulletIcon />
          </Button>
          <Button
            disabled={disabled || isInBulletList}
            size="small"
            variant={isInOrderedList ? 'filled' : 'ghost'}
            onMouseDown={event => {
              event.preventDefault()
              runCommand(
                isInOrderedList
                  ? liftListItem(listItem)
                  : wrapInList(orderedList),
              )
            }}
          >
            <ListNumberIcon />
          </Button>
        </Stack>
      ) : null}
    </Stack>
  )
}
