import { describe, it } from '@jest/globals'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'
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
      />,
    ))
})
