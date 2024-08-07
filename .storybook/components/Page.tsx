import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from '@storybook/blocks'
import { Badge, Button, Text, Stack, Link, Row } from '@ultraviolet/ui'
import styled from '@emotion/styled'
import { linkTo } from '@storybook/addon-links'
import { useMemo } from 'react'

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledTitle = styled.div`
  &[data-state='deprecated'] h1 {
    text-decoration: line-through;
    text-decoration-color: ${({ theme }) => theme.colors.danger.text};
  }
`

const StoriesThemes = styled.div`
  .docs-story > div {
    padding: 0;
  }

  .css-xzp052 .innerZoomElementWrapper > * {
    border: 0 !important;
  }
`

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
}: PageProps) => {
  const state = useMemo(() => {
    if (deprecated) {
      return 'deprecated'
    }
    if (experimental) {
      return 'experimental'
    }
    return 'stable'
  }, [])

  return (
    <StoriesThemes>
      <StyledHeaderContainer>
        <StyledTitle data-state={state}>
          <Title />
        </StyledTitle>
        {deprecated ? (
          <Badge sentiment="danger" size="large" icon="alert">
            Deprecated
          </Badge>
        ) : null}
        {experimental ? (
          <Badge sentiment="warning" size="large">
            <Stack direction="row" alignItems="center" gap={1}>
              <svg viewBox="0 0 100 100" role="img" width="18px">
                <path
                  d="M90.72 82.34c4.4 7 1.29 12.66-7 12.66H16.25C8 95 4.88 89.31 9.28 82.34l29.47-46.46V12.5H35A3.75 3.75 0 0135 5h30a3.75 3.75 0 010 7.5h-3.75v23.38zM45.08 39.86L29.14 65h41.72L54.92 39.86l-1.17-1.81V12.5h-7.5v25.55z"
                  fill="currentColor"
                />
              </svg>{' '}
              Experimental
            </Stack>
          </Badge>
        ) : null}
      </StyledHeaderContainer>
      {deprecated ? (
        <Row templateColumns="1fr auto" justifyContent="top">
          <Text as="h3" variant="bodyStronger" sentiment="danger">
            {deprecatedReason
              ? deprecatedReason
              : 'This component is deprecated please do not use it any more.'}
          </Text>
          {migrationLink ? (
            <Button
              onClick={linkTo(migrationLink)}
              variant="ghost"
              size="small"
            >
              How to migrate?
            </Button>
          ) : null}
        </Row>
      ) : (
        <Subtitle />
      )}
      {experimental ? (
        <Text as="h3" variant="bodyStronger" sentiment="warning">
          This component is at an unstable stage and is subject to change in
          future releases.&nbsp;
          <Link
            href="/?path=/docs/state-components-state--docs"
            iconPosition="right"
          >
            Learn more about component states
          </Link>
        </Text>
      ) : null}
      <Description />
      <Primary />
      {!hideArgsTable ? <Controls /> : null}
      <Stories />
    </StoriesThemes>
  )
}

export default Page
