import { ThemeProvider } from '@emotion/react'
import { act, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination, usePaginationContext } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'
import theme from '../../../theme'
import getPageNumbers from '../getPageNumbers'
import type { UsePaginationReturn } from '../usePagination'

const ExampleChildren = () => {
  const { pageData } = usePaginationContext<string>()

  return (
    <ul>
      {pageData.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

const loadMore = async ({
  page,
  perPage = 0,
}: {
  page: number
  perPage?: number
}) => {
  const additionalData = Array.from(
    { length: perPage },
    (_, index) => index,
  ).map(value => `Item ${page * perPage + value}`)

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(additionalData)
    }, 300)
  })
}

describe('Pagination', () => {
  test('should render correctly function', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        perPage={5}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
      >
        {({ pageData }: { pageData: string[] }) => (
          <ul>
            {pageData.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </Pagination>,
    ))

  test('should render correctly component', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        perPage={5}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
      >
        <ExampleChildren />
      </Pagination>,
    ))

  test('should render correctly component with pageTabCount', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        pageTabCount={3}
        perPage={5}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
      >
        <ExampleChildren />
      </Pagination>,
    ))

  test('should render correctly onLoadPage', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        perPage={5}
        onLoadPage={loadMore}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
      >
        <ExampleChildren />
      </Pagination>,
    ))

  test('should render correctly onLoadPage and pageCount', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        perPage={5}
        pageCount={20}
        onLoadPage={loadMore}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
      >
        <ExampleChildren />
      </Pagination>,
    ))

  test('should render correctly customComponents', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        perPage={5}
        onLoadPage={loadMore}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
        LoaderComponent={() => <div>Loading</div>}
        RightComponent={() => <>I&apos;m a custom right component</>}
        LeftComponent={() => <>I&apos;m a custom left component</>}
        MiddleComponent={({
          paginationState: {
            isLoadingPage,
            page,
            maxPage,
            canLoadMore,
            goToNextPage,
            goToPage,
            goToPreviousPage,
          },
        }) => {
          const pageNumbersToDisplay = getPageNumbers(page, maxPage, 5)
          const handlePageClick = (pageNumber: number) => () => {
            goToPage(pageNumber)
          }

          return (
            <>
              <button
                type="button"
                disabled={page === 1 || isLoadingPage}
                onClick={goToPreviousPage}
              >
                Back
              </button>
              {pageNumbersToDisplay.map(pageNumber => (
                <button
                  type="button"
                  key={pageNumber}
                  disabled={isLoadingPage}
                  onClick={handlePageClick(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                type="button"
                disabled={(page === maxPage && !canLoadMore) || isLoadingPage}
                onClick={goToNextPage}
              >
                Next
              </button>
            </>
          )
        }}
      >
        <ExampleChildren />
      </Pagination>,
    ))

  test('should render correctly customComponents 2', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        perPage={5}
        onLoadPage={loadMore}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
        LoaderComponent={() => <div>Loading</div>}
        RightComponent={() => <div>I am a custom right component</div>}
        LeftComponent={() => <div>I am a custom left component</div>}
        MiddleComponent={() => <div>I am the middle one</div>}
      >
        <ExampleChildren />
      </Pagination>,
    ))

  test('should render correctly with pageClick', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        perPage={5}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
      >
        <ExampleChildren />
      </Pagination>,
      {
        transform: async node => {
          const nextButton = node.getByRole('button', { name: 'Next' })
          const backButton = node.getByRole('button', { name: 'Back' })
          const firstButton = node.getByRole('button', { name: 'First' })
          const lastButton = node.getByRole('button', { name: 'Last' })
          await userEvent.click(nextButton)
          await userEvent.click(backButton)
          await userEvent.click(lastButton)
          await userEvent.click(firstButton)
          const page3Button = node.getByRole('button', { name: 'Page 3' })
          await userEvent.click(page3Button)
          await userEvent.click(page3Button)
          const page4Button = node.getByRole('button', { name: 'Page 4' })
          await userEvent.click(page4Button)
        },
      },
    ))

  test('should render correctly loadable with no data and initial page 1', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        onLoadPage={async () =>
          new Promise(resolve => {
            setTimeout(() => resolve([]), 300)
          })
        }
        perPage={5}
      >
        <ExampleChildren />
      </Pagination>,
    ))

  test('should render correctly loadable with no data and initial page 3', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        initialPage={3}
        onLoadPage={async () =>
          new Promise(resolve => {
            setTimeout(() => resolve([]), 300)
          })
        }
        perPage={5}
      >
        <ExampleChildren />
      </Pagination>,
    ))

  test('should render correctly loadable with pageClick', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        onLoadPage={loadMore}
        perPage={5}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
      >
        <ExampleChildren />
      </Pagination>,
      {
        transform: async node => {
          const nextButton = node.getByRole('button', { name: 'Next' })
          const lastButton = node.getByRole('button', { name: 'Last' })
          await userEvent.click(lastButton)
          await node.findByText('Current : 10')
          await node.findByRole('button', { name: 'Page 10' })
          await userEvent.click(nextButton)
          await node.findByRole('button', { name: 'Page 11' })
          await node.findByText('Item 55')
          await waitFor(() =>
            expect(nextButton.getAttribute('aria-disabled')).toBe('false'),
          )
        },
      },
    ))

  test('should render correctly with pageClick and pageCount', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        pageCount={50}
        perPage={5}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
      >
        <ExampleChildren />
      </Pagination>,
      {
        transform: async node => {
          await act(async () => {
            await userEvent.click(node.getByRole('button', { name: 'Last' }))
          })
        },
      },
    ))

  test('should render correctly with wrong page change', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        pageCount={50}
        perPage={5}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
        MiddleComponent={() => null}
      >
        {({
          goToPage,
          goToLastPage,
          goToNextPage,
          goToPreviousPage,
        }: UsePaginationReturn<string>) => (
          <>
            <button type="button" onClick={() => goToPage(100)}>
              100
            </button>
            <button type="button" onClick={() => goToPage(-1)}>
              -1
            </button>
            <button type="button" onClick={goToLastPage}>
              Last
            </button>
            <button type="button" onClick={goToNextPage}>
              Next
            </button>
            <button type="button" onClick={goToPreviousPage}>
              Previous
            </button>
          </>
        )}
      </Pagination>,
      {
        transform: async node => {
          await act(async () => {
            await userEvent.click(node.getByRole('button', { name: 'Next' }))
            await userEvent.click(
              node.getByRole('button', { name: 'Previous' }),
            )
            await userEvent.click(node.getByRole('button', { name: 'Last' }))
            await userEvent.click(node.getByRole('button', { name: '-1' }))
            await userEvent.click(node.getByRole('button', { name: '100' }))
          })
        },
      },
    ))

  test('should render correctly with pageClick and load and empty response', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        perPage={5}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
        onLoadPage={async () =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve('ok')
            }, 500)
          })
        }
      >
        <ExampleChildren />
      </Pagination>,
      {
        transform: async node => {
          await userEvent.click(node.getByRole('button', { name: 'Last' }))
          const nextButton = node.getByRole('button', { name: 'Next' })
          await userEvent.click(nextButton)
          await node.findByText('Current : 11')
        },
      },
    ))

  test('should render correctly with pageClick and load and no emtpy response', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        perPage={5}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
        onLoadPage={loadMore}
      >
        <ExampleChildren />
      </Pagination>,
      {
        transform: async node => {
          await userEvent.click(node.getByRole('button', { name: 'Last' }))
          const nextButton = node.getByRole('button', { name: 'Next' })
          await userEvent.click(nextButton)
          await node.findByText('Current : 11')
        },
      },
    ))

  test('should render correctly with initial page greater than max and no Load', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        initialPage={50}
        perPage={5}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
      >
        <ExampleChildren />
      </Pagination>,
    ))

  test('should render correctly with initial page less than 1 and no Load', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        initialPage={0}
        perPage={5}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
      >
        <ExampleChildren />
      </Pagination>,
    ))

  test('should render correctly with data (controlled component)', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        data={Array.from({ length: 5 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
      >
        <ExampleChildren />
      </Pagination>,
    ))

  test('should render correctly with setPageData', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        pageCount={50}
        perPage={5}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
      >
        {({ setPageData }: UsePaginationReturn<string>) => (
          <button type="button" onClick={() => setPageData(10, ['test'])}>
            Set Page Data
          </button>
        )}
      </Pagination>,
      {
        transform: async node => {
          await userEvent.click(
            node.getByRole('button', { name: 'Set Page Data' }),
          )
        },
      },
    ))

  test('should render correctly with empty initialData', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination initialData={[]}>
        <ExampleChildren />
      </Pagination>,
    ))

  test('should render correctly with empty data', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination data={[]}>
        <ExampleChildren />
      </Pagination>,
    ))

  test('should render correctly controlled with page', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
        perPage={10}
        page={3}
      >
        <ExampleChildren />
      </Pagination>,
    ))

  test('should render correctly with controlled', async () => {
    const fn = jest.fn()
    await shouldMatchEmotionSnapshot(
      <Pagination
        page={1}
        onChangePage={fn}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
      >
        <ExampleChildren />
      </Pagination>,
      {
        transform: async node => {
          await userEvent.click(node.getByRole('button', { name: 'Last' }))
          const nextButton = node.getByRole('button', { name: 'Next' })
          await userEvent.click(nextButton)
        },
      },
    )
  })

  test('should render correctly with props change', () => {
    const { rerender } = render(
      <ThemeProvider theme={theme}>
        <Pagination
          page={1}
          initialData={Array.from({ length: 50 }, (_, index) => index).map(
            value => `Item ${value}`,
          )}
        >
          <ExampleChildren />
        </Pagination>
        ,
      </ThemeProvider>,
    )
    rerender(
      <ThemeProvider theme={theme}>
        <Pagination
          page={2}
          initialData={Array.from({ length: 50 }, (_, index) => index).map(
            value => `Item ${value}`,
          )}
        >
          <ExampleChildren />
        </Pagination>
      </ThemeProvider>,
    )
  })

  test('should render correctly perPage 0', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination
        perPage={0}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
      >
        <ExampleChildren />
      </Pagination>,
    ))

  test('should render correctly PaginationContainer', async () =>
    shouldMatchEmotionSnapshot(
      <Pagination.PaginationContainer
        paginationState={{
          canLoadMore: false,
          goToFirstPage: jest.fn(),
          goToLastPage: jest.fn(),
          goToNextPage: jest.fn(),
          goToPage: jest.fn(),
          goToPreviousPage: jest.fn(),
          isLoadingPage: false,
          maxPage: 2,
          page: 1,
          pageData: [],
          paginatedData: {},
          perPage: undefined,
          reloadPage: jest.fn(),
          setPageData: jest.fn(),
          setPaginatedData: jest.fn(),
        }}
      />,
    ))
})
