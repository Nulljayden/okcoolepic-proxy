'use strict';

// Constants
const WINDOW_WIDTH = 'windowWidth';
const WINDOW_HEIGHT = 'windowHeight';
const DETECTOR_WIDTH = 'detectorWidth';
const MIN_WIDTH_FOR_LARGE_CONTAINERS = 992;
const MIN_WIDTH_FOR_SMALL_CONTAINERS = 600;
const MIN_WIDTH_FOR_DETECTOR_500 = 1200;
const MIN_WIDTH_FOR_DETECTOR_300 = 992;
const MIN_WIDTH_FOR_DETECTOR_400 = 768;
const OFFSET = 111;
const MESSAGES_CONTAINER_ID = 'messages-container';
const COOKIE_LAW_COOKIE_NAME = 'cookielaw';
const CERN60_COOKIE_NAME = 'cern60';

// Define UI specific stuff.
function UI() {
  // Resize the scrollable containers and make sure they are resized whenever
  // the window is resized.
  // Also introduce FastClick for faster clicking on mobile.
  $(function() {
    FastClick.attach(document.body);

    function resize() {
      setWindowSize();
      setDetectorWidth();
      setContainerWidths();
      setScrollableContainersHeight();
      setDetectorSize();
    }

    $(window).resize(resize);
    resize();
  });

  // Show a bootstrap modal with dynamic content.
  function showModal(title, text, level) {
    var $modal = $('#infoBox');
    $modal.find('#infoBoxLabel').html(title);
    $modal.find('.modal-body').html(text);
    $modal.modal({show: true});
  }

  // Display only the elements with data-min-level above a certain
  // threshold.
  function showLevels(level) {
    $('#infoBox').find('[data-min-level]').filter(function() {
      return level >= $(this).data('min-level');
    }).show();

    $('#infoBox').find('[data-min-level]').filter(function() {
      return level < $(this).data('min-level');
    }).hide();
  }

  function showUpdateValue(ident, num) {
    if (num != 0) {
      var formatted = Helpers.formatNumberPostfix(num);
      var insert;
      if (num > 0) {
        insert = $("<div></div>")
                  .attr("class", "update-plus")
                  .html("+" + formatted);
      } else {
        insert = $("<div></div>")
                  .attr("class", "update-minus")
                  .html(formatted);
      }
      showUpdate(ident, insert);
    }
  }

  function showUpdate(ident, insert) {
    var elem = $(ident);
    elem.append(insert);
    insert.animate({
      "bottom":"+=30px",
      "opacity": 0
    }, { duration: 500, complete: function() {
      $(this).remove();
    }});
  }

  function showAchievement(obj) {
    var alert = '<div class="alert alert-success alert-dismissible" role="alert">';
    alert += '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
    alert += '<span class="fa ' + obj.icon + ' alert-glyph"></span> <span class="alert-text">' + obj.description + '</span>';
    alert += '</div>';

    alert = $(alert);

    $('#achievements-container').prepend(alert);
    var remove = function(a)
    {
      return function()
      {
        a.slideUp(300, function() { a.remove(); });
      };
    };

    window.setTimeout(remove(alert), 2000);
  }

  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  function setLocalStorage(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  function getLocalStorage(name) {

