import MarkDown from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

export const simple = `
  # I am a Markdown H1

  ## I am a Markdown H2

  I am a simple markdown with **strong** _italic_ content

  You can find the complete reference [here](https://commonmark.org/help/)

  Invalid [link]()

  I can also render code

  \`const example = 1 // Inline code\`

  \`\`\`
    const example = 2
  \`\`\`
`

export const withMultipleParagraphs = `
  I am a paragraph.

  And a second one
`

export const withHtml = `
  Hello<br />World
`

describe('MarkDown', () => {
  test(`render simple string`, () =>
    shouldMatchEmotionSnapshot(<MarkDown source={simple} />))

  test(`render simple string with target blank`, () =>
    shouldMatchEmotionSnapshot(
      <MarkDown source={simple} linkTarget="_blank" />,
    ))

  test(`render paragraph inline`, () =>
    shouldMatchEmotionSnapshot(
      <MarkDown source={withMultipleParagraphs} inline />,
    ))

  test(`render html without escaing it`, () =>
    shouldMatchEmotionSnapshot(
      <MarkDown source={withHtml} escapeHtml={false} />,
    ))
})
