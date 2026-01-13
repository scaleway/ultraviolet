import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks'
import { linkTo } from '@storybook/addon-links'
import { Alert, Stack, Text } from '@ultraviolet/ui'
import {
  h2Decorator,
  storiesDecorator,
  storiesTheme,
  titleDecorator,
} from './globalStyle.css'

type PageProps = {
  deprecated?: boolean
  deprecatedReason?: string
  migrationLink?: string
  hideArgsTable?: boolean
  experimental?: boolean
}

const Page = ({
  deprecated,
  deprecatedReason,
  migrationLink,
  hideArgsTable,
  experimental,
}: PageProps) => (
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
            {deprecatedReason ??
              'This component is deprecated and should not be used in new projects.'}
          </Alert>
        ) : null}
        {experimental ? (
          <Alert
            buttonText="Learn more about component states"
            onClickButton={linkTo('state-components-state--docs')}
            sentiment="warning"
            title="Experimental component"
          >
            This component is at an unstable stage and is subject to change in
            future releases.
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
        <Stack className={storiesDecorator}>
          <Stories />
        </Stack>
      </Stack>
    </Stack>
  </div>
)

export default Page
