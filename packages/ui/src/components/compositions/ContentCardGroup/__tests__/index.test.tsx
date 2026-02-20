import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ContentCardGroup } from '..'

describe('contentCardGroup', () => {
  beforeEach(() => {
    vi.spyOn(global.Math, 'random').mockReturnValue(0.415_591_366_944_480_4)
  })

  afterEach(() => {
    vi.spyOn(global.Math, 'random').mockRestore()
  })

  test('renders correctly with required title & hread', () =>
    shouldMatchSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" title="title" />
      </ContentCardGroup>,
    ))

  test('renders correctly with subtitle', () =>
    shouldMatchSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card
          href="http://scaleway.com"
          subtitle="subtitle"
          title="title"
        />
      </ContentCardGroup>,
    ))

  test('renders correctly with description', () =>
    shouldMatchSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card
          description="description"
          href="http://scaleway.com"
          title="title"
        />
      </ContentCardGroup>,
    ))

  test('renders correctly with loading prop', () => {
    const { asFragment } = renderWithTheme(
      <ContentCardGroup loading>
        <ContentCardGroup.Card href="http://scaleway.com" title="title" />
      </ContentCardGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with link target _parent', () =>
    shouldMatchSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card
          href="http://scaleway.com"
          target="_parent"
          title="title"
        />
      </ContentCardGroup>,
    ))

  test('renders correctly with a children', () =>
    shouldMatchSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card href="http://scaleway.com" target="_parent">
          <div>test</div>
        </ContentCardGroup.Card>
      </ContentCardGroup>,
    ))

  test('renders correctly with different title and subtitle and with custom titleAs and subtitleAs', () =>
    shouldMatchSnapshot(
      <ContentCardGroup>
        <ContentCardGroup.Card
          href="http://scaleway.com"
          subtitle="subtitle"
          subtitleAs="h2"
          title="title"
          titleAs="h1"
        >
          <div>test</div>
        </ContentCardGroup.Card>
      </ContentCardGroup>,
    ))
})
