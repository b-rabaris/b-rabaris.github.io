
      function rehash() {
        window.location.hash = $('#search').val();
      }

      function hashchange() {
        var hash = window.decodeURIComponent(window.location.hash).slice(1);

        if (hash != $('#search').val()) {
          $('#search').val(hash);
        }

        $('td').each(function() {
          if ($(this).text().indexOf(hash) == -1) {
            $(this).addClass('bk');
          } else {
            $(this).removeClass('bk');
          }
        });
      }

      function detip() {
        $('.tooltip').remove();
      }

      $(function() {
        var keyup = 0;

        $('th').hover(function() {
          $(this).addClass('hr');
          ($(this).index() ? $(this).parent().parent().find('td:nth-child(' + ($(this).index() + 1).toString() + ')') : $(this).siblings()).addClass('hd');
        }, function() {
          $(this).removeClass('hr');
          ($(this).index() ? $(this).parent().parent().find('td:nth-child(' + ($(this).index() + 1).toString() + ')') : $(this).siblings()).removeClass('hd');
        });

        $('#search').keyup(function(e) {
          clearTimeout(keyup);
          keyup = setTimeout(rehash, 400);
        });

        $('a').click(function() {
          $(window).scrollTop($($(this).attr('href')).position().top);
          return false;
        });

        $('td:not(:has(\'a\')):not(:first-child)').mouseover(function(e) {
          var desc = '';
          var val = $(this).attr('axis').split('|');
          var flags = ['C', 'N', 'P/V', 'H', 'Z', 'S'];

          for (i = 0; i < 6; i++) {
            desc += '<br><b>' + flags[i] + ':</b> ';

            switch (val[0].charAt(i)) {
              case '-':
                desc += 'unaffected';
                break;
              case '+':
                desc += 'affected as defined';
                break;
              case 'P':
                desc += 'detects parity';
                break;
              case 'V':
                desc += 'detects overflow';
                break;
              case '1':
                desc += 'set';
                break;
              case '0':
                desc += 'reset';
                break;
              case '*':
                desc += 'exceptional';
                break;
              default:
                desc += 'unknown';
            }
          }

          detip();
          $('<div class="tooltip"><b>Opcode:</b> ' + $(this).closest('table').attr('title') + '0123456789ABCDEF'.charAt($(this).parent().index() - 1) + '0123456789ABCDEF'.charAt($(this).index() - 1) + '<br><b>Size (bytes):</b> ' + val[1] + '<br><b>Time (clock cycles):</b> ' + val[2] + desc + '<br>' + val[3] + '</div>').css({'left': e.pageX + 10, 'top': e.pageY + 20}).appendTo('body > div');
        }).mousemove(function(e) {
          $('.tooltip').css({'left': e.pageX + 10, 'top': e.pageY + 20});
        });

        $('#banner').mouseenter(function() {
          $(this).stop().animate({top: 0});
        }).mouseleave(function() {
          $(this).stop().animate({top: -120});
        });

        $(window).keydown(function(e) {
          if (e.keyCode == 191) {
            $('#search').focus().select();
            return false;
          }
        });

        $('table').mouseout(detip);
        window.onhashchange = hashchange;
        hashchange();
      });
