import prisma from './prisma';

// Crear usuario
export async function crearUsuario(data: { nombre: string }) {
  return prisma.usuarios.create({ data });
}

// Obtener todos los usuarios
export async function obtenerUsuarios() {
  return prisma.usuarios.findMany({
    include: { tareas: true },
  });
}

// Obtener usuario por ID
export async function obtenerUsuarioPorId(id: number) {
  return prisma.usuarios.findUnique({ where: { id_usuario: id } });
}

// Actualizar usuario
export async function actualizarUsuario(id: number, data: Partial<{ nombre: string }>) {
  return prisma.usuarios.update({ where: { id_usuario: id }, data });
}

// Eliminar usuario
export async function eliminarUsuario(id: number) {
  return prisma.usuarios.delete({ where: { id_usuario: id } });
}
