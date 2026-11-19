<script lang="ts">
  import { resolve } from "$app/paths";
  import type { PageProps } from "./$types";
  import ThemeSelector from "#lib/components/ThemeSelector.svelte";
  import { app } from "#lib/state/app.svelte.js";
  import { ayahCountLabel } from "#lib/utils/format.js";

  let { data }: PageProps = $props();

  let query = $state("");

  const reciterNames = $derived([
    ...new Set(data.reciters.map((reciter) => reciter.reciter)),
  ]);

  const filtered = $derived(
    data.surahs.filter((surah) => surah.name.includes(query.trim())),
  );
</script>

<svelte:head>
  <title>القرآن الكريم - قائمة السور</title>
  <meta
    name="description"
    content="تصفح سور القرآن الكريم كاملة، وابحث عن السورة، واختر القارئ والرواية والثيم المناسب."
  />
  <meta property="og:title" content="القرآن الكريم - قائمة السور" />
  <meta
    property="og:description"
    content="تصفح سور القرآن الكريم كاملة، وابحث عن السورة، واختر القارئ والرواية والثيم المناسب."
  />
</svelte:head>

<div class="card">
  <div class="card-heading">
    <h2>قائمة السور</h2>
    <p>اختر سورة للاستماع إلى تلاوتها وقراءة آياتها</p>
  </div>

  <div class="controls">
    <div class="field">
      <label for="reciterSelect" class="field-label">اختر القارئ</label>
      <select
        id="reciterSelect"
        class="select"
        value={app.reciterName}
        onchange={(event) => app.setReciterByName(event.currentTarget.value)}
      >
        {#each reciterNames as name (name)}
          <option value={name}>{name}</option>
        {/each}
      </select>
    </div>

    <ThemeSelector />
  </div>

  <div class="search-box">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7"></circle>
      <path d="m20 20-3.5-3.5"></path>
    </svg>
    <input
      id="search"
      class="input"
      type="search"
      placeholder="ابحث عن سورة..."
      aria-label="ابحث عن سورة"
      bind:value={query}
    />
  </div>

  <div class="list-heading">
    <h3>السور</h3>
    <span>{filtered.length} من {data.surahs.length}</span>
  </div>

  {#if filtered.length > 0}
    <ul class="surah-list">
      {#each filtered as surah (surah.id)}
        <li>
          <a
            href={resolve("/surah/[id]", { id: String(surah.id) })}
            class="surah-link"
          >
            <span class="surah-number">{surah.id}</span>
            <span class="surah-name">سورة {surah.name}</span>
            <span class="surah-badge">{ayahCountLabel(surah.ayahs)}</span>
            <svg
              class="surah-chevron"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="empty-state">لا توجد سورة مطابقة لبحثك.</p>
  {/if}
</div>
