import type { Note } from "../types/note";
import { api } from "./axios"

export const getNotes = async (): Promise<Note[]> => {
  const res = await api.get("/note");
  return res.data.notes;
}
