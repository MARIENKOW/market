import { Card, CardHeader, CircularProgress, MenuProps } from "@mui/material";
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
import { StyledTypography } from "@/components/ui/StyledTypography";
import { useTranslations } from "next-intl";
import BlogService from "@/services/blog/blog.service";
import { $apiAdminClient } from "@/utils/api/admin/fetch.admin.client";
import { errorHandler } from "@/helpers/error/error.handler.helper";
import { useQueryClient } from "@tanstack/react-query";
import { blogKeys } from "@/lib/tanstack/keys";
import { useConfirm } from "@/hooks/useConfirm";

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
    // const changeImportant = async () => {
    //     try {
    //         await blogImportant.setImportant(Blog.id, {
    //             is_important: !checked,
    //         });
    //         setChecked((v) => !v);
    //         enqueueSnackbar("(важные) Статус новости изменен", {
    //             variant: "success",
    //         });
    //     } catch (error) {
    //         if (error instanceof CanceledError) return;
    //         enqueueSnackbar("Упс! что-то пошло не так", {
    //             variant: "error",
    //         });
    //     }
    // };
    // const changeShort = async () => {
    //     try {
    //         await blogShort.setShort(Blog.id, {
    //             is_short: !checkedShort,
    //         });
    //         setCheckedShort((v) => !v);
    //         enqueueSnackbar("(короткие) Статус новости изменен", {
    //             variant: "success",
    //         });
    //     } catch (error) {
    //         if (error instanceof CanceledError) return;
    //         enqueueSnackbar("Упс! что-то пошло не так", {
    //             variant: "error",
    //         });
    //     }
    // };

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
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                    borderColor: blog.isMain ? "warning.main" : "primary.main",
                    boxShadow:
                        "0 4px 16px var(--mui-palette-action-selected, rgba(0,0,0,0.08))",
                },
            }}
        >
            {confirmDialog}
            <CardHeader
                sx={{
                    bgcolor: blog.isMain ? "warning.light" : "action.hover",
                    p: "6px 10px !important",
                    "& .MuiCardHeader-action": {
                        marginTop: "0px !important",
                        marginBottom: "0px !important",
                    },
                }}
                avatar={
                    <>
                        <StarCheckbox
                            getData={() => {
                                setChecked((v) => !v);
                            }}
                            checked={checked}
                        />
                        <ShortCheckbox
                            getData={() => {
                                setCheckedShort((v) => !v);
                            }}
                            checked={checkedShort}
                        />
                    </>
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
                {blog.isMain ? (
                    <StyledMenuItem
                        onClick={() => {
                            handleClose();
                            // deleteMainPost(Blog?.id);
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
                            Снять главную новость
                        </StyledTypography>
                    </StyledMenuItem>
                ) : (
                    <StyledMenuItem
                        onClick={() => {
                            handleClose();
                            // setMainPost(Blog?.id);
                        }}
                    >
                        <StyledListItemIcon>
                            <VerifiedIcon color="warning" />
                        </StyledListItemIcon>
                        <StyledTypography
                            textTransform="capitalize"
                            textAlign="center"
                            color="warning"
                        >
                            Сделать главной новостью
                        </StyledTypography>
                    </StyledMenuItem>
                )}
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
