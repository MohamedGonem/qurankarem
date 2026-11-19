import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';
import data from '#lib/data/data.json';

export const entries: EntryGenerator = () =>
  data.surahs.map((surah) => ({ id: String(surah.id) }));

export const load: PageLoad = ({ params }) => {
  const surah = data.surahs.find((item) => item.id === Number(params.id));

  if (!surah) {
    error(404, 'السورة غير موجودة');
  }

  return { surah };
};
