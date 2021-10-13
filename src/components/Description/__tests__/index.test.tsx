import React from 'react'
import Description from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Description', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <Description>
        <Description.Term>Name</Description.Term>
        <Description.Desc>Big instance</Description.Desc>
        <Description.Term>Size</Description.Term>
        <Description.Desc>125 GB</Description.Desc>
      </Description>,
    ))

  test('renders correctly inline', () =>
    shouldMatchEmotionSnapshot(
      <Description inline>
        <Description.Term>Name</Description.Term>
        <Description.Desc>Big instance</Description.Desc>
        <Description.Term>Size</Description.Term>
        <Description.Desc>125 GB</Description.Desc>
      </Description>,
    ))

  test('renders correctly seletable', () =>
    shouldMatchEmotionSnapshot(
      <Description inline selectable>
        <Description.Term>Name</Description.Term>
        <Description.Desc>Big instance</Description.Desc>
        <Description.Term>Size</Description.Term>
        <Description.Desc>125 GB</Description.Desc>
      </Description>,
    ))
})
