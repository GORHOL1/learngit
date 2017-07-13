var direction = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 0)
var directionAvail = new Array([0], [2, 4], [1, 3, 5], [2, 6], [1, 5, 7], [2, 4, 6, 8], [3, 5, 9], [4, 8], [5, 7, 9], [6, 8])
var position = new Array([0], [0, 0], [100, 0], [200, 0], [0, 100], [100, 100], [200, 100], [0, 200], [100, 200], [200, 200])
var jud1 = true
var finish = true
var firstTime = true
var firstMove = false
var second = 0
var min = 0
var add
var timeOut
var txt2

function Puzzle (id) {
  this.id = id
}

Puzzle.prototype.move = function () {
  if (firstMove === true) {
    var i = 1
    var jud = false

    for (i = 1; i < 10; ++i) {
      if (direction[i] == this.id) {
        break
      }
    }

    var g

    for (g = 0; g < directionAvail[i].length; g++) {
      if (direction[directionAvail[i][g]] === 0) {
        jud = true
        break
      }
    }

    var tmp1 = directionAvail[i][g]
    var tmp2

    if (jud === true) {
      document.getElementById('d' + this.id).style.left = position[tmp1][0] + 'px'
      document.getElementById('d' + this.id).style.top = position[tmp1][1] + 'px'
      tmp2 = direction[i]
      direction[i] = direction[tmp1]
      direction[tmp1] = tmp2
    }

    finish = judging()

    if (finish === true) {
      alert('congratulation!!!')
      reset1()
      document.getElementById('record1').innerHTML = min + '分' + second + '秒' + '<br>'
      finish = false
    }
  }
}

function reset1 () {
  for (var index = 1; index < 10; index++) {
    var ran = parseInt(Math.random() * 9 + 1)
    if (direction[index] !== 0) {
      document.getElementById('d' + direction[index]).style.left = position[ran][0] + 'px'
      document.getElementById('d' + direction[index]).style.top = position[ran][1] + 'px'
    }

    if (direction[ran] !== 0) {
      document.getElementById('d' + direction[ran]).style.left = position[index][0] + 'px'
      document.getElementById('d' + direction[ran]).style.top = position[index][1] + 'px'
    }

    var tem2 = direction[index]
    direction[index] = direction[ran]
    direction[ran] = tem2
  }
  second = 0
  min = 0
  firstTime = true
  firstMove = false
  setTimeout("document.getElementById('txt').innerHTML = min + '分' + second + '秒'", 0)
  clearTimeout(timeOut)
  document.getElementById('start').innerHTML = '开始'
  jud1 = true
}

function start () {
  // alert(window.outerWidth + ' ' + window.outerHeight);
  if (firstTime === true) {
    reset1()
    firstMove = true
    firstTime = false
  }

  if (jud1 === true) {
    time_go()
    jud1 = false
    document.getElementById('start').innerHTML = '暂停'
  } else {
    time_stop()
    jud1 = true
    document.getElementById('start').innerHTML = '开始'
  }
}

function judging () {
  for (var index1 = 1; index1 < 10; index1++) {
    if (index1 <= 8) {
      if (index1 !== direction[index1]) { return false }
    }

    if (index1 === 9) {
      if (direction[index1] !== 0) { return false }
    } else {
      return true
    }
  }
  return finish
}

function time_go () {
  second = second + 1
  add = second / 60
  second = second % 60
  if (add === 1) {
    min += 1
  }
  document.getElementById('txt').innerHTML = min + '分' + second + '秒'
  timeOut = setTimeout('time_go()', 1000)
}

function time_stop () {
  // setTimeout("document.getElementById('txt').innerHTML = '1111111'", 0);

  clearTimeout(timeOut)
}

function get () {
  // var file = $("#imgDiv").find("input")[0].files[0];
  var file = $('#get2')[0].files[0]
  var reader = new FileReader()

  var imgFile

  reader.onload = function (e) {
    imgFile = e.target.result

    $('.img').attr('src', imgFile)
  }

  reader.readAsDataURL(file)
}
