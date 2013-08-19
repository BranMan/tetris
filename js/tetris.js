jQuery(function($){

    Tetris = {
        
        v: {//Tetris variables
            td: { width: 25, height: 25},
            gameover: false,
            activePiece: false,
            speed: 600,
            gravityTimer: '',
            count: 0,
            backgroundColor: '#101010',
            activePieceColor: '',
	    aPiece: '',
	    aDirection: 2,
            collision: false,
            rows: 22,
            columns: 10,
	    cannotMoveRight: false,
	    cannotMoveLeft: false,
	    almost: 0,
	    nextPiece: ''
        },
        
        piece: { 1: { sPosition: function(){
			    var sq1 = (Math.floor((Tetris.v.columns)/2))-1+(Tetris.v.columns);
			    var sq2 = sq1 - Tetris.v.columns;
			    var sq3 = sq1 - 1;
			    var sq4 = sq1 + 1;
			    return [sq1, sq2, sq3, sq4];},
		      rotate: function(rcount){
			    if (rcount == 1){return [ 0, (Tetris.v.columns+1), 0, 0]}
			    else if (rcount == 2){return [(Tetris.v.columns-1), 0, 0, 0]}
			    else if (rcount == 3){return [0, 0, -(Tetris.v.columns)-1, 0]}
			    else{return [0, 0, 0, -(Tetris.v.columns)+1]}},
                      color: 'violet'},
                 2: { sPosition: function(){
			    var sq1 = (Math.floor(Tetris.v.columns/2))-1+Tetris.v.columns;
			    var sq2 = sq1 - Tetris.v.columns - 1;
			    var sq3 = sq1 - Tetris.v.columns;
			    var sq4 = sq1 + 1;
			    return [sq1, sq2, sq3, sq4];},
		      rotate: function(rcount){
			    if (rcount == 1){return [ 2, (Tetris.v.columns*2), 0, 0]}
			    else if (rcount == 2){return [-2, 0, 0, -Tetris.v.columns*2]}
			    else if (rcount == 3){return [Tetris.v.columns*2, 0, 0, -2]}
			    else{return [0, 2, 0, -Tetris.v.columns*2]}},
		      color: 'red'},
                 3: { sPosition: function(){
			    var sq1 = (Math.floor(Tetris.v.columns/2))-1+Tetris.v.columns;
			    var sq2 = sq1 - Tetris.v.columns;
			    var sq3 = sq1 - Tetris.v.columns + 1;
			    var sq4 = sq1 - 1;
			    return [sq1, sq2, sq3, sq4];},
		      rotate: function(rcount){
			    if (rcount == 1){return [ 0, (Tetris.v.columns*2), 2, 0]}
			    else if (rcount == 2){return [0, 0, -2, -Tetris.v.columns*2]}
			    else if (rcount == 3){return [Tetris.v.columns*2, -2, 0, 0]}
			    else{return [2, 0, 0, -Tetris.v.columns*2]}},
                      color: '#00FF00'}, //green
                 4: { sPosition: function(){
			    var sq1 = (Math.floor(Tetris.v.columns/2))-2+Tetris.v.columns;
			    var sq2 = sq1 - Tetris.v.columns;
			    var sq3 = sq1 + 1;
			    var sq4 = sq1 + 2;
			    return [sq1, sq2, sq3, sq4];},
		      rotate: function(rcount){
			    if (rcount == 1){return [ 2, -Tetris.v.columns+1, 0, Tetris.v.columns-1]}
			    else if (rcount == 2){return [Tetris.v.columns-1, Tetris.v.columns, 0, 1]}
			    else if (rcount == 3){return [-Tetris.v.columns+1, 0, Tetris.v.columns-1, -2]}
			    else{return [-1, 1, -Tetris.v.columns, -Tetris.v.columns]}},
                      color: 'blue'},
                 5: { sPosition: function(){
			    var sq1 = (Math.floor(Tetris.v.columns/2))+Tetris.v.columns;
			    var sq2 = sq1 - Tetris.v.columns;
			    var sq3 = sq1 - 1;
			    var sq4 = sq1 - 2;
			    return [sq1, sq2, sq3, sq4];},
		      rotate: function(rcount){
			    if (rcount == 1){return [ -1, 1, Tetris.v.columns, Tetris.v.columns]}
			    else if (rcount == 2){return [Tetris.v.columns, -1, -1, -Tetris.v.columns]}
			    else if (rcount == 3){return [-Tetris.v.columns, -Tetris.v.columns, -1, 1]}
			    else{return [Tetris.v.columns, 1, 1, -Tetris.v.columns]}},
                      color: 'orange'},
                 6: { sPosition: function(){
			    var sq1 = (Math.floor(Tetris.v.columns/2))+Tetris.v.columns;
			    var sq2 = sq1 - Tetris.v.columns - 1;
			    var sq3 = sq1 - Tetris.v.columns;
			    var sq4 = sq1 - 1;
			    return [sq1, sq2, sq3, sq4];},
		      rotate: function(rcount){
			    return [ 0, 0, 0, 0 ]},
                      color: 'yellow'},
                 7: { sPosition: function(){
			    var sq1 = (Math.floor(Tetris.v.columns/2))+Tetris.v.columns;
			    var sq2 = sq1 - 1;
			    var sq3 = sq1 + 1;
			    var sq4 = sq1 + 2;
			    return [sq1, sq2, sq3, sq4];},
		      rotate: function(rcount){
			    if (rcount == 1){return [ -Tetris.v.columns+2, Tetris.v.columns+1, 0, Tetris.v.columns*2-1]}
			    else if (rcount == 2){return [Tetris.v.columns*2-2, Tetris.v.columns-1, 0, -Tetris.v.columns+1]}
			    else if (rcount == 3){return [-Tetris.v.columns*2+1, 0, -Tetris.v.columns-1, Tetris.v.columns-2]}
			    else{return [Tetris.v.columns+2, 0, -Tetris.v.columns+1, -Tetris.v.columns*2-1]}},
                      color: 'cyan'}},
          
	         
        start: function(){
		$('#main').hide();
		$('<div id="tetris"></div>')
			.css({
				width: '100%',
				height: '500px',
				backgroundImage: 'url("images/tetris.png")',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat'
			}).appendTo('body').hide().fadeIn(3000);
			$('body').one('click', function(){
				$('#tetris').fadeOut(5000).delay(5000).remove();
				Tetris.init();
			});
	},
	
	
	gameover: function(){
		$('#main').hide();
		$('<div id="tetris"></div>')
			.css({
				width: '100%',
				height: '500px',
				backgroundImage: 'url("images/gameover.png")',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat'
			}).appendTo('body').hide().fadeIn(3000);
			$('body').one('click', function(){
				$('#tetris').fadeOut(5000).delay(5000).remove();
				Tetris.init();
			});
	},
	
	
	countDown: function(){
		$('<div id="countDown"></div>')
			.css({
				'z-index': 6000,
				backgroundImage: 'url("images/countdown.png")',
				position: 'absolute',
				left: 800
			})
			.appendTo('#main')
			.animate({left: '0px'},{duration: 400, easing: 'swing'})
			.delay(800)
			.animate({left: '-800px'},{duration: 400, easing: 'swing'})
			.delay(800)
			.animate({left: '-1600px'},{duration: 400, easing: 'swing'})
			.delay(800)
			.animate({left: '-2400px'},{duration: 400, easing: 'swing', complete: function(){Tetris.newPiece();}});
	},
	
	
	
	init: function(){
            $('<div id="tetrisContainer"></div>').appendTo('#main');
            $('<table id="tetrisGrid"></table>').appendTo('#tetrisContainer');
            var col = 0;
            var row = 0;
            for (var i = 0; i < Tetris.v.rows * Tetris.v.columns; i++){
                if (col == 0){
                    $('<tr></tr>').appendTo('#tetrisGrid');
                }
                $('<td col="' + col++ + '" class="empty fieldtd"><img src="images/tile.png" width"' + Tetris.v.td.width + '" height="' + Tetris.v.td.height + '"></td>').appendTo('tr:last');
                if (col == Tetris.v.columns){
                    col = 0;
                    row++;
                };
            };
	    $('tr').each(function(){$(this).children().first().addClass('leftwall').parent().children().last().addClass('rightwall');});
	    $('td').css({width: Tetris.v.td.width, height: Tetris.v.td.height, backgroundColor: Tetris.v.backgroundColor});
            $('#tetrisContainer').css({width: Tetris.v.td.width * Tetris.v.columns, height: Tetris.v.td.height * (Tetris.v.rows - 2)});
            $('#tetrisGrid').css({'margin-top': (Tetris.v.td.height * -2)});
            
            $(window).keydown(function(e) {
        	     if (e.keyCode == '39'){e.preventDefault();Tetris.checkForCollision('right' );}
                else if (e.keyCode == '32'){e.preventDefault();
		    //Tetris.checkForCollision('slam');
		    Tetris.v.speed = 0;
		    }
                else if (e.keyCode == '37'){e.preventDefault();Tetris.checkForCollision('left'  );}
		else if (e.keyCode == '40'){e.preventDefault();Tetris.checkForCollision('down'  );}
		else if (e.keyCode == '38'){e.preventDefault();Tetris.checkForCollision('rotate');}
            });
	    $('#main').fadeIn(2000);
	    
	    //Tetris.nextPiece = Tetris.newPiece();
	    //Tetris.countDown();
	    Tetris.newPiece();
            
        },
        
	
        newPiece: function(){
	    Tetris.v.aDirection = 1;
            var num = Math.floor(Math.random()*7 + 1);
	    //num = 7;
            Tetris.v.aPiece = Tetris.piece[num];
            Tetris.v.activePieceColor = Tetris.v.aPiece.color;
	    var square = Tetris.v.aPiece.sPosition();
	    $('.fieldtd').eq(square[0]).removeClass('empty').addClass('active').addClass('center');
	    $('.fieldtd').eq(square[1]).removeClass('empty').addClass('active');
	    $('.fieldtd').eq(square[2]).removeClass('empty').addClass('active');
	    $('.fieldtd').eq(square[3]).removeClass('empty').addClass('active');
            Tetris.v.activePiece = true;
            Tetris.v.collision = false;
            Tetris.v.gravityTimer = setTimeout(Tetris.gravity, Tetris.v.speed);
        },
	
        
        gravity: function(){
                Tetris.checkForCollision('down');
                if (!Tetris.v.collision){
                    Tetris.v.gravityTimer = setTimeout(Tetris.gravity, Tetris.v.speed);
                }else{
		    if (Tetris.v.almost++ < 2){
			Tetris.v.gravityTimer = setTimeout(Tetris.gravity, Tetris.v.speed);
			Tetris.v.collision = false;
		    }else{
			Tetris.v.almost = 0;
			$('.active')
			    .removeClass('active')
			    .addClass('filled')
			    .css({'border-color': '#000'});
			$('tr').each(function(){
			    var filledCount = 0;
			    $(this).children().each(function(){
				if ($(this).hasClass('filled')){
				    filledCount++;
				};
			    });
			    if (filledCount === Tetris.v.columns){
				$(this).prependTo('#tetrisGrid').children().each(function(){
				    $(this).removeClass('filled').addClass('empty').css('background-color', Tetris.v.backgroundColor).appendTo('tr:first');
				});
			    };
			});
			Tetris.v.activePiece = false;
			Tetris.v.speed = 600;
			Tetris.newPiece();
		    };
                };
        },
	
        
        movePiece: function(direction){
	    var squareCount = 0;
            $('.active')
                .removeClass('active')
                .addClass('empty')
                .css({backgroundColor: Tetris.v.backgroundColor})
                .each(function(){
                    $('td')
                        .eq($('td').index($(this)) + direction[squareCount++])
                        .removeClass('empty')
                        .addClass('active')
                        .css({backgroundColor: Tetris.v.activePieceColor});
                });
	    $('.active').children().show();
        },
	
        
        checkForCollision: function(direction){
            var dir = direction;
	    if (dir === 'left' ){
		var wc = 0;
		$('.active').each(function(){
			var ind = $('td').index($(this));
			if ($(this).hasClass('leftwall') || $('td').eq(ind - 1).hasClass('filled')){
			Tetris.v.cannotMoveLeft = true;
			Tetris.v.cannotMoveRight = false;
			wc++;
			}
		    });
		    if (wc === 0){Tetris.v.cannotMoveLeft = false};
		    if (Tetris.v.cannotMoveLeft === false)Tetris.movePiece([-1, -1, -1, -1]);
		};
	    if (dir === 'right' ){
		var wc = 0;
		$('.active').each(function(){
			var ind = $('td').index($(this));
			if ($(this).hasClass('rightwall') || $('td').eq(ind + 1).hasClass('filled')){
			Tetris.v.cannotMoveRight = true;
			Tetris.v.cannotMoveLeft = false;
			wc++;
			}
		    });
		    if (wc === 0){Tetris.v.cannotMoveRight = false};
		    if (Tetris.v.cannotMoveRight === false)Tetris.movePiece([1, 1, 1, 1]);
		};
	    if (dir === 'down') {
		dir = Tetris.v.columns;
		$('.active').each(function(){
			var ind = $('td').index($(this));
			if ($('td').eq(ind + Tetris.v.columns).hasClass('filled')){
			Tetris.v.collision = true;
			return;
			}else if (ind > Tetris.v.rows * Tetris.v.columns - Tetris.v.columns - 1){
			Tetris.v.collision = true;
			return;
			};
		});
		if (Tetris.v.collision === false){Tetris.movePiece([dir, dir, dir, dir]); };
		return;
	    };
	    if (dir === 'rotate'){
		dir = Tetris.v.aPiece.rotate(Tetris.v.aDirection++);
		var dircount = 0;
		wo = 0;
		$('.active').each(function(){
			var ind = $('td').index($(this));
			if ($('td').eq(ind + dir[dircount++]).hasClass('filled')){
			wo++;
			}
		});
		if (wo > 0){
		    for (var i = 0; i < 4; i++){
			dir[i] -= Tetris.v.columns;
		    }
		}
		if (wo > 1){
		    for (var i = 0; i < 4; i++){
			dir[i] -= Tetris.v.columns;
		    }
		}
		var rw1 = false;
		var lw1 = false;
		var rw2 = false;
		var lw2 = false;
		$('.active').each(function(){
		    if ($(this).hasClass('rightwall')){rw1 = true};
		    if ($(this).hasClass('leftwall')){lw1 = true};
		})
		if (Tetris.v.aDirection === 5){Tetris.v.aDirection = 1};
		Tetris.movePiece([dir[0], dir[1], dir[2], dir[3]]);
		//Tetris.movePiece(Tetris.v.aPiece.rotate(Tetris.v.aDirection++));
		$('.active').each(function(){
		    if ($(this).hasClass('rightwall')){rw2 = true};
		    if ($(this).hasClass('leftwall')){lw2 = true};
		})
		if (rw1 === true && lw2 === true){Tetris.movePiece([ 1, 1, 1, 1])};
		if (lw1 === true && rw2 === true){Tetris.movePiece([-1, -1, -1, -1])};
		var leftside = 0;
		var rightside = 0;
		if (rw2 === true && lw2 === true){
		    $('.active').each(function(){
			if ($(this).attr('col') < 5){
			    leftside++;
			}else{
			    rightside++;
			};
		    });
		    if (leftside > 0 && rightside > 0){
			if (rightside > leftside){
			    Tetris.movePiece([-1, -1, -1, -1]);
			}else{
			    Tetris.movePiece([1, 1, 1, 1]);
			}
		    }
		}
	    }
			
        }
        
    }
    
    Tetris.start();

});