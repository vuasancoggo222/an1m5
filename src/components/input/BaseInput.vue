<script setup lang="ts">
import { ref, watch } from 'vue';
import useDebounce from '@/uses/useDebounce';
const {debounce} = useDebounce()
const inputRef = ref()
defineProps({
    type : {
        type : String,
        default : 'text'
    },
    width : {
        type : String,
    },
    height: {
        type : Number
    },
    placeholder : {
        type : String
    },
    debounce : {
        type : Boolean,
        default : false
    }
})
const emit = defineEmits(['inputValue'])
watch(inputRef,(value) => {
    emit('inputValue',value)
})
</script>

<template>
    <div :width="width" :style="`height:${height}px`" class="base-input">
        <input :type="type" v-model="inputRef" :placeholder="placeholder">
    </div>
</template>

<style>
.base-input input {
        width: 100%;
        outline: none;
        border: 2px solid black;
        height: 100%;
        padding: 0 12px;
}

</style>