import React from 'react'
import { CreationProgress } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('CreationProgress', () => {
  test('renders correctly with default props', () => {
    shouldMatchEmotionSnapshot(
      <CreationProgress selected={0}>
        <CreationProgress.Step>Step 1</CreationProgress.Step>
        <CreationProgress.Step>Step 2</CreationProgress.Step>
        <CreationProgress.Step>Step 3</CreationProgress.Step>
      </CreationProgress>,
    )
  })

  test.only('renders correctly with selected prop', () => {
    shouldMatchEmotionSnapshot(
      <CreationProgress selected={1}>
        {false && (
          <>
            <CreationProgress.Step>Step 0</CreationProgress.Step>
            <CreationProgress.Step>Step 0</CreationProgress.Step>
          </>
        )}
        <CreationProgress.Step>Step 1</CreationProgress.Step>
        <CreationProgress.Step>Step 2</CreationProgress.Step>
        <CreationProgress.Step>Step 3</CreationProgress.Step>
      </CreationProgress>,
    )
  })

  test('renders correctly with all selected', () => {
    shouldMatchEmotionSnapshot(
      <CreationProgress selected={2}>
        <CreationProgress.Step>Step 1</CreationProgress.Step>
        <CreationProgress.Step>Step 2</CreationProgress.Step>
        <CreationProgress.Step>Step 3</CreationProgress.Step>
      </CreationProgress>,
    )
  })
})
