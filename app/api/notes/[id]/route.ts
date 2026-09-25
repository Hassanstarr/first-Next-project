import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";

type Params = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(
    _request: NextRequest,
    { params }: Params
) {
    try {
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid note ID",
                },
                {
                    status: 400,
                }
            );
        }

        await connectDB();

        const note = await Note.findById(id).lean();

        if (!note) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Note not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json({
            success: true,
            note,
        });
    } catch (error) {
        console.error("GET /api/notes/[id]:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch note",
            },
            {
                status: 500,
            }
        );
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: Params
) {
    try {
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid note ID",
                },
                {
                    status: 400,
                }
            );
        }

        await connectDB();

        const note = await Note.findByIdAndDelete(id);

        if (!note) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Note not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Note deleted successfully",
        });
    } catch (error) {
        console.error("DELETE /api/notes/[id]:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete note",
            },
            {
                status: 500,
            }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: Params
) {
    try {
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid note ID" },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { title, content, category } = body;

        if (!title?.trim() || !content?.trim()) {
            return NextResponse.json(
                { success: false, message: "Title and content are required" },
                { status: 400 }
            );
        }

        await connectDB();

        const note = await Note.findByIdAndUpdate(
            id,
            {
                title: title.trim(),
                content: content.trim(),
                category: category || "Personal",
            },
            { new: true, runValidators: true }
        );

        if (!note) {
            return NextResponse.json(
                { success: false, message: "Note not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, note });
    } catch (error) {
        console.error("PUT /api/notes/[id]:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update note" },
            { status: 500 }
        );
    }
}