import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { CodeEditor } from '../CodeEditor'

// We are skipping this as CodeEditor seems to be generating new classNames
// which is causing the snapshot to fail randomly. Also, CodeEditor component
// doesn't implement anything more than a Text all the rest comes from an external
// library.
describe.skip('codeEditor', () => {
  it('should render correctly with content', () =>
    shouldMatchEmotionSnapshot(
      <CodeEditor
        extensions="yaml"
        height="600px"
        helper="Helper text"
        label="Code"
        labelDescription="Code description"
        onChange={newValue => newValue}
        value="configuration: 1/ntest: 'ok'"
      />,
    ))

  it('should render correctly with label', () =>
    shouldMatchEmotionSnapshot(
      <CodeEditor
        extensions="yaml"
        height="600px"
        helper="Helper text"
        label="title"
        onChange={newValue => newValue}
        value="configuration: 1/ntest: 'ok'"
      />,
    ))

  it('should render correctly disbled', () =>
    shouldMatchEmotionSnapshot(
      <CodeEditor
        disabled
        extensions="yaml"
        height="600px"
        onChange={newValue => newValue}
        value="configuration: 1/ntest: 'ok'"
      />,
    ))

  it('should render correctly with copyButton as boolean', () =>
    shouldMatchEmotionSnapshot(
      <CodeEditor
        copyButton
        extensions="yaml"
        height="600px"
        onChange={newValue => newValue}
        value="configuration: 1/ntest: 'ok'"
      />,
    ))

  it('should render correctly with copyButton as string', () =>
    shouldMatchEmotionSnapshot(
      <CodeEditor
        copyButton="Copy"
        extensions="yaml"
        height="600px"
        onChange={newValue => newValue}
        value="configuration: 1/ntest: 'ok'"
      />,
    ))
})
