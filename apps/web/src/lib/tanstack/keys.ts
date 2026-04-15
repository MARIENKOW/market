import type {
    BlogParams,
    ImageParams,
    InvitationParams,
    VideoParams,
} from "@/lib/tanstack/listDefaults";

export const blogKeys = {
    all: ["blogs"] as const,
    lists: () => [...blogKeys.all, "list"] as const,
    list: (params: BlogParams) =>
        [...blogKeys.lists(), params] as const,
};

export const invitationKeys = {
    all: ["admin-invitations"] as const,
    lists: () => [...invitationKeys.all, "list"] as const,
    list: (params: InvitationParams) =>
        [...invitationKeys.lists(), params] as const,
};

export const videoKeys = {
    all: ["videos"] as const,
    lists: () => [...videoKeys.all, "list"] as const,
    list: (params: VideoParams) =>
        [...videoKeys.lists(), params] as const,
};

export const imageKeys = {
    all: ["images"] as const,
    lists: () => [...imageKeys.all, "list"] as const,
    list: (params: ImageParams) => [...imageKeys.lists(), params] as const,
};
