import { LaptopMac, PhoneIphone, TabletMac } from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";
import { SessionUserViewDto } from "@myorg/shared/dto";

interface DeviceIconProps extends SvgIconProps {
    type: SessionUserViewDto["device"]["type"];
}

export const DeviceIcon = ({ type, sx, ...rest }: DeviceIconProps) => {
    const Icon =
        type === "mobile"
            ? PhoneIphone
            : type === "tablet"
              ? TabletMac
              : LaptopMac;

    return <Icon sx={sx} {...rest} />;
};
