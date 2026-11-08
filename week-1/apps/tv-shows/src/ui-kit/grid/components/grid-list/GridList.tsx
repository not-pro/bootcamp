import { isValidElement, memo, ViewTransition } from "react";
import type { ReactNode, RefObject } from "react";
import { GridItem } from "../grid-item/GridItem";
import { GridMagnifier } from "../grid-magnifier/GridMagnifier";
import { useGridListLayout } from "./hooks/useGridListLayout";
import { useGridListNavigation } from "./hooks/useGridListNavigation";
import styles from "./GridList.module.css";

interface Props {
  items: ReactNode[];
  list: RefObject<HTMLUListElement | null>;
}

export const GridList = memo(function GridList({ items, list }: Props) {
  const { desktop, tablet, mobile, gridStyle } = useGridListLayout(items.length);
  const onKeyDown = useGridListNavigation(list, items.length, desktop, tablet, mobile);
  return (
    // Delegated navigation retains native list semantics.
    <GridMagnifier list={list} desktop={desktop} tablet={tablet} mobile={mobile}>
      <ViewTransition default={items.length > 60 ? "catalog-grid" : "none"}>
        {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <ul ref={list} className={styles["list"]} onKeyDown={onKeyDown} style={gridStyle}>
          {items.map((child, index) => (
            <GridItem
              dense={items.length > 60}
              desktopSpan={index < desktop.fullerItems ? desktop.narrowSpan : desktop.wideSpan}
              tabletSpan={index < tablet.fullerItems ? tablet.narrowSpan : tablet.wideSpan}
              mobileSpan={index < mobile.fullerItems ? mobile.narrowSpan : mobile.wideSpan}
              key={
                isValidElement(child)
                  ? child.key
                  : typeof child === "string" || typeof child === "number"
                    ? String(child)
                    : ""
              }
            >
              {child}
            </GridItem>
          ))}
        </ul>
      </ViewTransition>
    </GridMagnifier>
  );
});
