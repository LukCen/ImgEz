<script setup lang="ts">
const cfg = useRuntimeConfig()
console.dir(cfg.blobToken)
const isUploading = ref(false)

const file = ref<File | null>() // image thrown into the FileUpload
// const testFunc = async () => {
//   if (!file.value) return
//   isUploading.value = true

//   try {
//     const formData = new FormData()
//     formData.append('file', file.value)

//     await $fetch('/api/upload', {
//       method: "POST",
//       body: formData
//     })

//   } catch (e: unknown) {
//     throw new Error(`Error in the testFunc ${String(e)}`)
//   } finally {
//     isUploading.value = false
//   }
// }

async function handleUpload(file: File | null) {
  if (!file) return
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData
  })
  const data = await res.json()
  console.log('upload result:', data)
}

</script>
<template>
  <NuxtFileUpload @change="console.log(file)" :dropzone="true" v-model="file" label="Drop your image here!"
    accept="image/*" description="Accepts SVG, PNG, JPG, GIF"
    class="min-h-[400px] min-w-[600px] rounded-sm border-old-neutral-400 border-1" />
  <button @click="() => { if (file) { handleUpload(file) } }"
    class="flex justify-center items-center gap-2 border-2 border-primary rounded-md px-8 py-2 active:bg-primary duration-150">CLICK
    ME TO UPLOAD
    <Icon v-show="isUploading" name="lucide:loader" size="24" class="animate-spin" />
  </button>

</template>
