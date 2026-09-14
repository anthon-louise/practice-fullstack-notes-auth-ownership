import { Link } from "react-router-dom";
import { useDeleteNote, useNotes } from "../hooks/note"
import { useLogout } from "../hooks/auth";

const NotesListPage = () => {
  const {data: notes, isLoading, isError} = useNotes();


  const logoutMutation = useLogout();
  const deleteMutation = useDeleteNote();

  const handleDelete = (id: number) => {
    if (!window.confirm("Delete this note?")) return;
    deleteMutation.mutate(id);
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Something went wrong</p>
  return (
    <div>
      <h2>My Notes</h2>

      <Link to="/new">Create Note</Link>
      <button onClick={() => logoutMutation.mutate()}>Logout</button>

      {notes?.map((note) => (
        <div key={note.id}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>
          <button>Update</button>
          <button onClick={() => handleDelete(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default NotesListPage
