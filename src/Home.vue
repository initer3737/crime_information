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
    if (!url) return "";
    
    let url_proccess = "";

  
    if (url.includes("youtu.be")) {
        url_proccess = url.split("/").at(-1).trim();
    }
   
    else if (url.includes("short")) {
        url_proccess = url.split("/").at(-1).trim();
    }
    else if (url.includes("youtube.com") && url.includes("v=")) {
        url_proccess = url.split("v=")[1]?.split("&")[0].trim();
    }
    else {
        url_proccess = url.split("/").at(-1).trim();
    }
	
    return url_proccess;
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
        <div v-if="['yt-short','yt-long'].includes(banana.type)">
            <Youtube :url="getYoutubeId(banana.url)"></Youtube>
        </div>
        <div v-if="['fb-post'].includes(banana.type)">
            <!-- <Youtube :url="getYoutubeId(banana.url)"></Youtube> -->
             <div v-html="banana.url"></div>
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