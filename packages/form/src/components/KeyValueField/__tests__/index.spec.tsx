import { describe, expect, it } from '@jest/globals'
import { act, screen } from '@testing-library/react'
import { KeyValueField } from '..'
import { shouldMatchEmotionSnapshotFormWrapper } from '../../../../.jest/helpers'

describe('KeyValueField', () => {
  it('should render with default props', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <KeyValueField
        name="test"
        inputKey={{
          label: 'key',
        }}
        inputValue={{
          label: 'value',
        }}
        addButton={{
          name: 'add',
          tooltip: 'This is a tooltip',
          tooltipAlert: 'This is a tooltip alert',
        }}
      />,
      {
        transform: () => {
          const addButton = screen.getByTestId('add-button')
          act(() => {
            addButton.click()
          })

          const removeButton = screen.getByTestId('remove-button-0')
          act(() => {
            removeButton.click()
          })
        },
      },
    ))

  it('should render with default props & max size', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <KeyValueField
        name="test"
        inputKey={{
          label: 'key',
        }}
        inputValue={{
          label: 'value',
        }}
        addButton={{
          name: 'add',
          tooltip: 'This is a tooltip',
          tooltipAlert: 'This is a tooltip alert',
        }}
        maxSize={42}
      />,
    ))

  it('should render with default props in readonly mode', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <KeyValueField
        name="test"
        inputKey={{
          label: 'key',
        }}
        inputValue={{
          label: 'value',
        }}
        addButton={{
          name: 'add',
          tooltip: 'This is a tooltip',
          tooltipAlert: 'This is a tooltip alert',
        }}
        readonly
      />,
      {
        transform: () => {
          const addButton = screen.getByTestId('add-button')
          expect(addButton).toBeDisabled()
        },
      },
    ))
})
