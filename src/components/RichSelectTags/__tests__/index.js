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

  test('renders correctly with default values', () => {
    shouldMatchEmotionSnapshot(
      <RichSelectTags
        ctaText="Add"
        onChange={() => {}}
        name="options"
        initialTags={['one']}
        onChangeSelectValue={() => {}}
        placeholder="Select an option in the list"
        options={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
          { value: 'three', label: 'Three' },
          { value: 'four', label: 'Four' },
          { value: 'five', label: 'Five' },
        ]}
      />,
    )
  })

  test('renders correctly with icon', () => {
    shouldMatchEmotionSnapshot(
      <RichSelectTags
        ctaText="Add"
        onChange={() => {}}
        name="options"
        initialTags={['one']}
        onChangeSelectValue={() => {}}
        placeholder="Select an option in the list"
        icon="/toto.png"
        options={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
          { value: 'three', label: 'Three' },
          { value: 'four', label: 'Four' },
          { value: 'five', label: 'Five' },
        ]}
      />,
    )
  })

  test('renders correctly when tags are removed then added', () => {
    const onChangeSelectValue = jest.fn()
    const onChange = jest.fn()

    shouldMatchEmotionSnapshot(
      <RichSelectTags
        ctaText="Add"
        onChange={onChange}
        name="options"
        initialTags={['one']}
        value={{ value: 'three', label: 'Three' }}
        onChangeSelectValue={onChangeSelectValue}
        placeholder="Select an option in the list"
        options={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
          { value: 'three', label: 'Three' },
          { value: 'four', label: 'Four' },
          { value: 'five', label: 'Five' },
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
            value: 'three',
            label: 'Three',
          })
          expect(onChange).toHaveBeenCalledWith([
            { value: 'one', label: 'One' },
            { value: 'three', label: 'Three' },
          ])
        },
      },
    )
  })
})
