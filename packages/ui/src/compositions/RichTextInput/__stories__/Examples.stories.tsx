import { RichTextInput } from '..'
import { Stack } from '../../../components/Stack'
import { Text } from '../../../components/Text'

import type { StoryFn } from '@storybook/react-vite'

const PLAIN_TEXT_VALUE = 'Hello, world!'

const HTML_VALUE = `<p>An example with <strong>bold</strong>, <em>italic</em>, and <u>underlined</u> text.</p>`

const LIST_VALUE = `<ul><li>First item</li><li>Second item</li></ul>`

const LONG_VALUE = `<p>A long time ago, in a galaxy far, far away, amidst the swirling constellations and distant star systems, there existed a realm of unimaginable wonders and ancient mysteries waiting to be discovered.</p>
<p>This distant galaxy, filled with countless planets, moons, and celestial phenomena, was home to diverse civilizations, each with their own unique cultures, histories, and legends.</p>`

export const Examples: StoryFn<typeof RichTextInput> = () => (
  <Stack gap={2}>
    <Text as="div" variant="body">
      Examples of initial content (plain text, HTML, lists, multi-paragraphs)
      and long content.
    </Text>

    <RichTextInput
      aria-label="Plain text"
      label="Plain text"
      value={PLAIN_TEXT_VALUE}
    />

    <RichTextInput
      aria-label="Rich HTML"
      label="Rich content (HTML)"
      value={HTML_VALUE}
    />

    <RichTextInput
      aria-label="Bulleted list"
      label="Bulleted list"
      value={LIST_VALUE}
    />
    <RichTextInput
      aria-label="Long content"
      label="Long content"
      maxRows={20}
      rows={8}
      value={LONG_VALUE}
    />
    <RichTextInput
      aria-label="No list toolbar"
      label="Toolbar without lists"
      showList={false}
      value={PLAIN_TEXT_VALUE}
    />
    <RichTextInput
      aria-label="No marks toolbar"
      label="Toolbar without marks (bold/italic/underline)"
      showMarks={false}
      value={PLAIN_TEXT_VALUE}
    />
  </Stack>
)
