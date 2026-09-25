import NoteCard from "./NoteCard";
import { Note } from "@/types/note";

interface NotesGridProps {
    notes: Note[];
}

export default function NotesGrid({ notes }: NotesGridProps) {
    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
                <NoteCard key={note._id.toString()} note={note} />
            ))}
        </div>
    );
}
