import { test, expect } from '@playwright/test'

test('products page looks correct', async ({ page }) => {
  await page.goto('/en/products')
  await expect(page).toHaveScreenshot('products-en.png')
})

test('product detail page looks correct', async ({ page }) => {
  await page.goto('/en/products/mizban-super-basmati-rice')
  await expect(page).toHaveScreenshot('product-detail-en.png')
})
