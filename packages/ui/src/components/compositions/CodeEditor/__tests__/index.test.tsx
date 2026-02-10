import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { CodeEditor } from '..'

// We are skipping this as CodeEditor seems to be generating new classNames
// which is causing the snapshot to fail randomly. Also, CodeEditor component
// doesn't implement anything more than a Text all the rest comes from an external
// library.
describe('codeEditor', () => {
  it('should render correctly with content', () =>
    renderWithTheme(
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

  it('should render correctly disabled', () => {
    renderWithTheme(
      <CodeEditor
        data-testid="code-editor"
        disabled
        extensions="yaml"
        height="600px"
        onChange={newValue => newValue}
        value="configuration: 1/ntest: 'ok'"
      />,
    )
  })

  it('should render correctly with error', () =>
    renderWithTheme(
      <CodeEditor
        error="error"
        extensions="yaml"
        height="600px"
        helper="Helper text"
        label="Code"
        labelDescription="Code description"
        onChange={newValue => newValue}
        value="configuration: 1/ntest: 'ok'"
      />,
    ))

  it('should render correctly with copyButton as boolean', async () => {
    renderWithTheme(
      <CodeEditor
        copyButton
        extensions="yaml"
        height="600px"
        onChange={newValue => newValue}
        value="configuration: 1/ntest: 'ok'"
      />,
    )

    const copyButton = screen.getByRole('button', { name: 'Copy' })
    await userEvent.click(copyButton)
  })

  it('should render correctly with copyButton as string', async () => {
    renderWithTheme(
      <CodeEditor
        copyButton="Copy"
        extensions="yaml"
        height="600px"
        onChange={newValue => newValue}
        value="configuration: 1/ntest: 'ok'"
      />,
    )
    const copyButton = screen.getByRole('button', { name: 'Copy' })
    await userEvent.click(copyButton)
  })

  it('should render correctly expandable', async () => {
    renderWithTheme(
      <CodeEditor
        data-testid="code-editor"
        disabled
        expandableHeight={300}
        extensions="yaml"
        height="600px"
        hideText="hide"
        onChange={newValue => newValue}
        showText="show"
        value="configuration: 1/ntest: 'ok'"
      />,
    )
    const showButton = screen.getByText('show') satisfies HTMLButtonElement
    expect(showButton).toBeInTheDocument()
    expect(screen.queryByText('hide')).not.toBeInTheDocument()

    await userEvent.click(showButton)
    expect(showButton).toHaveTextContent('hide')
  })
})
