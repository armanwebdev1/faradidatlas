import { test, expect } from '@playwright/test'

test('homepage looks correct in English', async ({ page }) => {
  await page.goto('/en')
  await expect(page).toHaveScreenshot('homepage-en.png')
})

test('homepage looks correct in Persian', async ({ page }) => {
  await page.goto('/fa')
  await expect(page).toHaveScreenshot('homepage-fa.png')
})

test('homepage looks correct in Arabic', async ({ page }) => {
  await page.goto('/ar')
  await expect(page).toHaveScreenshot('homepage-ar.png')
})
