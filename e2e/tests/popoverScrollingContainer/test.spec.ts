import { expect, test } from '@playwright/test'

test.describe('Popover should open to the requested direction', () => {
  test('should open to the left when placement="left" even if there is not enough space', async ({
    page,
    baseURL,
  }) => {
    await page.goto(
      `${baseURL}/popoverScrollingContainer?placement=left&scrollX=start`,
    )

    await page.getByRole('button', { name: 'Open Popover' }).click()

    const popover = page.getByRole('dialog')
    await expect(popover).toBeVisible()

    const button = page.getByRole('button', { name: 'Open Popover' })
    const buttonBox = await button.boundingBox()
    const popoverBox = await popover.boundingBox()

    if (!buttonBox || !popoverBox) {
      throw 'Could not get bounding box'
    }
    expect(popoverBox.x + popoverBox.width).toBeLessThan(buttonBox.x)
  })
})

test.describe('Popover should flip direction if the placement includes "auto" and there is not enough space', () => {
  test('should open to top when placement="auto-top" and there is enough space above', async ({
    page,
    baseURL,
  }) => {
    await page.goto(
      `${baseURL}/popoverScrollingContainer?placement=auto-top&scrollY=end`,
    )

    await page.getByRole('button', { name: 'Open Popover' }).click()

    const popover = page.getByRole('dialog')
    await expect(popover).toBeVisible()

    const button = page.getByRole('button', { name: 'Open Popover' })
    const buttonBox = await button.boundingBox()
    const popoverBox = await popover.boundingBox()

    if (!buttonBox || !popoverBox) {
      throw 'Could not get bounding box'
    }
    expect(popoverBox.y + popoverBox.height).toBeLessThan(buttonBox.y)
  })

  test('should flip to bottom when placement="auto-top" and there is NOT enough space above', async ({
    page,
    baseURL,
  }) => {
    await page.goto(
      `${baseURL}/popoverScrollingContainer?placement=auto-top&scrollY=start`,
    )

    await page.getByRole('button', { name: 'Open Popover' }).click()

    const popover = page.getByRole('dialog')
    await expect(popover).toBeVisible()

    const button = page.getByRole('button', { name: 'Open Popover' })
    const buttonBox = await button.boundingBox()
    const popoverBox = await popover.boundingBox()

    if (!buttonBox || !popoverBox) {
      throw 'Could not get bounding box'
    }
    expect(popoverBox.y).toBeGreaterThan(buttonBox.y + buttonBox.height)
  })

  test('should flip to the right when placement="auto-left" and there is NOT enough space on the left', async ({
    page,
    baseURL,
  }) => {
    await page.goto(
      `${baseURL}/popoverScrollingContainer?placement=auto-left&scrollX=start`,
    )

    await page.getByRole('button', { name: 'Open Popover' }).click()

    const popover = page.getByRole('dialog')
    await expect(popover).toBeVisible()

    const button = page.getByRole('button', { name: 'Open Popover' })
    const buttonBox = await button.boundingBox()
    const popoverBox = await popover.boundingBox()

    if (!buttonBox || !popoverBox) {
      throw 'Could not get bounding box'
    }

    expect(popoverBox.x).toBeGreaterThan(buttonBox.x + buttonBox.width)
  })
})

test.describe('Popover should translate to avoid overflow', () => {
  test('should translate on the X axis to avoid horizontal overflow out of the parent container', async ({
    page,
    baseURL,
  }) => {
    await page.goto(
      `${baseURL}/popoverScrollingContainer?placement=top&scrollX=end`,
    )

    await page.getByRole('button', { name: 'Open Popover' }).click()

    const popover = page.getByRole('dialog')
    await expect(popover).toBeVisible()

    const popoverBox = await popover.boundingBox()
    const container = page.getByTestId('scroll-container')
    const containerBox = await container.boundingBox()

    if (!popoverBox || !containerBox) {
      throw 'Could not get bounding box'
    }
    expect(popoverBox.x + popoverBox.width).toBe(
      containerBox.x + containerBox.width,
    )
  })

  test('should translate on the Y axis to avoid vertical overflow out of the parent container', async ({
    page,
    baseURL,
  }) => {
    await page.goto(
      `${baseURL}/popoverScrollingContainer?placement=right&scrollX=start&scrollY=start`,
    )

    await page.getByRole('button', { name: 'Open Popover' }).click()

    const popover = page.getByRole('dialog')
    await expect(popover).toBeVisible()

    const popoverBox = await popover.boundingBox()
    const container = page.getByTestId('scroll-container')
    const containerBox = await container.boundingBox()

    if (!popoverBox || !containerBox) {
      throw 'Could not get bounding box'
    }
    expect(popoverBox.y).toBe(containerBox.y)
  })
})
