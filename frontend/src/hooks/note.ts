import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createNote, getNoteById, getNotes, updateNote } from "../api/note"
import type { noteInput } from "../schemas/note"
import { toast } from "sonner"

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

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: noteInput) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notes"]});
      toast.success("Note created");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create note");
    }
  });
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, data} : {id: number, data: noteInput}) => updateNote(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notes"]}),
      toast.success("Note updated");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update note")
    }
  })
}
