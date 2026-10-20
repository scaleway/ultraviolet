import { Stack, Text } from '@ultraviolet/ui'
import { TutorialPagination } from './tutorial-pagination'

const PAGE_COUNT = 5
const ITEMS_PER_PAGE = 10

type TutorialListProps = {
  page: number
}

export const TutorialList = ({ page }: TutorialListProps) => (
  <main>
    <Stack gap={2} maxWidth="80ch" style={{ padding: '32px' }} width="100%">
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
      <TutorialPagination page={page} pageCount={PAGE_COUNT} />
    </Stack>
  </main>
)
