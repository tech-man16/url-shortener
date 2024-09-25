import { connect } from "../db/connection";

import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const db = await connect();
        const collection = await db.collection("urls");

        // const stringUrl = req.url;
        const dummyUrl: string = params.slug || "";
        console.log(dummyUrl);
        const data = await collection.findOne({ short_url: dummyUrl });

        if (data != undefined)
            return NextResponse.redirect(data["orig_url"]);
        else
            return NextResponse.json({ message: "Url not found", status: 500 }, { status: 500 })
    } catch (e) {
        return NextResponse.json({ message: "Internal Server Error", status: 500 }, { status: 500 })
    }
}






