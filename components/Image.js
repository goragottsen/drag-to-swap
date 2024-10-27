import styled from "styled-components";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useRef, useState } from "react";

const PrintPhoto = styled.div`
  width: calc(50% - 10px);
  touch-action: none;
  img {
    max-width: 100%;
  }

  @media screen and (max-width: 414px) {
   
  }

`;

const Image = ({url, id }) => {
    const ref = useRef(null);
    const [position, setPosition ] = useState({x: 0, y: 0});
    const {attributes, listeners, setNodeRef: setDraggableRef, transform } = useDraggable({id})
    const { setNodeRef } = useDroppable({ id: id });
    const mouseMove = (e) => {
        const {clientX, clientY } = e;
        const {width, height, left, top} = ref.current.getBoundingClientRect();
        console.log(width)
        console.log(left)
        //setPosition({x, y})
    }

    const {x, y} = position
    return (
        <PrintPhoto 
            ref={setDraggableRef}
            {...listeners}
            {...attributes}
            
        >
            <motion.div
                animate={{x, y}}
                transition={{type: "spring", stiffness: 150}}
                onMouseMove={mouseMove}
                ref={ref}
            >
                <img ref={setNodeRef} src={url} alt="" />
            </motion.div>
        </PrintPhoto>
    )
}

export default Image