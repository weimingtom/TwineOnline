var nextpid = 2;

function drawLine(pid1, pid2){
  var yOffset = $('main').position().top;
  var $e1 = $('#p_' + pid1);
  var $e2 = $('#p_' + pid2);
  var x1 = $e1.position().left + $e1.width()/2;
  var y1 = $e1.position().top + yOffset + $e1.height()/2;
  var x2 = $e2.position().left + $e2.width()/2;
  var y2 = $e2.position().top + yOffset + $e2.height()/2;
   

  var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
  var angle  = Math.atan2(y2 - y1, x2 - x1) ;
  var transform = 'rotate('+angle+'rad)';
   
  var pid1 = $e1.attr('pid');
  var pid2 = $e2.attr('pid')
  var lineId = (pid1 < pid2)?(pid1+'_'+pid2):(pid2+'_'+pid1);
  var line = $('<div>')
    .appendTo('main')
    .addClass('line').addClass('p_'+pid1).addClass('p_'+pid2)
    .css({
      'position': 'absolute',
      'transform': transform
    }).attr('id', lineId)
    .attr('from', pid1).attr('to', pid2)
    .width(length)
    .offset({left:  x1 - (length/2)*(1-Math.cos(angle)) , top:(y1 + y2)/2});

  return line;
}
function redrawLines(pid){
  $('.p_'+pid).each(function(){
    var from = $(this).attr('from');
    var to = $(this).attr('to');
    $(this).remove();
    drawLine(from, to);
  });
}

function createPassage(x, y){

  var passage = $('<div>')
    .appendTo('main')
    .addClass('passage').addClass('draggable')
    .attr('id', 'p_'+nextpid++)
    .offset({left: x , top:y});

  passage.draggable({
    drag:function(event){
      var pid = $(event.target).attr('pid');
      redrawLines(pid);
    }
  });
}

function openPassage(p){
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
  
  var $editor = $($('#edit_' + pid) [0]|| createEditorWindow(pid)[0])
  $editor.css({'top':passage.position().top + passage.height()/2, 'left':passage.position().left + passage.width()/2, 'display':'none'});
  $editor.fadeIn();
  
}

function createEditorWindow(pid){   
  $('main').append("<div id=\"edit_" + pid + "\" class=\"draggable edit popup\"><div class='titlebar'><div class='title'>Edit<input id=\"edit_" + pid + "_close\" class=\"barbutton closebutton\" type='button' value='X'/></div><div class='clear'></div></div><div class='topfields><div class='field'><label for=\"edit_" + pid + "_title\">Title</label><input id='edit_" + pid + "_title' type='text'/></div><div class='field'><label for=\"edit_" + pid + "_tags\">Tags (separate with spaces)</label><input id='edit_" + pid + "_tags' type='text'/></div></div><textarea id='edit_" + pid + "_text' type='textarea'></textarea></div>");
  var $e = $('#edit_'+pid);
  $e.draggable();
  $e.select('.closebutton').click(function(){
    closeEditorButton(this);
  });
  return $e;
}

function closeEditorButton(button){
  var editor = $(button).attr('id');
  editor = editor.replace('_close','');
  $('#' + editor).fadeOut();
};

$(function(){
  $('.passage').draggable({
      drag:function(event){
        var pid = $(event.target).attr('pid');
        redrawLines(pid);
      }
    }
  );
  $('.edit').draggable();
  // $('.passage').dblclick(function(e){
    // openPassage(this);
    // if(e.stopPropagation) e.stopPropagation();
    // else if(e.preventPropagation) e.preventPropagation();
  // });

  
  $('.closebutton').click(function(){
    closeEditorButton(this);
  });
  
  $('main').dblclick(function(e){
    new Passage(e.pageX, e.pageY);
  });
  
  $(document).bind("contextmenu", function(event) {
    event.preventDefault();
    $("menu").css({top: event.pageY + "px", left: event.pageX + "px"}).fadeIn("fast");
  });
  $(document).bind("click",function(event){
    $('menu').fadeOut("fast");
  });
 
  
  drawLine(0,1);
});
