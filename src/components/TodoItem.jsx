import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';
import { useState } from 'react';


const TodoItem = ({ todo, onToggle, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo._id });
  
  const priorityBadge = (priority) => {
    switch (priority) {
      case 'Tinggi':
        return <div className="badge badge-error text-white">Tinggi</div>;
      case 'Sedang':
        return <div className="badge badge-warning text-white">Sedang</div>;
      case 'Rendah':
        return <div className="badge badge-success text-white">Rendah</div>;
      default:
        return null;
    }
  };

   const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo._id, { title: editText });
      setIsEditing(false);
    }
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="card bg-base-100 shadow-md p-4 flex-row items-center gap-4"
    >
      <div {...listeners} className="cursor-grab touch-none p-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
      </div>
      <input 
        type="checkbox" 
        className="checkbox checkbox-primary" 
        checked={todo.isCompleted} 
        onChange={() => onToggle(todo._id, !todo.isCompleted)}
      />
      <div className="flex-grow">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave} // Simpan saat input kehilangan fokus
            onKeyDown={(e) => e.key === 'Enter' && handleSave()} // Simpan saat menekan Enter
            className="input input-bordered input-sm w-full"
            autoFocus
          />
        ) : (
          <>
            <p className={`font-semibold ${todo.isCompleted ? 'line-through text-gray-400' : ''}`}
              onClick={() => setIsEditing(true)} // Masuk mode edit saat judul diklik
            >
              {todo.title}
            </p>
            {/* ... (div untuk tanggal dan prioritas) ... */}
          </>
        )}
      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <button onClick={handleSave} className="btn btn-sm btn-success">Simpan</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="btn btn-sm btn-ghost">Edit</button>
        )}
        <button onClick={() => onDelete(todo._id)} className="btn btn-sm btn-error btn-outline">Hapus</button>
      </div>
    </div>
  );
};

export default TodoItem;