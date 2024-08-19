import { useRef, useState } from "react";
import { Box, Button, CircularProgress, TextField, IconButton } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AppComponentsStyle from "../../../Theme/AppComponentsStyle";
import FormModel from "../../../Models/FormModel";
import FetchDataFormValidation from "../formValidation";
import { metadataService } from "../../../Services/MetadataService";
import { notify } from "../../../Utils/Notify";

// FetchDataForm Component: Manages a form for fetching metadata from multiple URLs.
export function FetchDataForm(): JSX.Element {
    
    // Initialize form methods and state management
    const methods = useForm<FormModel>();
    const { register, handleSubmit, formState: { errors }, reset } = methods;
    const [urlsSending, setUrlsSending] = useState<boolean>(false); // Loading state
    const [urlFields, setUrlFields] = useState<Array<keyof FormModel>>(["url1", "url2", "url3"]); // Initial form fields
    const resultRef = useRef<HTMLDivElement>(null); // Reference to scroll to results

    // Add a new URL input field
    const addUrlField = () => {
        setUrlFields([...urlFields, `url${urlFields.length + 1}` as keyof FormModel]);
    };

    // Remove the last URL input field, ensuring a minimum of 3 fields remain
    const removeUrlField = () => {
        if (urlFields.length > 3) {
            setUrlFields(urlFields.slice(0, -1));
        }
    };

    // Reset the form and URL fields to the initial state
    const clearForm = () => {
        reset();
        setUrlFields(["url1", "url2", "url3"]);
    };

    // Handle form submission: Fetch metadata for the provided URLs
    const send: SubmitHandler<FormModel> = async (data: FormModel) => {
        setUrlsSending(true); // Set loading state
        const urls = Object.values(data).filter(Boolean); // Extract and filter non-empty URLs
        metadataService.getMetadata(urls)
            .then(() => {
                resultRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to results on success
            })
            .catch((err: any) => notify.error(err)) // Notify on error
            .finally(() => setUrlsSending(false)); // Reset loading state
    };

    return (
        <div className="FetchDataForm">
            <FormProvider {...methods}>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(send)}
                >
                    {/* Buttons to add or remove URL fields */}
                    <Box display="flex" justifyContent="space-between" marginTop={2}>
                        <IconButton disabled={urlsSending} onClick={addUrlField} title="Add URL">
                            <AddCircleOutlineIcon />
                        </IconButton>
                        <IconButton onClick={removeUrlField} title="Remove URL" disabled={urlFields.length <= 3 || urlsSending}>
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                    </Box>

                    {/* Render URL input fields dynamically */}
                    {urlFields.map((field, index) => (
                        <TextField
                            key={field}
                            disabled={urlsSending}
                            required
                            fullWidth
                            label={`Url ${index + 1}`}
                            sx={AppComponentsStyle.textField}
                            {...register(field, {
                                ...FetchDataFormValidation.urlValidation,
                                validate: value => {
                                    const urls = Object.values(methods.getValues()).filter(Boolean);
                                    const isDuplicate = urls.filter(url => url === value).length > 1;
                                    return isDuplicate ? "Duplicate URL" : true; // Prevent duplicate URLs
                                }
                            })}
                            error={!!errors[field]}
                            helperText={errors[field]?.message}
                            type="url"
                            margin="normal"
                        />
                    ))}

                    {/* Submit and Clear buttons */}
                    <Box display="flex" justifyContent="space-between" marginTop={2}>
                        <Button
                            startIcon={urlsSending && <CircularProgress color="inherit" size={25} />}
                            disabled={urlsSending}
                            color="primary"
                            variant="contained"
                            type="submit"
                            sx={AppComponentsStyle.actionButton}
                        >
                            {urlsSending ? <span>Fetching</span> : <span>Fetch</span>}
                        </Button>
                        <Button
                            disabled={urlsSending}
                            color="secondary"
                            variant="contained"
                            onClick={clearForm}
                            sx={AppComponentsStyle.actionButton}
                        >
                            Clear
                        </Button>
                    </Box>
                </Box>
            </FormProvider>
        </div>
    );
}