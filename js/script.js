/* editor */
function editor(){
    const saveButton = document.getElementById('saveButton');
    var editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link'],
          config: {
            placeholder: 'Header'
          },
          shortcut: 'CMD+SHIFT+H'
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true,
              codepen: {
                regex: /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
                embedUrl: 'https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2',
                html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                height: 300,
                width: 600,
                id: (groups) => groups.join('/embed/')
              }
            }
          },
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+E'
        },
        image: {
          class: SimpleImage,
          inlineToolbar: ['link'],
          shortcut: 'CMD+SHIFT+I'
        },
        list: {
          class: List,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+L'
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+C'
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
          },
          shortcut: 'CMD+SHIFT+Q'
        },
        warning: Warning,
        marker: {
          class:  Marker,
          shortcut: 'CMD+SHIFT+M'
        },
        code: {
          class:  CodeTool,
          shortcut: 'CMD+SHIFT+<'
        },
        delimiter: Delimiter,
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+;'
        },
        linkTool: LinkTool,
        embed: Embed,
        table: {
          class: Table,
          inlineToolbar: true,
          shortcut: 'CMD+ALT+T'
        },
      },
      //init data
      data: {
        blocks: selectData()
      },
      onReady: function(){
        //saveButton.click();
      },
      onChange: function() {
        console.log('something changed');
      }
    });

    // saveButton.addEventListener('click', function () {
    //   editor.save().then((savedData) => {
    //     //cPreview.show(savedData, document.getElementById("output"));
    //   });
    // });
}


/* init reveal*/
function reveal(){
  console.log("reveal init");
    Reveal.initialize({
        slideNumber: true,
        center: false,
        previewLinks: true,
        dependencies: [
            { src: 'plugin/markdown/marked.js' },
            { src: 'plugin/markdown/markdown.js' },
            { src: 'plugin/notes/notes.js', async: true },
            { src: 'plugin/highlight/highlight.js', async: true },
            { src: 'http://localhost:3001/socket.io/socket.io.js', async: true },
            { src: 'plugins/remote-control/remote.js', async: true }
        ]
    });
}reveal();


//event handlers
!function(g) {

  //g("#editSlide").click(function(){
  function editSlide(){
      g(".reveal #editorjs").removeAttr("id")
      g(".reveal .present:not('.stack')").attr("id","editorjs");
      editor();
      
      g(".slides .present").addClass("layout-" + localStorage.dd);
  }
  //});	

  g("#addSlide").click(function(){
      var c = g(".reveal .present").clone().removeClass("present").html("");
      g(".present").after(c);
      g(".navigate-right").addClass("enabled highlight").removeAttr("disabled").trigger("click");
      reveal();
      editSlide();
  });

  g("#addChild").click(function(){
      var p = g(".reveal > div > .present");
      g(p).append("<section class='future'></section>");
      if(!g(p).hasClass("stack")){
          g(p).addClass("stack");
      }
      g(".navigate-down").addClass("enabled highlight").removeAttr("disabled").trigger("click");
      reveal();
      editSlide();
  });

  g("#removeSlide").click(function(){
      if(g(".reveal section.present").length == 2){
          g(".reveal .present.stack").children(".present").remove();
      }else{
          g(".reveal .present").remove();
          g(".navigate-right").removeAttr("disabled").trigger("click");
      }
      reveal();
  });		

  g("#menu").click(function(){
    g(".toolbar").toggleClass("open");
  });
  g("#menu2").click(function(){
    g(".slidenav").toggleClass("open");
  });


  /* change styling */
  g("#changeLayout").change(function(){
    var l = g(this).val();
    localStorage.setItem("dd",l);
    $(".slides .present").attr('class', function(i, c){
      return c.replace(/(^|\s)layout-\S+/g, ' layout-'+l);
    });
  }).trigger("change");

}(jQuery, window, document);