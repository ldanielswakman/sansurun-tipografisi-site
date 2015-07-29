$(document).ready(function() {

  // settings
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

});



// --- Functions

// creates usable character string with maximum length based on given input
function formatString(formattable_string, maxLength) {
  if(!maxLength) { maxLength = settings['maxStringLength'] }

  formatted_string = formattable_string
    // process regex
    .replace('/[^' + settings['allowedCharsRegex'] + '\- ]/g', '')
    // 'manually' set turkish i characters to correct lowercase
    .replace(/[İ]/g,'i').replace(/[I]/g,'ı')
    // set other characters to lowercase
    .toLowerCase();

  // setting manual letter length cap (as a check)
  if(formatted_string.length > maxLength) {
    formatted_string = formatted_string.substring(0, maxLength);
  }
  return formatted_string;
}