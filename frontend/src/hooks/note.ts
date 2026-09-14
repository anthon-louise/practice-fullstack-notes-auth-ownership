import { useQuery } from "@tanstack/react-query"
import { getNoteById, getNotes } from "../api/note"

export const useNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: getNotes
  })
}

export const useNote = (id: number) => {
  return useQuery({
    queryKey: ["notes", id],
    queryFn: () => getNoteById(id),
    enabled: !!id
  });
}

