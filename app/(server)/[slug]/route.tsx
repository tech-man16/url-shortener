
import { connect } from "../db/connection";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const db = await connect();
        const collection = await db.collection("urls");
        const dummyUrl: string = params.slug || "";
        
        const data = await collection.findOne({ short_url: dummyUrl });

        if (data != undefined)
            return NextResponse.redirect(data["orig_url"]);
        else
            return NextResponse.redirect(new URL(`${request.nextUrl.origin}/expired`));
        //return NextResponse.json({ message: "Url expired !!", status: 500 }, { status: 500 })
    } catch (e) {
        return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 500 })
    }
}