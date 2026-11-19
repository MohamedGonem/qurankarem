<script lang="ts">
  import { resolve } from "$app/paths";
  import type { PageProps } from "./$types";
  import ThemeSelector from "#lib/components/ThemeSelector.svelte";

  let { data }: PageProps = $props();

  let query = $state("");

  let selectedReciterName = $state(data.reciters[0]?.reciter ?? "");

  const reciterNames = $derived([
    ...new Set(data.reciters.map((reciter) => reciter.reciter)),
  ]);

  const filtered = $derived(
    data.surahs.filter((surah) => surah.name.includes(query.trim())),
  );
</script>

<div class="card shadow p-4">
  <h2 class="mb-3">قائمة السور</h2>

  <div class="mb-3">
    <label for="reciterSelect" class="form-label">اختر القارئ:</label>
    <select
      id="reciterSelect"
      class="form-select"
      bind:value={selectedReciterName}
    >
      {#each reciterNames as name (name)}
        <option value={name}>{name}</option>
      {/each}
    </select>
  </div>

  <ThemeSelector />

  <input
    class="form-control"
    placeholder="🔍 ابحث عن سورة..."
    bind:value={query}
  />

  <ul class="list-group mt-3">
    {#each filtered as surah (surah.id)}
      <li class="list-group-item">
        <a
          href={resolve("/surah/[id]", { id: String(surah.id) })}
          class="fw-bold"
        >
          سورة {surah.name} ({surah.ayahs} آية)
        </a>
      </li>
    {/each}
  </ul>
</div>
