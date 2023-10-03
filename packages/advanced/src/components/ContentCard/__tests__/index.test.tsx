import { describe, test } from '@jest/globals'
import { ContentCard } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'
import illustration from '../assets/illustration.png'

describe('Alert', () => {
  test('renders correctly with required title', () =>
    shouldMatchEmotionSnapshot(<ContentCard title="test" />))

  test('renders correctly with empty string title', () =>
    shouldMatchEmotionSnapshot(<ContentCard title="" />))

  test('renders correctly with children', () =>
    shouldMatchEmotionSnapshot(
      <ContentCard title="test">
        This is the children of the component
      </ContentCard>,
    ))

  test('renders correctly with image, title, description, subtitle and icon', () =>
    shouldMatchEmotionSnapshot(
      <ContentCard
        title="test"
        subtitle="sub title test"
        image={illustration}
        icon={illustration}
        description="this is a description"
      />,
    ))

  describe(`renders correctly with all directions`, () => {
    ;(['row', 'column'] as const).forEach(direction => {
      test(`renders correctly direction ${direction}`, () =>
        shouldMatchEmotionSnapshot(
          <ContentCard title="test" direction={direction}>
            Sample Alert
          </ContentCard>,
        ))
    })
  })
})
