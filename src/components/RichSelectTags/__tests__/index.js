import userEvent from '@testing-library/user-event'
import React from 'react'
import RichSelectTags from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('RichSelectTags', () => {
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(
      <RichSelectTags
        onChange={() => {}}
        name="options"
        initialTags={['one']}
        onChangeSelectValue={() => {}}
        options={[
          {
            label: 'One',
            value: 'one',
          },
          {
            label: 'Two',
            value: 'two',
          },
          {
            label: 'Three',
            value: 'three',
          },
          {
            label: 'Four',
            value: 'four',
          },
          {
            label: 'Five',
            value: 'five',
          },
        ]}
      />,
    ))

  test('renders correctly with icon', () =>
    shouldMatchEmotionSnapshot(
      <RichSelectTags
        onChange={() => {}}
        name="options"
        initialTags={['one']}
        onChangeSelectValue={() => {}}
        icon="/toto.png"
        options={[
          { label: 'One', value: 'one' },
          { label: 'Two', value: 'two' },
          { label: 'Three', value: 'three' },
          { label: 'Four', value: 'four' },
          { label: 'Five', value: 'five' },
        ]}
      />,
    ))

  test('renders correctly when tags are removed then added', async () => {
    const onChangeSelectValue = jest.fn()
    const onChange = jest.fn()

    await shouldMatchEmotionSnapshot(
      <RichSelectTags
        onChange={onChange}
        name="options"
        initialTags={['one']}
        value={{ label: 'Three', value: 'three' }}
        onChangeSelectValue={onChangeSelectValue}
        options={[
          { label: 'One', value: 'one' },
          { label: 'Two', value: 'two' },
          { label: 'Three', value: 'three' },
          { label: 'Four', value: 'four' },
          { label: 'Five', value: 'five' },
        ]}
      />,
      {
        transform: async ({ getByRole, getByTestId, getByText }) => {
          const tagClose = getByText(
            (content, element) =>
              element.tagName.toLowerCase() === 'span' &&
              content.startsWith('One'),
          )
          userEvent.click(tagClose)
          const richSelect = await getByRole('textbox')
          userEvent.click(richSelect)
          userEvent.type(richSelect, 'three{enter}')
          userEvent.click(await getByTestId('rich-select-tags-add'))
          expect(onChangeSelectValue).toHaveBeenCalledWith({
            label: 'Three',
            value: 'three',
          })
          expect(onChange).toHaveBeenCalledWith([
            { label: 'One', value: 'one' },
            { label: 'Three', value: 'three' },
          ])
        },
      },
    )
  })
})
