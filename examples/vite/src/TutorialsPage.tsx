import { Pagination, Stack, Text } from '@ultraviolet/ui'
import { Link, useParams } from 'react-router-dom'

const PAGE_COUNT = 5
const ITEMS_PER_PAGE = 10

// Pagination rendered as react-router links: `renderLink` receives the props to
// spread on the link, including the `href` built by `hrefBuilder`.
export const TutorialsPage = () => {
  const { page: pageParam } = useParams()
  const page = Math.max(Number(pageParam) || 1, 1)

  return (
    <Stack gap={4} maxWidth="80ch" style={{ padding: '32px' }} width="100%">
      <Text as="h1" variant="heading">
        Tutorials
      </Text>
      <Stack as="ul" gap={1}>
        {Array.from({ length: ITEMS_PER_PAGE }, (_, index) => (page - 1) * ITEMS_PER_PAGE + index + 1).map(item => (
          <Text as="li" key={item} variant="body">
            Tutorial {item}
          </Text>
        ))}
      </Stack>
      <Pagination
        hrefBuilder={pageNumber => `/tutorials/${pageNumber}`}
        page={page}
        pageCount={PAGE_COUNT}
        renderLink={(_, { href, ...props }) => <Link {...props} to={href} />}
      />
    </Stack>
  )
}
