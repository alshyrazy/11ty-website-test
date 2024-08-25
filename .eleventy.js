const { DateTime } = require("luxon");
module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');
    eleventyConfig.addPassthroughCopy('./src/Icons');
    eleventyConfig.addPassthroughCopy('./firebaseConfig.js');
    eleventyConfig.addPassthroughCopy('./src/index.js');
    eleventyConfig.addPassthroughCopy('./src/profile.js');
    
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });
    return {
        dir: {
            input: "src",
            output: "public"
        }
    };
}