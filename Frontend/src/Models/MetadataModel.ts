class MetadataItem {
    public title: string;
    public description: string;
    public imageUrl: string;
}

class MetadataModel {
    public url: string;
    public metadataItems: MetadataItem[];
}

export default MetadataModel;