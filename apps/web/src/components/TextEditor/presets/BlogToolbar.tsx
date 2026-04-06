import { Box } from "@mui/material";
import { StyledDivider } from "@/components/ui/StyledDivider";

import BoldButton from "../buttons/BoldButton";
import ItalicButton from "../buttons/ItalicButton";
import StrikeButton from "../buttons/StrikeButton";
import UnderlineButton from "../buttons/UnderlineButton";
import SubscriptButton from "../buttons/SubscriptButton";
import SuperscriptButton from "../buttons/SuperscriptButton";
import ClearMarksButton from "../buttons/ClearMarksButton";
import AlignButton from "../buttons/AlignButton";
import BulletListButton from "../buttons/BulletListButton";
import OrderedListButton from "../buttons/OrderedListButton";
import LinkButton from "../buttons/LinkButton";
import ImageUrlButton from "../buttons/ImageUrlButton";
import VideoButton from "../buttons/VideoButton";
import ColorButton from "../buttons/ColorButton";
import HighlightButton from "../buttons/HighlightButton";
import FontsButton from "../buttons/FontsButton";
import FontSizeButton from "../buttons/FontSizeButton";
import StyleButton from "../buttons/StyleButton";

export default function BlogToolbar() {
    return (
        <>
            <ImageUrlButton />
            <VideoButton />

            <StyledDivider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            <BoldButton />
            <ItalicButton />
            <StrikeButton />
            <UnderlineButton />
            <SubscriptButton />
            <SuperscriptButton />
            <ClearMarksButton />

            <StyledDivider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            <ColorButton />
            <HighlightButton />

            <StyledDivider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            <LinkButton />

            <StyledDivider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            <BulletListButton />
            <OrderedListButton />

            <StyledDivider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            <AlignButton align="left" />
            <AlignButton align="center" />
            <AlignButton align="right" />

            <StyledDivider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
                <FontsButton />
                <StyleButton />
                <FontSizeButton />
            </Box>
        </>
    );
}
