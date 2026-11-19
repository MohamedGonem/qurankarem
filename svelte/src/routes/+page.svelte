<script lang="ts">
  import ThemeSelector from "../lib/components/ThemeSelector.svelte";
</script>

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
