<template>
  <div class="pa-4 text-center">
    <VDialog
      v-model="model"
      max-width="800"
      scrollable
    >
      <template #default>
        <VCard>
          <div
            style="height: 850px;"
          >
            <VHover v-slot="{ isHovering, props: hoverProps }">
              <VCard v-bind="hoverProps">
                <VImg :src="data?.image" />
                <VOverlay
                  :model-value="!!isHovering"
                  class="align-center justify-center"
                  scrim="#036358"
                  contained
                >
                  <VHover v-slot="{ isHovering: isHovering2, props: props2 }">
                    <VBtn
                      :href="data?.url"
                      target="_blank"
                      variant="flat"
                      icon="mdi-play"
                      size="100"
                      :color="isHovering2 ? 'red' : ''"
                      v-bind="props2"
                    />
                  </VHover>
                </VOverlay>
              </VCard>
            </VHover>
            <div
              class="px-10 py-5"
            >
              <div class="d-flex justify-space-between">
                <div>
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
                <div>
                  <VChip variant="text">
                    <VIcon
                      icon="mdi-eye-circle-outline"
                      class="mr-1"
                    />{{ data?.view_count }}
                  </VChip>
                  <VChip variant="text">
                    <VIcon
                      icon="mdi-clock-outline"
                      class="mr-1"
                    />{{ duration }}
                  </VChip>
                </div>
              </div>
              <div class="d-flex justify-space-between">
                <p class="text-h5 mt-3 w-66">
                  {{ data?.title }}
                </p>
                <VRating
                  v-if="data?.rating && data.rating > 0"
                  hover
                  :length="5"
                  :size="32"
                  :model-value="data?.rating"
                  active-color="warning"
                />
              </div>
              <VDivider class="my-5" />
              <p class="font-weight-thin">
                {{ movieDesc }}
              </p>
              <div
                v-if="data?.description && data.description.length > 500"
                class="d-flex justify-center"
              >
                <VBtn
                  variant="text"
                  class="text-center"
                  @click="toggleReadMore"
                >
                  {{ openReadMore? 'Read Less' : 'Read More' }}
                </VBtn>
              </div>
              <p class="text-h6 mb-2">
                Artists
              </p>
              <VRow>
                <VCol
                  v-for="artist in data?.artists.split(',')"
                  :key="artist"
                  cols="3"
                  class="d-flex align-center"
                >
                  <VIcon
                    icon="mdi-account-circle"
                    class="mr-1"
                    size="30"
                  />
                  {{ artist }}
                </VCol>
              </VRow>
            </div>
          </div>
        </VCard>
      </template>
    </VDialog>
  </div>
</template>

<script lang="ts" setup>
import type { movie } from '@/types/movie';
import { VChip, VDivider, VIcon } from 'vuetify/components';

const model = defineModel<boolean>();

interface props {
  data?: movie;
}

const openReadMore = ref<boolean>(false)

const { data } = defineProps<props>()

const movieDesc = computed(() => {
  if(data?.description && data.description.length > 500 && !openReadMore.value){
    return data?.description.substring(0, 500) + '...'
  }

  return data?.description
})


const duration = computed(() => {
  let hours = 0;
  let minutes = 0;
  let seconds = data?.duration ?? 0;
  hours = Math.floor(seconds / (60 * 60))
  seconds = seconds % (60 * 60);
  minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  const hoursStr = (hours >= 10 ? '' : '0') + hours;
  const minutesStr = (minutes >= 10 ? '' : '0') + minutes;
  const secondsStr = (seconds >= 10 ? '' : '0') + seconds;

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
})


function toggleReadMore(): void {
  openReadMore.value = !openReadMore.value
}


</script>
