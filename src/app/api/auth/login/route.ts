import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

/**
 * Simple credential login for admin.
 * In production, prefer a full Auth.js (NextAuth) setup with JWT/session.
 * This endpoint hashes comparison and sets an httpOnly cookie.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-mail e senha são obrigatórios" },
        { status: 400 }
      );
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Banco de dados não configurado" },
        { status: 503 }
      );
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase().trim()))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // Session cookie (simplified — upgrade to signed JWT in production)
    const cookieStore = await cookies();
    cookieStore.set("nr_session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ ok: true, name: user.name });
  } catch (err) {
    console.error("[auth/login]", err);
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}
