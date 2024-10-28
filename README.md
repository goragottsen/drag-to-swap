# Drag-and-Drop Image Reordering

This project adds drag-and-drop functionality to rearrange images within the `ImageReorderComponent`. Using `@dnd-kit/core`, you can now drag images around and drop them into new positions across pages. While I didn’t fully finish the animation part, I think it’s somehow close. It would take me a few more hours to polish the style and animation.

## Overview

The idea: let users drag images around to reorder them across multiple pages. Each image has an `id`, `url`, `page`, and `pos` to keep the position on the page. The component updates the image positions whenever they’re moved, so things stay organized.

## How It Works

### Drag-and-Drop Library

I went with `@dnd-kit/core` because it offers flexibility and is great for custom drag-and-drop features. Each image can be dragged, and dropping it updates its position within the component.

### State Management

When images are reordered, the component calls the `setImages` function with the updated positions. This makes it easy for the parent component to know the new order of images and keep everything up to date. I also ensured that the images on each page are sorted by position and can only replace other images rather than being added as new items.

### Animation

The drag-and-drop functionality is pretty much there, but I didn’t get to finish the animations. There’s some basic movement, but a smoother transition between positions is still on the to-do list.
I assume to preserve the image and make the transition smoother, I would need to change the ref handling.

### Testing

I added a few tests to make sure PrintPage component is updated correctly after drag and drop.
