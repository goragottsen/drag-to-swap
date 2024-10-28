import styled from "styled-components";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";

const PrintPhoto = styled.div`
  width: calc(50% - 10px);
  touch-action: none;
  img {
    max-width: 100%;
  }
`;

const Image = ({url, id }) => {
    const {attributes, listeners, setNodeRef: setDraggableRef } = useDraggable({id})
    const { setNodeRef } = useDroppable({ id });

    return (
        <PrintPhoto 
            ref={setDraggableRef}
            {...listeners}
            {...attributes}
            modifiers={[snapCenterToCursor]}
        >
            <img ref={setNodeRef} src={url} alt={`Image ${id}`} />
        </PrintPhoto>
        
    )
}

export default Image