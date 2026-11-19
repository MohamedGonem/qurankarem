<script lang="ts">
  import { resolve } from "$app/paths";
  import ThemeSelector from "#lib/components/ThemeSelector.svelte";
  import { app } from "#lib/state/app.svelte.js";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const audioUrl = $derived(
    app.reciter ? `${app.reciter.baseURL}${data.audioFile}` : "",
  );
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

  <div class="mb-3">
    <label for="riwayaSelect" class="form-label">اختر الرواية:</label>
    <select
      id="riwayaSelect"
      class="form-select"
      value={app.reciterId}
      onchange={(event) => app.setReciterById(event.currentTarget.value)}
    >
      {#each app.riwayat as reciter (reciter.id)}
        <option value={reciter.id}>{reciter.riwaya}</option>
      {/each}
    </select>
  </div>

  <ThemeSelector />

  {#if audioUrl}
    {#key audioUrl}
      <audio
        controls
        preload="none"
        class="w-100 mt-3 mb-3"
        src={audioUrl}
      ></audio>
    {/key}
  {/if}

  <div class="card verses">
    {#each data.verses as verse (verse.index)}
      <p class="ayah">
        <span>({verse.index})</span>
        {verse.text}
      </p>
    {/each}
  </div>

  <a href={resolve("/")} class="btn btn-outline-success mt-3">
    ⬅ العودة إلى القائمة
  </a>
</div>
