//passage.js
var Passage = function(x, y, title){ 
  this.pid = window.Passage.nextPid++;
  this.passage = $('<div>')
      .appendTo('main')
      .addClass('passage').addClass('draggable')
      .attr('id', 'p_'+ this.pid)
      .attr('pid', this.pid)
      .offset({left: x , top:y});
  
  title = title || 'Untitled';
  
  this.passage.append("<div class='title'>"+title+"</div><div class='text'></div>");

  this.passage.draggable({
    drag:function(event){
      var pid = $(event.target).attr('pid');
      redrawLines(pid);
    }
  });
  
  $(this).dblclick(function(e){
    openPassage(this);
    if(e.stopPropagation) e.stopPropagation();
    else if(e.preventPropagation) e.preventPropagation();
  });
    
  $(this).click(function(e){
    $('.selectedpassage').removeClass('selectedpassage');
    $(this).addClass('selectedpassage');
  });
  
  return this;
}

Passage.open = function (){
    var passage = null;
    var pid;
  if(typeof(p) == 'number'){
    passage = $('p_' + p);
    pid = p;
  }
  if(p instanceof(Element)){
    passage = $(p).select('.passage') || $(p).parent('.passage');
    if(passage) pid = passage.attr('pid');
  }
  
  var $editor = $($('#edit_' + pid)[0]|| createEditorWindow(pid)[0])
  $editor.css({'top':passage.position().top + passage.height()/2, 'left':passage.position().left + passage.width()/2, 'display':'none'});
  $editor.fadeIn();
  
}
window.Passage = Passage;
window.Passage.nextPid = 2;