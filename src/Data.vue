<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "./lib/supabaseClient.ts";
import Youtube from "./components/Youtube.vue";
import Facebook from "./components/Facebook.vue";
import { convertCompilerOptionsFromJson } from "typescript";

const bananas = ref([]);
const errorMessage = ref("");

const route = useRoute();
const id = computed(() => route.params.id);

async function getBananas() {
	errorMessage.value = "";

	if (!id.value) {
		bananas.value = [];
		errorMessage.value = "ID tidak ditemukan di route.";
		return;
	}

	const { data, error } = await supabase
		.from("bananas")
		.select("id,url,type,banana_origin(name)")
		.eq("id", id.value);

	if (error) {
		errorMessage.value =
			error.message || "Gagal mengambil data.";
		bananas.value = [];
		return;
	}

	bananas.value = data ?? [];
	// console.log({data:bananas.value})
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
	getBananas();
});
</script>

<template>
	<div class="flex gap-3 flex-col justify-center px-3 py-4">
		<h1 class="text-2xl text-rose-400">all data</h1>
		<div class="mx-auto">
			<RouterLink
				to="/"
				class="bg-green-400 px-2 py-4 m-4"
				>back to Home</RouterLink
			>
		</div>

		<div v-if="errorMessage" class="text-red-500">
			{{ errorMessage }}
		</div>

		<div class="flex gap-3 flex-wrap justify-center">
			<div
				v-for="banana in bananas"
				:key="banana.id"
				class="w-full flex justify-center"
			>
				<div
					v-if="
						[
							'yt-short','yt-long'
						].includes(
							banana.type,
						)
					"
				>
					<Youtube
						:url="
							getYoutubeId(
								banana.url
							)
						"
					/>
				</div>
				<div
					v-else-if="
						[
							'fb-post',
						].includes(
							banana.type,
						)
					"
					class="mt-4"
				>
					<div
						v-html="
							banana.url
						"
					></div>
				</div>
			</div>
		</div>
	</div>
</template>
