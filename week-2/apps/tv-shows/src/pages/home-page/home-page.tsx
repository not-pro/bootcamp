import { CatalogLayout } from "@ui-kit/catalog-layout/CatalogLayout";
import { HomePageProvider } from "./contexts/HomePageProvider";
import { Search } from "./components/search/Search";
import { Filter } from "./components/filter/Filter";
import { Content } from "./components/content/Content";

export default function HomePage() {
  return (
    <HomePageProvider>
      <CatalogLayout title="Каталог сериалов">
        <Search />
        <Filter />
        <Content />
      </CatalogLayout>
    </HomePageProvider>
  );
}
