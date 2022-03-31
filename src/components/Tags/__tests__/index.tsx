import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tags from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Tags', () => {
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  test('renders correctly with base props', () =>
    shouldMatchEmotionSnapshot(
      <Tags name="radio" onChangeError={() => {}} placeholder="Tags..." />,
    ))

  test('renders correctly with some tags', () =>
    shouldMatchEmotionSnapshot(
      <Tags onChange={() => {}} name="radio" tags={['hello', 'world']} />,
    ))

  test('renders correctly with some tags objects', () =>
    shouldMatchEmotionSnapshot(
      <Tags
        onChange={() => {}}
        name="radio"
        tags={[
          { index: 'index', label: 'hello' },
          { index: 'secondIndex', label: 'world' },
        ]}
      />,
    ))

  test('renders correctly with some tags', () =>
    shouldMatchEmotionSnapshot(
      <Tags onChange={() => {}} name="radio" tags={['hello', 'world']} />,
    ))

  test('renders correctly with some tags as objects', () =>
    shouldMatchEmotionSnapshot(
      <Tags
        onChange={() => {}}
        name="radio"
        tags={[
          { index: 'index', label: 'hello' },
          { index: 'secondIndex', label: 'world' },
        ]}
      />,
    ))

  test('renders correctly when variant = bordered', () =>
    shouldMatchEmotionSnapshot(
      <Tags
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
        variant="bordered"
      />,
    ))

  test('renders correctly when variant = base', () =>
    shouldMatchEmotionSnapshot(
      <Tags
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
        variant="base"
      />,
    ))

  test('renders correctly when variant = no-border', () =>
    shouldMatchEmotionSnapshot(
      <Tags
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
        variant="no-border"
      />,
    ))

  test('renders correctly when manualInput is disabled', () =>
    shouldMatchEmotionSnapshot(
      <Tags
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
        manualInput={false}
      />,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(
      <Tags
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
        disabled
      />,
    ))

  test('delete tag', () =>
    shouldMatchEmotionSnapshot(
      <Tags
        id="test"
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
      />,
      {
        transform: node => {
          const input = node.getByDisplayValue('')
          expect(input).toBeInTheDocument()
          const HelloTag = node.queryByText(/hello/)
          expect(HelloTag).toBeInTheDocument()

          // remove Tag
          const tagClose = HelloTag?.nextElementSibling as HTMLButtonElement
          userEvent.click(tagClose)

          // check Tag was removed
          expect(HelloTag).not.toBeInTheDocument()
        },
      },
    ))
  test('delete tag with error', () =>
    shouldMatchEmotionSnapshot(
      <Tags
        id="test"
        onChange={() => {
          throw new Error('Not Working')
        }}
        onChangeError={e => e}
        name="radio"
        tags={['throw', 'error']}
      />,
      {
        transform: node => {
          const input = node.getByDisplayValue('')
          expect(input).toBeInTheDocument()
          const ErrorTag = node.queryByText(/error/)
          expect(ErrorTag).toBeInTheDocument()

          // remove Tag
          const tagClose = ErrorTag?.nextElementSibling as HTMLButtonElement
          userEvent.click(tagClose)
        },
      },
    ))

  test('add tag from input', () =>
    shouldMatchEmotionSnapshot(
      <Tags
        id="test"
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
      />,
      {
        transform: async ({ getByDisplayValue, getByText }) => {
          const input = getByDisplayValue('') as HTMLInputElement
          userEvent.type(input, 'test{enter}')
          await waitFor(() => expect(input.value).toBe(''))
          expect(getByText('test')).toBeInTheDocument()
        },
      },
    ))

  test('add tag from input with error', () =>
    shouldMatchEmotionSnapshot(
      <Tags
        id="test"
        onChange={() => {
          throw new Error('Not Working')
        }}
        onChangeError={e => e}
        name="radio"
        tags={['hello', 'world']}
      />,
      {
        transform: async ({ getByDisplayValue }) => {
          const input = getByDisplayValue('') as HTMLInputElement
          userEvent.type(input, 'test{enter}')
          await waitFor(() => expect(input.value).toBe(''))
        },
      },
    ))

  test('delete tag with backspace', () =>
    shouldMatchEmotionSnapshot(
      <Tags
        id="test"
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
      />,
      {
        transform: ({ getByDisplayValue, queryByText }) => {
          const input = getByDisplayValue('')
          const LastTag = queryByText(/world/)
          expect(LastTag).toBeInTheDocument()
          userEvent.click(input)
          expect(input).toHaveFocus()
          userEvent.keyboard('{backspace}')
          expect(LastTag).not.toBeInTheDocument()
        },
      },
    ))

  test('add tag on paste', () =>
    shouldMatchEmotionSnapshot(
      <Tags
        id="test"
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
      />,
      {
        transform: async ({ getByDisplayValue, getByText }) => {
          const input = getByDisplayValue('') as HTMLInputElement
          userEvent.paste(input, '', {
            // @ts-expect-error we mock, don't care about the other values
            clipboardData: { getData: () => 'test' },
          })
          await waitFor(() => expect(input.value).toBe(''))
          await waitFor(() => getByText('test'))
        },
      },
    ))
  test('add tag on paste with error', () =>
    shouldMatchEmotionSnapshot(
      <Tags
        id="test"
        onChange={() => {
          throw new Error('Not Working')
        }}
        onChangeError={e => e}
        name="radio"
        tags={['hello', 'world']}
      />,
      {
        transform: ({ getByDisplayValue }) => {
          const input = getByDisplayValue('') as HTMLInputElement
          userEvent.paste(input, '', {
            // @ts-expect-error we mock, don't care about the other values
            clipboardData: { getData: () => 'test' },
          })
        },
      },
    ))
})
