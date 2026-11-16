import { useMemo } from "react";
import { useHomePageContext } from "@pages/home-page/contexts/hooks/useHomePageContext";
import { useCallback } from "react";

export function usePresenter() {
  const { selectedFilters, setSelectedFilters, shows } = useHomePageContext();

  const genreOptions = useMemo(() => {
    const genresSet = new Set<string>();
    for (const show of shows) {
      if (show.genres) {
        for (const genre of show.genres) {
          if (genre) {
            genresSet.add(genre);
          }
        }
      }
    }
    return Array.from(genresSet)
      .sort()
      .map((genre) => ({
        value: genre,
        label: genre,
      }));
  }, [shows]);

  const yearOptions = useMemo(() => {
    const yearsSet = new Set<string>();
    for (const show of shows) {
      if (show.premiered) {
        const year = show.premiered.split("-")[0];
        if (year) {
          yearsSet.add(year);
        }
      }
    }
    return Array.from(yearsSet)
      .sort((a, b) => Number(b) - Number(a))
      .map((year) => ({ value: year, label: year }));
  }, [shows]);

  const ratingOptions = useMemo(() => {
    const ratingsSet = new Set<string>();
    for (const show of shows) {
      const rating = show.rating?.average;
      if (rating != null) {
        const floor = Math.floor(rating);
        ratingsSet.add(`${floor}+`);
      }
    }
    return Array.from(ratingsSet)
      .sort((a, b) => Number(b.replace("+", "")) - Number(a.replace("+", "")))
      .map((rating) => ({ value: rating, label: rating }));
  }, [shows]);

  const onChange = useCallback(
    (key: string) => (next: string[]) => {
      setSelectedFilters({ ...selectedFilters, [key]: next });
    },
    [selectedFilters, setSelectedFilters],
  );

  const onReset = useCallback(() => {
    setSelectedFilters({});
  }, [setSelectedFilters]);

  return {
    selectedFilters,
    onChange,
    onReset,
    disabled: shows.length === 0,
    genreOptions,
    yearOptions,
    ratingOptions,
  };
}
