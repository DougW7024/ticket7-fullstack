import React from "react";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // const newdate = `${body.dueDate.slice(5, 7)}/${body.dueDate.slice(8, 10)}/${body.dueDate.slice(0, 4)}`;
  const newTask = await prisma.task.create({
    data: {
      title: body.title,
      taskStatus: body.taskStatus,
      dueDate: body.dueDate,
      description: body.description,
    },
  });
  return NextResponse.json(newTask);
}
