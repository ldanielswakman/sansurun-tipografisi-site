<?php
// sets language variable (with fallback)
if (!isset($lang)) { $lang = 'en'; }

// language-specific strings
if($lang == 'tr') {
  $trans = array(
    'placeholder' => 'yaz...',
    'download' => 'indir',
  );
} else {
  $trans = array(
    'placeholder' => 'write...',
    'download' => 'download',
  );
}

?>

<div class="TypeTool">

  <div id="string_container">
    <textarea id="string" type="text" rows="1" placeholder="<? echo $trans['placeholder'] ?>" autocomplete="off" spellcheck="false"></textarea>
    <div class="string-cover" id="string_display"></div>
    <div class="string-cover" id="string_mask">
      <span class="progress"></span>
      <span class="loader"></span>
    </div>
  </div>

  <div class="actions">
    <a href="#" id="typetool_download" class="button">
      <?php echo $trans['download'] ?>
    </a>
    <a href="#" data-type="facebook" class="button">
      facebook
    </a>
    <a href="#" data-type="twitter" class="button">
      twitter
    </a>
  </div>

</div>
