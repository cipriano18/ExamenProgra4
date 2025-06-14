import prisma from './prisma';

// Crear tarea
export async function crearTarea(data: {
  nombre: string;
  fecha: Date;
  descripcion: string;
  estado: string;
  id_usuario: number;
}) {
  return prisma.tareas.create({ data });
}

// Obtener todas las tareas
export async function obtenerTareas() {
  return prisma.tareas.findMany({
    include: { usuarios: true },
  });
}

// Obtener una tarea por ID
export async function obtenerTareaPorId(id: number) {
  return prisma.tareas.findUnique({ where: { id_tarea: id } });
}

// Actualizar tarea
export async function actualizarTarea(id: number, data: Partial<{
  nombre: string;
  fecha: Date;
  descripcion: string;
  estado: string;
  id_usuario: number;
}>) {
  return prisma.tareas.update({ where: { id_tarea: id }, data });
}

// Eliminar tarea
export async function eliminarTarea(id: number) {
  return prisma.tareas.delete({ where: { id_tarea: id } });
}
