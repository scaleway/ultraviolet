import { shouldMatchSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Text } from '..'
import { textVariants } from '../constants'

describe('text', () => {
  test.each(textVariants)('renders correctly with type="%s"', variant =>
    shouldMatchSnapshot(
      <Text as="div" variant={variant}>
        {variant}
      </Text>,
    ))

  test('renders correctly with tooltip', () =>
    shouldMatchSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
        <Text as="div" oneLine variant="body">
          This text is quite long. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Text>
      </div>,
    ))

  test('renders correctly with placement', () =>
    shouldMatchSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
        <Text as="div" placement="end" variant="body">
          This text is quite long. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Text>
      </div>,
    ))

  test('renders correctly with dir', () =>
    shouldMatchSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
        <Text as="div" dir="rtl" oneLine variant="body">
          This text is quite long. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Text>
      </div>,
    ))

  test('renders correctly with htmlFor', () =>
    shouldMatchSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 500 }}>
        <Text as="div" htmlFor="test" variant="body">
          This text is quite long. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Text>
      </div>,
    ))

  test('with multiple nested children renders correctly', () =>
    shouldMatchSnapshot(
      <Text as="div" variant="body">
        Lorem
        <span>Ipsum</span>
        <Text as="span" variant="heading">
          <span>Dolor</span>
        </Text>
        Sit
      </Text>,
    ))

  test('with prominence stronger on non neutral', () =>
    shouldMatchSnapshot(
      <Text as="div" prominence="stronger" sentiment="danger" variant="body">
        Lorem Ipsum
      </Text>,
    ))
  test('with italic', () =>
    shouldMatchSnapshot(
      <Text as="div" italic variant="body">
        Lorem Ipsum
      </Text>,
    ))
  test('with underline', () =>
    shouldMatchSnapshot(
      <Text as="div" underline variant="body">
        Lorem Ipsum
      </Text>,
    ))

  test('with disabled', () =>
    shouldMatchSnapshot(
      <Text as="div" disabled variant="body">
        Lorem Ipsum
      </Text>,
    ))

  test('with monochrome', () =>
    shouldMatchSnapshot(
      <Text as="div" sentiment="black" variant="body">
        Lorem Ipsum
      </Text>,
    ))

  test('renders correctly with whiteSpace', () =>
    shouldMatchSnapshot(
      <Text as="div" variant="body" whiteSpace="nowrap">
        This text is quite long. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Text>,
    ))
})
