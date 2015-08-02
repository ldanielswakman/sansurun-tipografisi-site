$(document).ready(function() {

  // --- Settings

  settings = {
    'tileSize': 80,
    'tileGutter': 20,
    'canvasPadding': 50,
    'lineLength': 10,
    'maxStringLength': 30,
    'allowedCharsRegex': 'a-zA-ZİışŞÇçĞğüÜÖö'
  }

  // initiate base64 alphabet
  initAlphabet();

  // textarea auto resize & max string length
  autosize($('textarea'));
  $('textarea').attr('maxlength', settings['maxStringLength']);



  // --- Listeners

  $('#string').on('input', function() {
    // show or hide action buttons
    if( $(this).val().length > 1) {
      $('.TypeTool .actions').addClass('active');
    } else {
      $('.TypeTool .actions').removeClass('active');
    }

    // format string
    string = formatString( $(this).val(), settings['maxStringLength'] );

    if(string.length > 0) {

      // if typed entry is addition to previously typed, just append latest character
      // prevString = ( $('#string_display').attr('data-string') ) ? $('#string_display').attr('data-string') : '';
      // if(string != prevString && string.substring( 0, prevString.length ) == prevString) {
      //   string = string.replace(prevString, '');
      //   console.log(string);
      // } else {
      //   $('#string_display').html('');
      // }
      $('#string_display').html('');

      // split into character array
      letters = string.split('');

      // fill string display with letters
      $.each(letters, function(i) {
        $('#string_display').append('<img src="' + base64_prefix + alphabet_base64[ letters[i] ] + '" class="letter" alt="' + letters[i] + '" />');
      });
      $('#string_display').attr('data-string', string);

    } else {
      $('#string_display').html('').attr('data-string', '');
    }

  });

  // restrict input based on allowed characters
  $('#string').on('keypress', function() {
    var regex = new RegExp('^[' + settings['allowedCharsRegex'] + ']+$');
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  });

  $('#typetool_download').click(function() {
    $('#string_mask').css('opacity', 1);
    $('#string_mask .progress').css('width', '20%');

    compiledImage = combineImages($('#string').val());

    $('#string_mask').css('opacity', 1);
    $('#string_mask .progress').css('width', '60%');

    $(this).attr('href', compiledImage).attr('download', $('#string').val());

    $('#string_mask').css('opacity', 1);
    $('#string_mask .progress').css('width', '100%');

    setTimeout(function() { $('#string_mask').css('opacity', 0); }, 400);
    setTimeout(function() { $('#string_mask .progress').css('width', '0'); }, 600);

  });

});



// --- Functions

// creates usable character string with maximum length based on given input
function formatString(formattable_string, maxLength) {
  if(!maxLength) { maxLength = settings['maxStringLength'] }

  formatted_string = formattable_string.replace('/[^' + settings['allowedCharsRegex'] + '\- ]/g', '').replace(/[İ]/g,'i').replace(/[I]/g,'ı').toLowerCase();

  // setting manual letter length cap (as a check)
  if(formatted_string.length > maxLength) {
    formatted_string = formatted_string.substring(0, maxLength);
  }
  return formatted_string;
}

function combineImages(string) {

  // getting variables from settings
  tileSize = settings['tileSize'];
  tileGutter = settings['tileGutter'];
  canvasPadding = settings['canvasPadding'];
  lineLength = settings['lineLength'];
  maxStringLength = settings['maxStringLength'];

  // formatting string
  string = formatString( string, maxStringLength );

  // split into single-character array
  letters = string.split('');

  // determining amount of lines & set canvas dimentions
  lines = 1;
  if (letters.length > lineLength) {
    lines = Math.ceil(letters.length / lineLength);
    canvasWidth = lineLength * (tileSize + tileGutter) + 2 * canvasPadding - tileGutter;
    canvasHeight = lines * (tileSize + tileGutter) + 2 * canvasPadding - tileGutter;
  } else {
    canvasWidth = letters.length * (tileSize + tileGutter) + 2 * canvasPadding - tileGutter;
    canvasHeight = tileSize + 2 * canvasPadding;
  }

  // set up canvas object
  var c = document.createElement("canvas");
  c.setAttribute("id", "canvas");
  c.setAttribute("width", canvasWidth);
  c.setAttribute("height", canvasHeight);
  var ctx = c.getContext("2d");

  // set background colour by painting rectangle
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // iterate over individual characters
  currentLine = 0;
  prevEndX = canvasPadding;
  $.each(letters, function(i, value) {
    if(i > 1 && i % lineLength === 0) {
      currentLine++;
      prevEndX = canvasPadding;
    }
    char_base64 = alphabet_base64[value];
    imageObj = new Image();
    imageObj.src = base64_prefix + char_base64;
    var offsetX = prevEndX;
    var offsetY = (tileSize + tileGutter) * currentLine + canvasPadding;
    ctx.drawImage(imageObj, offsetX, offsetY, tileSize, tileSize);
    prevEndX = offsetX + tileSize + tileGutter;
  });

  compiledImage = c.toDataURL("image/png");

  return compiledImage;
}

// base64toImgur ( compiledImage, string );
// $('#string_display').append('<div class="loader"><span style="background-image: url(\'images/ajax-loader.gif\')"></span>');
// $('#string_container textarea').attr('disabled', true);
// $('#result').append('building imgur link...<br />');
