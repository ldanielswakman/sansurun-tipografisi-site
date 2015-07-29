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

  // textarea auto resize & max string length
  autosize($('textarea'));
  $('textarea').attr('maxlength', settings['maxStringLength']);


  // --- listeners

  $('#string').on('input', function() {
    // show or hide actions
    if( $(this).val().length > 1) {
      $('.TypeTool .actions').addClass('active');
    } else {
      $('.TypeTool .actions').removeClass('active');
    }
  });

});