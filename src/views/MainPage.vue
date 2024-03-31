<template>
  <div class="w-full flex justify-center">
    <div class="w-[500px]">
      <div>
        Gizli Anahtarınızı Giriniz:
      </div>
      <el-input v-model="allData.privateKey" class="w-full" type="password" placeholder="Gizli Anahtar" show-password />
    </div>
    <div class="w-full mt-[20px]">
      <div>İçerik</div>
      <el-input v-model="allData" class="w-full" :rows="30" type="textarea" />
    </div>
    <div class="w-full flex justify-start mt-[20px]">
      <el-popconfirm title="Bütün verileri kalıcı olarak silmek istediğine emin misin ?" confirm-button-text="Evet" cancel-button-text="Hayır" @confirm="" @cancel="">
        <template #reference>
          <el-button type="danger">Verileri Sil</el-button>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import { cloneDeep } from 'lodash'
import { storageData } from '@/state'

const privateKeyStatus: Ref<boolean> = ref(false)

watch(() => allData.value.privateKey, (val: string) => {

})

const allData = ref(cloneDeep(storageData))
</script>
