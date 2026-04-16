import { Pagination } from "./pagination";

/**
 * Параметры list-запросов = Pagination & Filters.
 * Вынесены в lib/ (без React-импортов) — импортируются и в server components
 * (для SSR prefetch) и в client hooks.
 */

// --- Blog ---
export type BlogParams = Pagination;
export const defaultBlogParams: BlogParams = {
    page: 1,
};

// --- Invitation ---
type InvitationFilters = {
    status: "all" | "active" | "expired" | "revoked";
    order: "desc" | "asc";
};
export type InvitationParams = Pagination & InvitationFilters;
export const defaultInvitationParams: InvitationParams = {
    page: 1,
    status: "all",
    order: "desc",
};

// --- Video ---
export type VideoParams = Pagination;
export const defaultVideoParams: VideoParams = { page: 1 };

// --- Image ---
export type ImageParams = Pagination;
export const defaultImageParams: ImageParams = { page: 1 };
