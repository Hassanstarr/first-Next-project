export type NoteCategory = | "Personal" | "Work" | "Study" | "Ideas";

export interface Note {
    _id: string;
    title: string;
    content: string;
    category: NoteCategory;
    createdAt: string;
    updatedAt: string;
}