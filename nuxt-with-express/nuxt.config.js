import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config#serverhandlers
export default defineNuxtConfig({
  serverHandlers: [{ route: "/api/**", handler: "~/express/index.js" }],
});
