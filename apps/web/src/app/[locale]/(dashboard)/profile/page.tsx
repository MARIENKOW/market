"use client";

import BlogEditor from "@/components/TextEditor/BlogEditor";
import { useState } from "react";

export default function Page() {
    const [value, setValue] = useState<string>(
        '<p style="font-size: 1rem; font-weight: 400; margin: 0.25rem 0px;">asdasdasdasdasdasdasdasd asdasdas sdasdasdasda asd</p><p style="font-size: 1rem; font-weight: 400; margin: 0.25rem 0px;"></p><div style="display: flex; justify-content: center;"><video src="http://192.168.1.104:5000/api/uploads/blog/upload/video/e9467662-0949-45bd-a0b8-c7af8d405f56.x-m4v?sig=ed24276f9b9103d5237c03e66295d49230d8b998088e12b5b3d548b17f852397&amp;exp=1775443114421" controls="true" data-id="e9467662-0949-45bd-a0b8-c7af8d405f56" width="600px" poster="http://192.168.1.104:5000/api/uploads/blog/upload/video/bcfc77e7-896c-47a2-8cff-9e4079a87bb4.webp?sig=801a8498d91e990949e9208d834c492e1363dc2ed35ee4cd8609e4320c8d5037&amp;exp=1775443114421" data-align="center" style="width: 600px; max-width: 100%; display: block;"></video></div><div style="display: flex; justify-content: center;"><video src="http://192.168.1.104:5000/api/uploads/blog/upload/video/e9467662-0949-45bd-a0b8-c7af8d405f56.x-m4v?sig=522852f3614f3f4f17c6ca92c1deed377217cd53f0837f8d8e025660d224848f&amp;exp=1775440706381" controls="true" data-id="e9467662-0949-45bd-a0b8-c7af8d405f56" width="347px" poster="http://192.168.1.104:5000/api/uploads/blog/upload/video/bcfc77e7-896c-47a2-8cff-9e4079a87bb4.webp?sig=89173631aacbd3e3a258a78d7bcad05ef339eed98bc96fcac598755120a740fe&amp;exp=1775440706382" data-align="center" style="width: 347px; max-width: 100%; display: block;"></video></div><p style="font-size: 1rem; font-weight: 400; margin: 0.25rem 0px;">asdasdasdasdasdasdasdasd asdasdas sdasdasdasda asd</p><p style="font-size: 1rem; font-weight: 400; margin: 0.25rem 0px;">asdasdasdasdasdasdasdasd asdasdas sdasdasdasda asd</p><div style="display: flex; justify-content: center;"><img src="http://192.168.1.104:5000/api/uploads/avatars/bbb17620-187b-4856-8a9d-f493441fc244.jpg" width="254px" data-align="center" style="width: 254px; max-width: 100%; display: block;"></div><p style="font-size: 1rem; font-weight: 400; margin: 0.25rem 0px;">asdasdasdasdasdasdasdasd asdasdas sdasdasdasda asd<br></p><p style="font-size: 1rem; font-weight: 400; margin: 0.25rem 0px;"></p>',
    );
    console.log(value);
    return (
        <>
            <BlogEditor
                value={value}
                onChange={(v: string) => setValue(v)}
                onVideosChange={(videos: string[]) => console.log(videos)}
            />
        </>
    );
}
