import { CatalogLayout } from "@ui-kit/catalog-layout/CatalogLayout";
import { HomePageProvider } from "@pages/home-page/contexts/HomePageProvider";
import { Search } from "@pages/home-page/components/search/Search";
import { Filter } from "@pages/home-page/components/filter/Filter";
import { Content } from "@pages/home-page/components/content/Content";

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
