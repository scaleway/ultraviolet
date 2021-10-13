import React from 'react'
import FlexBox from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('FlexBox', () => {
  describe('Parent', () => {
    test('renders correctly with default values', () =>
      shouldMatchEmotionSnapshot(<FlexBox>Sample FlexBox</FlexBox>))
    test('renders correctly with inline flex', () =>
      shouldMatchEmotionSnapshot(<FlexBox inline>Sample FlexBox</FlexBox>))
    test('renders correctly with align properties', () =>
      shouldMatchEmotionSnapshot(
        <FlexBox alignItems="baseline" alignContent="center">
          Sample FlexBox
        </FlexBox>,
      ))
    test('renders correctly with custom direction', () =>
      shouldMatchEmotionSnapshot(
        <FlexBox direction="row-reverse">Sample FlexBox</FlexBox>,
      ))
    test('renders correctly with justifyContent', () =>
      shouldMatchEmotionSnapshot(
        <FlexBox justifyContent="center">Sample FlexBox</FlexBox>,
      ))
    test('renders correctly with custom wrap', () =>
      shouldMatchEmotionSnapshot(<FlexBox wrap="wrap">Sample FlexBox</FlexBox>))
    test('renders correctly with children properties', () =>
      shouldMatchEmotionSnapshot(
        <FlexBox flex="1" basis="0">
          Sample FlexBox
        </FlexBox>,
      ))
  })

  describe('Child', () => {
    test('renders correctly with default values', () =>
      shouldMatchEmotionSnapshot(
        <FlexBox.Child>This should act as a regular div</FlexBox.Child>,
      ))
    test('renders correctly with flex as string', () =>
      shouldMatchEmotionSnapshot(
        <FlexBox.Child flex="0 1 auto">Sample FlexBox.Child</FlexBox.Child>,
      ))
    test('renders correctly with flex as a number', () =>
      shouldMatchEmotionSnapshot(
        <FlexBox.Child flex={1}>Sample FlexBox.Child</FlexBox.Child>,
      ))
    test('renders correctly with explicit basis, grow and shrink', () =>
      shouldMatchEmotionSnapshot(
        <FlexBox.Child basis={1} grow="1" shrink="auto">
          Sample FlexBox.Child
        </FlexBox.Child>,
      ))
    test('renders correctly with order', () =>
      shouldMatchEmotionSnapshot(
        <FlexBox.Child order={6}>Sample FlexBox.Child</FlexBox.Child>,
      ))
    test('renders correctly with alignSelf', () =>
      shouldMatchEmotionSnapshot(
        <FlexBox.Child alignSelf="flex-end">
          Sample FlexBox.Child
        </FlexBox.Child>,
      ))
  })
})
