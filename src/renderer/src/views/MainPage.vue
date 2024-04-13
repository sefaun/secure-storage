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
        <el-popconfirm title="Bütün verileri kalıcı olarak silmek istediğine emin misin ?" confirm-button-text="Evet" cancel-button-text="Hayır" @confirm="confirmDatas()">
          <template #reference>
            <el-button type="danger" @click.left="deleteDatas()">Verileri Sil</el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { cloneDeep } from 'lodash'
import { storageData } from '@/state'
import { useStorage } from '@/composables/Storage'
import { useCipheriv } from '@/composables/Cipheriv'

const { writeStorage } = useStorage()
const privateKeyStatus: Ref<boolean> = ref(false)

// watch(() => allData.privateKey, (_val: string) => {

// })

const allData = ref(cloneDeep(storageData))

function confirmDatas(): void {
  const { encrypt } = useCipheriv(allData.value.privateKey)
  //Save Datas
  storageData.privateKey = allData.value.privateKey
  //Encrypt Content
  storageData.content = encrypt(allData.value.content)

  writeStorage()
}

function deleteDatas(): void {
  //Delete Datas
}
</script>
