import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config#serverhandlers
export default defineNuxtConfig({
  serverHandlers: [{ route: "/anotherapi/**", handler: "~/express/index.js" }],
});
