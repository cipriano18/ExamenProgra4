"use client";
import {
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface User {
  id_usuario: number;
  nombre: string;
}

const MotionButton = motion.button;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!name.trim()) return;

    const newUserData = { nombre: name.trim() };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserData),
      });

      const createdUser: User = await response.json();
      setUsers([...users, createdUser]);
      setName("");
      triggerSuccess();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  const handleDelete = async (index: number) => {
    const userToDelete = users[index];

    try {
      await fetch(`/api/users/${userToDelete.id_usuario}`, {
        method: "DELETE",
      });

      setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const startEditing = (index: number) => {
    setEditIndex(index);
    setEditName(users[index].nombre);
  };

  const cancelEditing = () => {
    setEditIndex(null);
    setEditName("");
  };

  const saveEditing = async () => {
    if (!editName.trim() || editIndex === null) return;

    const updatedUser = { ...users[editIndex], nombre: editName.trim() };

    try {
      await fetch(`/api/users/${updatedUser.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      setUsers((prev) =>
        prev.map((user, i) => (i === editIndex ? updatedUser : user))
      );

      setEditIndex(null);
      setEditName("");
      triggerSuccess();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const triggerSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const buttonAnimation = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  };

  return (
    <div className="p-2 sm:p-4 space-y-6">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#6c63ff] text-white px-6 py-2 rounded-2xl shadow-xl z-50"
          >
            Guardado correctamente
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full px-2 sm:px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2 flex items-center gap-2">
          <UserIcon className="h-7 w-7 sm:h-8 sm:w-8 text-[#6c63ff]" />
          Lista de usuarios:
        </h2>

        <div className="border border-gray-300 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="overflow-y-auto max-h-[50vh] p-2 sm:p-4 pr-1 sm:pr-2">
            {users.length === 0 ? (
              <p className="text-gray-500 text-center">No hay usuarios aún</p>
            ) : (
              <ul className="space-y-2">
                <AnimatePresence>
                  {users.map((user, index) => (
                    <motion.li
                      key={user.id_usuario}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-3 border rounded-2xl sm:rounded-3xl bg-gray-100 flex flex-wrap sm:flex-nowrap justify-between items-center gap-2"
                    >
                      {editIndex === index ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex flex-col sm:flex-row gap-2 w-full"
                        >
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="border p-2 rounded-2xl flex-grow focus:ring-[#6c63ff] min-w-[120px]"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveEditing();
                              if (e.key === "Escape") cancelEditing();
                            }}
                          />
                          <div className="flex gap-2">
                            <MotionButton
                              {...buttonAnimation}
                              onClick={saveEditing}
                              title="Guardar"
                              className="text-[#6c63ff] hover:text-[#5a54e6]"
                              aria-label="Guardar"
                            >
                              <CheckIcon className="h-5 w-5" />
                            </MotionButton>
                            <MotionButton
                              {...buttonAnimation}
                              onClick={cancelEditing}
                              title="Cancelar"
                              className="text-gray-600 hover:text-gray-800"
                              aria-label="Cancelar"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </MotionButton>
                          </div>
                        </motion.div>
                      ) : (
                        <>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-grow overflow-hidden">
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              #{user.id_usuario}
                            </span>
                            <span className="truncate">{user.nombre}</span>
                          </div>
                          <div className="flex space-x-4">
                            <MotionButton
                              {...buttonAnimation}
                              onClick={() => startEditing(index)}
                              className="text-[#6c63ff] hover:text-[#5a54e6]"
                              title="Editar usuario"
                              aria-label="Editar usuario"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </MotionButton>
                            <MotionButton
                              {...buttonAnimation}
                              onClick={() => handleDelete(index)}
                              className="text-red-500 hover:text-red-700"
                              title="Eliminar usuario"
                              aria-label="Eliminar usuario"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </MotionButton>
                          </div>
                        </>
                      )}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-2 sm:p-4 border-t border-gray-300 rounded-t-2xl sm:rounded-3xl"
      >
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <UserPlusIcon className="h-5 w-5 text-[#6c63ff]" />
          Agregar Usuario
        </h2>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Nombre"
            className="w-full border border-gray-400 rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6c63ff]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddUser();
            }}
          />
          <MotionButton
            {...buttonAnimation}
            className="bg-[#6c63ff] text-white px-4 py-2 rounded-2xl hover:bg-[#5a54e6] transition focus:ring-indigo-400 w-full sm:w-auto"
            onClick={handleAddUser}
            aria-label="Guardar usuario"
          >
            Guardar
          </MotionButton>
        </div>
      </motion.div>
    </div>
  );
}
