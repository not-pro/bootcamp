import { EmptyState, Grid, Skeleton } from "@ui-kit";
import { CardShow } from "../card-show/CardShow";
import { usePresenter } from "./hooks/usePresenter";

const SKELETON_COUNT = 3;

export function Content() {
  const { shows, isSearchPending, resetAll } = usePresenter();

  if (isSearchPending) {
    return (
      <Grid label="Загрузка сериалов">
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <Skeleton key={index} height="100%" borderRadius={24} />
        ))}
      </Grid>
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
    <Grid label="Сериалы">
      {shows.map((show) => (
        <CardShow key={show.id} show={show} />
      ))}
    </Grid>
  );
}
