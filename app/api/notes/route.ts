import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const searchParams = request.nextUrl.searchParams;
        const search = searchParams.get("search") || "";
        const category = searchParams.get("category") || "";

        const filter: Record<string, unknown> = {};

        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    content: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        if (category) {
            filter.category = category;
        }

        const notes = await Note.find(filter)
            .sort({ updatedAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            notes,
        });
    } catch (error) {
        console.error("GET /api/notes:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch notes",
            },
            {
                status: 500,
            }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();

        const { title, content, category } = body;

        if (!title?.trim() || !content?.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Title and content are required",
                },
                {
                    status: 400,
                }
            );
        }

        const note = await Note.create({
            title: title.trim(),
            content: content.trim(),
            category: category || "Personal",
        });

        return NextResponse.json(
            {
                success: true,
                note,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error("POST /api/notes:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create note",
            },
            {
                status: 500,
            }
        );
    }
}