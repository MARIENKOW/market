import { PagedResult } from "@myorg/shared/dto";
import { QueryKey, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export type UsePaginatedQueryResult<T> = UseQueryResult<
    PagedResult<T>,
    Error
> & {
    page: number;
    setPage: (page: number) => void;
};

export function usePaginatedQuery<T>(
    getQueryKey: (page: number) => QueryKey,
    queryFn: (page: number) => Promise<PagedResult<T>>,
    // filters нужны только для отслеживания изменений и сброса page
    // сами значения захватываются через замыкание в getQueryKey/queryFn
    filters?: Record<string, unknown>,
): UsePaginatedQueryResult<T> {
    const [page, setPage] = useState(1);
    const isFirstRender = useRef(true);

    // Сброс page в 1 при изменении фильтров (кроме первого рендера)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(filters)]);

    const query = useQuery<PagedResult<T>, Error>({
        queryKey: getQueryKey(page),
        queryFn: () => queryFn(page),
        placeholderData: (prev) => prev,
    });

    // Сброс на последнюю страницу если текущая вышла за пределы
    useEffect(() => {
        const { pageCount } = query.data?.meta ?? {};
        if (pageCount && page > pageCount) setPage(pageCount);
    }, [query.data?.meta.pageCount, page]);

    return { ...query, page, setPage };
}
