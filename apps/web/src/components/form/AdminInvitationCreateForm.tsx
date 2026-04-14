"use client";

import { Box, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { StyledDialog } from "@/components/ui/StyledDialog";
import { StyledButton } from "@/components/ui/StyledButton";
import FormProvider from "@/components/wrappers/form/FormProvider";
import Form, { CustomSubmitHandler } from "@/components/wrappers/form/Form";
import { FormConfigProvider } from "@/components/wrappers/form/FormConfigProvider";
import FormTextField from "@/components/features/form/fields/controlled/FormTextField";
import SubmitButton from "@/components/features/form/SubmitButton";
import FormAlert from "@/components/features/form/FormAlert";
import useForm from "@/hooks/useForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorFormHandlerWithAlert } from "@/helpers/error/error.handler.helper";
import { snackbarSuccess } from "@/utils/snackbar/snackbar.success";
import { useQueryClient } from "@tanstack/react-query";
import { invitationKeys } from "@/lib/tanstack/keys";
import AdminInvitationService from "@/services/admin/invitation/adminInvitation.service";
import { $apiAdminClient } from "@/utils/api/admin/fetch.admin.client";
import {
    CreateAdminInvitationSchema,
    CreateAdminInvitationDtoInput,
    CreateAdminInvitationDtoOutput,
} from "@myorg/shared/form";
import { useTranslations } from "next-intl";

const { create } = new AdminInvitationService($apiAdminClient);

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function AdminInvitationCreateForm({ open, onClose }: Props) {
    const t = useTranslations();
    const queryClient = useQueryClient();

    const form = useForm<
        CreateAdminInvitationDtoInput,
        CreateAdminInvitationDtoOutput
    >({
        resolver: zodResolver(CreateAdminInvitationSchema),
        defaultValues: { email: "", note: "" },
    });

    const handleSubmit: CustomSubmitHandler<
        CreateAdminInvitationDtoInput,
        CreateAdminInvitationDtoOutput
    > = async (values, { setError }) => {
        try {
            const result = await create(values);
            snackbarSuccess(
                t("pages.admin.invitation.feedback.created", {
                    email: result.data.email,
                }),
            );
            queryClient.invalidateQueries({ queryKey: invitationKeys.all });
            form.reset();
            onClose();
        } catch (error) {
            errorFormHandlerWithAlert({
                error,
                t,
                formValues: values,
                setError,
            });
        }
    };

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            fullWidth
            slotProps={{ paper: { sx: { p: { xs: 0, sm: 1 } } } }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                {t("pages.admin.invitation.form.title")}
            </DialogTitle>

            <FormConfigProvider
                value={{
                    fields: { variant: "outlined" },
                    submit: {
                        variant: "contained",
                        text: "pages.admin.invitation.actions.create",
                    },
                }}
            >
                <FormProvider form={form}>
                    <Form<
                        CreateAdminInvitationDtoInput,
                        CreateAdminInvitationDtoOutput
                    >
                        onSubmit={handleSubmit}
                        form={form}
                    >
                        <DialogContent sx={{ pt: 1 }}>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <FormTextField<CreateAdminInvitationDtoInput>
                                    name="email"
                                    label="form.email.label"
                                    type="email"
                                    autoComplete="off"
                                />
                                <FormTextField<CreateAdminInvitationDtoInput>
                                    name="note"
                                    label="pages.admin.invitation.form.note"
                                    multiline
                                    helperText={t("form.optional")}
                                    rows={2}
                                />
                                <FormAlert />
                            </Box>
                        </DialogContent>
                        <DialogActions
                            sx={{
                                px: 3,
                                pb: 2,
                                gap: 1,
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                            }}
                        >
                            <StyledButton
                                fullWidth
                                variant="outlined"
                                onClick={onClose}
                            >
                                {t("common.cancel")}
                            </StyledButton>
                            <SubmitButton />
                        </DialogActions>
                    </Form>
                </FormProvider>
            </FormConfigProvider>
        </StyledDialog>
    );
}
