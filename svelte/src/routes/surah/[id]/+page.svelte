<script lang="ts">
  import { resolve } from "$app/paths";
  import ThemeSelector from "#lib/components/ThemeSelector.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>سورة {data.surah.name}</title>
</svelte:head>

<div class="card shadow p-4">
  <h2 class="text-center mb-3">سورة {data.surah.name}</h2>

  <ul class="list-group mb-3">
    <li class="list-group-item">الترتيب: {data.surah.id}</li>
    <li class="list-group-item">عدد الآيات: {data.surah.ayahs}</li>
    <li class="list-group-item">نوعها: {data.surah.type}</li>
    <li class="list-group-item">
      أسماء أخرى: {data.surah.other_names.join(", ")}
    </li>
    <li class="list-group-item">الموضوعات: {data.surah.topics.join(", ")}</li>
  </ul>

  <ThemeSelector />

  <a href={resolve("/")} class="btn btn-outline-success mt-3">
    ⬅ العودة إلى القائمة
  </a>
</div>
