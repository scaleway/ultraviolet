import { describe, test } from '@jest/globals'
import { ContentCardGroup } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('ContentCardGroup', () => {
  test('renders correctly with required title & hread', () =>
    shouldMatchEmotionSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card title="title" href="http://scaleway.com" />
      </ContentCardGroup>,
    ))

  test('renders correctly with subtitle', () =>
    shouldMatchEmotionSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card
          title="title"
          href="http://scaleway.com"
          subtitle="subtitle"
        />
      </ContentCardGroup>,
    ))

  test('renders correctly with description', () =>
    shouldMatchEmotionSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card
          title="title"
          href="http://scaleway.com"
          description="description"
        />
      </ContentCardGroup>,
    ))

  test('renders correctly with loading prop', () =>
    shouldMatchEmotionSnapshot(
      <ContentCardGroup loading>
        <ContentCardGroup.Card title="title" href="http://scaleway.com" />
      </ContentCardGroup>,
    ))

  test('renders correctly with link target _parent', () =>
    shouldMatchEmotionSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card
          title="title"
          href="http://scaleway.com"
          target="_parent"
        />
      </ContentCardGroup>,
    ))

  test('renders correctly with a children', () =>
    shouldMatchEmotionSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" target="_parent">
          <div>test</div>
        </ContentCardGroup.Card>
      </ContentCardGroup>,
    ))
})
