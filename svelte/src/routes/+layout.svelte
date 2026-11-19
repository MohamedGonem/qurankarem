<script lang="ts">
  import { onMount } from "svelte";
  import { asset } from "$app/paths";
  import { page } from "$app/state";
  import { app } from "#lib/state/app.svelte.js";
  import type { LayoutProps } from "./$types";
  import "../app.css";

  let { children }: LayoutProps = $props();

  const canonical = $derived(`${page.url.origin}${page.url.pathname}`);
  const ogImage = $derived(new URL(asset("banner.png"), page.url.href).href);

  onMount(() => {
    app.init();
  });
</script>

<svelte:head>
  <link rel="icon" href={asset("favicon.svg")} type="image/svg+xml" />
  <link rel="apple-touch-icon" href={asset("apple-touch-icon.png")} />
  <link rel="canonical" href={canonical} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:width" content="1280" />
  <meta property="og:image:height" content="640" />
  <meta property="og:image:alt" content="القرآن الكريم - قائمة السور" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

<a class="skip-link" href="#main-content">تجاوز إلى المحتوى</a>

<div class="app-shell">
  <header class="site-header">
    <div class="site-header__inner">
      <h1 class="site-header__title">القرآن الكريم</h1>
      <p class="site-header__subtitle">
        بصوت الشيخ
        <span class="site-header__reciter">{app.reciterName || "..."}</span>
      </p>
    </div>
  </header>

  <main id="main-content" class="site-main">
    {@render children()}
  </main>

  <footer class="site-footer">
    <p class="site-footer__signature">
      &copy; {new Date().getFullYear()} من مسلم لمسلم
    </p>
  </footer>
</div>
