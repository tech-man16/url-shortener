// Search User Dynamically

import { connect } from "../db/connection";

import { NextResponse } from "next/server";

export async function POST(req: Request, res: any) {
    try {
        const body = await req.json()
        const orig_url = body.url;
        const short_url = Math.random().toString(36).slice(8);

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
