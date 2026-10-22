import { Pagination, Stack, Text } from '@ultraviolet/ui'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const PAGE_COUNT = 5
const ITEMS_PER_PAGE = 10

type TutorialListProps = {
  page: number
}

const TutorialList = ({ page }: TutorialListProps) => (
  <Stack as="ul" gap={1}>
    {Array.from({ length: ITEMS_PER_PAGE }, (_, index) => (page - 1) * ITEMS_PER_PAGE + index + 1).map(item => (
      <Text as="li" key={item} variant="body">
        Tutorial {item}
      </Text>
    ))}
  </Stack>
)

// Both Pagination modes side by side: URL-driven links (hrefBuilder + renderLink
// with react-router Link) and classic controlled buttons (onChange).
export const TutorialsPage = () => {
  const { page: pageParam } = useParams()
  const page = Math.max(Number(pageParam) || 1, 1)
  const [clientPage, setClientPage] = useState(1)

  return (
    <Stack gap={4} maxWidth="80ch" style={{ padding: '32px' }} width="100%">
      <Text as="h1" variant="heading">
        Tutorials
      </Text>
      <Stack as="section" gap={2}>
        <Text as="h2" variant="headingSmall">
          URL-driven (hrefBuilder + renderLink)
        </Text>
        <TutorialList page={page} />
        <Pagination
          hrefBuilder={pageNumber => `/tutorials/${pageNumber}`}
          page={page}
          pageCount={PAGE_COUNT}
          renderLink={(_, { href, ...props }) => <Link {...props} to={href} />}
        />
      </Stack>
      <Stack as="section" gap={2}>
        <Text as="h2" variant="headingSmall">
          Client-side (onChange)
        </Text>
        <TutorialList page={clientPage} />
        <Pagination onChange={setClientPage} page={clientPage} pageCount={PAGE_COUNT} />
      </Stack>
    </Stack>
  )
}
