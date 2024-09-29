// Search User Dynamically

import { connect } from "../db/connection";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    return NextResponse.redirect("/");
}

export async function POST(req: Request, res: any) {
    try {
        const body = await req.json()
        const orig_url = body.url;
        const short_url = Math.random().toString(36).slice(8);

        const db = await connect();
        const collection = await db.collection("urls");

        const date = new Date();
        console.log(new Date(date.getTime()).toLocaleTimeString());
        const presentDate = new Date(date.getTime()).toLocaleDateString() + ", " + date.toLocaleTimeString('en-IN');
        const tomorrow = new Date(date.getTime() + (24 * 60 * 60 * 1000));
        //
        try {
            console.log("try");
            console.log(86400);
            await collection.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 86400 }); // After 1 day
        } catch (e) {
            console.log("catch from route");
            console.log(e);
            await collection.dropIndex("createdAt_1");
            await collection.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 86400 });
            console.log("error removed !!");
        }

        await collection.insertOne({
            orig_url: orig_url,
            short_url: short_url,
            createdAt: date,
            expireAt: tomorrow.toLocaleDateString() + ", " + new Date(date.getTime()).toLocaleTimeString(),
            time: presentDate

        })
        return NextResponse.json({ slug: short_url, status: 200 }, { status: 200 });
    } catch (e) {
        // console.log(e)
        return NextResponse.json({ message: "Internal Server Error !!! ", status: 500, err: e }, { status: 500 });
    }
}
