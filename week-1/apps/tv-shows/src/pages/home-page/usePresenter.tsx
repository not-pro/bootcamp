import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { Show } from "./show";
import { ShowCard } from "./components/show-card/ShowCard";

export default function usePresenter() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [ratings, setRatings] = useState<string[]>([]);
  const [selected, setSelected] = useState<Show | null>(null);
  const shows: readonly Show[] = [];
  function onQueryChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }
  function resetFilters() {
    setGenres([]);
    setYears([]);
    setRatings([]);
    searchRef.current?.focus();
  }
  function resetAll() {
    setQuery("");
    resetFilters();
  }
  function closeDetails() {
    setSelected(null);
  }
  function renderCard(show: Show) {
    return <ShowCard key={show.id} show={show} onOpen={setSelected} />;
  }
  return {
    searchRef,
    query,
    genres,
    years,
    ratings,
    selected,
    shows,
    onQueryChange,
    resetFilters,
    resetAll,
    setGenres,
    setYears,
    setRatings,
    closeDetails,
    renderCard,
    hasFilters: Boolean(genres.length || years.length || ratings.length),
  };
}
