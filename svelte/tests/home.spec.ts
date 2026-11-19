import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("lists all surahs and filters them by name", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("القرآن الكريم - قائمة السور");
    await expect(
      page.getByRole("heading", { name: "قائمة السور" })
    ).toBeVisible();

    const links = page.locator(".surah-link");
    await expect(links).toHaveCount(114);

    const search = page.getByLabel("ابحث عن سورة");

    await search.fill("الفاتحة");
    await expect(links).toHaveCount(1);
    await expect(links.first()).toContainText("سورة الفاتحة");
    await expect(links.first()).toContainText("7 آيات");

    await search.fill("سورة غير موجودة");
    await expect(links).toHaveCount(0);
    await expect(
      page.getByText("لا توجد سورة مطابقة لبحثك.")
    ).toBeVisible();

    await search.fill("");
    await expect(links).toHaveCount(114);
  });

  test("persists the selected theme across reloads", async ({ page }) => {
    await page.goto("/");

    await page.locator("#themeSelect").selectOption("mint");
    await expect(page.locator("html")).toHaveClass(/theme-mint/);
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("theme")))
      .toBe("mint");

    await page.reload();
    await expect(page.locator("html")).toHaveClass(/theme-mint/);
    await expect(page.locator("#themeSelect")).toHaveValue("mint");
  });

  test("remembers the selected reciter", async ({ page }) => {
    await page.goto("/");

    await page.locator("#reciterSelect").selectOption({ label: "الحصري" });

    await expect(page.locator(".site-header__reciter")).toHaveText("الحصري");
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("selectedReciterName")))
      .toBe("الحصري");
  });
});
