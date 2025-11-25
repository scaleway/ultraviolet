import {
  ArrowDownIcon,
  ArrowUpIcon,
  MinusIcon,
  PlusIcon,
} from '@ultraviolet/icons'
import { Button, Expandable, Snippet, Stack, Text } from '@ultraviolet/ui'
import { useReducer } from 'react'
import * as assets from '../index'
import {
  buttonStory,
  cardStory,
  imageProductStory,
  imageVariousStory,
  margedStackStory,
  snippetStory,
  stackStory,
} from './style.css'

const defaultAssets = {
  products: assets.default.products,
  various: assets.default.various,
}

type AssetsModule = Record<string, Record<string, Record<string, string>>>
/* 
const StyledSnippet = styled(Snippet)`
  padding: ${({ theme }) => theme.space['2']};
`

const StyledStack = styled(Stack)`
  min-width: 0;
  padding-right: ${({ theme }) => theme.space['2']};
`

const StyledButton = styled(Button)`
  width: fit-content;
  height: fit-content;
  background: none;
  border: none;
  padding: ${({ theme }) => theme.space['0.5']} ${({ theme }) => theme.space['1']};
  text-align: left;
`

const StyledImageProduct = styled.img`
  border-radius: ${({ theme }) => theme.radii.large} 0 0
    ${({ theme }) => theme.radii.large};
  background: ${({ theme }) =>
    theme.theme === 'light' ? theme.colors.neutral.backgroundStronger : null};
`

const StyledImageVarious = styled.img`
  border-radius: ${({ theme }) => theme.radii.large} 0 0
    ${({ theme }) => theme.radii.large};
  background: ${({ theme }) =>
    theme.theme === 'light' ? null : theme.colors.neutral.backgroundStronger};
`

const MargedStack = styled(Stack)`
  margin-left: ${({ theme }) => theme.space['4']};
`

const Card = styled(Stack)`
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  border-radius: ${({ theme }) => theme.radii.large};
`
 */
type SubListElementProps = {
  productName: string
  isExpanded: boolean
  setIsExpanded: () => void
  category: string
}

const SubListElement = ({
  productName,
  isExpanded,
  setIsExpanded,
  category,
}: SubListElementProps) => (
  <Stack className={margedStackStory} gap={1}>
    <Button className={buttonStory} onClick={setIsExpanded} sentiment="neutral">
      {isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
      {productName}
    </Button>
    <Expandable opened={isExpanded}>
      <Stack gap={1}>
        {Object.keys(
          (defaultAssets as AssetsModule)[category][productName],
        ).map(productImg => {
          const imgSrc = (defaultAssets as AssetsModule)[category][productName][
            productImg
          ]

          return (
            <Stack
              alignItems="center"
              className={cardStory}
              direction="row"
              flex={1}
              gap={2}
              key={productImg}
            >
              {category === 'products' ? (
                <img
                  alt={productName}
                  className={imageProductStory}
                  src={
                    (defaultAssets as AssetsModule)[category][productName][
                      productImg
                    ]
                  }
                  width={200}
                />
              ) : (
                <img
                  alt={productName}
                  className={imageVariousStory}
                  src={
                    (defaultAssets as AssetsModule)[category][productName][
                      productImg
                    ]
                  }
                  width={200}
                />
              )}
              <Stack className={stackStory} direction="column">
                <Text as="h3" variant="bodyStrong">
                  {productImg}.{imgSrc.split('.').pop()}
                </Text>
                <Snippet className={snippetStory}>
                  {`import { ${productImg} } from '@ultraviolet/illustrations/${category}/${productName}'`}
                </Snippet>
              </Stack>
            </Stack>
          )
        })}
      </Stack>
    </Expandable>
  </Stack>
)

export const List = () => {
  const [expandedStates, setExpandedStates] = useReducer(
    (oldState: Record<string, boolean>, newState: Record<string, boolean>) => ({
      ...oldState,
      ...newState,
    }),
    {},
  )
  const [isAllExpanded, setIsAllExpanded] = useReducer(state => !state, false)

  const toggleAllExpanded = () => {
    const newExpandedCategoryStates = Object.keys(defaultAssets).reduce(
      (acc, category) => ({
        ...acc,
        [category]: !isAllExpanded,
      }),
      {},
    )
    setExpandedStates(newExpandedCategoryStates)

    const newExpandedProductStates = Object.keys(defaultAssets).reduce(
      (acc, category) => ({
        ...acc,
        ...Object.keys((defaultAssets as AssetsModule)[category]).reduce(
          (localAcc, productName) => ({
            ...localAcc,
            [productName]: !isAllExpanded,
          }),
          {},
        ),
      }),
      {},
    )
    setExpandedStates(newExpandedProductStates)
    setIsAllExpanded()
  }

  return (
    <Stack gap={3}>
      <Button onClick={toggleAllExpanded} sentiment="primary">
        {isAllExpanded ? <MinusIcon /> : <PlusIcon />}
        {isAllExpanded ? 'Collapse' : 'Expand'} all
      </Button>
      <Stack gap={1}>
        {Object.keys(assets.default).map(category => {
          if (category === 'components') {
            return null
          }

          return (
            <div key={category}>
              <Button
                className={buttonStory}
                onClick={() => {
                  const newExpandedStates = { ...expandedStates }
                  newExpandedStates[category] = !expandedStates[category]
                  setExpandedStates(newExpandedStates)
                }}
                sentiment="neutral"
              >
                {expandedStates[category] ? <ArrowUpIcon /> : <ArrowDownIcon />}
                {category}
              </Button>
              <Expandable opened={expandedStates[category]}>
                <Stack gap={1}>
                  {Object.keys((defaultAssets as AssetsModule)[category]).map(
                    productName => (
                      <SubListElement
                        category={category}
                        isExpanded={expandedStates[productName]}
                        key={`${category}-${productName}`}
                        productName={productName}
                        setIsExpanded={() => {
                          // Toggle the expanded state for a specific element
                          const newExpandedStates = { ...expandedStates }
                          newExpandedStates[productName] =
                            !expandedStates[productName]
                          setExpandedStates(newExpandedStates)
                        }}
                      />
                    ),
                  )}
                </Stack>
              </Expandable>
            </div>
          )
        })}
      </Stack>
    </Stack>
  )
}
