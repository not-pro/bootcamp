import { CatalogLayout } from "@ui-kit/catalog-layout/CatalogLayout";
import { Input } from "@ui-kit/input/Input";
import { Filters } from "@ui-kit/filters/Filters";
import { MultiSelect } from "@ui-kit/multi-select/MultiSelect";
import { Grid } from "@ui-kit/grid/Grid";
import { EmptyState } from "@ui-kit/empty-state/EmptyState";
import { Dialog } from "@ui-kit/dialog/Dialog";
import usePresenter from "./usePresenter";

const emptyOptions: readonly { value: string; label: string }[] = [];

// Домашняя страница. Псевдороутинг
function HomePage() {
  const { searchRef, ...p } = usePresenter();
  return (
    <>
      <CatalogLayout title="Каталог сериалов">
        <Input
          ref={searchRef}
          label="Найти сериал"
          type="search"
          visuallyHiddenLabel
          placeholder="Какая история вам сегодня по вкусу?"
          value={p.query}
          onChange={p.onQueryChange}
          autoComplete="off"
        />
        <Filters legend="Фильтры сериалов" {...(p.hasFilters ? { onReset: p.resetFilters } : {})}>
          <MultiSelect
            label="Жанр"
            options={emptyOptions}
            value={p.genres}
            onChange={p.setGenres}
          />
          <MultiSelect label="Год" options={emptyOptions} value={p.years} onChange={p.setYears} />
          <MultiSelect
            label="Рейтинг"
            options={emptyOptions}
            value={p.ratings}
            onChange={p.setRatings}
          />
        </Filters>
        {p.shows.length ? (
          <Grid label="Подборка сериалов">{p.shows.map(p.renderCard)}</Grid>
        ) : (
          <EmptyState title="Такого сериала нет" onReset={p.resetAll}>
            Попробуйте другое название или измените фильтры — ваш сериал еще найдется.
          </EmptyState>
        )}
      </CatalogLayout>
      <Dialog
        title={p.selected?.title ?? "Описание сериала"}
        open={Boolean(p.selected)}
        onClose={p.closeDetails}
      >
        <p>
          {p.selected?.genre} · {p.selected?.year} · ★ {p.selected?.rating.toLocaleString("ru")}
        </p>
        <p>{p.selected?.description}</p>
      </Dialog>
    </>
  );
}

export default HomePage;
