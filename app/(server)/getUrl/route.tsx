// Search User Dynamically

import { connect } from "../db/connection";

import { NextResponse } from "next/server";

export async function GET(req: any) {
    try {
    const db = await connect();
    const collection = await db.collection("urls");

    const stringUrl = req.url;
    const dummyUrl: string = new URL(stringUrl).searchParams.get("v") || "";

    const data = await collection.findOne({ short_url: dummyUrl });

    if (data != undefined)
        return NextResponse.redirect(data["orig_url"]);
    else
        return NextResponse.json({ message: "Url not found" , status:500}, { status: 500 })
    } catch(e) {
        return NextResponse.json({ message: "Internal Server Error", status:500}, { status: 500 })
    }
}

export async function POST(req: Request, res: any) {
    try {
        const body = await req.json()
        const orig_url = body.url;
        const short_url = Math.random().toString(36).slice(2);

        const db = await connect();
        const collection = await db.collection("urls");

        const date = new Date();
        //
        try {
            console.log("try")
            await collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 10 });
        } catch (e) { console.log("catch") }
        await collection.insertOne({
            orig_url: orig_url,
            short_url: short_url,
            createdAt: date,
            expireAt: Date.now(),
            time:
                `${date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()} ,${date.getHours() + ":" + date.getMinutes()}:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`

        })
        return NextResponse.json({ slug: short_url, status: 200 }, { status: 200 });
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: "Internal Server Error !!! ", status: 500, err: e }, { status: 500 });
    }
}
