import type { PageLoad } from "./$types";
import data from "#lib/data/data.json";
import recitersData from "#lib/data/reciters.json";

export const load: PageLoad = () => ({
  surahs: data.surahs,
  reciters: recitersData.reciters,
});
