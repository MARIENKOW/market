import { Window, Apple, Android, HelpOutline } from "@mui/icons-material";
import { SessionUserViewDto } from "@myorg/shared/dto";

interface OsIconProps {
    icon: SessionUserViewDto["device"]["icon"];
    size?: number;
}

export const OsIcon = ({ icon, size = 20 }: OsIconProps) => {
    const props = { sx: { fontSize: size } };
    switch (icon) {
        case "windows": return <Window {...props} />;
        case "macos":   return <Apple {...props} />;
        case "ios":     return <Apple {...props} />;
        case "android": return <Android {...props} />;
        default:        return <HelpOutline {...props} />;
    }
};
