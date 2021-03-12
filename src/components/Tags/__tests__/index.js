import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Tags from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Tags', () => {
  test('renders correctly with base props', () => {
    shouldMatchEmotionSnapshot(
      <Tags name="radio" onChangeError={() => {}} placeholder="Tags..." />,
    )
  })

  test('renders correctly with some tags', () => {
    shouldMatchEmotionSnapshot(
      <Tags onChange={() => {}} name="radio" tags={['hello', 'world']} />,
    )
  })

  test('renders correctly with some tags', () => {
    shouldMatchEmotionSnapshot(
      <Tags onChange={() => {}} name="radio" tags={['hello', 'world']} />,
    )
  })

  test('renders correctly with some tags as objects', () => {
    shouldMatchEmotionSnapshot(
      <Tags
        onChange={() => {}}
        name="radio"
        areTagsObject
        tags={[{ label: 'hello' }, { label: 'world' }]}
      />,
    )
  })

  test('renders correctly when variant = bordered', () => {
    shouldMatchEmotionSnapshot(
      <Tags
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
        variant="bordered"
      />,
    )
  })

  test('renders correctly when variant = base', () => {
    shouldMatchEmotionSnapshot(
      <Tags
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
        variant="base"
      />,
    )
  })

  test('renders correctly when variant = no-border', () => {
    shouldMatchEmotionSnapshot(
      <Tags
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
        variant="no-border"
      />,
    )
  })

  test('renders correctly when manualInput is disabled', () => {
    shouldMatchEmotionSnapshot(
      <Tags
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
        manualInput={false}
      />,
    )
  })

  test('renders correctly when disabled', () => {
    shouldMatchEmotionSnapshot(
      <Tags
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
        disabled
      />,
    )
  })

  test('delete tag', async done => {
    shouldMatchEmotionSnapshot(
      <Tags
        id="test"
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
      />,
      {
        transform: async () => {
          const input = document.getElementById('test')
          const tagClose = screen.getByText('hello').nextElementSibling
          userEvent.click(input)
          userEvent.click(tagClose)
          await waitForElementToBeRemoved(() => screen.getByText('hello'))
          done()
        },
      },
    )
  })

  test('add tag from input', async done => {
    shouldMatchEmotionSnapshot(
      <Tags
        id="test"
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
      />,
      {
        transform: async () => {
          const input = document.getElementById('test')
          userEvent.type(input, 'test{enter}')
          await waitFor(() => expect(input.value).toBe(''))
          await expect(screen.getByText('test')).toBeInTheDocument()
          done()
        },
      },
    )
  })

  test('delete tag with backspace', async done => {
    shouldMatchEmotionSnapshot(
      <Tags
        id="test"
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
      />,
      {
        transform: async () => {
          const input = document.getElementById('test')
          userEvent.type(input, '{backspace}')
          await waitForElementToBeRemoved(() => screen.getByText('world'))
          done()
        },
      },
    )
  })

  test('add tag on paste', async done => {
    shouldMatchEmotionSnapshot(
      <Tags
        id="test"
        onChange={() => {}}
        name="radio"
        tags={['hello', 'world']}
      />,
      {
        transform: async () => {
          const input = document.getElementById('test')
          userEvent.paste(input, '', {
            clipboardData: { getData: () => 'test' },
          })
          await waitFor(() => expect(input.value).toBe(''))
          await waitFor(() => screen.getByText('test'))
          done()
        },
      },
    )
  })
})
