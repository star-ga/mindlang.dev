module.exports = function(eleventyConfig) {
  // Explicitly copy the css and img folders
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");

  return {
    dir: { input: "src", output: "dist", includes: "_includes" },
    templateFormats: ["njk", "md", "html"]
  };
};
