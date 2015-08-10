$(document).ready(function() {

  // --- Settings

  settings = {
    'tileSize': 80,
    'tileGutter': 20,
    'canvasPadding': 50,
    'lineLength': 10,
    'maxStringLength': 30,
    'allowedCharsRegex': 'a-zA-ZİışŞÇçĞğüÜÖö ',
    'imgurClientID': '99df06f8be87b5a',
    'imgurAlbumID': 'H3H9B',
    'twitterText': 'Typography of Censorship:',
    'facebookText': 'Typography of Censorship:',
    'facebookAppID': '1072153226143297',
    'redirectURL': 'http://www.sansuruntipografisi.org/',
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

  // download written string as image
  $('#typetool_download').click(function() {
    setStringProgress(1,3);

    compiledImage = combineImages($('#string').val());
    setStringProgress(2,3);

    $(this).attr('href', compiledImage).attr('download', $('#string').val());
    setStringProgress(3,3);

    setTimeout(function() {
      setStringProgress(0);
    }, 600);
  });

  // share written string to twitter / facebook
  $('.actions a[data-type="twitter"], .actions a[data-type="facebook"]').click(function() {
    setStringProgress(0,4);

    string = $('#string').val();
    compiledImage = combineImages( string );
    setStringProgress(1,4);

    addToImgurAlbum(compiledImage, string, $(this).attr('data-type'));
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

function setStringProgress(currentStage, totalStages) {
  if(currentStage == 0 && !totalStages) {
    $('#string_mask').css('opacity', 0);
    $('.TypeTool .button').removeClass('disabled');
    setTimeout(function() { 
      $('#string_mask .loader').removeClass('success');
      $('#string_mask .progress').css('width', 0);
    }, 500);
    return false;
  } 
  if(!totalStages && currentStage < 5) { 
    totalStages = 4;
  } else if (currentStage > totalStages) {
    totalStages = currentStage;
  }

  $('#string_mask').css('opacity', 1);
  $('.TypeTool .button').addClass('disabled');

  $('#string_mask .progress').css('width', Math.floor(currentStage/totalStages*100) + '%');
  console.log('stage ' + currentStage + '... (' + Math.floor(currentStage/totalStages*100) + ')');

  if(currentStage == totalStages) {
    $('#string_mask .loader').addClass('success');
  }
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

function addToImgurAlbum(img, string, target_network) {

  // api access
  client_id = settings['imgurClientID'];

  img = img.replace('data:image/png;base64,', '');
  $.ajax({
    url: 'https://api.imgur.com/3/image',
    type: 'post',
    headers: {
      Authorization: 'Client-ID ' + client_id
    },
    data: {
      image: img,
      type: 'base64',
      title: string
    },
    dataType: 'json',
    success: function(response) {
      setStringProgress(2,4);
      renewImgurToken(response.data.id, response.data.link, response.data.title, target_network);
    }
  });

}
function renewImgurToken(img_id, img_link, img_title, target_network) {
  client_id = settings['imgurClientID'];
  client_secret = 'c223d994be4ec34a3171834c00392c8ac6c778e2';
  refresh_token = '0ff29268cd3133e384e70a2ee30af59974ce5b81';

  // refresh token request
  $.ajax({
    url: 'https://api.imgur.com/oauth2/token',
    type: 'post',
    headers: {
    },
    data: {
      refresh_token: refresh_token,
      client_id: client_id,
      client_secret: client_secret,
      grant_type: 'refresh_token'
    },
    dataType: 'json',
    success: function(response) {
      setStringProgress(3,4);
      makeAddToAlbumRequest(img_id, img_link, img_title, target_network, response.access_token);
    }
  });
}
function makeAddToAlbumRequest(img_id, img_link, img_title, target_network, access_token) {
  img_id
  $.ajax({
    url: 'https://api.imgur.com/3/album/' + settings['imgurAlbumID'] + '/add',
    type: 'put',
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
    data: {
      ids: img_id
    },
    dataType: 'json',
    success: function(albumresponse) {

      setStringProgress(4,4);

      if(target_network == 'twitter') {
        twitter_text = settings['twitterText'] + ' \'' + img_title + '\' ' + img_link;
        url = 'https://twitter.com/intent/tweet?text=' + twitter_text;
      } else if (target_network == 'facebook') {
        facebook_text = settings['facebookText'] + ' \'' + img_title + '\' ';
        url = 'https://www.facebook.com/dialog/feed?';
        url += 'app_id=' + settings['facebookAppID'];
        url += '&display=popup&caption=' + facebook_text;
        url += '&link=' + img_link;
        url += '&redirect_uri=' + settings['redirectURL'];
      }
      if (url.length > 0) {
        if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
          var newtab = safari.application.activeBrowserWindow.openTab();
          newtab.url = url;
        } else {
          window.open(url, '_blank', 'width=600, height=300, menubar=no, top=300, left=450');
        }
      }

      setTimeout(function() {
        setStringProgress(0);
      }, 600);

    }
  });
}
