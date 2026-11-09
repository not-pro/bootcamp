import { Filters, MultiSelect, type Option } from "@ui-kit";
import { usePresenter } from "./hooks/usePresenter";

const EMPTY_SELECTION: string[] = [];

const GENRE_OPTIONS: Option[] = [
  { value: "Drama", label: "Drama" },
  { value: "Comedy", label: "Comedy" },
  { value: "Action", label: "Action" },
];

const YEAR_OPTIONS: Option[] = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
];

const RATING_OPTIONS: Option[] = [
  { value: "9+", label: "9+" },
  { value: "8+", label: "8+" },
  { value: "7+", label: "7+" },
];

export function Filter() {
  const { selectedFilters, onChange, onReset, disabled } = usePresenter();

  return (
    <Filters legend="Фильтры сериалов" onReset={onReset}>
      <MultiSelect
        disabled={disabled}
        label="Жанр"
        options={GENRE_OPTIONS}
        value={selectedFilters["genre"] ?? EMPTY_SELECTION}
        onChange={onChange("genre")}
      />
      <MultiSelect
        disabled={disabled}
        label="Год"
        options={YEAR_OPTIONS}
        value={selectedFilters["year"] ?? EMPTY_SELECTION}
        onChange={onChange("year")}
      />
      <MultiSelect
        disabled={disabled}
        label="Рейтинг"
        options={RATING_OPTIONS}
        value={selectedFilters["rating"] ?? EMPTY_SELECTION}
        onChange={onChange("rating")}
      />
    </Filters>
  );
}
