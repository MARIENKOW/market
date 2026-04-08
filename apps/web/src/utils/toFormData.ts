export function toFormData(
    obj: Record<string, string | File | Blob | string[]>,
): FormData {
    const formData = new FormData();
    for (const [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
            value.forEach((item) => formData.append(`${key}[]`, item));
        } else {
            formData.append(key, value);
        }
    }
    return formData;
}
