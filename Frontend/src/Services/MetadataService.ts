import MetadataModel from "../Models/MetadataModel";
import { metadataActionCreators } from "../Redux/MetadataSlice";
import { appStore } from "../Redux/Store";
import { appConfig } from "../Utils/AppConfig";

class MetadataService {

    // Fetch metadata from a list of URLs and update the global state
    public async getMetadata(urls: string[]): Promise<void> {
        // Clear existing metadata in the global state
        const clearAction = metadataActionCreators.clear();
        appStore.dispatch(clearAction);

        // Fetch metadata for the provided URLs
        const response = await fetch(appConfig.urlsUrl, appConfig.fetchOptions(urls));

        const reader = response.body.getReader(); // Read the response body stream
        const decoder = new TextDecoder(); // Decode the stream to text
        let done = false;

        // Process the streamed response
        while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;

            if (value) {
                const chunk = decoder.decode(value, { stream: true }); // Decode the chunk
                if (chunk !== '[') { // Skip the opening array bracket
                    const metadata = JSON.parse(chunk.slice(0, chunk.length - 2)) as MetadataModel; // Parse the JSON chunk
                    const action = metadataActionCreators.addOne(metadata); // Create an action to add the metadata
                    appStore.dispatch(action); // Dispatch the action to update the state
                }
            }
        }
    }
}

export const metadataService = new MetadataService();