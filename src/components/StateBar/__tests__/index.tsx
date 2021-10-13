import React from 'react'
import StateBar from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('StateBar', () => {
  test(`should render correctly with default props`, () =>
    shouldMatchEmotionSnapshot(
      <StateBar>
        <StateBar.State />
        <StateBar.Bar />
      </StateBar>,
    ))

  test(`should render correctly with a children`, () =>
    shouldMatchEmotionSnapshot(
      <StateBar>
        <StateBar.State>Hello</StateBar.State>
        <StateBar.Bar />
      </StateBar>,
    ))

  test(`should render correctly with a value < 90`, () =>
    shouldMatchEmotionSnapshot(
      <StateBar>
        <StateBar.State>Hello</StateBar.State>
        <StateBar.Bar value={89} />
      </StateBar>,
    ))

  test(`should render correctly with a value >= 90`, () =>
    shouldMatchEmotionSnapshot(
      <StateBar>
        <StateBar.State>Hello</StateBar.State>
        <StateBar.Bar value={90} />
      </StateBar>,
    ))

  test(`should render correctly with unlimited value`, () =>
    shouldMatchEmotionSnapshot(
      <StateBar>
        <StateBar.State>Hello</StateBar.State>
        <StateBar.Bar unlimited />
      </StateBar>,
    ))
})
