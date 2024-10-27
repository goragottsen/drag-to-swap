import styled from "styled-components";
import { DndContext } from "@dnd-kit/core";
import Page from "./Page";

const Wrapper = styled.div`
  width: 600px;
  margin: auto;
  color: #585858;

  @media screen and (max-width: 414px) {
    width: 100%;
    padding: 32px 16px 0;
  }
`;

export default function PrintPage({ pages, data, setImages }) {

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
        setImages(updatedImages)
      }
    }
  }

  return (
    <Wrapper>
      <DndContext onDragEnd={handleDragEnd}>
        {pages.map(page => {
          return(
            <Page key={page} page={page} images={data}/>
          )
        })}
      </DndContext>
    </Wrapper>
  );
}
