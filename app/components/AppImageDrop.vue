<script setup lang="ts">
useRuntimeConfig()
const isUploading = ref(false)
const isSuccessful = ref(false)
const file = ref<File | null>() // image thrown into the FileUpload

async function handleUpload(file: File | null) {
  isSuccessful.value = false // hides the success indicator if showing
  if (!file) return // early return if user tries uploading nothing, probably unnecessary cause upload.ts already checks for that, but it also satisfies TS

  const formData = new FormData()
  formData.append("file", file)
  try {
    isUploading.value = true // show icon loader while upload is underway
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    })
    await res.json()

  } catch (e: unknown) {
    throw new Error(String(e)) // sure hope this works
  }
  isUploading.value = false // reset loader icon so it disappears once upload finishes or errors out
  isSuccessful.value = true // shows a little 'upload successful' span below the button
}

</script>
<template>
  <section class="mx-auto flex flex-col gap-5 items-center">
    <NuxtFileUpload @change="console.log(file)" :dropzone="true" v-model="file" label="Drop your image here!"
      accept="image/*" description="Accepts SVG, PNG, JPG, GIF"
      class="min-h-[400px] min-w-[600px] rounded-sm border-old-neutral-400 border-1" />
    <button @click="() => { if (file) { handleUpload(file) } }"
      class="flex justify-center items-center gap-2 border-2 font-semibold border-primary rounded-md px-8 py-2 hover:bg-primary hover:text-black active:scale-105 duration-150 cursor-pointer">CLICK
      ME TO UPLOAD
      <Icon v-show="!isUploading" name="lucide:upload" size="24" /> <!-- icon to show normally-->
      <Icon v-show="isUploading" name="lucide:loader" size="24" class="animate-spin" />
      <!-- icon to show while file is uploading-->
    </button>
    <span v-show="isSuccessful === true" class="text-success font-semibold">Upload successful!</span>

  </section>
</template>
