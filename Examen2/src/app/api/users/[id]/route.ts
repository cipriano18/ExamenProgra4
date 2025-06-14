import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = Number(url.pathname.split('/').pop()); // Extrae el `id` de la URL

  if (!id) {
    return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const usuarioActualizado = await prisma.usuarios.update({
      where: { id_usuario: id },
      data: { nombre: body.nombre },
    });
    return NextResponse.json(usuarioActualizado);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar usuario' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = Number(url.pathname.split('/').pop()); // Extrae el `id` de la URL

  if (!id) {
    return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  }

  try {
    await prisma.usuarios.delete({
      where: { id_usuario: id },
    });
    return NextResponse.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar usuario' }, { status: 500 });
  }
}
