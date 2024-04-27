<template>
  <div class="w-full flex justify-center pt-[10px] pr-[10px] pl-[10px] pb-[50px]">
    <div class="w-[1024px]">
      <div class="w-[500px]">
        <div>
          Gizli Anahtarınızı Giriniz:
        </div>
        <el-input v-model="allData.privateKey" type="password" placeholder="Gizli Anahtar" show-password />
      </div>
      <div class="w-full mt-[10px]">
        <div>İçerik</div>
        <el-input v-model="allData.content" class="w-full" :rows="20" type="textarea" />
      </div>
      <div class="w-full flex justify-start mt-[20px]">
        <el-button type="success" @click.left="saveData()">Kaydet</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import { cloneDeep } from 'lodash'
import { storageData } from '@/state'
import { useStorage } from '@/composables/Storage'
import { useCipheriv } from '@/composables/Cipheriv'

const { readStorage, writeStorage } = useStorage()
const { encrypt, dencrypt } = useCipheriv()
const privateKeyStatus: Ref<boolean> = ref(false)

// watch(() => allData.privateKey, (_val: string) => {

// })

const allData = ref(cloneDeep(storageData))

async function saveData(): Promise<void> {
  //Save Datas
  storageData.privateKey = allData.value.privateKey
  //Encrypt Content
  storageData.content = await encrypt(storageData.privateKey, allData.value.content)

  // writeStorage()
}

function getData() {
  const storage = readStorage(`../${import.meta.env.VITE_STORAGE_FILE_NAME}`)
  console.log(storage)
}

onMounted(() => {
  getData()
})
</script>
