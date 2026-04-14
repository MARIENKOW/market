import { AdminInvitationDto, PagedResult } from "@myorg/shared/dto";
import { ENDPOINT, FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import { FetchCustom, FetchCustomReturn } from "@/utils/api";
import {
    CreateAdminInvitationDtoOutput,
    UpdateNoteAdminInvitationDtoOutput,
} from "@myorg/shared/form";

const { revoke, unrevoke, resend, note } = ENDPOINT.admin.invitation;
const { path } = FULL_PATH_ENDPOINT.admin.invitation;

const JSON_HEADERS = { "Content-Type": "application/json" };

export default class AdminInvitationService {
    getAll: (params: {
        page: number;
        limit?: number;
    }) => FetchCustomReturn<PagedResult<AdminInvitationDto>>;
    create: (
        body: CreateAdminInvitationDtoOutput,
    ) => FetchCustomReturn<AdminInvitationDto>;
    delete: (id: string) => FetchCustomReturn<void>;
    revoke: (id: string) => FetchCustomReturn<AdminInvitationDto>;
    unrevoke: (id: string) => FetchCustomReturn<AdminInvitationDto>;
    resend: (id: string) => FetchCustomReturn<AdminInvitationDto>;
    updateNote: (
        id: string,
        body: UpdateNoteAdminInvitationDtoOutput,
    ) => FetchCustomReturn<AdminInvitationDto>;

    constructor(api: FetchCustom) {
        this.getAll = ({ page, limit }) => {
            const query = new URLSearchParams();
            query.set("page", String(page));
            if (limit !== undefined) query.set("limit", String(limit));
            return api<PagedResult<AdminInvitationDto>>(`${path}?${query}`, {
                method: "GET",
            });
        };

        this.create = (body) =>
            api<AdminInvitationDto>(path, {
                method: "POST",
                body: JSON.stringify(body),
                headers: JSON_HEADERS,
            });

        this.delete = (id) => api<void>(`${path}/${id}`, { method: "DELETE" });

        this.revoke = (id) =>
            api<AdminInvitationDto>(`${path}/${id}/${revoke.path}`, {
                method: "PATCH",
            });

        this.unrevoke = (id) =>
            api<AdminInvitationDto>(`${path}/${id}/${unrevoke.path}`, {
                method: "PATCH",
            });

        this.resend = (id) =>
            api<AdminInvitationDto>(`${path}/${id}/${resend.path}`, {
                method: "POST",
            });

        this.updateNote = (id, body) =>
            api<AdminInvitationDto>(`${path}/${id}/${note.path}`, {
                method: "PATCH",
                body: JSON.stringify(body),
                headers: JSON_HEADERS,
            });
    }
}
