import styled from "styled-components";
import { DndContext } from "@dnd-kit/core";
import Page from "./Page";

const Wrapper = styled.div`
  width: 600px;
  margin: auto;
  color: #585858;
`;

const PrintWrapper = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

const PageLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #2778a5;
  border-radius: 8px;
  padding: 20px;
  margin: 17px 0 42px;
  justify-content: space-between;
`;

const PrintPhoto = styled.div`
  width: calc(50% - 10px);

  img {
    max-width: 100%;
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
