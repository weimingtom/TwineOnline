function drawLine(pid1, pid2){
  if(pid1 > pid2) {
    t = pid1;
    pid1 = pid2;
    pid2 = t;
  }
  if($('#'+pid1+'_'+pid2).length > 0) return;
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

function showMessage(m){
  alert(m);
}

$(function(){
    
  $('main').dblclick(function(e){
    new Passage(e.pageX, e.pageY);
  });
  
  $('main').droppable({accept: function(elem){
      var pos = elem.position();
      if(pos.left > 4 && pos.top > 4) return true;
      return false;
    }
  });
  
  $(document).bind("contextmenu", function(event) {
    event.preventDefault();
    $("menu").css({top: event.pageY + "px", left: event.pageX + "px"}).fadeIn("fast");
  });
  
  $(document).bind("click",function(event){
    $('menu').fadeOut("fast");
    Passage.deselect();
  });
  
  $(document).keydown(function(e){
    if(e.keyCode == 46){ //46 = del
      if(Passage.selected) Passage.selected.passage.remove();
    }
  });

  var start = new Passage(50, 95, 'Start', null, 'Your story will display this passage first. Edit it by double-clicking it.');
  
});
