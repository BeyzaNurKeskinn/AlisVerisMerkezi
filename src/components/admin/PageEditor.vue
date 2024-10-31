<template>
    <div>
      <h2 class="text-center p-2">
        {{ editMode ? "Edit Page" : "Add Page" }}
      </h2>
  
      <h4 v-if="!$v.page.$invalid && $v.page.$dirty" class="bg-danger text-white text-center p-2">
        Values Required for All Fields!
      </h4>
  
      <div class="form-group">
        <label for="">Name</label>
        <input type="text" class="form-control" v-model="page.name" />
      </div>
  
      <div class="form-group">
        <label for="">Slug</label>
        <input type="text" class="form-control" v-model="page.slug" />
      </div>
  
      <div class="form-group">
        <label for="">Content</label>
        <!-- <textarea class="form-control" v-model="page.content"></textarea> -->
        <vue-editor v-model="page.content"></vue-editor>
      </div>
  
      <div class="text-center">
        <router-link to="/admin/pages" class="btn btn-secondary m-1">
          Cancel
        </router-link>
        <button class="btn btn-primary m-1" @click="handlePage">
          {{ editMode ? "Edit" : "Add" }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from "vue";
  import { useStore } from "vuex";
  import { required } from "vuelidate/lib/validators";
  
  export default {
    data() {
      return {
        page: {
          name: null,
          slug: null,
          content: null,
        },
      };
    },
    validations: {
      page: {
        name: { required },
        slug: { required },
        content: { required },
      },
    },
    setup() {
      const store = useStore();
      const editMode = computed(() => {
        return this.$route.params["op"] == "edit";
      });
  
      const addPage = async (page) => {
        await store.dispatch("addPage", page);
      };
  
      const editPage = async (page) => {
        await store.dispatch("editPage", page);
      };
  
      const handlePage = async () => {
        this.$v.$touch();
  
        if (!this.$v.page.$invalid) {
          if (editMode.value) {
            await editPage(this.page);
          } else {
            await addPage(this.page);
          }
  
          this.$router.push("/admin/pages");
        }
      };
  
      return {
        editMode,
        handlePage,
      };
    },
    created() {
      if (this.editMode) {
        Object.assign(
          this.page,
          this.$store.getters.pageById(this.$route.params["id"])
        );
      }
    },
  };
  </script>
  