<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    optionLabel: {
      type: String,
      default: "",
      required: true
    },
    optionDescription: {
      type: String,
      default: "",
      required: false
    }
  },
  emits: ["update:modelValue"],
  inheritAttrs: false
}
</script>

<template>
  <div class="option-info">
    <label class="option-label" :for="$attrs.id">{{ optionLabel }}</label>
    <div class="option-description">{{ optionDescription }}</div>
  </div>
  <div class="option-input" v-if="$attrs.type == 'text'">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="$attrs.type"
      :id="$attrs.id"
      :placeholder="$attrs.placeholder"
    />
  </div>
  <div class="option-input" v-else-if="$attrs.type == 'select'">
    <select
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :id="$attrs.id"
    >
      <option disabled value="">{{ $attrs.placeholder }}</option>
      <option v-for="item in $attrs.options" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
    <slot name="suffix"></slot>
  </div>
  <div class="option-input" v-else-if="$attrs.type == 'month'">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="$attrs.type"
      :id="$attrs.id"
      :max="$attrs.max"
      :min="$attrs.min"
    />
  </div>
</template>
