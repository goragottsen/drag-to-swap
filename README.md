# Drag-and-Drop Image Reordering

This project is a drag-and-drop component for reordering images across multiple "pages" within a photobook layout. Using `@dnd-kit/core` for drag functionality, it allows users to visually arrange images across different sections.

> **Note**: This implementation is functional but has room for improvement, specifically with behavior when dropping images in empty spaces.

## Features

- **Drag-and-Drop Across Pages**: Images can be reordered within and across pages.
- **Cursor-Following Overlay**: Smooth overlay follows the cursor during dragging.
- **Responsive Layout**: Desktop and mobile style support.

## Packages Used

- **`@dnd-kit/core`**: Chosen for flexible, customizable drag-and-drop functionality. The `DndContext` and `DragOverlay` components handle the main drag mechanics.
- **`styled-components`**: Used for component-scoped CSS with responsive styling.
- **`framer-motion`**: Adds animations for smoother drag transitions and interactions.

## Key Components

- **`PrintPage`**: Main container that manages all pages and images. It handles drag start, end, and state updates for image positioning.
- **`Page`**: Displays images for each page, managing layout and sorting based on image position.
- **`Image`**: The draggable image component that responds to user interactions.

## Installation

All dependencies are managed within the project. No additional installation steps are required to run the project.

## Testing

- **Unit Tests**: Basic unit tests are included to validate the drag-and-drop functionality, testing correct state updates (`setImages` calls) and overlay behavior.
- **Future Improvements**: More edge case tests could be added, such as boundary testing for dragging images between rows.

> **Note**: Initially, I used `DragOverlay` from `@dnd-kit/core` for the drag effect, but its animation style was limited. To achieve a smoother effect, I added `framer-motion` for better animation control. If I had more time, I’d explore custom style overrides for `DragOverlay` to enhance its capabilities directly.


---