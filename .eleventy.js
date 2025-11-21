module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "node_modules/sprucecss/dist/spruce.css": "css/spruce.css" });
  return {
    dir: { input: "src", output: "dist", includes: "_includes" },
    templateFormats: ["njk", "md", "html"]
  };
};
