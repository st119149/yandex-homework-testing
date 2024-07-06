describe("github", function () {
  it("should check repository name", async ({ browser }) => {
    await browser.url("https://localhost:3000");

    await expect(browser.toHaveText("Testplane (ex-Hermione)"));
    expect(1).toBe(2);
  });
});
