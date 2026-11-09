export type Show = {
  id: number;
  name: string;
  genres: string[];
  premiered: string | null;
  rating: { average: number | null };
  image: { medium: string; original: string } | null;
  summary: string | null;
};

export type CardShowProps = {
  show: Show;
};
