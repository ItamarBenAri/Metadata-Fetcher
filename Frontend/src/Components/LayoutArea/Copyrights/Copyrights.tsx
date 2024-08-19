import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import "./Copyrights.css";
import AppComponentsStyle from "../../../Theme/AppComponentsStyle";
import Link from "@mui/material/Link";
import { Email, GitHub, LinkedIn } from "@mui/icons-material";
import { Divider } from "@mui/material";

function Copyrights(): JSX.Element {
    return (
        <div className="Copyrights">
            <div className="SocialMediaLinks">
                <div className="divider">
                    <Divider variant="middle" />
                </div>
                <Link href="https://www.linkedin.com/in/itamar-ben-ari-69678b28b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                    sx={AppComponentsStyle.socialLink}
                >
                    <LinkedIn />
                </Link>
                <Link
                    href="https://github.com/ItamarBenAri/"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                    sx={AppComponentsStyle.socialLink}
                >
                    <GitHub />
                </Link>
                <Link
                    href="mailto:etamar234@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                    sx={AppComponentsStyle.socialLink}
                >
                    <Email />
                </Link>
            </div>
            <Box sx={AppComponentsStyle.copyrightsBox}>
                <Typography variant="body2" color="text.secondary" align="center">
                    <Link
                        href="https://www.linkedin.com/in/itamar-ben-ari-69678b28b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={AppComponentsStyle.copyrightsLink}
                    >
                        {"© "}{"All Rights Reserved. Itamar Ben Ari, Israel."} {new Date().getFullYear()}
                    </Link>
                </Typography>
            </Box>
        </div>
    );
}

export default Copyrights;