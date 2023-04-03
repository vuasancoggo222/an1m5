<script setup lang="ts">



defineProps({
  title: {
    type: String,
  },
  icon: {
    type: String,
  },
  modelValue : {},
  option : {
    type : Array
  },
  height : {
    type : Number
  },
  titleColor : {
    default : 'red'
  }
});
const emit = defineEmits(['selectValue'])
const selectValue = (event : any ) => emit('selectValue',event.target.value)


</script>

<template>
  <v-sheet :height="height" class="mx-auto custom-card" elevation="8" max-width="100%">
    <div  style="min-height: 223px">
      <div class="card-header">
        <v-chip color="red" label text-color="white">
          <v-icon start :icon="icon"></v-icon>
          {{ title }}
        </v-chip>
        <div class="select-dropdown" v-if="modelValue">
    <select  :value="modelValue" @change="selectValue($event)">
    <option  v-for="item in option as any" :value="item.value">{{ item.title }}</option>
    </select>
        </div>
    </div>
      <div>
      <slot></slot>
      </div>
    </div>
  </v-sheet>
</template>

<style >
.custom-card {
  padding: 16px;
  border-radius: 12px;
}
.custom-card .card-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
   
}
.select-dropdown,
.select-dropdown * {
  margin: 0;
  padding: 0;
  position: relative;
  box-sizing: border-box;
}
.select-dropdown {
  position: relative;
  background-color: #E6E6E6;
  border-radius: 4px;
}
.select-dropdown select {
  font-size: 1rem;
  font-weight: normal;
  max-width: 100%;
  padding: 8px 24px 8px 10px;
  border: none;
  background-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
  appearance: none;
}
.select-dropdown select:active, .select-dropdown select:focus {
  outline: none;
  box-shadow: none;
}
.select-dropdown:after {
  content: "";
  position: absolute;
  top: 50%;
  right: 8px;
  width: 0;
  height: 0;
  margin-top: -2px;
  border-top: 5px solid #aaa;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
}
</style>
