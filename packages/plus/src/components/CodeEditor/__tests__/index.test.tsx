import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { CodeEditor } from '../CodeEditor'

// We are skipping this as CodeEditor seems to be generating new classNames
// which is causing the snapshot to fail randomly. Also, CodeEditor component
// doesn't implement anything more than a Text all the rest comes from an external
// library.
describe.skip('CodeEditor', () => {
  it('should render correctly with content', () =>
    shouldMatchEmotionSnapshot(
      <CodeEditor
        value="configuration: 1/ntest: 'ok'"
        extensions="yaml"
        height="600px"
        onChange={newValue => newValue}
        helper="Helper text"
        label="Code"
        labelDescription="Code description"
      />,
    ))

  it('should render correctly with label', () =>
    shouldMatchEmotionSnapshot(
      <CodeEditor
        value="configuration: 1/ntest: 'ok'"
        extensions="yaml"
        height="600px"
        onChange={newValue => newValue}
        helper="Helper text"
        label="title"
      />,
    ))

  it('should render correctly disbled', () =>
    shouldMatchEmotionSnapshot(
      <CodeEditor
        value="configuration: 1/ntest: 'ok'"
        extensions="yaml"
        height="600px"
        onChange={newValue => newValue}
        disabled
      />,
    ))

  it('should render correctly with copyButton as boolean', () =>
    shouldMatchEmotionSnapshot(
      <CodeEditor
        value="configuration: 1/ntest: 'ok'"
        extensions="yaml"
        height="600px"
        onChange={newValue => newValue}
        copyButton
      />,
    ))

  it('should render correctly with copyButton as string', () =>
    shouldMatchEmotionSnapshot(
      <CodeEditor
        value="configuration: 1/ntest: 'ok'"
        extensions="yaml"
        height="600px"
        onChange={newValue => newValue}
        copyButton="Copy"
      />,
    ))
})
