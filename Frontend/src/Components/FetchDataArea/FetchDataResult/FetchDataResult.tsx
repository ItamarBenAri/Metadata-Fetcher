import { useEffect } from "react";
import MetadataModel from "../../../Models/MetadataModel";
import "./FetchDataResult.css";
import AOS from 'aos';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";

/**
 * FetchDataResult component renders metadata results in a table format.
 * Uses AOS (Animate On Scroll) for smooth fade-up animations on load.
 * Retrieves metadata from the Redux store.
 */
export function FetchDataResult(): JSX.Element {

    // Access metadata from Redux store
    const metadata = useSelector<AppState, MetadataModel[]>(appState => appState.metadata);

    // Initialize AOS animation on component mount
    useEffect(() => {        
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div className="FetchDataResult" data-aos="fade-up">
            {/* Check if metadata exists and has results */}
            {metadata && metadata.length > 0 && (
                metadata.map((metadataResult) => (
                    <div key={metadataResult.url} className="urlResult">
                        <p><strong>URL:</strong> <span className="url">{metadataResult.url}</span></p>
                        {/* Handle case where no metadataItems are found */}
                        {metadataResult.metadataItems.length === 0 ? 
                        <p>There is no result for this URL 😔</p> :
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Title</TableCell>
                                        <TableCell align="center">Description</TableCell>
                                        <TableCell align="center">Image</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {metadataResult.metadataItems.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{item.title}</TableCell>
                                            <TableCell align="center">
                                                {item.description ? item.description : <span>There is no description 🙄</span>}
                                            </TableCell>
                                            <TableCell align="center">
                                                {item.imageUrl ? <img src={item.imageUrl} alt={item.title} style={{ maxWidth: '100px' }} /> : <span>There is no image 🤷‍♂️</span>}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        }
                        <p>----------------------</p>
                    </div>
                ))
            )}
        </div>
    );
}
