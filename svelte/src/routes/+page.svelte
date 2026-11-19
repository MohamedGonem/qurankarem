<script lang="ts">
  import ThemeSelector from "../lib/components/ThemeSelector.svelte";
</script>

<header class="text-center p-3">
  <h1>القرآن الكريم بصوت الشيخ <span id="reciter-name">...</span></h1>
</header>
<main class="container my-4">
  <div class="card shadow p-4">
    <h2 class="mb-3">قائمة السور</h2>
    <div class="mb-3">
      <label for="reciterSelect" class="form-label">اختر القارئ:</label>
      <select id="reciterSelect" class="form-select"></select>
    </div>
    <ThemeSelector />

    <input
      type="text"
      id="search"
      class="form-control"
      placeholder="🔍 ابحث عن سورة..."
    />
    <ul id="surah-list" class="list-group mt-3"></ul>
  </div>
</main>
