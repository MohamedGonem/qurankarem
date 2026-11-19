<script lang="ts">
  import { resolve } from "$app/paths";
  import AudioPlayer from "#lib/components/AudioPlayer.svelte";
  import ThemeSelector from "#lib/components/ThemeSelector.svelte";
  import { app } from "#lib/state/app.svelte.js";
  import { ayahCountLabel } from "#lib/utils/format.js";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const ayahCount = $derived(ayahCountLabel(data.surah.ayahs));

  const audioUrl = $derived(
    app.reciter ? `${app.reciter.baseURL}${data.audioFile}` : "",
  );

  const bismillah = $derived(data.verses[0]?.bismillah ?? "");
</script>

<svelte:head>
  <title>سورة {data.surah.name} - القرآن الكريم</title>
  <meta
    name="description"
    content="سورة {data.surah.name}، {data.surah.type}، {ayahCount}. استمع إلى التلاوة واقرأ الآيات بالرسم العثماني."
  />
  <meta
    property="og:title"
    content="سورة {data.surah.name} - القرآن الكريم"
  />
  <meta
    property="og:description"
    content="سورة {data.surah.name}، {data.surah.type}، {ayahCount}. استمع إلى التلاوة واقرأ الآيات بالرسم العثماني."
  />
</svelte:head>

<div class="card">
  <header class="page-heading">
    <p class="page-eyebrow">سورة {data.surah.type}</p>
    <h2>سورة {data.surah.name}</h2>
    <div class="chips">
      <span class="chip">{ayahCount}</span>
      <span class="chip">ترتيبها {data.surah.id}</span>
    </div>
  </header>

  <dl class="facts">
    <div class="fact">
      <dt>أسماء أخرى</dt>
      <dd>{data.surah.other_names.join("، ")}</dd>
    </div>
    <div class="fact">
      <dt>الموضوعات</dt>
      <dd>{data.surah.topics.join("، ")}</dd>
    </div>
  </dl>

  <div class="controls">
    <div class="field">
      <label for="riwayaSelect" class="field-label">اختر الرواية</label>
      <select
        id="riwayaSelect"
        class="select"
        value={app.reciterId}
        onchange={(event) => app.setReciterById(event.currentTarget.value)}
      >
        {#each app.riwayat as reciter (reciter.id)}
          <option value={reciter.id}>{reciter.riwaya}</option>
        {/each}
      </select>
    </div>

    <ThemeSelector />
  </div>

  {#if audioUrl}
    {#key audioUrl}
      <AudioPlayer
        src={audioUrl}
        title="استمع للسورة"
        meta={`${app.reciterName} - ${app.reciter?.riwaya ?? ""}`}
        label={`تلاوة سورة ${data.surah.name}`}
      />
    {/key}
  {/if}

  <section class="verses" aria-labelledby="verses-title">
    <div class="verses__heading">
      <h3 id="verses-title">الآيات</h3>
      <span>{ayahCountLabel(data.verses.length)}</span>
    </div>

    {#if bismillah}
      <p class="bismillah">{bismillah}</p>
    {/if}

    {#each data.verses as verse (verse.index)}
      <p class="ayah">
        <span class="ayah__number">{verse.index}</span>
        <span class="ayah__text">{verse.text}</span>
      </p>
    {/each}
  </section>

  <a href={resolve("/")} class="button back-button">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6"></path>
    </svg>
    العودة إلى القائمة
  </a>
</div>
