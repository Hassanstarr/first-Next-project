import mongoose, {
    Document,
    Model,
    Schema,
} from "mongoose";

export type NoteCategory =
    | "Personal"
    | "Work"
    | "Study"
    | "Ideas";

export interface INote {
    title: string;
    content: string;
    category: NoteCategory;
}

export interface INoteDocument
    extends INote,
        Document {
    createdAt: Date;
    updatedAt: Date;
}

const noteSchema = new Schema<INoteDocument>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            enum: [
                "Personal",
                "Work",
                "Study",
                "Ideas",
            ],
            default: "Personal",
        },
    },
    {
        timestamps: true,
    }
);

const Note: Model<INoteDocument> =
    mongoose.models.Note ||
    mongoose.model<INoteDocument>(
        "Note",
        noteSchema
    );

export default Note;