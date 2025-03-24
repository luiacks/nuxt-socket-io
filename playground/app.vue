<template>
  <div>
    <button @click="ping()">ping</button>
  </div>
</template>

<script setup lang="ts">
const socket = useSocket();

function ping() {
  socket.value.emit("ping", (serverTime: number) => console.log(serverTime));
}
</script>
