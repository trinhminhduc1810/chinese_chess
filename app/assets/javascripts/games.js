var player1_position = [
  ['xe', 'a1'],
  ['xe', 'i1'],
  ['phao', 'b3'],
  ['phao', 'h3'],
  ['ma', 'b1'],
  ['ma', 'h1'],
  ['voi', 'c1'],
  ['voi', 'g1'],
  ['sy', 'd1'],
  ['sy', 'f1'],
  ['tuong', 'e1'],
  ['chot', 'a4'],
  ['chot', 'c4'],
  ['chot', 'e4'],
  ['chot', 'g4'],
  ['chot', 'i4']
];

var player2_position = [
  ['xe', 'a10'],
  ['xe', 'i10'],
  ['phao', 'b8'],
  ['phao', 'h8'],
  ['ma', 'b10'],
  ['ma', 'h10'],
  ['voi', 'c10'],
  ['voi', 'g10'],
  ['sy', 'd10'],
  ['sy', 'f10'],
  ['tuong', 'e10'],
  ['chot', 'a7'],
  ['chot', 'c7'],
  ['chot', 'e7'],
  ['chot', 'g7'],
  ['chot', 'i7']
]

$(function() {
  initPosition();
  initSelectChess();
})

function initPosition() {
  $("#chessboard table td").each(function() {
    $(this).html("");
  })
  for(i=0; i < player1_position.length; i++) {
    $("td#" + player1_position[i][1]).html("<div class='player1 " + player1_position[i][0] + "'></div>")
  }
  for(i=0; i < player2_position.length; i++) {
    $("td#" + player2_position[i][1]).html("<div class='player2 " + player2_position[i][0] + "'></div>")
  }
}

function initSelectChess() {
  $("#chessboard table td div." + current_player).live('click', function() {
    if ($(this).hasClass('selected')) {
      clearSelectedChess();
    }
    else {
      clearSelectedChess();
      $(this).addClass("selected");
      highlightPossibleMoves();
    }
  })

  $("#chessboard table td").click(function() {
    var selected_chess = $("#chessboard table td div.selected")[0];
    var current_position = $(selected_chess).parent().attr("id");
    if (selected_chess && (current_position != $(this).attr('id'))) {
      pubnub_msg = $(selected_chess).parent().attr("id") + '|' + $(this).attr('id');
      $(this).html($(selected_chess).parent().html());
      $(selected_chess).parent().html("");
      pubnub.publish({ channel : "my_chess_" + current_player, message : pubnub_msg });
      clearSelectedChess();
    }
  })
}

function clearSelectedChess() {
  $("#chessboard table td div.selected").each(function() {
    $(this).removeClass("selected");
  })
}

function highlightPossibleMoves() {
  var selected_chess = $("#chessboard table td div.selected")[0];
  if (selected_chess) {
    var current_chess = $(selected_chess).attr('class').replace('selected', '').replace(current_player, '').trim();
  }
}

function moveChess(position) {
  var old_position = position.split('|')[0];
  var new_position = position.split('|')[1];
  console.log(old_position);
  console.log($("td#" + old_position).html());
  console.log(new_position);
  $("td#" + new_position).html($("td#" + old_position).html());
  $("td#" + old_position).html("");
}