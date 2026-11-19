import xml from './quran-uthmani.xml?raw';

export type Verse = {
  index: number;
  text: string;
  bismillah?: string;
};

// The Tanzil file has a fixed shape:
//   <sura index="1" name="..."><aya index="1" text="..." />...</sura>
// Parsing it once at module load keeps this off the client and avoids a
// 1.5 MB fetch on every surah page.
const SURA_PATTERN = /<sura index="(\d+)"[^>]*>([\s\S]*?)<\/sura>/g;
const AYA_PATTERN =
  /<aya index="(\d+)" text="([^"]*)"(?: bismillah="([^"]*)")?[^>]*\/>/g;

function decodeEntities(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

const versesBySurah = new Map<number, Verse[]>();

for (const suraMatch of xml.matchAll(SURA_PATTERN)) {
  const surahId = Number(suraMatch[1]);
  const verses: Verse[] = [];

  for (const ayaMatch of suraMatch[2].matchAll(AYA_PATTERN)) {
    verses.push({
      index: Number(ayaMatch[1]),
      text: decodeEntities(ayaMatch[2]),
      bismillah: ayaMatch[3] ? decodeEntities(ayaMatch[3]) : undefined
    });
  }

  versesBySurah.set(surahId, verses);
}

export function getVerses(surahId: number): Verse[] | undefined {
  return versesBySurah.get(surahId);
}
