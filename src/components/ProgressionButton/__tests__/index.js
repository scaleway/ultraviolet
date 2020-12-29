import React from 'react'
import { ProgressionButton } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('ProgressionButton', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2020-12-20T12:00:00z'))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('renders correctly with a string as creation date', () => {
    shouldMatchEmotionSnapshot(
      <ProgressionButton creation={new Date().toString()}>
        Progression
      </ProgressionButton>,
    )
  })

  it('renders correctly with a duration subceeding its creation date', () => {
    shouldMatchEmotionSnapshot(
      <ProgressionButton
        creation={new Date(new Date().setSeconds(new Date().getSeconds() - 90))}
        duration={10}
      >
        Progression
      </ProgressionButton>,
    )
  })

  it('renders correctly with a duration exceeding its creation date', () => {
    shouldMatchEmotionSnapshot(
      <ProgressionButton
        creation={new Date(new Date().setSeconds(new Date().getSeconds() + 90))}
        duration={10}
      >
        Progression
      </ProgressionButton>,
    )
  })
})
