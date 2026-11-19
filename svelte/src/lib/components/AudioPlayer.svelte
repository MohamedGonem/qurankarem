<script lang="ts">
  import { formatTime } from "#lib/utils/format.js";

  type Props = {
    src: string;
    title: string;
    meta?: string;
    label: string;
  };

  let { src, title, meta = "", label }: Props = $props();

  let audio = $state<HTMLAudioElement>();
  let playing = $state(false);
  let currentTime = $state(0);
  let duration = $state(0);

  const progress = $derived(
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0,
  );

  function togglePlayback() {
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {
        playing = false;
      });
    } else {
      audio.pause();
    }
  }

  function seek(event: Event) {
    if (!audio) return;

    const time = Number((event.currentTarget as HTMLInputElement).value);
    audio.currentTime = time;
    currentTime = time;
  }

  function syncDuration() {
    if (audio && Number.isFinite(audio.duration)) {
      duration = audio.duration;
    }
  }

  function handleEnded() {
    if (!audio) return;

    playing = false;
    audio.currentTime = 0;
    currentTime = 0;
  }
</script>

<section class="audio-panel" aria-label="مشغل التلاوة">
  <div class="audio-panel__heading">
    <span class="audio-panel__title">{title}</span>
    {#if meta}
      <span class="audio-panel__meta">{meta}</span>
    {/if}
  </div>

  <div class="player">
    <audio
      bind:this={audio}
      {src}
      preload="metadata"
      onplay={() => (playing = true)}
      onpause={() => (playing = false)}
      ontimeupdate={() => {
        if (audio) currentTime = audio.currentTime;
      }}
      onloadedmetadata={syncDuration}
      ondurationchange={syncDuration}
      onended={handleEnded}
    ></audio>

    <button
      type="button"
      class="player__button"
      onclick={togglePlayback}
      aria-label={playing ? `إيقاف ${label}` : `تشغيل ${label}`}
    >
      {#if playing}
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="6" y="5" width="4" height="14" rx="1"></rect>
          <rect x="14" y="5" width="4" height="14" rx="1"></rect>
        </svg>
      {:else}
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.1-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14z"
          ></path>
        </svg>
      {/if}
    </button>

    <div class="player__progress">
      <input
        class="player__range"
        type="range"
        min="0"
        max={duration || 0}
        step="0.1"
        value={currentTime}
        oninput={seek}
        aria-label="موضع التلاوة"
        style:--progress={`${progress}%`}
      />
      <div class="player__times">
        <span>{formatTime(currentTime)}</span>
        <span dir="ltr">{formatTime(duration)}</span>
      </div>
    </div>
  </div>
</section>
