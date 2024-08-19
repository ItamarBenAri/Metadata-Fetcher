import { render, screen } from '@testing-library/react';
import Home from './Home';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { AppState } from '../../../Redux/AppState';
import { metadataReducersContainer } from '../../../Redux/MetadataSlice';

// Combine your reducers to match your AppState structure
const rootReducer = combineReducers({
    metadata: metadataReducersContainer,
});

// Create the mock store with initial state
const mockStore = createStore(rootReducer, { metadata: [] } as Partial<AppState>);

test('renders FetchDataForm component', () => {
    // Render the Home component with Redux provider
    render(
        <Provider store={mockStore}>
            <Home />
        </Provider>
    );

    // Check if the FetchDataForm component is in the document
    const formElement = screen.getByText(/fetch/i);
    expect(formElement).toBeInTheDocument();  // This will now work as expected
});