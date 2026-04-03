import { useContext } from 'react'

import { Stack } from '../../components/Stack'

import { CategoryName } from './components/Category'
import { SubCategory } from './components/SubCategory'
import { OrderSummaryContext } from './Provider'
import { orderSummaryStyle } from './styles.css'

export const ScrollableContent = () => {
  const { items } = useContext(OrderSummaryContext)

  return (
    <Stack className={orderSummaryStyle.scrollableContainer} gap={3}>
      {items.map(category =>
        Object.keys(category).length > 0 && category.category ? (
          <Stack
            className={orderSummaryStyle.category}
            gap={1.5}
            key={category.category}
          >
            {category.subTitle ? (
              <Stack direction="column">
                <CategoryName category={category} />
                {category.subTitle}
              </Stack>
            ) : (
              <CategoryName category={category} />
            )}
            {category.subCategories &&
            Object.keys(category.subCategories).length > 0 ? (
              <Stack gap={1}>
                {category.subCategories.map((subCategory, index) => (
                  <SubCategory
                    // oxlint-disable-next-line react/no-array-index-key
                    key={subCategory.title ?? `${index}`}
                    subCategory={subCategory}
                  />
                ))}
              </Stack>
            ) : null}
          </Stack>
        ) : null,
      )}
    </Stack>
  )
}
