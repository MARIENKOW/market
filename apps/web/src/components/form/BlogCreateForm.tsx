"use client";

import BlogForm from "@/components/form/BlogForm";

export default function BlogCreateForm() {
    return <BlogForm onSuccess={async (value) => console.log(value)} />;
}
