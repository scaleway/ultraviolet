import React from 'react'
import shouldMatchEmotionSnapshot from 'helpers/shouldMatchEmotionSnapshot'

import { Reminder } from '../Reminder'

test('Reminder renders correctly with default values', () => {
  shouldMatchEmotionSnapshot(<Reminder text="This is a sample Test" />)
})

test('Reminder renders correctly when bordered', () => {
  shouldMatchEmotionSnapshot(<Reminder bordered text="This is a sample Test" />)
})

test('Reminder renders correctly with variant', () => {
  shouldMatchEmotionSnapshot(
    <Reminder variant="info" bordered text="This is a sample Test" />,
  )
})

test('Reminder renders correctly with bold', () => {
  shouldMatchEmotionSnapshot(
    <Reminder variant="info" bordered text="This is a [bold] Test" />,
  )
})
