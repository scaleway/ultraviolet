import { Meta, Story } from '@storybook/react'
import React, { ComponentProps, useState } from 'react'
import Pagination from '..'
import Button from '../../Button'
import Placeholder from '../../Placeholder'
import getPageNumbers from '../getPageNumbers'
import ExampleChildren from './ExampleChildren'

export default {
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: 'Pagination can be useful for long listings.',
      },
    },
  },
  title: 'Components/Pagination',
} as Meta

const Template: Story<ComponentProps<typeof Pagination>> = args => (
  <Pagination {...args}>
    {({ pageData }: { pageData: string[] }) => (
      <ul>
        {pageData.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )}
  </Pagination>
)

export const Default = Template.bind({})

export const Basic = Template.bind({})
Basic.decorators = [
  () => (
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
    </Pagination>
  ),
]

export const ReactComponentChildren = Template.bind({})
ReactComponentChildren.decorators = [
  () => (
    <Pagination
      perPage={5}
      initialData={Array.from({ length: 50 }, (_, index) => index).map(
        value => `Item ${value}`,
      )}
    >
      <ExampleChildren />
    </Pagination>
  ),
]

export const MorePageButtons = Template.bind({})
MorePageButtons.decorators = [
  () => (
    <Pagination
      pageTabCount={8}
      perPage={3}
      initialData={Array.from({ length: 50 }, (_, index) => index).map(
        value => `Item ${value}`,
      )}
    >
      <ExampleChildren />
    </Pagination>
  ),
]

export const LoadableNextPage = Template.bind({})
LoadableNextPage.decorators = [
  () => {
    const [fakeLoadNum, setFakeLoadNum] = useState<number>(0)
    const loadMore = async ({
      page,
      perPage = 5,
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
          resolve(fakeLoadNum > 3 ? undefined : additionalData)
          setFakeLoadNum(current => current + 1)
        }, 3000)
      })
    }

    return (
      <Pagination
        perPage={5}
        onLoadPage={loadMore}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
      >
        <ExampleChildren />
      </Pagination>
    )
  },
]

export const PageCount = Template.bind({})
PageCount.decorators = [
  () => {
    const loadMore = async ({
      page,
      perPage = 5,
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
        }, 3000)
      })
    }

    return (
      <Pagination
        perPage={5}
        pageCount={20}
        onLoadPage={loadMore}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
      >
        <ExampleChildren />
      </Pagination>
    )
  },
]

export const CustomComponents = Template.bind({})
CustomComponents.decorators = [
  () => {
    const [fakeLoadNum, setFakeLoadNum] = useState(0)
    const loadMore = async ({
      page,
      perPage = 5,
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
          resolve(fakeLoadNum > 3 ? undefined : additionalData)
          setFakeLoadNum(current => current + 1)
        }, 3000)
      })
    }

    return (
      <Pagination
        perPage={5}
        onLoadPage={loadMore}
        initialData={Array.from({ length: 50 }, (_, index) => index).map(
          value => `Item ${value}`,
        )}
        LoaderComponent={() => (
          <div style={{ display: 'flex', margin: '16px 0' }}>
            {Array.from({ length: 5 }, (_, index) => index).map(value => (
              <Placeholder key={value} variant="line" />
            ))}
          </div>
        )}
        RightComponent={() => <p>I am a custom right component</p>}
        LeftComponent={() => <p>I am a custom left component</p>}
        MiddleComponent={({ paginationState }) => {
          const {
            isLoadingPage,
            page,
            maxPage,
            canLoadMore,
            goToNextPage,
            goToPage,
            goToPreviousPage,
          } = paginationState
          const pageNumbersToDisplay = getPageNumbers(page, maxPage, 5)
          const handlePageClick = (pageNumber: number) => () => {
            goToPage(pageNumber)
          }

          return (
            <div style={{ display: 'flex', gap: 8 }}>
              <Button
                disabled={page === 1 || isLoadingPage}
                onClick={goToPreviousPage}
              >
                Back
              </Button>
              {pageNumbersToDisplay.map(pageNumber => (
                <Button
                  key={pageNumber}
                  disabled={isLoadingPage}
                  variant={page === pageNumber ? 'primary' : 'secondary'}
                  onClick={handlePageClick(pageNumber)}
                >
                  {pageNumber}
                </Button>
              ))}
              <Button
                disabled={(page === maxPage && !canLoadMore) || isLoadingPage}
                onClick={goToNextPage}
              >
                Next
              </Button>
            </div>
          )
        }}
      >
        <ExampleChildren />
      </Pagination>
    )
  },
]
