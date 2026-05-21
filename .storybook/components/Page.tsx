import { Controls, Description, Markdown, Primary, Stories, Subtitle, Title } from '@storybook/addon-docs/blocks'
import { linkTo } from '@storybook/addon-links'
import { Alert, Stack, Text } from '@ultraviolet/ui'
import { useEffect, useState } from 'react'
import { h2Decorator, storiesDecorator, storiesTheme, titleDecorator } from './globalStyle.css'

type PageProps = {
  deprecated?: boolean
  deprecatedReason?: string
  migrationLink?: string
  hideArgsTable?: boolean
  experimental?: boolean
  a11yDocs?: string
}

const A11yDocumentation = () => {
  const [a11yContent, setA11yContent] = useState<string | null>(null)

  useEffect(() => {
    const loadA11yDocs = async () => {
      try {
        // Get current URL to determine component path
        const urlParams = new URLSearchParams(window.location.search)
        const storyId = urlParams.get('id')

        if (!storyId) {
          return
        }

        // Extract component name from story ID (e.g., "ui-components-alert--primary")
        const parts = storyId.split('-')
        if (parts.length < 2) {
          return
        }

        const componentName = parts[2]
        const capitalizedComponent = componentName.charAt(0).toUpperCase() + componentName.slice(1)

        // Try to fetch a11y.md
        const response = await fetch(`/packages/ui/src/components/${capitalizedComponent}/a11y.md`)
        if (response.ok) {
          const content = await response.text()
          setA11yContent(content)
        }
      } catch (error) {
        // File doesn't exist or fetch failed
        console.debug('Could not load a11y.md:', error)
      }
    }

    loadA11yDocs().catch(() => null)
  }, [])

  if (!a11yContent) {
    return null
  }

  return (
    <div>
      <Text as="h2" className={h2Decorator} variant="headingStrong">
        Accessibility Documentation
      </Text>
      <div style={{ marginTop: '16px' }}>
        <Markdown>{a11yContent}</Markdown>
      </div>
    </div>
  )
}

const Page = ({ deprecated, deprecatedReason, migrationLink, hideArgsTable, experimental, a11yDocs }: PageProps) => (
  <div className={storiesTheme}>
    <Stack gap={1}>
      <div>
        <div className={titleDecorator}>
          <Title />
        </div>
        {deprecated ? (
          <Alert
            buttonText={migrationLink ? 'How to migrate?' : undefined}
            onClickButton={migrationLink ? linkTo(migrationLink) : undefined}
            title="Deprecated component"
          >
            {deprecatedReason ?? 'This component is deprecated and should not be used in new projects.'}
          </Alert>
        ) : null}
        {experimental ? (
          <Alert
            buttonText="Learn more about component states"
            onClickButton={linkTo('state-components-state--docs')}
            sentiment="warning"
            title="Experimental component"
          >
            This component is at an unstable stage and is subject to change in future releases.
          </Alert>
        ) : null}
      </div>
      <Stack gap={2}>
        <Stack>
          <Text as="h2" className={h2Decorator} variant="headingStrong">
            Overview
          </Text>
          <Subtitle />
          <Description />
        </Stack>
        <div>
          <Primary />
          {hideArgsTable ? null : (
            <>
              <Text as="h2" className={h2Decorator} variant="headingStrong">
                Props
              </Text>
              <Controls />
            </>
          )}
        </div>
        {a11yDocs ? (
          <div>
            <Text as="h2" className={h2Decorator} variant="headingStrong">
              Accessibility Documentation
            </Text>
            <div style={{ marginTop: '16px' }}>
              <Markdown>{a11yDocs}</Markdown>
            </div>
          </div>
        ) : null}

        <Stack className={storiesDecorator}>
          <Stories />
        </Stack>

        <A11yDocumentation />
      </Stack>
    </Stack>
  </div>
)

export default Page
