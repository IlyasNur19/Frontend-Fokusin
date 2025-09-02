import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import TodoList from "../components/TodoList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import toast from 'react-hot-toast';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState("Sedang");
  const [newTodoDueDate, setNewTodoDueDate] = useState(null);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  

  // Fetch todos from backend
  useEffect(() => {
    const fetchTodos = async () => {
      if (user) {
        try {
          const res = await axios.get("https://backend-fokusin.vercel.app/api/todos");
          setTodos(res.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchTodos();
  }, [user]);

  

  // Handle Add Todo
   const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return toast.error('Judul tidak boleh kosong!');
    try {
      const newTodoData = {
      title: newTodoTitle,
      priority: newTodoPriority,
      dueDate: newTodoDueDate,
    };

      const res = await axios.post('https://backend-fokusin.vercel.app/api/todos', newTodoData);
      setTodos([...todos, res.data]);
      setNewTodoTitle('');
      setNewTodoPriority('Sedang');
      setNewTodoDueDate(null);
      toast.success('Tugas berhasil ditambahkan!'); // <-- Tambahkan ini
    } catch (err) {
      console.error(err);
      toast.error('Gagal menambahkan tugas.'); // <-- Tambahkan ini
    }
  };
  

  // Handle Toggle Todo Completion
  const handleToggle = async (id, isCompleted) => {
    try {
      await axios.put(`https://backend-fokusin.vercel.app/api/todos/${id}`, { isCompleted });
      setTodos(todos.map(todo => todo._id === id ? { ...todo, isCompleted } : todo));
      toast.success(isCompleted ? 'Tugas ditandai selesai!' : 'Tugas dikembalikan ke aktif.'); // <-- Tambahkan ini
    } catch (err) {
      console.error(err);
      toast.error('Gagal mengubah status tugas.');
    }
  };

  // Handle Delete Todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backend-fokusin.vercel.app/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
      toast.success('Tugas berhasil dihapus!'); // <-- Tambahkan ini
    } catch (err) {
      console.error(err);
      toast.error('Gagal menghapus tugas.');
    }
  };


  // Handle Drag and Drop
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = todos.findIndex((item) => item._id === active.id);
      const newIndex = over
        ? todos.findIndex((item) => item._id === over.id)
        : todos.length - 1;

      const newOrder = arrayMove(todos, oldIndex, newIndex);
      setTodos(newOrder); // Optimistic update

      // Update backend
      const orderedTodosForApi = newOrder.map((todo, index) => ({
        _id: todo._id,
        position: index,
      }));
      try {
        await axios.put("https://backend-fokusin.vercel.app/api/todos/reorder", {
          orderedTodos: orderedTodosForApi,
        });
      } catch (err) {
        console.error("Failed to reorder:", err);
        setTodos(todos); // Revert on failure
      }
    }
  };
  const handleEdit = async (id, updatedData) => {
    try {
      const res = await axios.put(`https://backend-fokusin.vercel.app/api/todos/${id}`, updatedData);
      setTodos(todos.map(todo => todo._id === id ? res.data : todo));
      toast.success('Tugas berhasil diperbarui!'); // <-- Tambahkan ini
    } catch (err) {
      console.error(err);
      toast.error('Gagal memperbarui tugas.');
    }
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filterStatus === "Aktif") return !todo.isCompleted;
      if (filterStatus === "Selesai") return todo.isCompleted;
      return true; 
    })
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (!user) {
    return (
      <div className="text-center hero-content">
        <div className="max-w-md flex flex-col items-center">
          <img src="/src/assets/logo.png" className=" min-w-1 sm:min-w-2xl" alt="" />
          <p className="py-6 px-3">
            Silakan login atau register untuk mulai mengelola tugas Anda.
          </p>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Halo, {user.name}!</h1>

      {/* ============== PANEL KONTROL BARU ============== */}
      <div className="card bg-base-100 shadow-lg mb-6">
        <div className="card-body">
          
          {/* --- Bagian Tambah Tugas --- */}
          <form onSubmit={handleAddTodo}>
            {/* Baris input utama */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Tambah tugas baru..."
                className="input input-bordered w-full"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Tambah</button>
            </div>
            {/* Baris input tambahan */}
            <div className="flex gap-4 mt-3">
              <select
                className="select select-bordered select-sm w-1/2"
                value={newTodoPriority}
                onChange={(e) => setNewTodoPriority(e.target.value)}
              >
                <option disabled>Prioritas</option>
                <option>Rendah</option>
                <option>Sedang</option>
                <option>Tinggi</option>
              </select>
              <DatePicker
                selected={newTodoDueDate}
                onChange={(date) => setNewTodoDueDate(date)}
                className="input input-bordered input-sm w-1/2"
                placeholderText="Pilih tanggal"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </form>

          {/* --- Pemisah Visual --- */}
          <div className="divider my-4"></div>

          {/* --- Bagian Filter & Cari --- */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
            <input
              type="text"
              placeholder="Cari tugas..."
              className="input input-bordered w-full sm:max-w-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div role="tablist" className="tabs tabs-boxed">
              <a role="tab" className={`tab ${filterStatus === 'Semua' ? 'tab-active' : ''}`} onClick={() => setFilterStatus('Semua')}>Semua</a>
              <a role="tab" className={`tab ${filterStatus === 'Aktif' ? 'tab-active' : ''}`} onClick={() => setFilterStatus('Aktif')}>Aktif</a>
              <a role="tab" className={`tab ${filterStatus === 'Selesai' ? 'tab-active' : ''}`} onClick={() => setFilterStatus('Selesai')}>Selesai</a>
            </div>
          </div>
        </div>
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </DndContext>
    </div>
  );
};

export default HomePage;
