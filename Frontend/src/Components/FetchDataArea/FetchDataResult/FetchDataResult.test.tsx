import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { FetchDataResult } from "./FetchDataResult";
import { configureStore } from "@reduxjs/toolkit";
import { metadataReducersContainer } from "../../../Redux/MetadataSlice";

/**
 * Utility function to render the FetchDataResult component with a Redux store.
 * @param initialState - The initial state of the Redux store for metadata.
 * @returns The rendered component wrapped with the Redux Provider.
 */
const renderWithStore = (initialState: any) => {
    const store = configureStore({
        reducer: {
            metadata: metadataReducersContainer, // Reducer for handling metadata state.
        },
        preloadedState: { metadata: initialState }, // Preloading the store with the provided initial state.
    });

    return render(
        <Provider store={store}>
            <FetchDataResult /> {/* Rendering the FetchDataResult component */}
        </Provider>
    );
};

describe("FetchDataResult Component", () => {

    /**
     * Test to ensure that the component displays the correct message when there are no metadata results.
     */
    it("should show 'There is no result for this URL' when metadata is empty", () => {
        renderWithStore([{ url: "https://example.com", metadataItems: [] }]); // Simulating empty metadata results.
        expect(screen.getByText("There is no result for this URL 😔")).toBeInTheDocument(); // Verifying the message is displayed.
    });

    /**
     * Test to ensure that the component renders a table with metadata when items are present.
     */
    it("should render the table when metadata contains items", () => {
        const metadata = [{
            url: "https://example.com",
            metadataItems: [
                { title: "Example Title", description: "Example Description", imageUrl: "https://example.com/image.png" }
            ]
        }];

        renderWithStore(metadata); // Simulating metadata with items.

        // Verifying that the title, description, and image are rendered in the document.
        expect(screen.getByText("Example Title")).toBeInTheDocument();
        expect(screen.getByText("Example Description")).toBeInTheDocument();
        expect(screen.getByAltText("Example Title")).toBeInTheDocument();
    });
});