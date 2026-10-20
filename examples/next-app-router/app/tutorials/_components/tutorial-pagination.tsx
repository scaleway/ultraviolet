'use client'

import { Pagination } from '@ultraviolet/ui'
import Link from 'next/link'

type TutorialPaginationProps = {
  page: number
  pageCount: number
}

// Client wrapper: `hrefBuilder` and `renderLink` are functions so they can't be
// passed from a server component. The pages themselves stay server-rendered and
// navigation is handled by the URL, no `onChange` needed.
export const TutorialPagination = ({ page, pageCount }: TutorialPaginationProps) => (
  <Pagination
    hrefBuilder={pageNumber => (pageNumber === 1 ? '/tutorials' : `/tutorials/${pageNumber}`)}
    page={page}
    pageCount={pageCount}
    renderLink={(_, props) => <Link {...props} />}
  />
)
