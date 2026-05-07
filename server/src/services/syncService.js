import { prisma } from "../db/prisma.js";

async function ensureDefaultUserAndProject(projectName) {
  const user = await prisma.user.upsert({
    where: { email: "local@codbit.dev" },
    update: {},
    create: {
      email: "local@codbit.dev",
      name: "Local User",
      apiKey: process.env.CODBIT_API_KEY ?? "codbit-dev-key-change-me",
    },
  });

  const project = await prisma.project.upsert({
    where: {
      userId_name: {
        userId: user.id,
        name: projectName,
      },
    },
    update: {},
    create: {
      name: projectName,
      userId: user.id,
    },
  });

  return project;
}

export async function saveHeartbeat(payload) {
  const project = await ensureDefaultUserAndProject(payload.projectName);
  return prisma.session.create({
    data: {
      projectId: project.id,
      status: payload.status,
      durationMins: payload.durationMinutes,
      heartbeatAt: new Date(payload.timestamp),
    },
  });
}

export async function saveMemory(payload) {
  const project = await ensureDefaultUserAndProject(payload.projectName);
  return prisma.memory.create({
    data: {
      projectId: project.id,
      content: payload.content,
      filePath: payload.filePath,
      lineNumber: payload.lineNumber,
      codeSnippet: payload.codeSnippet || null,
      tag: payload.tag || null,
    },
  });
}

export async function getHistory(projectName, limit = 20) {
  const project = await ensureDefaultUserAndProject(projectName);
  return prisma.memory.findMany({
    where: {
      projectId: project.id,
      isDone: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
}
