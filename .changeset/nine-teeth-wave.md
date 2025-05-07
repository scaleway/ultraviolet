---
"@ultraviolet/plus": minor
---

⚠️ BREAKING CHANGES:

`Navigation.Item`: change in the types and deprecated category icon props:
  - `categoryIcon`: type switch from union type to react node to allow you adding your own category icon.
  ```tsx
  // Before
  <Navigation.Item categoryIcon="useCase" />
  
  // After
  import { UseCaseCategoryIcon } from '@ultraviolet/icons/category'
  
  <Navigation.Item categoryIcon={<UseCaseCategoryIcon />} />
  ```
  - `categoryIconVariant`: has been removed. Use the variant of the icon component itself.
  ```tsx
  // Before
  <Navigation.Item categoryIcon="useCase" categoryIconVariant="neutral" />
  
  // After
  import { UseCaseCategoryIcon } from '@ultraviolet/icons/category'
  
  <Navigation.Item categoryIcon={<UseCaseCategoryIcon variant="neutral" />} />
  ```
