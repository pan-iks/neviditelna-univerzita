<template>
  <q-page class="" :class="$q.screen.gt.lg ? 'q-px-xl q-py-lg' : 'q-px-sm q-py-sm'">
    <h1 class="text-h5 text-bold q-mt-none" data-cy="heading">neviditelna-univerzita</h1>
    <div class="q-mb-md">
      <q-toggle
        label="Verbose view"
        v-model="verboseView"
        data-cy="verboseViewButton"
      />
    </div>

    <div class="row q-col-gutter-xl">
      <div class="col-12 col-lg-8">
        <q-card class="q-mb-lg">
          <q-card-section>
            <div class="scrollTable">
              <table class="text-left table-main-info" data-cy="authinfo">
                <tr>
                  <th class="cell-width">
                    <strong>Authinfo:</strong>
                  </th>
                  <td>
                    <q-btn dense class="q-px-lg q-py-none" color="primary" label="Show" @click="authinfoDialog = !authinfoDialog" data-cy="secret" />
                  </td>
                </tr>
                <tr>
                  <th class="cell-width">
                    <strong>Expires at:</strong>
                  </th>
                  <td>
                    {{ formatTimestamp(domainData?.expires_at) }}
                  </td>
                </tr>
              </table>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="q-mb-lg">
          <q-card-section class="bg-grey-3 q-py-sm">
            <strong>Events:</strong>
          </q-card-section>
          <q-card-section class="q-py-sm">
            <div class="scrollTable">
              <table class="text-left table-v1">
                <tr data-cy="event-create">
                  <th class="cell-width">
                    <strong>Create date:</strong>
                  </th>
                  <td class="cell-width">{{ formatTimestamp(domainData?.events?.registered?.timestamp) }}</td>
                  <th class="cell-width-sm">
                    <strong>Registrar:</strong>
                  </th>
                  <td><span class="text-primary">{{ domainData?.events?.registered?.registrar_handle }}</span></td>
                </tr>
                <tr>
                  <th class="cell-width">
                    <strong>Update date: </strong>
                  </th>
                  <td class="">{{ formatTimestamp(domainData?.events?.updated?.timestamp) }}</td>
                  <th class="cell-width-sm">
                    <strong>Registrar:</strong>
                  </th>
                  <td><span class="text-primary">{{ domainData?.events?.updated?.registrar_handle }}</span></td>
                </tr>
                <tr>
                  <th class="cell-width">
                    <strong>Transfer date: </strong>
                  </th>
                  <td class="">{{ formatTimestamp(domainData?.events?.transferred?.timestamp) }}</td>
                  <th class="cell-width-sm">
                    <strong>Registrar:</strong>
                  </th>
                  <td><span class="text-primary">{{ domainData?.events?.transferred?.registrar_handle }}</span></td>
                </tr>
                <tr>
                  <th class="cell-width">
                    <strong>Delete date: </strong>
                  </th>
                  <td class="">{{ formatTimestamp(domainData?.events?.unregistered?.timestamp) }}</td>
                  <th class="cell-width-sm">
                    <strong>Registrar:</strong>
                  </th>
                  <td><span class="text-primary">{{ domainData?.events?.unregistered?.registrar_handle }}</span></td>
                </tr>
              </table>
            </div>

          </q-card-section>
        </q-card>

        <q-card>
          <q-card-section class="bg-grey-3 q-py-sm">
            <strong>State flags:</strong>
          </q-card-section>
          <q-card-section class="q-py-sm" v-if="domainData.state_flags">
            <div class="scrollTable">
              <div v-for="(flag, index) in domainData?.state_flags?.flags" :key="index">
                <template v-if="verboseView || flag.active">
                  <q-icon
                    :color="flag?.active ? 'light-green-14': 'red'"
                    :name="flag?.active ? 'check_circle': 'cancel'"
                    size="xs" />
                  <span :class="flag?.active ? 'text-light-green-14': 'text-red'">{{ flag.description }}</span>
                </template>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-lg-4">
        <q-card class="q-mb-lg">
          <q-card-section class="bg-grey-3 q-py-sm">
            <strong>Owner:</strong>
          </q-card-section>
          <q-card-section class="q-py-sm">
            <div class="row q-col-gutter-xl">
              <div class="col-12">
                <div class="scrollTable">
                  <table class="text-left table-v1">
                    <tr>
                      <td class="cell-width-ico"></td>
                      <th class="cell-width-sm">
                        <strong>Handle:</strong>
                      </th>
                      <td><span class="text-primary">{{ domainData?.owner?.handle }}</span></td>
                    </tr>
                    <tr>
                      <td class="cell-width-ico">
                        <q-icon
                          :color="domainData?.owner?.organization ? 'light-green-14': 'red'"
                          :name="domainData?.owner?.organization ? 'visibility': 'visibility_off'"
                          size="xs" />
                      </td>
                      <th class="cell-width-sm">
                        <strong>Organization:</strong>
                      </th>
                      <td>{{ domainData?.owner?.organization }}</td>
                    </tr>
                    <tr>
                      <td class="cell-width-ico">
                        <q-icon
                          :color="domainData?.owner?.name ? 'light-green-14': 'red'"
                          :name="domainData?.owner?.name ? 'visibility': 'visibility_off'"
                          size="xs" />
                      </td>
                      <th class="cell-width-sm">
                        <strong>Name:</strong>
                      </th>
                      <td>{{ domainData?.owner?.name }}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="q-mb-lg" v-if="!verboseView" data-cy="verboseViewInactive">
          <q-card-section class="bg-grey-3 q-py-sm">
            <strong>Administrative contacts:</strong>
          </q-card-section>
          <q-card-section class="q-py-sm">
            <div class="scrollTable">
              <table class="text-left table-v1">
                <tr v-for="(contact, index) in domainData?.administrative_contacts" :key="index">
                  <th class="cell-width-sm">
                    <strong>{{ contact.name }}</strong>
                  </th>
                  <td><span class="text-primary">{{ contact.handle }}</span></td>
                </tr>
              </table>
            </div>
          </q-card-section>
        </q-card>

        <div v-if="verboseView">

          <q-card class="q-mb-lg" v-for="(contact, index) in domainData?.administrative_contacts" :key="index" data-cy="verboseViewActive">
            <q-card-section class="bg-grey-3 q-py-sm">
              <strong>Administrative contact:</strong>
            </q-card-section>
            <q-card-section class="q-py-sm">
              <div class="scrollTable">
                <table class="text-left table-v1">
                  <tr>
                    <td class="cell-width-ico"></td>
                    <th class="cell-width-sm">
                      <strong>Handle:</strong>
                    </th>
                    <td><span class="text-primary">{{ contact?.handle }}</span></td>
                  </tr>
                  <tr>
                    <td class="cell-width-ico">
                      <q-icon
                        :color="contact?.publish?.organization ? 'light-green-14': 'red'"
                        :name="contact?.publish?.organization ? 'visibility': 'visibility_off'"
                        size="xs" />
                    </td>
                    <th class="cell-width-sm">
                      <strong>Organization:</strong>
                    </th>
                    <td>{{ contact?.organization }}</td>
                  </tr>
                  <tr>
                    <td class="cell-width-ico">
                      <q-icon
                        :color="contact?.publish?.name ? 'light-green-14': 'red'"
                        :name="contact?.publish?.name ? 'visibility': 'visibility_off'"
                        size="xs" />
                    </td>
                    <th class="cell-width-sm">
                      <strong>Name:</strong>
                    </th>
                    <td>{{ contact?.name }}</td>
                  </tr>
                </table>
              </div>
            </q-card-section>
          </q-card>

        </div>

        <q-card class="q-mb-lg">
          <q-card-section class="bg-grey-3 q-py-sm">
            <strong>NSSet:</strong>
          </q-card-section>
          <q-card-section class="q-py-sm">
            <div class="scrollTable">
              <table class="text-left table-v1">
                <tr>
                  <th class="cell-width-sm">
                    <strong>Handle:</strong>
                  </th>
                  <td><span class="text-primary">{{ domainData?.nsset?.handle }}</span></td>
                </tr>
                <tr>
                  <th class="cell-width-sm">
                    <strong>Registrar:</strong>
                  </th>
                  <td><span class="text-primary">{{ domainData?.nsset?.registrar }}</span></td>
                </tr>
                <tr>
                  <th class="cell-width-sm">
                    <strong>DNS:</strong>
                  </th>
                  <td>
                    <div v-for="(dns, index) in domainData?.nsset?.dns" :key="index">
                      {{ dns.name }} ({{ dns.ip_address }})
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="q-mb-lg">
          <q-card-section class="bg-grey-3 q-py-sm">
            <strong>Keyset:</strong>
          </q-card-section>
          <q-card-section class="q-py-sm">
            <div class="scrollTable">
              <table class="text-left table-v1">
                <tr>
                  <th class="cell-width-sm">
                    <strong>Handle:</strong>
                  </th>
                  <td><span class="text-primary">{{ domainData?.keyset?.handle }}</span></td>
                </tr>
                <tr>
                  <th class="cell-width-sm">
                    <strong>Registrar:</strong>
                  </th>
                  <td><span class="text-primary">{{ domainData?.keyset?.registrar }}</span></td>
                </tr>
                <tr>
                  <th class="cell-width-sm">
                    <strong>DNS:</strong>
                  </th>
                  <td>
                    <div v-for="(dnsKey, index) in domainData?.keyset?.dns_keys" :key="index">
                      {{ dnsKey }}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="authinfoDialog" data-cy="secretModal" >
      <q-card>
        <q-card-section class="row items-center bg-primary text-white q-py-sm">
          <div class="text-h6 q-mr-xl">Secrect password</div>
          <q-space />
          <q-btn icon="close" data-cy="close-modal" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          Password123
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
// import { date } from 'quasar'

const verboseView = ref(false)
const authinfoDialog = ref(false)

const domainData = ref({})
const timeZone = 'Europe/London'

const getData = async () => {
  try {
    await api.get('/data/domain-detail.json').then(response => {
      domainData.value = response.data
    })
    // console.log('ok')
  } catch (error) {
    console.log('error')
    console.log(error)
  }
}

function formatTimestamp (timestamp) {
  if (timestamp) {
    const date = new Date(timestamp)

    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone
    }

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
    // console.log(formattedDate)

    return formattedDate
  }
}

onMounted(async () => {
  await getData()
  // console.log('domainData.value')
})
</script>
