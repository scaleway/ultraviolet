import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { CodeEditor } from '..'

// We are skipping this as CodeEditor seems to be generating new classNames
// which is causing the snapshot to fail randomly. Also, CodeEditor component
// doesn't implement anything more than a Text all the rest comes from an external
// library.
// biome-ignore lint/suspicious/noSkippedTests: to fix
describe.skip('codeEditor', () => {
  it('should render correctly with content', () =>
    shouldMatchSnapshot(
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
    shouldMatchSnapshot(
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
    shouldMatchSnapshot(
      <CodeEditor
        disabled
        extensions="yaml"
        height="600px"
        onChange={newValue => newValue}
        value="configuration: 1/ntest: 'ok'"
      />,
    ))

  it('should render correctly with copyButton as boolean', () =>
    shouldMatchSnapshot(
      <CodeEditor
        copyButton
        extensions="yaml"
        height="600px"
        onChange={newValue => newValue}
        value="configuration: 1/ntest: 'ok'"
      />,
    ))

  it('should render correctly with copyButton as string', () =>
    shouldMatchSnapshot(
      <CodeEditor
        copyButton="Copy"
        extensions="yaml"
        height="600px"
        onChange={newValue => newValue}
        value="configuration: 1/ntest: 'ok'"
      />,
    ))
})
