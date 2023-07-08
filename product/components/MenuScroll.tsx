import React from "react";
import {StackProps, Box} from "@chakra-ui/core";
import {
  ScrollMenu,
  VisibilityContext,
  getItemsPos,
  slidingWindow
} from "react-horizontal-scrolling-menu";
// import { LeftArrow, RightArrow } from "~/product/components/ScrollComponents/arrows";
import { Card } from "~/product/components/ScrollComponents/card";
import useDrag from "~/product/components/ScrollComponents/useDrag";


interface Props extends StackProps {
  items?: [];
  catChange?: Function;
  setDefault?: boolean;
}

const MenuScroll: React.FC<Props> = ({items, catChange, setDefault}) => {
  type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;
  // console.log(items)
 
  function onWheel(
      { getItemById, items, visibleItems, scrollToItem }: scrollVisibilityApiType,
      ev: React.WheelEvent
    ): void {
      const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
      if (isThouchpad) {
        ev.stopPropagation();
        return;
      }

      if (ev.deltaY < 0) {
        // NOTE: for center items
        const nextGroupItems = slidingWindow(
          items.toItemsKeys(),
          visibleItems
        ).next();
        const { center } = getItemsPos(nextGroupItems);
        scrollToItem(getItemById(center), "smooth", "center");
      } else if (ev.deltaY > 0) {
        const prevGroupItems = slidingWindow(
          items.toItemsKeys(),
          visibleItems
        ).prev();
        const { center } = getItemsPos(prevGroupItems);
        scrollToItem(getItemById(center), "smooth", "center");
      }
    }

  const { dragStart, dragStop, dragMove, dragging } = useDrag();

  const handleDrag = ({ scrollContainer }: scrollVisibilityApiType) => (
    ev: React.MouseEvent
  ) =>
    dragMove(ev, (posDiff) => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft += posDiff;
      }
    });
    const [selected, setSelected] = React.useState<string>("TODOS");


    React.useEffect(() => {
      if (setDefault) {
        setSelected("TODOS")
      }
      // Run! Like go get some data from an API.
    }, [setDefault]);

    const handleItemClick = (itemId: string) => ({
      getItemById,
      scrollToItem
    }: scrollVisibilityApiType) => {
      if (dragging) {
        return false;
      }
      // setSelected(selected !== itemId ? itemId : "");
      setSelected(itemId);
      // NOTE: for center items
      Promise.resolve(scrollToItem(getItemById(itemId), "smooth", "center", "nearest")).then(() => catChange(itemId))
      
      // pass cat name/id clicked to parent
      // catChange(itemId);
    };

    
  return (
    <Box >
     <ScrollMenu
        // LeftArrow={LeftArrow}
        // RightArrow={RightArrow}
        onWheel={onWheel}
        onMouseDown={() => dragStart}
        onMouseUp={({
          getItemById,
          scrollToItem,
          visibleItems
        }: scrollVisibilityApiType) => () => {
          // NOTE: for center items
          dragStop();
          const { center } = getItemsPos(visibleItems);
          scrollToItem(getItemById(center), "smooth", "center");
        }}
        options={{ throttle: 0 }} // NOTE: for center items
        onMouseMove={handleDrag}
      >
        {items.map(({ id }) => (
          <Card
            title={id}
            // itemId={id}
            key={id}
            onClick={handleItemClick(id)}
            selected={id === selected}
          />
        ))}
      </ScrollMenu>
    </Box>
  );
};

export default MenuScroll;

