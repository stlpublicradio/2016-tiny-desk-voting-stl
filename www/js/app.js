// Global jQuery references
var $commentCount = null;
var config = {
    "options": {
        "dataSource": {
            "url": "1n14ZaURHoFteL7CqtKbz_FlfeGa_XFftwpz0PTscIQ0",
            "type": "google"
        }
    },
    "dataDestination": "https://docs.google.com/forms/d/1jPGH-2dhcOzXLbiEpdAuNkz13SM4RWtxkbxkw5_gpJE/formResponse",
    "fields": [
        {
	"name": "Bands",
	"required": false,
	"type": "checkbox",
	"field": "entry.1602302057",
	"choices": [
        "fourth-city-rag",
        "adult-fur-vi",
        "al-holiday",
        "alexander-ruwe",
        "beth-bombara",
        "brian-clarke",
        "blank-generation",
        "blastar",
        "bobby-stevens",
        "brother-lee",
        "bud-summers",
        "cara-louise-band",
        "catching-the-westbound",
        "caveofswords",
        "cracked-ceilings",
        "doctor-delia",
        "dubb-nubb",
        "erick-rudiak",
        "falling-fences",
        "fitz",
        "flatwoods",
        "flying-house",
        "hazard-to-ya-booty",
        "josh-brophy",
        "leponds",
        "lola-toben",
        "mark-brainard",
        "miss-molly-simms",
        "mitchell-ferguson",
        "mt-thelonious",
        "nicole-grace",
        "old-souls-revival",
        "pamela-devine",
        "raye-cole",
        "smokstik",
        "sport",
        "subtle-aggression-monopoly",
        "summer-osborne",
        "the-best-cat-memes",
        "the-brainstems",
        "the-driftaways",
        "the-fog-lights",
        "the-incorporated",
        "the-vanilla-beans",
        "timothy-bradley",
        "tommy-halloran-guerilla-strings",
        "trigger-five",
        "whiskey-raccoons",
        "whsky-gngr",
        "will-gant"
	]
           }
    ]
};
var faves = STORAGE.get("faves");

/*
 * Run on page load.
 */
 var onDocumentLoad = function(e) {

     pageInit();

 }


 function pageInit(){

     //Don't populate the form or set listeners if they already submitted
     if (faves !== undefined && faves !== null) {
         restoreFaves();
      }
      else {
          setUpPage();
      }

 };

 function restoreFaves() {
     $('#submit').remove();
     $('.fave-button').attr("disabled", "disabled");
     $('.fave').each(function(){
         var faveId = $(this).attr("id");
         if ($.inArray(faveId, faves) > -1) {
             $(this).toggleClass("fa-meh-o fa-smile-o");
             $(this).parent().addClass("active");
         }
        //  var $form_item = $(this);
        //  var form_attr = $form_item.attr("value")
         //
        //  if ($.inArray(form_attr, faves) > -1) {
        //      $form_item.attr("checked", true);
        //  }
     });
 }

function setUpPage() {
    initFromConfig(config);
    $(".fave-button").click(function() {
        $(this).toggleClass("active");
        $(this).children().toggleClass("faved fa-meh-o fa-smile-o");
    });
    $('#submit').append('<input class="btn btn-default" name="submitButton" value="Done" type="button" onclick="submitForm();" />');

}

function initFromConfig(config) {

  var $form = $('#form form');

   //Set the form action
   $form.attr('action',config.dataDestination)
         .attr('method',config.dataMethod || "post")
         .attr('target', 'hidden_iframe')
         .attr('onsubmit', 'submitted=true');

   //Create the form fields
   $.each(config.fields || [],function(i,f){
     $form.append(getFormElement(f));
   });

}

function getFormElement(item) {
    var $el,
        $outer = $('<div></div>')
                  .addClass('fs-form-item')
                  .toggleClass('required',item.required);

    $outer.append('<label>' + item.name + (item.required ? ' *' : '') + '</label>');

    if (item.name.toLowerCase() == 'x' || item.name.toLowerCase() == 'y') {

      return $('<input/>')
              .attr({
                type: 'hidden',
                name: item.field
              })
              .addClass(item.name.toLowerCase());

    } else if (item.type == 'textarea') {

      $el = $('<textarea></textarea>')
              .attr('name',item.field);

    } else if (item.type == 'select') {
      $el = $('<select></select>')
              .attr('name',item.field);

      $.each(item.choices,function(i,c){

        $el.append(

          $('<option></option>').text(c)

        );

      });

    } else if (item.type == 'radio' || item.type == 'checkbox') {

      $el = $('<div></div>');

      $.each(item.choices,function(i,c){

        var $i = $('<input/>').attr({
              name: item.field,
              type: item.type,
              value: c
            }),
            $s = $('<span/>').text(c);

        $el.append($i);
        $el.append($s);

      });
    } else {

      $el = $('<input/>').attr({
        name: item.field,
        type: item.type,
        value: ''
      });

    }

    $outer.append($el);

    return $outer;

  }

function submitForm() {
    // fill out form
    var elements = [];

    faves = $('.faved').map(function() {
        var $item = $(this);
        return $item.attr('id');
    }).get()
    $inputs = $('form *');
    $form = $('form');

    $inputs.filter('input').each(function(i, input){
        var $form_item = $(this);
        var form_attr = $form_item.attr("value")

        if ($.inArray(form_attr, faves) > -1) {
            $form_item.attr("checked", true);
        }
    });

    $form.submit();

    try {
   //put priorities into localStorage to mark that they submitted it
   STORAGE.set("faves",faves);
   // STORAGE.setTTL("faves", 2592000000)
     } catch(e) {}

    $('#submit').attr('style', 'display:none')

}


$(onDocumentLoad);
