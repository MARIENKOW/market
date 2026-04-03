// lib/query/keys.ts

/**
 * Centralised key factory.
 * Преимущества:
 * - типобезопасность
 * - инвалидация по prefix: queryClient.invalidateQueries({ queryKey: videoKeys.all })
 * - нет строковых ключей разбросанных по кодовой базе
 */
export const videoKeys = {
    all: ["videos"] as const,
    lists: () => [...videoKeys.all, "list"] as const,
    list: (filters: VideoFilters) => [...videoKeys.lists(), filters] as const,
    details: () => [...videoKeys.all, "detail"] as const,
    detail: (id: string) => [...videoKeys.details(), id] as const,
};

export const userKeys = {
    all: ["user"] as const,
    me: () => [...userKeys.all, "me"] as const,
    profile: (id: string) => [...userKeys.all, "profile", id] as const,
};

// Типы
interface VideoFilters {
    page?: number;
    category?: string;
    search?: string;
}
