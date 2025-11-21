import { FormControl, styled } from "@mui/material";

export const StyledFormControl = styled(FormControl)(({ theme, error }) => ({
    // "& label": {
    //     color: theme.palette.form.main,
    // },
    // "& .MuiInputBase-root": {
    //     background: theme.palette.background.light,

    //     borderBottomColor: theme.palette.form.main,
    //     "& .MuiSvgIcon-root": {
    //         color: error ? theme.palette.error.main : theme.palette.form.main,
    //     },
    //     "& .MuiOutlinedInput-notchedOutline": {
    //         borderColor: error
    //             ? theme.palette.error.main
    //             : theme.palette.form.main,
    //     },
    //     "& .MuiInputAdornment-root": {
    //         "& p": {
    //             color: error
    //                 ? theme.palette.error.main
    //                 : theme.palette.form.main,
    //         },
    //         "& .MuiSvgIcon-root": {
    //             color: error
    //                 ? theme.palette.error.main
    //                 : theme.palette.form.main,
    //         },
    //     },
    //     "&:before": {
    //         borderBottomColor: error
    //             ? theme.palette.error.main
    //             : theme.palette.form.main,
    //     },
    //     "&:hover": {
    //         background: theme.palette.form.contrastText,

    //         borderBottomColor: theme.palette.form.main,
    //         "& .MuiSvgIcon-root": {
    //             color: error
    //                 ? theme.palette.error.main
    //                 : theme.palette.form.main,
    //         },
    //         "& .MuiOutlinedInput-notchedOutline": {
    //             borderColor: error
    //                 ? theme.palette.error.main
    //                 : theme.palette.form.main,
    //         },
    //         "&:before": {
    //             borderBottomColor: error
    //                 ? theme.palette.error.main
    //                 : theme.palette.form.main,
    //             borderColor: error
    //                 ? theme.palette.error.main
    //                 : theme.palette.form.main,
    //         },
    //     },
    //     "&.Mui-focused": {
    //         background: theme.palette.form.contrastText,
    //         "& .MuiSvgIcon-root": {
    //             color: error
    //                 ? theme.palette.error.main
    //                 : theme.palette.primary.main,
    //         },
    //         "& .MuiOutlinedInput-notchedOutline": {
    //             borderColor: error
    //                 ? theme.palette.error.main
    //                 : theme.palette.primary.main,
    //         },
    //         "& .MuiInputAdornment-root": {
    //             "& p": {
    //                 color: error
    //                     ? theme.palette.error.main
    //                     : theme.palette.primary.main,
    //             },
    //             "& .MuiSvgIcon-root": {
    //                 color: error
    //                     ? theme.palette.error.main
    //                     : theme.palette.primary.main,
    //             },
    //         },
    //     },
    // },
    // "& .MuiInputBase-input": {
    //     color: theme.palette.form.main,
    // },
}));
