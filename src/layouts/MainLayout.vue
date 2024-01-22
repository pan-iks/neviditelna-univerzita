<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white q-pa-sm">
      <q-toolbar>
        <q-btn  flat icon="menu" @click="toggleLeftDrawer" />
        <q-space />
        <q-btn flat icon="account_circle" label="Jan Musílek">
          <q-menu
            anchor="bottom end"
            self="top right"
          >
            <q-list separator style="min-width: 350px">
              <q-item clickable v-ripple class="q-pa-md">
                <q-item-section avatar>
                  <q-icon color="grey-7" name="account_circle" size="lg" />
                </q-item-section>

                <q-item-section>
                  <span class="text-subtitle1 q-mb-none">Jan Musílek</span>
                  <span class="text-grey-8">admin</span>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple class="q-pa-lg">
                <q-item-section avatar>
                  <q-icon color="grey-7" name="logout" />
                </q-item-section>

                <q-item-section><span class="text-subtitle1 q-mb-none">Logout</span></q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <div class="q-pa-md">APPLICATIONS</div>
      <q-list separator>
        <q-item class="bg-warning" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section><strong>Registry</strong></q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>
