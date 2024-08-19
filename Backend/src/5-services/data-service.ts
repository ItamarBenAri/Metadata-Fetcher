import axios from 'axios';
import _ from 'lodash';
import MetadataModel, { MetadataItem } from "../3-models/metadata-model";

/**
 * Service class for fetching and processing metadata from various URLs.
 */
class DataService {

    /**
     * Fetches metadata from a given URL and returns a MetadataModel.
     * @param url - The URL to fetch metadata from.
     * @returns A promise that resolves to a MetadataModel containing the metadata items.
     */
    public async fetchMetadata(url: string): Promise<MetadataModel> {
        try {
            const response = await axios.get(url);
            return this.extractFromJson(url, response.data);
        } catch (error) {
            console.error("Error fetching metadata:", error);
            return { url, metadataItems: [] };
        }
    }

    /**
     * Extracts metadata from the response data and formats it into a MetadataModel.
     * Handles cases where the response data could be an array or an object.
     * @param url - The URL the data was fetched from.
     * @param responseData - The data returned from the request.
     * @returns A MetadataModel containing the extracted metadata.
     */
    private extractFromJson(url: string, responseData: any): MetadataModel {
        const metadataItems: MetadataItem[] = [];
        
        // Extract relevant items based on the structure of the response data
        const items = responseData.products || responseData.data || responseData;

        if (Array.isArray(items)) {
            for (const item of items) {
                const metadata = this.extractMetadataFromItem(item);
                if (metadata.title) {
                    metadata.imageUrl = this.isImageUrlSecure(metadata.imageUrl) ? metadata.imageUrl : "";
                    metadataItems.push(metadata);
                }
            }
        } else if (typeof items === 'object') {
            const metadata = this.extractMetadataFromItem(items);
            if (metadata.title) {
                metadataItems.push(metadata);
            }
        }

        return { url, metadataItems };
    }

    /**
     * Extracts specific fields (title, description, imageUrl) from a given item.
     * @param item - The item object to extract metadata from.
     * @returns A MetadataItem containing the extracted fields.
     */
    private extractMetadataFromItem(item: any): MetadataItem {
        return {
            title: this.extractField(item, 'title') || '',
            description: this.extractField(item, 'description') || '',
            imageUrl: this.extractField(item, 'thumbnail') || this.extractField(item, 'images[0]') || ''
        };
    }

    /**
     * Utility function to extract a field from an object using lodash's get method.
     * @param obj - The object to extract the field from.
     * @param fieldName - The field name to extract.
     * @returns The value of the extracted field, or undefined if not found.
     */
    private extractField(obj: any, fieldName: string): any {
        return _.get(obj, fieldName);
    }

    /**
     * Validates if a given image URL uses a secure protocol (https).
     * @param url - The image URL to validate.
     * @returns True if the URL starts with 'https://', otherwise false.
     */
    private isImageUrlSecure(url: string): boolean {
        return url.startsWith('https://');
    }
}

export const dataService = new DataService();
