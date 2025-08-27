<script setup lang="ts"></script>
<template>
  <NuxtFileUpload :dropzone="true" label="Drop your image here!" accept="image/*"
    description="Accepts SVG, PNG, JPG, GIF"
    class="min-h-[400px] min-w-[600px] rounded-sm border-old-neutral-400 border-1" />
</template>
