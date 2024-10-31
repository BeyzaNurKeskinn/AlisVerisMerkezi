<template>
  <div>
    <h2>Pages</h2>

    <router-link to="/admin/pages/add" class="btn btn-primary mb-4">Add Page</router-link>

    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Slug</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, i) in pages" :key="i">
          <td class="align-middle">{{ p.name }}</td>
          <td class="align-middle">{{ p.slug }}</td>
          <td class="align-middle">
            <button class="btn btn-sm btn-secondary mx-2" @click="handleEdit(p)">Edit</button>
            <button class="btn btn-sm btn-danger mx-2" @click="deletePage(p)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router"; // Doğru içe aktarma

export default {
  setup() {
    const store = useStore();
    const router = useRouter(); // Doğru değişken adı

    const pages = computed(() => store.state.pages);

    const deletePage = (page) => {
      store.dispatch("deletePage", page);
    };

    const handleEdit = (page) => {
      router.push(`/admin/pages/edit/${page.id}`);
    };

    return {
      pages,
      deletePage,
      handleEdit,
    };
  },
};
</script>
