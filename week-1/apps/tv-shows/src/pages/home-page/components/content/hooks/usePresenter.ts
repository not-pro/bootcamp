import { useHomePageContext } from "@pages/home-page/contexts/hooks/useHomePageContext";

export function usePresenter() {
  const { shows, isSearchPending, resetAll } = useHomePageContext();

  return { shows, isSearchPending, resetAll };
}
