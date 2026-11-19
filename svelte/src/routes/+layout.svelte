<script lang="ts">
  import { onMount } from "svelte";
  import favicon from "#lib/assets/favicon.svg";
  import { app } from "#lib/state/app.svelte.js";
  import type { LayoutProps } from "./$types";
  import "../app.css";

  let { children }: LayoutProps = $props();

  onMount(() => {
    app.init();
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
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
