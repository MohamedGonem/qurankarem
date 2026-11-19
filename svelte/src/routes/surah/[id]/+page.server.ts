import { error } from '@sveltejs/kit';
import data from '#lib/data/data.json';
import { getVerses } from '#lib/data/quran.js';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () =>
  data.surahs.map((surah) => ({ id: String(surah.id) }));

export const load: PageServerLoad = ({ params }) => {
  const surahId = Number(params.id);
  const surah = data.surahs.find((item) => item.id === surahId);
  const verses = getVerses(surahId);

  if (!surah || !verses) {
    error(404, 'السورة غير موجودة');
  }

  return {
    surah,
    verses,
    audioFile: `${String(surah.id).padStart(3, '0')}.mp3`
  };
};
