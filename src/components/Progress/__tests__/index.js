import React from 'react'
import Progress from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Progress', () => {
  test(`renders correctly`, () => {
    shouldMatchEmotionSnapshot(
      <Progress selected={1}>
        <Progress.Step title="Step 1" />
        <Progress.Step title="Step 2" />
        <Progress.Step title="Step 3" />
      </Progress>,
    )
  })
  test(`renders correctly when one children is empty`, () => {
    shouldMatchEmotionSnapshot(
      <Progress selected={1}>
        <Progress.Step title="Step 1" />
        {null}
        <Progress.Step title="Step 3" />
      </Progress>,
    )
  })
  test(`renders correctly when one children is clickable`, () => {
    shouldMatchEmotionSnapshot(
      <Progress selected={2}>
        <Progress.Step title="Step 1" onClick={() => null} />
        <Progress.Step title="Step 2" />
        <Progress.Step title="Step 3" />
      </Progress>,
    )
  })
})
