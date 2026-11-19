<script lang="ts">
  import favicon from "#lib/assets/favicon.svg";
  import type { LayoutProps } from "./$types";
  import "../app.css";

  let { children }: LayoutProps = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="app-shell">
  <header class="text-center p-3">
    <h1>القرآن الكريم بصوت الشيخ <span>...</span></h1>
  </header>

  <main class="container my-4">
    {@render children()}
  </main>

  <footer class="text-center text-muted p-3">
    &copy; {new Date().getFullYear()} القرآن الكريم بصوت الشيخ <span>...</span>
  </footer>
</div>

<style>
  .app-shell {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  .app-shell > main {
    flex: 1 0 auto;
  }

  .app-shell > footer {
    flex-shrink: 0;
  }
</style>
