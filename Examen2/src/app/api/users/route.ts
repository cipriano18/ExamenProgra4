import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const usuarios = await prisma.usuarios.findMany();
  return NextResponse.json(usuarios);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const nuevoUsuario = await prisma.usuarios.create({
      data: {
        nombre: body.nombre,
      },
    });
    return NextResponse.json(nuevoUsuario, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear usuario' }, { status: 500 });
  }
}
