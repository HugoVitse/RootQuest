// src/lib/utils.ts
export async function streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
    const chunks: Buffer[] = [];
    for await (const chunk of readableStream) {
        chunks.push(chunk as Buffer);
    }
    return Buffer.concat(chunks);
}