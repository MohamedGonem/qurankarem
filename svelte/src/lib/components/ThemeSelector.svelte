<script lang="ts">
  import { app } from "#lib/state/app.svelte.js";

  type Theme = {
    name: string;
    value: string;
  };

  type ThemeCategory = {
    category: string;
    themes: Theme[];
  };

  const neutral: ThemeCategory = {
    category: "الافتراضي",
    themes: [{ name: "فاتح", value: "light" }],
  };

  const green: ThemeCategory = {
    category: "درجات الأخضر",
    themes: [
      { name: "أخضر النعناع", value: "mint" },
      { name: "أخضر الزيتون", value: "olive" },
      { name: "أخضر زمردي", value: "emerald" },
      { name: "أخضر الغابة (داكن)", value: "forest-dark" },
      { name: "زيتوني داكن", value: "olive-dark" },
      { name: "زمردي داكن", value: "emerald-dark" },
    ],
  };
  const red: ThemeCategory = {
    category: "درجات الأحمر",
    themes: [
      { value: "rose", name: "وردي هادئ" },
      { value: "terra", name: "أحمر طوبي" },
      { value: "pomegranate", name: "أحمر رمّاني" },
      { value: "burgundy-dark", name: "نبيتي داكن" },
      { value: "terra-dark", name: "طوبي داكن" },
      { value: "ruby-dark", name: "ياقوتي داكن" },
    ],
  };
  const blue: ThemeCategory = {
    category: "درجات الأزرق",
    themes: [
      { value: "sky", name: "أزرق سماوي" },
      { value: "royal", name: "أزرق ملكي" },
      { name: "أزرق رمادي", value: "slate" },
      { name: "أزرق داكن", value: "navy-dark" },
      { name: "ملكي داكن", value: "royal-dark" },
      { name: "رمادي داكن", value: "slate-dark" },
    ],
  };
  const eye_friendly: ThemeCategory = {
    category: "ألوان مريحة",
    themes: [
      { value: "sand", name: "رملي" },
      { value: "lavender", name: "لافندر" },
      { value: "cocoa", name: "كاكاو" },
    ],
  };

  const themes: ThemeCategory[] = [neutral, green, red, blue, eye_friendly];
</script>

<div class="mb-3">
  <label for="themeSelect" class="form-label">اختر الثيم:</label>
  <select
    id="themeSelect"
    class="form-select"
    value={app.theme}
    onchange={(event) => app.setTheme(event.currentTarget.value)}
  >
    {#each themes as themeCategory (themeCategory.category)}
      <optgroup label={themeCategory.category}>
        {#each themeCategory.themes as theme (theme.name)}
          <option value={theme.value}>{theme.name}</option>
        {/each}
      </optgroup>
    {/each}
  </select>
</div>
