import userEvent from '@testing-library/user-event'
import Breadcrumbs from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Breadcrumbs', () => {
  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(
      <Breadcrumbs>
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item to="/step1/step2">
          I&apos;m a very long long long long long long long long long long long
          long step
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>Step 3</Breadcrumbs.Item>
      </Breadcrumbs>,
    ))

  test('renders correctly with variant bubble', () =>
    shouldMatchEmotionSnapshot(
      <Breadcrumbs variant="bubble">
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item to="/step1/step2">
          I&apos;m a very long long long long long long long long long long long
          long step
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>Step 3</Breadcrumbs.Item>
      </Breadcrumbs>,
    ))

  test('renders correctly with selected item', () =>
    shouldMatchEmotionSnapshot(
      <Breadcrumbs selected={1}>
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item to="/step1/step2">
          I&apos;m a very long long long long long long long long long long long
          long step
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>Step 3</Breadcrumbs.Item>
      </Breadcrumbs>,
    ))

  test('renders correctly with onClick', () => {
    const onClick = jest.fn()

    return shouldMatchEmotionSnapshot(
      <Breadcrumbs>
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item to="/step1/step2">
          I&apos;m a very long long long long long long long long long long long
          long step
        </Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={onClick}>Step 3</Breadcrumbs.Item>
      </Breadcrumbs>,
      {
        transform: async ({ getByText }) => {
          const step3 = getByText('Step 3')
          await userEvent.click(step3)
          expect(onClick).toHaveBeenCalledTimes(1)
        },
      },
    )
  })
  test('renders correctly with onClick on bubble variant', () => {
    const onClick = jest.fn()

    return shouldMatchEmotionSnapshot(
      <Breadcrumbs variant="bubble">
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item to="/step1/step2">
          I&apos;m a very long long long long long long long long long long long
          long step
        </Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={onClick}>Step 3</Breadcrumbs.Item>
      </Breadcrumbs>,
      {
        transform: async ({ getByText }) => {
          const step3 = getByText('Step 3')
          await userEvent.click(step3)
          expect(onClick).toHaveBeenCalledTimes(1)
        },
      },
    )
  })
  test('renders correctly with invalid child', () =>
    shouldMatchEmotionSnapshot(
      <Breadcrumbs selected={1}>Invalid child</Breadcrumbs>,
    ))
})
