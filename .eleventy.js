module.exports = function(eleventyConfig) {
  // Force copy these folders to the live site
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");

  return {
    dir: { input: "src", output: "dist", includes: "_includes" },
    templateFormats: ["njk", "md", "html"]
  };
};
