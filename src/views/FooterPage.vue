<template>
  <v-footer
    light
    padless
  >
    <v-row no-gutters w-100>
			<v-col cols="12">
        <v-row no-gutters class="px-md px-lg-16 py-3 white">
          <v-col cols="6" class="d-flex justify-start">
            <div class="d-flex flex-column align-center justify-center flex-md-row">
              <div class="mr-3">Hotline</div>
              <h1 class="font-weight-black">1800 6242</h1>
            </div>
          </v-col>
          <v-col cols="6" class="d-flex justify-end">
            <div class="d-flex flex-column align-center justify-center flex-md-row">
              <div class="mr-3">Kết nối với chúng tôi</div>
              <div>
                <v-btn
                  v-for="icon in icons"
                  :key="icon"
                  class="mx-4 gray--text gray"
                  icon
                >
                  <v-icon size="35px">
                    {{ icon }}
                  </v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
			<v-col cols="12" class="primary">
        asdasd
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-youtube',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>
<style scoped>

</style>
