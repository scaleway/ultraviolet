import React from 'react'
import SwitchButton from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('SwitchButton', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton onChange={() => {}} name="radio" value="choice">
        Choice
      </SwitchButton>,
    ))

  test('renders correctly with variant segment', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton
        onChange={() => {}}
        name="radio"
        value="choice"
        variant="segment"
      >
        Choice
      </SwitchButton>,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton onChange={() => {}} name="radio" value="choice" disabled>
        Choice
      </SwitchButton>,
    ))

  test('renders correctly with complex child', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton
        onChange={() => {}}
        name="radio"
        value="choice"
        disabled
        checked
      >
        {({ checked, disabled }) =>
          `${checked.toString()} ${disabled.toString()}`
        }
      </SwitchButton>,
    ))
})
