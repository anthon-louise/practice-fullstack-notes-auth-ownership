import type { noteInput } from "../schemas/note";
import type { Note } from "../types/note";
import { api } from "./axios"

export const getNotes = async (): Promise<Note[]> => {
  const res = await api.get("/note");
  return res.data.notes;
}

export const getNoteById = async (id: number): Promise<Note> => {
  const res = await api.get(`/note/${id}`);
  return res.data.notes;
}

export const createNote = async (data: noteInput) => {
  const res = await api.post("/note/", {data});
  return res.data;
}

export const deleteNote = async (id: number) => {
  const res = await api.delete(`/note/${id}`);
  return res.data;
}
