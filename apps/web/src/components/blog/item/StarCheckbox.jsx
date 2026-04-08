import { Checkbox, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { grey } from "@mui/material/colors";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

export const StarCheckbox = ({ checked, getData }) => {
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        const goFetch = async () => {
            setLoading(true);
            await getData();
            setLoading(false);
        };
        goFetch();
    };
    if (loading) return <CircularProgress size={20} />;

    return (
        <IconButton onClick={handleClick}>
            {checked ? (
                <StarIcon fontSize="medium" color="warning" />
            ) : (
                <StarIcon fontSize="medium" htmlColor={grey[700]} />
            )}
        </IconButton>
    );
};
