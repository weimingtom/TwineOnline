//passage.js
var Passage = function(x, y, title, tags, text){ 
  var self = this;
  this.pid = window.Passage.nextPid++;
  this.passage = $('<div>')
      .appendTo('main')
      .addClass('passage').addClass('draggable')
      .attr('id', 'p_'+ this.pid)
      .attr('pid', this.pid)
      .attr('title', (title || '').trim())
      .offset({left: x , top:y});
  
  title = title || 'Untitled';
  
  this.passage.append("<div class='title'>"+title+"</div><div class='tags'>"+(tags||'')+"</div><div class='text'>"+(text||'')+"</div>");

  this.passage.draggable({
    revert:'invalid',
    drag:function(event){
      var pid = $(event.target).attr('pid');
      redrawLines(pid);
    }
  });
  
  this.passage.dblclick(function(e){
    Passage.open(self.pid);
    Passage.deselect();
    if(e.stopPropagation) e.stopPropagation();
    else if(e.preventPropagation) e.preventPropagation();
    window.Passage.selected = null;
  });
    
  this.passage.click(function(e){
    $('.selectedpassage').removeClass('selectedpassage');
    $(this).addClass('selectedpassage');
    Passage.selected = self;
  });
    
  this.passage.remove = function(){
    if(self.pid == 0){
      showMessage("You cannot delete the Start passage.");
      return;
    }
    if(self.passage) $(self.passage).remove();
    $('.p_'+self.pid).remove();
    delete(self.passage);
  }
  
  return this;
}

Passage.open = function (p){
    var passage = null;
    var pid;
  if(typeof(p) == 'number'){
    passage = $('#p_' + p);
    pid = p;
  }
  if(p instanceof(Element)){
    passage = $(p).select('.passage') || $(p).parent('.passage');
    if(passage) pid = passage.attr('pid');
  }
  
  var $editor = $($('#edit_' + pid)[0]|| new Editor(pid));
  $editor.css({'top':passage.position().top + passage.height()/2, 'left':passage.position().left + passage.width()/2, 'display':'none'});
  $editor.fadeIn();
  
}

Passage.deselect = function(){
  Passage.selected = null;
  $('.selectedpassage').removeClass('selectedpassage');
}


window.Passage = Passage;
window.Passage.selected = null;
window.Passage.nextPid = 0;