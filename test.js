var d = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 0)
var dire = new Array([0], [2, 4], [1, 3, 5], [2, 6], [1, 5, 7], [2, 4, 6, 8], [3, 5, 9], [4, 8], [5, 7, 9], [6, 8])
var pos = new Array([0], [0, 0], [100, 0], [200, 0], [0, 100], [100, 100], [200, 100], [0, 200], [100, 200], [200, 200])
var c = 0
var v
var jud1 = true
var finish = true
var min = 0
var get1
var first_time = true
var first_move = false

function move (id) {
  if (first_move == true) {
    var i = 1
    var jud = false

    for (i = 1; i < 10; ++i) {
      if (d[i] == id) { break}
    }

    var g

    for (g = 0; g < dire[i].length; g++) {
      if (d[dire[i][g]] == 0) {
        jud = true
        break
      }
    }

    var tmp1 = dire[i][g]
    var tmp2

    finish = judging()

    if (jud == true) {
      document.getElementById('d' + id).style.left = pos[tmp1][0] + 'px'
      document.getElementById('d' + id).style.top = pos[tmp1][1] + 'px'
      tmp2 = d[i]
      d[i] = d[tmp1]
      d[tmp1] = tmp2
    }

    finish = judging()

    if (finish == true) {
      alert('congratulation!!!')
      reset1()
      finish = false
    }
  }
}

function reset1 () {
  for (var index = 1; index < 10; index++) {
    var ran = parseInt(Math.random() * 8 + 1)
    if (d[index] != 0) {
      document.getElementById('d' + d[index]).style.left = pos[ran][0] + 'px'
      document.getElementById('d' + d[index]).style.top = pos[ran][1] + 'px'
    }

    if (d[ran] != 0) {
      document.getElementById('d' + d[ran]).style.left = pos[index][0] + 'px'
      document.getElementById('d' + d[ran]).style.top = pos[index][1] + 'px'
    }

    var tem2 = d[index]
    d[index] = d[ran]
    d[ran] = tem2
  }
  c = 0
  min = 0
  first_time = true
  first_move = false
  setTimeout("document.getElementById('txt').innerHTML = min + '分' + c + '秒'", 0)
  clearTimeout(v)
  document.getElementById('start').innerHTML = '开始'
  jud1 = true
}

function start () {
  // alert(window.outerWidth + ' ' + window.outerHeight);
  if (first_time == true) {
    reset1()
    first_move = true
    first_time = false
  }

  if (jud1 == true) {
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
      if (index1 != d[index1]) { finish = false}
    }

    if (index1 == 9) {
      if (d[index1] != 0) { finish = false}
    }
  }
  return finish
}

function time_go () {
  c = c + 1
  add = c / 60
  c = c % 60
  if (add == 1) {
    min += 1
  }
  document.getElementById('txt').innerHTML = min + '分' + c + '秒'
  v = setTimeout('time_go()', 1000)
}

function time_stop () {
  // setTimeout("document.getElementById('txt').innerHTML = '1111111'", 0);

  clearTimeout(v)
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
