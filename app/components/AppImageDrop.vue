<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

useRuntimeConfig()
const isUploading = ref(false)
const isSuccessful = ref(false)
const isCopiedToClipboard = ref(false)
const isShowingProgress = ref(false) // controls loading bar that pops after sending the fule to Vercel
const downloadLink = ref('') // extracted from the blob via Vercel's api inside the 'try' block
const clip = useClipboard()
const file = ref<File | null>() // image thrown into the FileUpload
const fileTooBig = computed(() => file.value ? file.value.size > 3000000 : false)
async function handleUpload(file: File | null) {
  isCopiedToClipboard.value = false // hides the 'u have stuff in clipboard' indicator
  isSuccessful.value = false // hides the success indicator if showing
  if (!file) return // early return if user tries uploading nothing, probably unnecessary here, cause upload.ts already checks for that, but it also satisfies TS

  console.dir(fileTooBig.value)
  const formData = new FormData()
  formData.append("file", file)

  // check if file size exceeds 3MB - because I can't seem to find if the FileUpload component can somehow limit it's own size.
  if (fileTooBig.value) {
    throw new Error('File size exceeds 3MB!')
  }
  try {
    isUploading.value = true // show icon loader while upload is underway
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    })
    const returnData = await res.json()

    downloadLink.value = returnData.downloadUrl

    // this delay is to let Vercel properly save the blob after it's been sent over 
    // this prevents clicking the downlaod link too early and geting the 'blob doesnt exist' error page
    // yes there is probably a more elegant way to do it, but i'll figure it out later
    setInterval(() => {
      isSuccessful.value = true // shows a little 'upload successful' span below the button
      isShowingProgress.value = false
    }, 2000)
  } catch (e: unknown) {
    throw new Error(String(e)) // sure hope this works
  }
  isUploading.value = false // reset loader icon so it disappears once upload finishes or errors out
  isShowingProgress.value = true

}

function copyToClipboard(e: string) {
  clip.copy(e)
  isCopiedToClipboard.value = true
}
</script>
<template>
  <section class="mx-auto flex flex-col gap-5 items-center">
    <NuxtFileUpload :dropzone="true" v-model="file" label="Drop your image here!" accept="image/*"
      description="Accepts SVG, PNG, JPG, GIF"
      class="min-h-[400px] min-w-[600px] rounded-sm border-old-neutral-400 border-1" />
    <!-- upload button -->
    <button :disabled="fileTooBig" @click="() => { if (file) { handleUpload(file) } }"
      class="flex justify-center items-center gap-2 border-2 font-semibold border-primary rounded-md px-8 py-2 hover:bg-primary hover:text-black active:scale-105 duration-150 cursor-pointer disabled:pointer-events-none disabled:bg-neutral-600 disabled:border-neutral-600">
      CLICK ME TO UPLOAD
      <!-- icon to show normally-->
      <Icon v-show="!isUploading" name="lucide:upload" size="24" />
      <!-- icon to show while file is uploading-->
      <Icon v-show="isUploading" name="lucide:loader" size="24" class="animate-spin" />
    </button>
    <!-- copy to clipboard -->
    <button v-if="isSuccessful === true" @click="copyToClipboard(downloadLink)"
      class="download-link flex justify-center items-center gap-2 border-2 border-light rounded-sm px-8 py-2 cursor-pointer hover:scale-110">
      <span>Copy download link to clipboard</span>
      <Icon name="lucide:copy" size="24" class="flex" />
    </button>
    <span v-if="fileTooBig" class="text-error font-bold text-3xl">Upload impossible - file size exceeds
      3MB.</span>
    <span v-show="isSuccessful === true" class="text-success font-semibold">Upload successful!</span>
    <NuxtProgress v-if="isShowingProgress === true" />
    <span v-show="isCopiedToClipboard === true" class="text-cyan-400 font-semibold">Download link copied to
      clipboard!</span>
  </section>
</template>
