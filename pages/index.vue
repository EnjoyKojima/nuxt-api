<script setup lang="ts">
const { $client } = useNuxtApp()
const { data: users } = await $client.user.getUsers.useQuery()
</script>

<template>
  <div class="p-10">
    <NuxtRouteAnnouncer />
    <div>
      <div v-for="user in users">
        <p> {{ user.name }} </p>
      </div>
    </div>
  </div>
</template>