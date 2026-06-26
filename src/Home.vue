<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'
import Youtube from './components/Youtube.vue'
import Facebook from './components/Facebook.vue'
const bananas = ref([])

async function getBananas() {

  const { data, error } = await supabase.from('bananas').select("id,url,type,banana_origin(name)")
  if (error) {
    
  }
  bananas.value = data
}
const getYoutubeId = (url) => {
  if (!url) return ''
  const parts = url.split("/")
  const lastPart = parts[parts.length - 1] || ""
  return lastPart.split("?")[0]
}
onMounted(() => {
  getBananas()
})

</script>

<template>
 <div class="flex gap-3 flex-col justify-center px-3 py-4 bg-slate-200">
  <h1 class="text-2xl text-rose-400">all data</h1>
  <div class="flex gap-3 flex-wrap justify-center">
    <div v-for="(banana,idx) in bananas" :key="banana.id" class="bg-white px-2 py-3 rounded-2xl shadow-md shadow-green-300">
        <div v-if="['yt-short'].includes(banana.type)">
            <Youtube :url="getYoutubeId(banana.url)"></Youtube>
        </div>
    <div class="gap-3 flex flex-col">
         <h4>country :  {{ banana.banana_origin.name }}</h4>
      <RouterLink :to="`/${banana.id}/data`" class="px-4 py-2 mt-2 bg-green-500 rounded text-center text-white">see me</RouterLink>
    </div>
    </div>
    <div v-for="(banana,idx) in bananas" :key="banana.id" class="hidden">
        <div v-if="['facebook'].includes(banana.type)">
            <Youtube :url="getYoutubeId(banana.url)"></Youtube>
        </div>
      {{ banana }}
      <RouterLink :to="`/${banana.id}/data`">see me</RouterLink>
    </div>
  </div>
 </div>
</template>