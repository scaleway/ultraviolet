import Breadcrumbs from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

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
})
