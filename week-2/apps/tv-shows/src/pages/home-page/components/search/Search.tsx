import { Input } from "@ui-kit";
import { usePresenter } from "./hooks/usePresenter";

export function Search() {
  const presenter = usePresenter();

  return (
    <Input
      label="Найти сериал"
      type="search"
      visuallyHiddenLabel
      placeholder="Что сегодня посмотрим?"
      autoComplete="off"
      value={presenter.value}
      onChange={presenter.handleChange}
    />
  );
}
