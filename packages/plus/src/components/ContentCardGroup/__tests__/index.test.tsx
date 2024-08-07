import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ContentCardGroup } from '..'

describe('ContentCardGroup', () => {
  beforeEach(() => {
    vi.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterEach(() => {
    vi.spyOn(global.Math, 'random').mockRestore()
  })

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

  test('renders correctly with loading prop', () => {
    const { asFragment } = renderWithTheme(
      <ContentCardGroup loading>
        <ContentCardGroup.Card title="title" href="http://scaleway.com" />
      </ContentCardGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

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

  test('renders correctly with different title and subtitle and with custom titleAs and subtitleAs', () =>
    shouldMatchEmotionSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card
          title="title"
          titleAs="h1"
          subtitle="subtitle"
          subtitleAs="h2"
          href="http://scaleway.com"
        >
          <div>test</div>
        </ContentCardGroup.Card>
      </ContentCardGroup>,
    ))
})
