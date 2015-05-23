;(function() {
  var canvas = document.createElement('canvas');

  canvas.setAttribute('width', window.innerWidth);
  canvas.setAttribute('height', window.innerHeight);
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var origin = null;

  ctx.fillStyle = 'rgba(0,100,0,0.2)';

  canvas.addEventListener('click', function(e) {
    if (!origin) {
      clearRect();
      return false;
    }

    var minY = origin.currentY < origin.originY ? origin.currentY : origin.originY;
    var maxY = origin.currentY < origin.originY ? origin.originY : origin.currentY;
    var minX = origin.currentX < origin.originX ? origin.currentX : origin.originX;
    var maxX = origin.currentX < origin.originX ? origin.originX : origin.currentX;

    if (e.pageY >= minY &&
        e.pageY <= maxY &&
        e.pageX >= minX &&
        e.pageX <= maxX) {
    } else {
      clearRect();
      origin = null;
    }
  });

  canvas.addEventListener('mousedown', function(e) {
    if (origin && origin.currentX !== undefined) {
      return;
    }

    origin = {originX: e.pageX,  originY: e.pageY};
    canvas.addEventListener('mousemove', onMove);
  });

  canvas.addEventListener('mouseup', function(e) {
    canvas.removeEventListener('mousemove', onMove);
  });

  function onMove(e) {
    origin.currentX = e.pageX;
    origin.currentY = e.pageY;

    drawRect(origin);
  }

  function clearRect() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  function drawRect(bounds) {
    clearRect();
    ctx.fillRect(bounds.originX,
                 bounds.originY,
                 bounds.currentX - bounds.originX,
                 bounds.currentY - bounds.originY);
  }
})();
