import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Text, textVariants } from '..'

describe('Text', () => {
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
        <Text as="div" variant="body" oneLine>
          This text is quite long. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Text>
      </div>,
    ))

  test(`renders correctly with placement`, () =>
    shouldMatchEmotionSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
        <Text as="div" variant="body" placement="end">
          This text is quite long. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Text>
      </div>,
    ))

  test(`renders correctly with dir`, () =>
    shouldMatchEmotionSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
        <Text as="div" variant="body" oneLine dir="rtl">
          This text is quite long. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Text>
      </div>,
    ))

  test(`renders correctly with htmlFor`, () =>
    shouldMatchEmotionSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
        <Text as="div" variant="body" htmlFor="test">
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
        <Text variant="heading" as="span">
          <span>Dolor</span>
        </Text>
        Sit
      </Text>,
    ))

  test(`with prominence stronger on non neutral`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" variant="body" prominence="stronger" sentiment="danger">
        Lorem Ipsum
      </Text>,
    ))
  test(`with italic`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" variant="body" italic>
        Lorem Ipsum
      </Text>,
    ))
  test(`with underline`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" variant="body" underline>
        Lorem Ipsum
      </Text>,
    ))

  test(`with disabled`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" variant="body" disabled>
        Lorem Ipsum
      </Text>,
    ))

  test(`with monochrome`, () =>
    shouldMatchEmotionSnapshot(
      <Text as="div" variant="body" sentiment="black">
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
