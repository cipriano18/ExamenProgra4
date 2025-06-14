// src/app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Obtener todas las tareas con usuario incluido
export async function GET() {
  try {
    const tareas = await prisma.tareas.findMany({
      include: { usuarios: true },
    });
    return NextResponse.json(tareas);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener tareas' }, { status: 500 });
  }
}

// POST: Crear nueva tarea
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const nuevaTarea = await prisma.tareas.create({
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion,
        fecha: new Date(body.fecha),
        estado: body.estado,
        id_usuario: body.id_usuario,
      },
    });
    return NextResponse.json(nuevaTarea, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/tasks:", error);
    return NextResponse.json({ error: "Error al crear tarea" }, { status: 500 });
  }
}

