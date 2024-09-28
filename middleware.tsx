import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUrl } from "@/app/(server)/server";



export async function middleware(request: NextRequest) {
    try {
        if (request.nextUrl.pathname.startsWith("/a")) {
            const url = request.nextUrl;
            const pathname = url.origin + "/getUrl";
            const orig_url: string = url.searchParams.get("v") || "";

            const res = await getUrl(pathname, orig_url);
            let data;
            if (res.status == 200)
                data = res.slug;
            else
                data = res.message;
            return NextResponse.redirect(new URL(`/?short_url=${data}`, request.url));
        }

        else {
            console.log(false);
            return NextResponse.redirect(new URL("/", request.url));
        }
    } catch (e) {
        console.log("catch")
        console.log(new URL("/", request.url));
        return NextResponse.json({ message: new URL("/", request.url), err: e }, { status: 500 });
    }
    //return NextResponse.redirect(new URL(`/getUrl?v=${request.url}`));
}

export const config = {
    matcher: "/a"
}

