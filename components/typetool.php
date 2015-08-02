<?php
// sets language variable (with fallback)
if (!isset($lang)) { $lang = 'en'; }

// language-specific strings
if($lang == 'tr') {
  $placeholder = 'yaz...';
  $download = 'indir';
} else {
  $placeholder = 'write...';
  $download = 'download';
}

?>

<div class="TypeTool">

  <div id="string_container">
    <textarea id="string" type="text" rows="1" placeholder="<? echo $placeholder ?>" autocomplete="off" spellcheck="false"></textarea>
    <div id="string_display"></div>
  </div>

  <div class="actions">
    <a href="#" class="button">
      <?php echo $download ?>
    </a>
    <a href="#" class="button">
      facebook
    </a>
    <a href="#" class="button">
      twitter
    </a>
  </div>

</div>
