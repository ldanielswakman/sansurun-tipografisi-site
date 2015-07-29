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

  <textarea id="string" type="text" rows="1" placeholder="<? echo $placeholder ?>"></textarea>

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
