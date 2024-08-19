import { render, screen, fireEvent } from "@testing-library/react";
import { FetchDataForm } from "./FetchDataForm";

describe("FetchDataForm Component", () => {
  it("should add a new URL field when the add button is clicked", () => {
    // Render the component
    render(<FetchDataForm />);

    // Find the "Add URL" button
    const addButton = screen.getByTitle("Add URL");

    // Verify initial number of URL input fields (3 by default)
    let urlInputs = screen.getAllByLabelText(/Url/i);
    expect(urlInputs.length).toBe(3);

    // Click the "Add URL" button
    fireEvent.click(addButton);

    // Verify that a new URL input field is added
    urlInputs = screen.getAllByLabelText(/Url/i);
    expect(urlInputs.length).toBe(4);
  });
});