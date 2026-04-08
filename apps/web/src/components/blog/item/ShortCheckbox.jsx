import {  IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import TurnedInIcon from "@mui/icons-material/TurnedIn";

export const ShortCheckbox = ({ checked, getData }) => {
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
                <TurnedInIcon fontSize="medium" color='info' />
            ) : (
                <TurnedInNotIcon fontSize="medium" htmlColor={grey[700]} />
            )}
        </IconButton>
    );
};
