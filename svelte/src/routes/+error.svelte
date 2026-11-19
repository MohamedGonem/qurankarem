<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
</script>

<svelte:head>
  <title>الصفحة غير موجودة - القرآن الكريم</title>
  <meta name="description" content="الصفحة المطلوبة غير موجودة." />
</svelte:head>

<div class="card error-page">
  <p class="page-eyebrow">خطأ {page.status}</p>
  <h2>{page.status === 404 ? "الصفحة غير موجودة" : "حدث خطأ"}</h2>
  <p class="error-message">{page.error?.message ?? "تعذر عرض هذه الصفحة."}</p>
  <a href={resolve("/")} class="button back-button">العودة إلى قائمة السور</a>
</div>
