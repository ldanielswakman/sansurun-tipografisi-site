<?php
// sets language variable (with fallback)
if (!isset($lang)) { $lang = 'en'; }

// language-specific strings
if($lang == 'tr') {
  $trans = array(
    'placeholder' => 'yaz...',
  );
} else {
  $trans = array(
    'placeholder' => 'write...',
  );
}

?>

<div class="TypeTool Tabcontent">

  <div id="string_container">
    <textarea id="string" type="text" rows="1" placeholder="<? echo $trans['placeholder'] ?>" autocomplete="off" spellcheck="false"></textarea>
    <div class="string-cover" id="string_display"></div>
    <div class="string-cover" id="string_mask">
      <span class="progress"></span>
      <span class="loader"></span>
    </div>
  </div>

  <div class="actions">
    <a href="javascript:void(0)" id="typetool_download" class="button"><span></span></a>
    <a href="javascript:void(0)" data-type="facebook" class="button"><span></span></a>
    <a href="javascript:void(0)" data-type="twitter" class="button"><span></span></a>
  </div>

</div>
