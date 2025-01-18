<template>
  <VHover v-slot="{ isHovering, props }">
    <VCard :style="{ borderRadius: '10px', cursor: 'pointer' }" v-bind="props" :elevation="isHovering ? 20 : 2">
      <VImg :src="data?.image" />
      <div :style="{ padding: '5px 10px' }">
        <p :style="{ marginBottom: '5px' }">
          {{ data?.title }}
        </p>
        <VChip v-for="genre in data?.genres" :key="genre" color="primary" size="small" :style="{ marginRight: '5px' }">
          {{ genre }}
        </VChip>
      </div>
      <v-overlay :model-value="!!isHovering" class="align-center justify-center" scrim="#036358" contained>
        <v-btn variant="flat" @click="openDetail">
          See more info
        </v-btn>
      </v-overlay>
    </VCard>
  </VHover>
</template>

<script setup lang="ts">
import type { movie } from '@/types/movie';

interface props {
  data?: movie
}

const { data } = defineProps<props>()
const emit = defineEmits<{ (e: 'open', id?: string): void }>()

function openDetail(): void {
  emit('open', data?.id)
}
</script>
