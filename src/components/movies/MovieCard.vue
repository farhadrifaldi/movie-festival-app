<template>
  <VHover v-slot="{ isHovering, props: hoverProps }">
    <VCard
      :style="{ borderRadius: '10px', cursor: 'pointer' }"
      v-bind="hoverProps"
      :elevation="isHovering ? 20 : 2"
    >
      <VImg :src="data?.image" />
      <div :style="{ padding: '13px 10px' }">
        <p style="margin-bottom: 5px; height: 50px; overflow: hidden; text-overflow: ellipsis;">
          {{ data?.title }}
        </p>
        <div class="d-flex justify-space-between">
          <VChip
            v-if="data?.rating"
            class="mb-2"
            variant="text"
            style="padding: 0;"
          >
            <VIcon
              icon="mdi-star"
              class="mr-1"
              color="warning"
            />{{ data?.rating }}
          </VChip>
          <VChip
            v-if="data?.view_count"
            variant="text"
            style="padding: 0;"
          >
            <VIcon
              icon="mdi-eye-circle-outline"
              class="mr-1"
            />{{ data?.view_count }}
          </VChip>
        </div>
        <div
          v-if="data?.genres"
          style="height: 25px; flex-wrap: nowrap; display: flex;"
        >
          <VChip
            v-for="genre in data?.genres.split(',')"
            :key="genre"
            color="primary"
            size="small"
            :style="{ marginRight: '5px' }"
          >
            {{ genre }}
          </VChip>
        </div>
        <VOverlay
          :model-value="!!isHovering"
          class="align-center justify-center"
          scrim="#036358"
          contained
        >
          <v-btn
            variant="flat"
            @click="openDetail"
          >
            See more info
          </v-btn>
        </VOverlay>
      </div>
    </VCard>
  </VHover>
</template>

<script setup lang="ts">
import type { movie } from '@/types/movie';
import { VOverlay } from 'vuetify/components';

interface props {
  data?: movie
}

const { data } = defineProps<props>()
const emit = defineEmits<{ (e: 'open', id?: string): void }>()

function openDetail(): void {
  emit('open', data?.id)
}
</script>
