
function Puzzle (id) {
  this.numIndiv = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0]
  this.this.direcctionValidate = [[0], [2, 4], [1, 3, 5], [2, 6], [1, 5, 7], [2, 4, 6, 8], [3, 5, 9], [4, 8], [5, 7, 9], [6, 8]]
  this.position = [[0], [0, 0], [100, 0], [200, 0], [0, 100], [100, 100], [200, 100], [0, 200], [100, 200], [200, 200]]
  this.second = 0
  this.min = 0
  this.timeOut = 0
  this.judge = true
  this.finish = true
  this.add = 0
  this.firstTime = true
  this.firstMove = false
  this.id = id
}


Puzzle.prototype.move = function (id) {
  if (this.firstMove === true) {
    var i, g

    var jud = false

    for (i = 1; i < 10; ++i) {
      if ([i] === id) {
        break
      }
    }

    for (g = 0; g < this.this.direcctionValidate[i].length; g++) {
      if (this.numIndiv[this.this.direcctionValidate[i][g]] === 0) {
        jud = true
        break
      }
    }

    var tmp1 = this.direcctionValidate[i][g]
    var tmp2

    this.finish = function () {
      judging(this)
    }

    if (jud === true) {
      document.getElementById('d' + id).style.left = this.position[tmp1][0] + 'px'
      document.getElementById('d' + id).style.top = this.position[tmp1][1] + 'px'
      tmp2 = this.numIndiv[i]
      this.numIndiv[i] = this.numIndiv[tmp1]
      this.numIndiv[tmp1] = tmp2
    }

    this.finish = judging()

    if (this.finish === true) {
      alert('congratulation!!!')
      reset1()
      this.finish = false
    }
  }
}

Puzzle.prototype.reset1 = function () {
  for (var index = 1; index < 10; index++) {
    var ran = parseInt(Math.random() * 8 + 1)
    if (this.numIndiv[index] !== 0) {
      document.getElementById('d' + this.numIndiv[index]).style.left = this.position[ran][0] + 'px'
      document.getElementById('d' + this.numIndiv[index]).style.top = this.position[ran][1] + 'px'
    }

    if (this.numIndiv[ran] !== 0) {
      document.getElementById('d' + this.numIndiv[ran]).style.left = this.position[index][0] + 'px'
      document.getElementById('d' + this.numIndiv[ran]).style.top = this.position[index][1] + 'px'
    }

    var tem2 = this.numIndiv[index]
    this.numIndiv[index] = this.numIndiv[ran]
    this.numIndiv[ran] = tem2
  }
  this.second = 0
  this.min = 0
  this.firstTime = true
  this.firstMove = false
  setTimeout("document.getElementById('txt').innerHTML = min + '分' + c + '秒'", 0)
  clearTimeout(this.timeOut)
  document.getElementById('start').innerHTML = '开始'
  this.judge = true
}

Puzzle.prototype.start = function () {
  // alert(window.outerWidth + ' ' + window.outerHeight);
  if (this.firstTime === true) {
    reset1()
    this.firstMove = true
    this.firstTime = false
  }

  if (this.judge === true) {
    timeGo()
    this.judge = false
    document.getElementById('start').innerHTML = '暂停'
  } else {
    timeStop()
    this.judge = true
    document.getElementById('start').innerHTML = '开始'
  }
}

Puzzle.prototype.judging = function () {
  for (var index1 = 1; index1 < 10; index1++) {
    if (index1 <= 8) {
      if (index1 !== this.numIndiv[index1]) {
        this.finish = false
      }
    }

    if (index1 === 9) {
      if (this.numIndiv[index1] !== 0) {
        this.finish = false
      }
    }
  }
  return this.finish
}

Puzzle.prototype.timeGo = function () {
  this.second = this.second + 1
  this.add = this.second / 60
  this.second = this.second % 60
  if (this.add === 1) {
    this.min += 1
  }
  document.getElementById('txt').innerHTML = this.min + '分' + this.second + '秒'
  this.timeOut = setTimeout('timeGo()', 1000)
}

Puzzle.prototype.timeStop = function () {
  // setTimeout("document.getElementById('txt').innerHTML = '1111111'", 0);

  clearTimeout(this.timeOut)
}

function get () {
  var file = $('#imgDiv').find('input')[0].files[0]
  // var file = $('#get2')[0].files[0]
  var reader = new FileReader()

  var imgFile

  reader.onload = function (e) {
    imgFile = e.target.result

    $('.img').attr('src', imgFile)
  }

  reader.readAsDataURL(file)
}
