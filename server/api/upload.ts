// server/api/upload.ts
import { defineEventHandler, readMultipartFormData } from "h3"
import { put } from "@vercel/blob"
const config = useRuntimeConfig()
const token = config.blobToken
console.dir(config)
console.log(`token: ${config.public.blobToken}`)
export default defineEventHandler(async (event) => {
  if (event.method !== "POST") {
    return { error: "Method not allowed" }
  }

  const form = await readMultipartFormData(event)
  if (!form || form.length === 0) {
    return { error: "No file provided" }
  }

  // zakładam, że wrzucasz tylko 1 plik
  const file = form[0]
  const filename = file.filename || "upload.bin"


  const blob = await put(filename, file.data, {
    access: "public",
    token: token
  })

  return { url: blob.url }
})
