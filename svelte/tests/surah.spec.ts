import { expect, test } from "@playwright/test";

test.describe("surah page", () => {
  test("opens a surah and renders its verses", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /سورة الفاتحة/ }).click();

    await expect(page).toHaveURL(/\/surah\/1\/?$/);
    await expect(page).toHaveTitle("سورة الفاتحة - القرآن الكريم");
    await expect(
      page.getByRole("heading", { name: "سورة الفاتحة" })
    ).toBeVisible();
    await expect(page.locator(".ayah")).toHaveCount(7);
    await expect(page.locator(".chip", { hasText: "7 آيات" })).toBeVisible();
  });

  test("shows the basmala only where it belongs", async ({ page }) => {
    await page.goto("/surah/2");
    const basmala = await page.locator(".bismillah").textContent();
    expect(basmala?.replace(/\p{M}/gu, "")).toContain("بسم");
    await expect(page.locator(".ayah")).toHaveCount(286);
    await expect(page.locator(".chip", { hasText: "286 آية" })).toBeVisible();

    await page.goto("/surah/9");
    await expect(page.locator(".bismillah")).toHaveCount(0);
  });

  test("switches the riwaya and updates the audio source", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("selectedReciter", "husary-hafs");
    });
    await page.goto("/surah/2");

    const riwaya = page.locator("#riwayaSelect");
    const audio = page.locator("audio");

    await expect(riwaya).toHaveValue("husary-hafs");
    await expect(riwaya.locator("option")).toHaveCount(5);
    await expect(audio).toHaveAttribute(
      "src",
      "https://server13.mp3quran.net/husr/002.mp3"
    );

    await riwaya.selectOption("husary-warsh");

    await expect(audio).toHaveAttribute(
      "src",
      "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/002.mp3"
    );
    await expect(page.locator(".audio-panel__meta")).toContainText(
      "ورش عن نافع"
    );
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("selectedReciter")))
      .toBe("husary-warsh");
  });

  test("renders the custom audio player controls", async ({ page }) => {
    await page.goto("/surah/1");

    await expect(
      page.getByRole("button", { name: "تشغيل تلاوة سورة الفاتحة" })
    ).toBeVisible();
    await expect(page.locator(".player__range")).toBeVisible();
    await expect(page.locator(".player__times")).toContainText("0:00");
  });

  test("renders the custom 404 page", async ({ page }) => {
    const response = await page.goto("/surah/999");

    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "الصفحة غير موجودة" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "العودة إلى قائمة السور" })
    ).toBeVisible();
  });
});
