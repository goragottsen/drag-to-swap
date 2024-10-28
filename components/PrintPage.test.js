import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import PrintPage from "./printPage";
import "@testing-library/jest-dom";

const pages = [1, 2];
const data = [
  { id: "1", url: "image1.jpg", page: 1, pos: 1 },
  { id: "2", url: "image2.jpg", page: 1, pos: 2 },
];

const setImages = jest.fn();

  describe("PrintPage Component", () => {
    beforeEach(() => {
      setImages.mockClear();
    });

    it("renders images in correct pages", () => {
      const setImages = jest.fn();
      render(<PrintPage pages={pages} data={data} setImages={setImages} />);
    
      data.forEach((item) => {
        const img = screen.getByAltText(`Image ${item.id}`);
        expect(img).toHaveAttribute("src", item.url);
      });
    });
    

    it("calls setImages with correct updated positions based on state change", async () => {
      const setImages = jest.fn();
      const initialData = [
        { id: "1", url: "image1.jpg", page: 1, pos: 1 },
        { id: "2", url: "image2.jpg", page: 1, pos: 2 },
      ];
    
      render(<PrintPage pages={pages} data={initialData} setImages={setImages} />);
    
      const updatedData = [
        { id: "1", url: "image1.jpg", page: 1, pos: 2 },
        { id: "2", url: "image2.jpg", page: 1, pos: 1 },
      ];
    
      setImages(updatedData);
    
      await waitFor(() => {
        expect(setImages).toHaveBeenCalledWith([
          { id: "1", url: "image1.jpg", page: 1, pos: 2 },
          { id: "2", url: "image2.jpg", page: 1, pos: 1 },
        ]);
      });
    });

    it("clears activeId after drag is completed", () => {
      const { container } = render(
        <PrintPage pages={pages} data={data} setImages={setImages} />
      );

      const draggableImage1 = screen.getByAltText("Image 1");
      act(() => {
        fireEvent.dragStart(draggableImage1);
        fireEvent.dragEnd(draggableImage1);
      });

      expect(container.querySelector("DragOverlay")).toBeNull();
    });

    it("displays the image preview in DragOverlay when dragging starts", () => {
      render(<PrintPage pages={pages} data={data} setImages={jest.fn()} />);
    
      const draggableImage1 = screen.getByAltText("Image 1");
    
      act(() => {
        fireEvent.dragStart(draggableImage1);
      });
    
      const overlayImages = screen.getAllByRole("img");
      expect(overlayImages.some(img => img.getAttribute("src") === "image1.jpg")).toBe(true);
    });

    it("removes the image preview from DragOverlay when drag ends", () => {
      render(<PrintPage pages={pages} data={data} setImages={jest.fn()} />);
    
      const draggableImage1 = screen.getByAltText("Image 1");
      act(() => {
        fireEvent.dragStart(draggableImage1);
        fireEvent.dragEnd(draggableImage1);
      });
      
      expect(screen.queryByAltText("Image preview")).toBeNull();
    });
});
