import styled from "styled-components";
import { DndContext, closestCenter, closestCorners } from "@dnd-kit/core";
import Page from "./Page";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  width: 600px;
  margin: auto;
  color: #585858;

  @media screen and (max-width: 414px) {
    width: 100%;
    padding: 32px 16px 0;
  }
`;

const ImagePreview = styled(motion.img)`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 3px solid white;
  object-fit: cover;

  @media screen and (max-width: 414px) {
    width: 70px;
    height: 70px;
  }
`;

export default function PrintPage({ pages, data, setImages, updateLastEdited }) {
  const [activeId, setActiveId] = useState(null);
  const [isDropping, setIsDropping] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);

  const overlaySize = 90;

  useEffect(() => {
    const handleMove = (e) => {
      const isTouch = e.type.includes("touch");
      setCursorPosition({
        x: (isTouch ? e.touches[0].clientX : e.clientX) - overlaySize / 2,
        y: (isTouch ? e.touches[0].clientY : e.clientY) - overlaySize / 2,
      });
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
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
        setImages(updatedImages);
      }
    }

    updateLastEdited()
    setIsDropping(true);
    setTimeout(() => {
      setActiveId(null);
      setIsDropping(false);
    }, 300);
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
    setIsDropping(false);
    setCursorPosition(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setIsDropping(false);
    setCursorPosition(null);
  };

  return (
    <Wrapper>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {pages.map((page) => (
          <Page key={page} page={page} images={data} />
        ))}

        {activeId && (
          <motion.div
            key={activeId}
            style={{
              position: "fixed",
              top: cursorPosition?.y,
              left: cursorPosition?.x,
              pointerEvents: "none",
              zIndex: 1000,
              touchAction: "none",
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={isDropping ? { scale: 1.2, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <ImagePreview
              src={data.find((image) => image.id === activeId)?.url}
              alt={`Image preview`}
            />
          </motion.div>
        )}
      </DndContext>
    </Wrapper>
  );
}
