import Tiptap from "./Tiptap";
import BlogToolbar from "./presets/BlogToolbar";
import { blogExtensions } from "./presets/blogExtensions";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogEditorProps {
    value?: string;
    onChange?: (html: string) => void;
    onVideosChange?: (videos: string[]) => void;
    error?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BlogEditor({
    value,
    onChange,
    onVideosChange,
    error,
}: BlogEditorProps) {
    return (
        <Tiptap
            value={value}
            onChange={onChange}
            onVideosChange={onVideosChange}
            error={error}
            extensions={blogExtensions}
        >
            <BlogToolbar />
        </Tiptap>
    );
}
