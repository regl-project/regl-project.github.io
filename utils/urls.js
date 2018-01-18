/**
 * Create a .env to overwrite any of these values while locally developing. This is
 * useful to be able to upgrade to the latest examples.
 */
module.exports = {
  examplesBaseUrl: process.env.EXAMPLES_BASE_URL ||
    "https://raw.githubusercontent.com/regl-project/regl/56ed56ec597a7ee983ed645a7ce451f3858b3f90/example/",
}
