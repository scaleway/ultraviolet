import { useState } from 'react'

import { RichTextEditor } from '..'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

import type { StoryFn } from '@storybook/react-vite'

const PLAIN_TEXT_VALUE = 'Hello, world!'

const HTML_VALUE = `<p>Un exemple avec du <strong>gras</strong>, de l’<em>italique</em> et du <u>souligné</u>.</p>`

const LIST_VALUE = `<ul><li>Premier élément</li><li>Deuxième élément</li></ul>`

const LONG_VALUE = `<p>A long time ago, in a galaxy far, far away, amidst the swirling constellations and distant star systems, there existed a realm of unimaginable wonders and ancient mysteries waiting to be discovered.</p>
<p>This distant galaxy, filled with countless planets, moons, and celestial phenomena, was home to diverse civilizations, each with their own unique cultures, histories, and legends.</p>`

export const Examples: StoryFn<typeof RichTextEditor> = () => {
  const [plainText, setPlainText] = useState(PLAIN_TEXT_VALUE)
  const [html, setHtml] = useState(HTML_VALUE)
  const [list, setList] = useState(LIST_VALUE)
  const [long, setLong] = useState(LONG_VALUE)

  return (
    <Stack gap={2}>
      <Text as="div" variant="body">
        Examples of initial content (plain text, HTML, lists, multi-paragraphs)
        and long content.
      </Text>

      <RichTextEditor
        aria-label="Plain text"
        label="Plain text"
        onChange={setPlainText}
        value={plainText}
      />

      <RichTextEditor
        aria-label="Rich HTML"
        label="Rich content (HTML)"
        onChange={setHtml}
        value={html}
      />

      <RichTextEditor
        aria-label="Bulleted list"
        label="Bulleted list"
        onChange={setList}
        value={list}
      />
      <RichTextEditor
        aria-label="Long content"
        label="Long content"
        maxRows={20}
        onChange={setLong}
        rows={8}
        value={long}
      />
      <RichTextEditor
        aria-label="No list toolbar"
        label="Toolbar without lists"
        onChange={() => {}}
        showList={false}
        value={PLAIN_TEXT_VALUE}
      />
      <RichTextEditor
        aria-label="No marks toolbar"
        label="Toolbar without marks (bold/italic/underline)"
        onChange={() => {}}
        showMarks={false}
        value={PLAIN_TEXT_VALUE}
      />
    </Stack>
  )
}
