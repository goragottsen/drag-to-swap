import styled from "styled-components";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Page from "./Page";
import { useState } from "react";
import { snapCenterToCursor } from "@dnd-kit/modifiers";

const Wrapper = styled.div`
  width: 600px;
  margin: auto;
  color: #585858;

  @media screen and (max-width: 414px) {
    width: 100%;
    padding: 32px 16px 0;
  }
`;

const ImagePreview = styled.img`
  width:  60px;
  height: 60px;
  border-radius: 50px;
`

export default function PrintPage({ pages, data, setImages }) {
  const [activeId, setActiveId] = useState(null);
  const handleDragEnd = (event) => {
    const {active, over} = event;

    if(active && over && active.id !== over.id) {

      const activeImage = data.find((image) => image.id === active.id);
      const overImage = data.find((image) => image.id === over.id);

      if (activeImage && overImage) {
        const updatedImages = data.map((image) => {
          if (image.id === active.id) {
            return { ...image, page: overImage.page, pos: overImage.pos };
          } else if (image.id === over.id) {
            return { ...image, page: activeImage.page, pos: activeImage.pos };
          }
          return image;
        });
        setImages([...updatedImages])
      }
    }
    setActiveId(null)
  }

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  }

  const PrintPhoto = styled.div`
  width: calc(50% - 10px);
  touch-action: none;
  img {
    max-width: 100%;
  }
`;

  return (
    <Wrapper>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} >
        {pages.map(page => {
          return(
            <Page key={page} page={page} images={data} activeId={activeId}/>
          )
        })}
        <DragOverlay
          modifiers={[snapCenterToCursor]}
          dropAnimation={{
            duration: 500,
            easing: 'cubic-bezier(0, 0, 0.58, 1)',
          }}
        >
          {activeId ? (
              <ImagePreview src={data.find((image) => image.id === activeId)?.url} alt="" />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Wrapper>
  );
}
