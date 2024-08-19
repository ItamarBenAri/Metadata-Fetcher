class FetchDataFormValidation {
    public static urlValidation = {
        required: "URL is required",
        pattern: {
            value: /^https:\/\/[^ "]{1,2000}$/,
            message: "Invalid URL format. Only HTTPS URLs are allowed."
        }
    }
}

export default FetchDataFormValidation;
