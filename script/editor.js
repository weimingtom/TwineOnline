//editor.js

var Editor = function(pid){
  var self = this;
  var oldHtml;
  $('main').append("<div id=\"edit_" + pid + "\" class=\"draggable edit popup\"><div class='titlebar'><div class='title'>Edit<input id=\"edit_" + pid + "_close\" class=\"barbutton closebutton\" type='button' value='X'/></div><div class='clear'></div></div><div class='topfields'><div class='field'><label for=\"edit_" + pid + "_title\">Title</label><input id='edit_" + pid + "_title' type='text'/></div><div class='field'><label for=\"edit_" + pid + "_tags\">Tags (separate with spaces)</label><input id='edit_" + pid + "_tags' type='text'/></div><div contentEditable='true' class='passagetext' id='edit_" + pid + "_text' ></div></div>");
  this.editor = $('#edit_'+pid);
  $('#edit_'+pid+'_title').val($('#p_'+pid+' .title').text());
  $('#edit_'+pid+'_tags').val($('#p_'+pid+' .tags').text()||'');
  $('#edit_'+pid+'_text').val($('#p_'+pid+' .text').text()||'');
  
  this.editor.draggable();
  this.editor.find('.closebutton').click(function(){
    self.editor.fadeOut();
  });
  this.editor.click(function(e){
    if(e.stopPropagation) e.stopPropagation();
    else if(e.preventPropagation) e.preventPropagation();
  });
  
  this.editor.find('#edit_'+pid+'_title').change(function(){
    $('#p_'+pid+' .title').text($('#edit_'+pid+'_title').val());
    $('#p_'+pid).attr('title', $('#p_'+pid+' .title').text());
  });
  
  this.editor.find('#edit_'+pid+'_tags').change(function(){
    $('#p_'+pid+' .tags').text($('#edit_'+pid+'_tags').val());
  });
  
  this.editor.find('#edit_'+pid+'_text').on('input',function(e){ //  keypress paste focus
    console.log('highlighting');
    var html = $(this).html();
    if(html != oldHtml){
      oldHtml = html;
      $('#p_'+pid+' .text').text($('#edit_'+pid+'_text').text());
      self.highlight($(this));
    }
  });

  this.highlight = function($textbox){
    cursorPos = $textbox.caret();
    console.log(cursorPos);
    html = $textbox.html().replace(/<span class=["']twinelink["']>(\[\[[\w\s]+\]\])<\/span>/gi, "$1")
    html = html.replace(/(\[\[[^\]]+\]\])/g,"<span class='twinelink'>$1</span>");
    $textbox.html(html);
    $textbox.caret(cursorPos);
  }
  
  this.editor.find('#edit_'+pid+'_text').focus();
  Passage.selected.passage.deselect();
  return this;
}

window.Editor = Editor;