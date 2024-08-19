import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { metadataReducersContainer } from "./MetadataSlice";

// Creating the application store - the redux manager object: 
export const appStore = configureStore<AppState>({
    reducer: {
        metadata: metadataReducersContainer,
    }
});

