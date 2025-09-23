import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Text } from '..'
import { textVariants } from '../constants'

describe('text', () => {
  test.each(textVariants)('renders correctly with type="%s"', variant =>
    shouldMatchEmotionSnapshot(
      <Text as="div" variant={variant}>
        {variant}
      </Text>,
    ),
  )

  test(`renders correctly with tooltip`, () =>
    shouldMatchEmotionSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
        <Text as="div" oneLine variant="body">
          This text is quite long. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Text>
      </div>,
    ))

  test(`renders correctly with placement`, () =>
    shouldMatchEmotionSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
        <Text as="div" placement="end" variant="body">
          This text is quite long. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Text>
      </div>,
    ))

  test(`renders correctly with dir`, () =>
    shouldMatchEmotionSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
        <Text as="div" dir="rtl" oneLine variant="body">
          This text is quite long. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Text>
      </div>,
    ))

  test(`renders correctly with htmlFor`, () =>
    shouldMatchEmotionSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
        <Text as="div" htmlFor="test" variant="body">
          This text is quite long. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Text>
      </div>,
    ))

  test(`with multiple nested children renders correctly`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" variant="body">
        Lorem
        <span>Ipsum</span>
        <Text as="span" variant="heading">
          <span>Dolor</span>
        </Text>
        Sit
      </Text>,
    ))

  test(`with prominence stronger on non neutral`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" prominence="stronger" sentiment="danger" variant="body">
        Lorem Ipsum
      </Text>,
    ))
  test(`with italic`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" italic variant="body">
        Lorem Ipsum
      </Text>,
    ))
  test(`with underline`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" underline variant="body">
        Lorem Ipsum
      </Text>,
    ))

  test(`with disabled`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" disabled variant="body">
        Lorem Ipsum
      </Text>,
    ))

  test(`with monochrome`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" sentiment="black" variant="body">
        Lorem Ipsum
      </Text>,
    ))

  test(`renders correctly with whiteSpace`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" variant="body" whiteSpace="nowrap">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>,
    ))
})
