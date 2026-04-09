import { reactKeys } from '@handlewithcare/react-prosemirror'
import { baseKeymap, toggleMark } from 'prosemirror-commands'
import { keymap } from 'prosemirror-keymap'
import { DOMParser, DOMSerializer, Schema } from 'prosemirror-model'
import { schema as basicSchema } from 'prosemirror-schema-basic'
import {
  addListNodes,
  liftListItem,
  sinkListItem,
  splitListItem,
} from 'prosemirror-schema-list'
import { EditorState } from 'prosemirror-state'

import { createToggleListCommand, escapeHtml } from './helpers'

import type { Node } from 'prosemirror-model'

const nodesWithLists = addListNodes(
  basicSchema.spec.nodes,
  'paragraph block*',
  'block',
)

export const editorSchema: Schema = new Schema({
  nodes: nodesWithLists,
  marks: basicSchema.spec.marks.addToEnd('underline', {
    parseDOM: [
      { tag: 'u' },
      {
        style: 'text-decoration',
        getAttrs: value => (value === 'underline' ? null : false),
      },
    ],
    toDOM: () => ['u', 0],
  }),
})

export const listItemNode = editorSchema.nodes['list_item']
const bulletListNode = editorSchema.nodes['bullet_list']
const orderedListNode = editorSchema.nodes['ordered_list']

export const createPlugins = () => [
  reactKeys(),
  ...(editorSchema.marks['strong']
    ? [
        keymap({
          'Mod-b': toggleMark(editorSchema.marks['strong']),
        }),
      ]
    : []),
  ...(editorSchema.marks['em']
    ? [
        keymap({
          'Mod-i': toggleMark(editorSchema.marks['em']),
        }),
      ]
    : []),
  ...(editorSchema.marks['underline']
    ? [
        keymap({
          'Mod-u': toggleMark(editorSchema.marks['underline']),
        }),
      ]
    : []),
  ...(bulletListNode
    ? [
        keymap({
          'Mod-Shift-8': createToggleListCommand(listItemNode, bulletListNode),
        }),
      ]
    : []),
  ...(orderedListNode
    ? [
        keymap({
          'Mod-Shift-9': createToggleListCommand(listItemNode, orderedListNode),
        }),
      ]
    : []),
  keymap({
    Enter: splitListItem(listItemNode),
    'Mod-[': liftListItem(listItemNode),
    'Mod-]': sinkListItem(listItemNode),
  }),
  keymap(baseKeymap),
]

export const createEditorState = (doc: Node) =>
  EditorState.create({
    schema: editorSchema,
    doc,
    plugins: createPlugins(),
  })

export const docFromHtml = (
  html: string | undefined,
  schema: Schema = editorSchema,
): Node => {
  const normalizedHtml = html ?? ''

  if (normalizedHtml.trim() === '') {
    return schema.nodes['doc'].createAndFill()!
  }

  if (typeof document === 'undefined') {
    return schema.nodes['doc'].createAndFill()!
  }

  const container = document.createElement('div')
  container.innerHTML = normalizedHtml.includes('<')
    ? normalizedHtml
    : `<p>${escapeHtml(normalizedHtml)}</p>`

  return DOMParser.fromSchema(schema).parse(container)
}

export const editorDocToHtml = (
  doc: Node,
  schema: Schema = editorSchema,
): string => {
  if (typeof document === 'undefined') {
    return ''
  }

  const serializer = DOMSerializer.fromSchema(schema)
  const wrap = document.createElement('div')
  wrap.appendChild(serializer.serializeFragment(doc.content))

  return wrap.innerHTML
}
