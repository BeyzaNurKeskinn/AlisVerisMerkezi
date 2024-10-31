<template>
  <div v-if="show" class="text-danger">
    <div v-for="(message, index) in messages" :key="index">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: ["validation"],
  setup(props) {
    const show = computed(() => {
      return props.validation.$dirty && props.validation.$invalid;
    });

    const messages = computed(() => {
      let validationMessages = [];

      if (props.validation.$dirty) {
        if (hasValidationError(props.validation, "required")) {
          validationMessages.push("Please enter a value.");
        }
        if (hasValidationError(props.validation, "email")) {
          validationMessages.push("Please enter a valid email.");
        }
      }

      return validationMessages;
    });

    const hasValidationError = (validation, type) => {
      return (
        Object.prototype.hasOwnProperty.call(validation, type) &&
        !validation[type]
      );
    };

    return {
      show,
      messages,
    };
  },
};
</script>
