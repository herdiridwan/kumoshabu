import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { join, resolve, relative } from "path";

const PUBLIC_ASSETS = resolve(process.cwd(), "public", "assets");
const ROOT_ASSETS = resolve(process.cwd(), "Assets");

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

function resolvePath(base: string, subPath: string): string | null {
  const full = resolve(base, subPath);
  const rel = relative(base, full);
  if (rel.startsWith("..") || rel.includes("..")) return null;
  return full;
}

export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.searchParams.get("path");
    if (!pathname || pathname.includes("..")) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
    const safePathSegment = pathname.replace(/^\/+/, "").replace(/%20/g, " ");

    const publicPath = resolvePath(PUBLIC_ASSETS, safePathSegment);
    const rootPath = resolvePath(ROOT_ASSETS, safePathSegment);

    for (const fullPath of [publicPath, rootPath]) {
      if (!fullPath || !existsSync(fullPath)) continue;
      try {
        const ext = fullPath.slice(fullPath.lastIndexOf(".")).toLowerCase();
        const contentType = MIME[ext] ?? "application/octet-stream";
        const buffer = await readFile(fullPath);
        return new NextResponse(buffer, {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      } catch {
        continue;
      }
    }

    return NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (err) {
    console.error("[serve-asset]", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
