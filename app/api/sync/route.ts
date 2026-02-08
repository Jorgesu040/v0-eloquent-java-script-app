import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { createHash } from "crypto";

// Default to Node.js runtime
export const runtime = "nodejs";

// Initialize Redis 
// Requires KV_REST_API_URL and KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL/TOKEN)
// Vercel KV env vars are compatible with Upstash Redis client if we use .fromEnv()
const redis = Redis.fromEnv();

function hashPassphrase(passphrase: string) {
    return createHash("sha256").update(passphrase).digest("hex");
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { passphrase, data, timestamp } = body;

        if (!passphrase || !data || !timestamp) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const key = `user:${hashPassphrase(passphrase)}`;

        // Optimistic locking / timestamp check
        const existing: any = await redis.get(key);

        if (existing && existing.timestamp > timestamp) {
            // Server has newer data
            return NextResponse.json({
                success: true,
                action: "merged",
                data: existing.data,
                timestamp: existing.timestamp,
                message: "Server has newer data, client should update."
            });
        }

        // Client has newer data (or same), overwrite
        await redis.set(key, { data, timestamp });

        return NextResponse.json({ success: true, action: "saved" });
    } catch (error) {
        console.error("Sync error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const passphrase = searchParams.get("passphrase");

        if (!passphrase) {
            return NextResponse.json({ error: "Missing passphrase" }, { status: 400 });
        }

        const key = `user:${hashPassphrase(passphrase)}`;
        const record: any = await redis.get(key);

        if (!record) {
            return NextResponse.json({ data: null, timestamp: 0 });
        }

        return NextResponse.json({ data: record.data, timestamp: record.timestamp });

    } catch (error) {
        console.error("Sync load error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
