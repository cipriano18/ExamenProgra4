"use client";
import {
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id_tarea: number;
  nombre: string;
  fecha: string;
  descripcion: string;
  estado: string;
  id_usuario: number;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState<Partial<Task>>({});
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Task>>({});
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error al obtener tareas:", err);
      }
    };
    fetchTasks();
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    isEdit = false
  ) => {
    const { name, value } = e.target;
    isEdit
      ? setEditForm({ ...editForm, [name]: value })
      : setForm({ ...form, [name]: value });
  };

  const handleAddTask = async () => {
    console.log("handleAddTask ejecutado", form);
    if (!form.nombre || !form.fecha || !form.estado || !form.id_usuario) {
      console.warn("Faltan campos obligatorios:", form);
      return;
    }

    // Construir payload con id_usuario numérico
    const payload = {
      ...form,
      id_usuario: Number(form.id_usuario),
    };

    try {
      console.log("Enviando tarea:", payload);
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al crear tarea");

      const nueva = await res.json();
      setTasks((prev) => [...prev, nueva]);
      setForm({});
      showToast("Tarea agregada con éxito");
    } catch (err) {
      console.error(err);
      showToast("Error al agregar tarea");
    }
  };


  const handleDelete = async (index: number) => {
    const id = tasks[index].id_tarea;

    try {
      const res = await fetch(`/api/tasks/${id}`, {
         method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar tarea");

      setTasks((prev) => prev.filter((_, i) => i !== index));
      showToast("Tarea eliminada");
    } catch (err) {
      console.error(err);
      showToast("Error al eliminar tarea");
    }
  };

  const startEditing = (index: number) => {
    setEditIndex(index);
    setEditForm(tasks[index]);
  };

  const cancelEditing = () => {
    setEditIndex(null);
    setEditForm({});
  };

  const saveEditing = async () => {
    if (editIndex === null || !editForm.nombre || !editForm.fecha) return;
    const id = tasks[editIndex].id_tarea;

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) throw new Error("Error al actualizar");

      const actualizada = await res.json();
      setTasks((prev) =>
        prev.map((t, i) => (i === editIndex ? actualizada : t))
      );
      cancelEditing();
      showToast("Tarea actualizada");
    } catch (err) {
      console.error(err);
      showToast("Error al actualizar tarea");
    }
  };

  return (
    <div className="p-2 sm:p-4 space-y-6 relative">
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-[#6c63ff] text-white px-4 py-2 rounded-xl shadow-lg z-50"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full px-2 sm:px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2 flex items-center gap-2">
          <ClipboardDocumentCheckIcon className="h-7 w-7 text-[#6c63ff]" />
          Lista de tareas:
        </h2>

        <div className="border border-gray-300 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="overflow-y-auto max-h-[50vh] p-2 sm:p-4 pr-1 sm:pr-2">
            <AnimatePresence>
              {tasks.length === 0 ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-500 text-center"
                >
                  No hay tareas aún
                </motion.p>
              ) : (
                <ul className="space-y-2">
                  {tasks.map((task, index) => (
                    <motion.li
                      key={task.id_tarea}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-3 border rounded-2xl bg-gray-100 flex flex-col sm:flex-row sm:justify-between gap-2"
                    >
                      {editIndex === index ? (
                        <motion.div
                          key="edit"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="w-full flex flex-col gap-2"
                        >
                          <input
                            name="nombre"
                            value={editForm.nombre || ""}
                            onChange={(e) => handleChange(e, true)}
                            className="border p-1 rounded-2xl"
                            placeholder="Nombre"
                          />
                          <input
                            type="date"
                            name="fecha"
                            value={editForm.fecha || ""}
                            onChange={(e) => handleChange(e, true)}
                            className="border p-1 rounded-2xl"
                          />
                          <textarea
                            name="descripcion"
                            value={editForm.descripcion || ""}
                            onChange={(e) => handleChange(e, true)}
                            className="border p-1 rounded-2xl"
                            placeholder="Descripción"
                          />
                          <select
                            name="estado"
                            value={editForm.estado || ""}
                            onChange={(e) => handleChange(e, true)}
                            className="border p-1 rounded-2xl"
                          >
                            <option value="">Seleccionar estado</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="En Proceso">En Proceso</option>
                            <option value="Finalizada">Finalizada</option>
                          </select>
                          <div className="flex gap-2">
                            <motion.button
                              onClick={saveEditing}
                              className="text-[#6c63ff]"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <CheckIcon className="h-5 w-5" />
                            </motion.button>
                            <motion.button
                              onClick={cancelEditing}
                              className="text-gray-600"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </motion.button>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
                          <div className="space-y-1">
                            <p className="text-sm font-medium truncate">
                              {task.nombre} - {task.estado}
                            </p>
                            <p className="text-xs text-gray-500">
                              {task.fecha} — {task.descripcion}
                            </p>
                          </div>
                          <div className="flex gap-4">
                            <motion.button
                              onClick={() => startEditing(index)}
                              className="text-[#6c63ff]"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <PencilIcon className="h-5 w-5" />
                            </motion.button>
                            <motion.button
                              onClick={() => handleDelete(index)}
                              className="text-red-500"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </motion.button>
                          </div>
                        </div>
                      )}
                    </motion.li>
                  ))}
                </ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Agregar tarea */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-2 sm:p-4 border-t border-gray-300 rounded-t-2xl"
      >
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <PlusIcon className="h-5 w-5 text-[#6c63ff]" />
          Agregar Tarea
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="border border-gray-400 rounded-2xl px-3 py-2"
            value={form.nombre || ""}
            onChange={handleChange}
          />
          <input
            type="date"
            name="fecha"
            className="border border-gray-400 rounded-2xl px-3 py-2"
            value={form.fecha || ""}
            onChange={handleChange}
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            className="border border-gray-400 rounded-2xl px-3 py-2 col-span-1 sm:col-span-2"
            value={form.descripcion || ""}
            onChange={handleChange}
          />
          <select
            name="estado"
            className="border border-gray-400 rounded-2xl px-3 py-2"
            value={form.estado || ""}
            onChange={handleChange}
          >
            <option value="">Seleccionar estado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Finalizada">Finalizada</option>
          </select>
          <input
            type="number"
            name="id_usuario"
            placeholder="ID Usuario"
            className="border border-gray-400 rounded-2xl px-3 py-2"
            value={form.id_usuario || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <motion.button
            className="w-full bg-[#6c63ff] text-white px-4 py-2 rounded-2xl hover:bg-[#5a54e6]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddTask}
          >
            Guardar
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
