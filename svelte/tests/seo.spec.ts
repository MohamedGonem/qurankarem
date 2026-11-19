import { expect, test } from "@playwright/test";

test.describe("SEO endpoints", () => {
  test("serves a sitemap with every page", async ({ request }) => {
    const response = await request.get("/sitemap.xml");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toMatch(/xml/);

    const xml = await response.text();
    expect(xml).toContain("/surah/1/");
    expect(xml).toContain("/surah/114/");
    expect(xml.match(/<url>/g)).toHaveLength(115);
  });

  test("serves robots.txt with the sitemap location", async ({ request }) => {
    const response = await request.get("/robots.txt");

    expect(response.ok()).toBeTruthy();

    const body = await response.text();
    expect(body).toContain("User-agent: *");
    expect(body).toContain("Sitemap:");
    expect(body).toContain("/sitemap.xml");
  });
});
