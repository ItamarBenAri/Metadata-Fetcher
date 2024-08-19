import { render, screen } from "@testing-library/react";
import Page404 from "./Page404";

describe("Page404 Component", () => {
    /**
     * Test case: should render the 404 image element correctly
     * Description: This test ensures that the image with the alt text '404 page not found'
     * is rendered in the document and has the correct source attribute.
     */
    it("should render the 404 image", () => {
        render(<Page404 />);
        const image = screen.getByAltText("404 page not found");
        expect(image).toBeInTheDocument(); // Verify the image is in the DOM
        expect(image).toHaveAttribute("src", "404.gif"); // Verify the correct image source
    });

    /**
     * Test case: should set the document title
     * Description: This test ensures that the document title is set correctly to 
     * '404 | Page Not Found' when the Page404 component is rendered.
     */
    it("should set the document title to '404 | Page Not Found'", () => {
        render(<Page404 />);
        expect(document.title).toBe("404 | Page Not Found"); // Verify the document title
    });
});
