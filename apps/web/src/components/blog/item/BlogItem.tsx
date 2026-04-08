import {
    Box,
    Card,
    CardHeader,
    Chip,
    CircularProgress,
    MenuProps,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VerifiedIcon from "@mui/icons-material/Verified";
import { BlogItemContent } from "./BlogItemContent";
import { StarCheckbox } from "./StarCheckbox";
import { ShortCheckbox } from "./ShortCheckbox";
import { BlogDto } from "@myorg/shared/dto";
import { StyledIconButton } from "@/components/ui/StyledIconButton";
import { StyledMenu } from "@/components/ui/StyledMenu";
import { StyledMenuItem } from "@/components/ui/StyledMenuItem";
import { StyledListItemIcon } from "@/components/ui/StyledListItemIcon";
import { StyledTooltip } from "@/components/ui/StyledTooltip";
import { StyledTypography } from "@/components/ui/StyledTypography";
import { useTranslations } from "next-intl";
import BlogService from "@/services/blog/blog.service";
import { $apiAdminClient } from "@/utils/api/admin/fetch.admin.client";
import { errorHandler } from "@/helpers/error/error.handler.helper";
import { useQueryClient } from "@tanstack/react-query";
import { blogKeys } from "@/lib/tanstack/keys";
import { useConfirm } from "@/hooks/useConfirm";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";

const blogS = new BlogService($apiAdminClient);

const BlogItem = ({ blog }: { blog: BlogDto }) => {
    const [anchorEl, setAnchorEl] = useState<MenuProps["anchorEl"] | null>(
        null,
    );
    const menu = Boolean(anchorEl);
    const [checked, setChecked] = useState(blog.isImportant);
    const [checkedShort, setCheckedShort] = useState(blog.isShort);
    const queryClient = useQueryClient();
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const { confirm, confirmDialog } = useConfirm();

    const t = useTranslations();
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDelete = async () => {
        setDeleteLoading(true);
        try {
            const isConfirm = await confirm();
            if (!isConfirm) return;
            await blogS.delete(blog.id);
            snackbarSuccess(t("pages.admin.blog.feedback.delete"));
            queryClient.invalidateQueries({ queryKey: blogKeys.all });
        } catch (error) {
            errorHandler({ error, t });
        } finally {
            setDeleteLoading(false);
        }
    };
    const handleClick = (event: SyntheticEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSetImportant = async () => {
        try {
            await blogS.setImportant(blog.id);
            setChecked((v) => !v);
            snackbarSuccess(
                t(
                    checked
                        ? "pages.admin.blog.feedback.unsetImportant"
                        : "pages.admin.blog.feedback.setImportant",
                ),
            );
        } catch (error) {
            errorHandler({ error, t });
        }
    };

    const handleSetShort = async () => {
        try {
            await blogS.setShort(blog.id);
            setCheckedShort((v) => !v);
            snackbarSuccess(
                t(
                    checkedShort
                        ? "pages.admin.blog.feedback.unsetShort"
                        : "pages.admin.blog.feedback.setShort",
                ),
            );
        } catch (error) {
            errorHandler({ error, t });
        }
    };

    const handleSetMain = async () => {
        try {
            await blogS.setMain(blog.id);
            snackbarSuccess(
                t(
                    blog.isMain
                        ? "pages.admin.blog.feedback.unsetMain"
                        : "pages.admin.blog.feedback.setMain",
                ),
            );
            queryClient.invalidateQueries({ queryKey: blogKeys.all });
        } catch (error) {
            errorHandler({ error, t });
        }
    };

    return (
        <Card
            component={"div"}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "none",
                overflow: "hidden",
                border: "1px solid",
                borderColor: blog.isMain ? "warning.main" : "divider",
                borderRadius: 2,
                // transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                // "&:hover": {
                //     borderColor: blog.isMain ? "warning.main" : "primary.main",
                //     boxShadow:
                //         "0 4px 16px var(--mui-palette-action-selected, rgba(0,0,0,0.08))",
                // },
            }}
        >
            {confirmDialog}
            <CardHeader
                sx={{
                    bgcolor: blog.isMain
                        ? "rgba(var(--mui-palette-warning-mainChannel) / 0.15)"
                        : "background.paper",
                    p: "6px 10px !important",
                    "& .MuiCardHeader-action": {
                        marginTop: "0px !important",
                        marginBottom: "0px !important",
                    },
                }}
                avatar={
                    <Box display={"flex"} alignItems={"center"}>
                        {blog.isMain ? (
                            <Chip
                                icon={<VerifiedIcon />}
                                label={t("pages.admin.blog.actions.main")}
                                size="small"
                                color="warning"
                                variant="outlined"
                                sx={{ fontWeight: 600, fontSize: "0.7rem" }}
                            />
                        ) : undefined}
                        <StyledTooltip
                            title={t(
                                checked
                                    ? "pages.admin.blog.actions.toggleImportantActive"
                                    : "pages.admin.blog.actions.toggleImportant",
                            )}
                            placement="top"
                        >
                            <span>
                                <StarCheckbox
                                    getData={handleSetImportant}
                                    checked={checked}
                                />
                            </span>
                        </StyledTooltip>
                        <StyledTooltip
                            title={t(
                                checkedShort
                                    ? "pages.admin.blog.actions.toggleShortActive"
                                    : "pages.admin.blog.actions.toggleShort",
                            )}
                            placement="top"
                        >
                            <span>
                                <ShortCheckbox
                                    getData={handleSetShort}
                                    checked={checkedShort}
                                />
                            </span>
                        </StyledTooltip>
                    </Box>
                }
                action={
                    <StyledIconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={menu ? "long-menu" : undefined}
                        aria-expanded={menu ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon
                            color={blog.isMain ? "warning" : "inherit"}
                            fontSize="medium"
                        />
                    </StyledIconButton>
                }
            />
            <StyledMenu
                open={menu}
                onClose={handleClose}
                anchorEl={anchorEl}
                sx={{ paddingBottom: 0 }}
            >
                <StyledMenuItem
                    onClick={() => {
                        handleClose();
                        handleSetMain();
                    }}
                >
                    <StyledListItemIcon>
                        <VerifiedIcon color="warning" />
                    </StyledListItemIcon>
                    <StyledTypography
                        color="warning"
                        textTransform="capitalize"
                        textAlign="center"
                    >
                        {t(
                            blog.isMain
                                ? "pages.admin.blog.actions.unsetMain"
                                : "pages.admin.blog.actions.setMain",
                        )}
                    </StyledTypography>
                </StyledMenuItem>
                {/* <Link target="_blank" href={BLOG_ROUTE(token) + "/" + Blog?.id}>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <OpenInNewIcon />
                        </ListItemIcon>
                        <Typography>Просмотреть</Typography>
                    </MenuItem>
                </Link> */}
                {/* <Link href={ADMIN_BLOG_UPDATE_ROUTE + "/" + Blog?.id}>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        Редактировать
                    </MenuItem>
                </Link> */}
                <StyledMenuItem
                    onClick={() => {
                        handleClose();
                        handleDelete();
                    }}
                >
                    <StyledListItemIcon>
                        {deleteLoading ? (
                            <CircularProgress color="error" size={20} />
                        ) : (
                            <DeleteForeverIcon color="error" />
                        )}
                    </StyledListItemIcon>
                    <StyledTypography
                        color="error"
                        textTransform="capitalize"
                        textAlign="center"
                    >
                        {t("common.delete")}
                    </StyledTypography>
                </StyledMenuItem>
            </StyledMenu>
            <BlogItemContent blog={blog} />
        </Card>
    );
};

export default BlogItem;
