import { useHomePageContext } from "@pages/home-page/contexts/hooks/useHomePageContext";
import { useCallback } from "react";

export function usePresenter() {
  const { selectedFilters, setSelectedFilters, shows } = useHomePageContext();

  const onChange = useCallback(
    (key: string) => (next: string[]) => {
      setSelectedFilters({ ...selectedFilters, [key]: next });
    },
    [selectedFilters, setSelectedFilters],
  );

  const onReset = useCallback(() => {
    setSelectedFilters({});
  }, [setSelectedFilters]);

  return { selectedFilters, onChange, onReset, disabled: shows.length === 0 };
}
