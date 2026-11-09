import { Button, EmptyState, Grid, Skeleton } from "@ui-kit";
import { CardShow } from "../card-show/CardShow";
import { usePresenter } from "./hooks/usePresenter";

const SKELETON_COUNT = 3;

export function Content() {
  const { shows, isSearchPending, hasSearchError, retrySearch, resetAll, pagination } =
    usePresenter();

  if (isSearchPending) {
    return (
      <Grid label="Загрузка сериалов">
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <Skeleton key={index} height="100%" borderRadius={24} />
        ))}
      </Grid>
    );
  }

  if (hasSearchError) {
    return (
      <EmptyState
        title="Не удалось выполнить поиск"
        // oxlint-disable-next-line react-perf/jsx-no-jsx-as-prop
        action={<Button onClick={retrySearch}>Повторить запрос</Button>}
      >
        Произошла ошибка при поиске. Попробуйте ещё раз.
      </EmptyState>
    );
  }

  if (shows.length === 0) {
    return (
      <EmptyState title="Здесь пока пусто" onReset={resetAll}>
        Попробуйте поискать сериалы.
      </EmptyState>
    );
  }

  return (
    <Grid label="Сериалы" pagination={pagination}>
      {shows.map((show) => (
        <CardShow key={show.id} show={show} />
      ))}
    </Grid>
  );
}
