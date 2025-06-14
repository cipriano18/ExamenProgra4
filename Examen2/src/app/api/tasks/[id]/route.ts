// src/app/api/tasks/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT: Actualizar una tarea por ID extraído de la URL
export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = Number(url.pathname.split('/').pop());

  if (!id) {
    return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const tareaActualizada = await prisma.tareas.update({
      where: { id_tarea: id },
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion,
        fecha: new Date(body.fecha),
        estado: body.estado,
        id_usuario: body.id_usuario,
      },
    });
    return NextResponse.json(tareaActualizada);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar tarea' }, { status: 500 });
  }
}

// DELETE: Eliminar una tarea por ID extraído de la URL
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = Number(url.pathname.split('/').pop());

  if (!id) {
    return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  }

  try {
    await prisma.tareas.delete({
      where: { id_tarea: id },
    });
    return NextResponse.json({ mensaje: 'Tarea eliminada' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar tarea' }, { status: 500 });
  }
}
