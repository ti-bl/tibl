const marked = require('marked')
const tocbot = require('tocbot')
const hljs = require('highlight.js')
const jsyaml = require("js-yaml")

function strip_yaml_test(text) {

  // Start/stop line of yaml section
  let yaml_section_start = 0;
  let yaml_section_stop;

  // yaml section itself
  let yaml_section;

  let ans_split = text.split("\n");

  // If text begins by yaml frontmatter
  if(ans_split[yaml_section_start] === "---"){

    // Find end of yaml
    for(let i=1; i < ans_split.length; i++) {
      if(ans_split[i] === "---") {

        //Separate yaml frontmatter and rest of content
        yaml_section_stop = i;
        yaml_section = ans_split.slice(yaml_section_start+1, yaml_section_stop)
                                .join("\n");
        ans = ans_split.slice(yaml_section_stop+1)
                             .join("\n");
        
        return {
          'metadata': jsyaml.load(yaml_section),
          'content': ans
        }
      }
    }
  }

  // If no yaml frontmatter was found
  // Or no ending --- tag was found, return no metadata
  return {
    'metadata': null,
    'content': text
  }
}

async function render(url, id='content', set_title=false) {
    console.log("Render called on " + url + ", id " + id + ", set_title " + set_title);
    try {
  
      // Get the page
      const ans = await fetch(url);
  
      // If github returns a 404, display it and log it into the console.
      // TODO: Redirect to a 404 page.
      if(ans.status == 404) {
        document.getElementById(id).innerHTML = marked("url " + url + " not found.");
        console.log(ans);
      
      // 200 means that everything is going well.
      // We set the document title and serve the content.
      // TODO: Redo the title setting when we'll have metadata.
      // If there's title in the yaml, use it, if not, parse this way.
      } else if (ans.status == 200) {
  
        ans_text = await ans.text()
  
        // If we want to set the title
        // Search for any yaml title field.
        // If none found, use markdown title.
        if(set_title) {
  
          try{
            var ans_obj = strip_yaml_test(ans_text);
          } catch (err) {
            console.log("Error parsing yaml :o")
            var ans_obj = {
              'metadata': null,
              'content': ans_text
            }
          }
  
          let metadata = ans_obj.metadata;
          ans_text = ans_obj.content;
  
          if(metadata != null) {
            document.title = metadata.title;
          } else {
            document.title = ans_text.split('\n')[0].replace('#', '');
          }
  
        }
        document.getElementById(id).innerHTML = marked(ans_text);
  
      // :shrug:
      } else {
  
        document.getElementById(id).innerHTML = marked("Something weird happened. See console.");
        console.log(ans)
      }
  
    // :shrug: :shrug:
    } catch (err) {
      console.log(err);
      // document.getElementById(id).innerHTML = marked("*Post not found :/\nTODO: Add nice 404 page.*");
      console.log("Error getting " + url);
  
    }
  }

function init() {
      //Initializes things like highlighting and marked      
      hljs.initHighlightingOnLoad();
      marked.setOptions({
          highlight: function(code) {
              return hljs.highlightAuto(code).value;
          }
      });
}

function resolve_path() {

  // fix things to render
  render("data/nav" + ".md", 'nav');
  render("data/foot" + ".md", 'footer');

  let url;

  //We check if we're on the index or not
  //If not, get the parameter name and value, and render the right page
  if (["", "/", "/index.html"].includes(window.location.pathname) == true) {

    url = "data/index.md";

  } else {

    let [item_type, item_name] = window.location.search.substr(1).split('=')
    if (item_type == 't') {
      url = "data/topics/" + item_name + ".md";
    } else if (item_type == 'p') {
      url = "data/topics/_" + item_name + ".md";
    } else {
      url = "data/404.md";
    }
  }
  render(url, "content", set_title="true");
}

init();
resolve_path();