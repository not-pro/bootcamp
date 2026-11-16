import { Filters, MultiSelect } from "@ui-kit";
import { usePresenter } from "./hooks/usePresenter";

const EMPTY_SELECTION: string[] = [];

export function Filter() {
  const { selectedFilters, onChange, onReset, disabled, genreOptions, yearOptions, ratingOptions } =
    usePresenter();

  return (
    <Filters legend="Фильтры сериалов" onReset={onReset}>
      <MultiSelect
        disabled={disabled}
        label="Жанр"
        options={genreOptions}
        value={selectedFilters["genre"] ?? EMPTY_SELECTION}
        onChange={onChange("genre")}
      />
      <MultiSelect
        disabled={disabled}
        label="Год"
        options={yearOptions}
        value={selectedFilters["year"] ?? EMPTY_SELECTION}
        onChange={onChange("year")}
      />
      <MultiSelect
        disabled={disabled}
        label="Рейтинг"
        options={ratingOptions}
        value={selectedFilters["rating"] ?? EMPTY_SELECTION}
        onChange={onChange("rating")}
      />
    </Filters>
  );
}
