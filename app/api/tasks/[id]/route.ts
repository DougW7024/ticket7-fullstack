import React from "react";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { error } from "console";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
  const updatedTask = await prisma.task.findUnique({
    where: { id: Number(params.id) },
  });
  if (!updatedTask) {
    return NextResponse.json({ error: "No tasks found" }, { status: 404 });
  }
  return NextResponse.json(updatedTask);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const task = await prisma.task.findUnique({
    where: { id: Number(params.id) },
  });
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  try {
    const deleteTask = await prisma.task.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(deleteTask);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // const id = parseInt(params.id);
  if (isNaN(params.id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await request.json();
  const updateTask = await prisma.task.update({
    where: { id: Number(params.id) },
    data: {
      title: body.title,
      taskStatus: body.taskStatus,
      dueDate: body.dueDate,
      description: body.description,
    },
  });
  if (!updateTask) {
    throw new Error("Task not found");
  }
  return NextResponse.json(updateTask);
}
