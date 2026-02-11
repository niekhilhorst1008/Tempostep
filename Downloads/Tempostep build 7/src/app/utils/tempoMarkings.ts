export interface TempoMarking {
  name: string;
  range: string;
}

export function getTempoMarking(bpm: number): TempoMarking {
  if (bpm < 40) {
    return { name: "Grave", range: "<40" };
  } else if (bpm < 60) {
    return { name: "Largo", range: "40-60" };
  } else if (bpm < 66) {
    return { name: "Larghetto", range: "60-66" };
  } else if (bpm < 76) {
    return { name: "Adagio", range: "66-76" };
  } else if (bpm < 108) {
    return { name: "Andante", range: "76-108" };
  } else if (bpm < 120) {
    return { name: "Moderato", range: "108-120" };
  } else if (bpm < 156) {
    return { name: "Allegro", range: "120-156" };
  } else if (bpm < 176) {
    return { name: "Vivace", range: "156-176" };
  } else if (bpm < 200) {
    return { name: "Presto", range: "176-200" };
  } else {
    return { name: "Prestissimo", range: "200+" };
  }
}
