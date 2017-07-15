var direction = new Array()
// var directionAvail = new Array([0], [2, 4], [1, 3, 5], [2, 6], [1, 5, 7], [2, 4, 6, 8], [3, 5, 9], [4, 8], [5, 7, 9], [6, 8])
// var position = new Array([0], [0, 0], [100, 0], [200, 0], [0, 100], [100, 100], [200, 100], [0, 200], [100, 200], [200, 200])
var jud1 = true
var finish = true
var firstTime = true
var firstMove = false
var second = 0
var min = 0
var add
var timeOut
var txt2
var directionAvail = new Array()
var array = new Array()
var rowSquare
var difficult = false
var transfer

function difficulty () {
  difficult = true
  var contain = document.getElementById('in').value
  transfer = contain
 
}

function sure () {
  window.onload()
  reset1()
}

function removeF(childLength) {
  var divOldfather = document.getElementById('d')
  for (var removeI = 0; removeI < childLength; removeI++) {
    divOldfather.removeChild(divOldfather.childNodes[0])
  }
}

function divProduce (rowSquare1) { // 生成div块
  var divBigfather = document.getElementById('d')

  for (var BigI = 0; BigI < rowSquare1 - 1; BigI++) {
    var divSon = document.createElement('div')
    var template = BigI + 1
    divSon.setAttribute('id', 'd' + template)

    divBigfather.appendChild(divSon)
  }
}

window.onload = function () {

  var divFather = document.getElementById('d')
  

  var row = 3

  if (difficult === true) {
    row = transfer
  }

var childLength = divFather.childNodes.length


  removeF(childLength)
  rowSquare = row * row
  divProduce(rowSquare)



  childLength = divFather.childNodes.length

  var template2 = rowSquare - 1
  // if (childLength != template2) {


  //   divProduce(rowSquare)
  // }

  var Width = document.getElementById('d').clientWidth

  var divChild = divFather.getElementsByTagName('div')
  var rowsWidth = Width / row

  //   alert(divChild[1].id + "@@" +divChild.length)
  // alert("@@@@@@@@@@@@@@")
  //  alert(row)
  var wwidth = rowsWidth - 1

  // if (row === 3) { // 建立数组，屏蔽高难度方块div　　　　　　　　　　　　　　//////////////////////////////////////////////////暂时如此，记得修改
  //   for (var index3 = rowSquare - 1; index3 < 15; index3++) {
  //     divChild[index3].style.display = 'none'
  //   }
  // } else {
  //   for (var index4 = 8; index4 < 15; index4++) {
  //     divChild[index4].style.display = 'inline-block'
  //   }
  // }
  // alert("６６６６６６６６６６６６６６６６６")
  for (var index2 = 0; index2 < rowSquare - 1; index2++) { // 设置width和height
    divChild[index2].style.width = wwidth + 'px'
    divChild[index2].style.height = wwidth + 'px'
  }

  for (var directionI = 0; directionI <= rowSquare; directionI++) { // 设置direction数组存储每个区域里的div值
    direction[directionI] = directionI
    if (directionI === rowSquare) {
      direction[directionI] = 0
    }
  }

  for (var k = 0; k <= rowSquare - 1; k++) { // 建立二维数组，存储方块div的top和left位置
    array[k] = new Array()
    for (var j = 0; j < 2; j++) {
      array[k][j] = ''
    }
  }

  for (var rowI = 0; rowI < rowSquare + 1; rowI++) { // 建立二维数组，存储每个区域可以执行的方向区域
    directionAvail[rowI] = new Array()
    for (var colI = 0; colI < 4; colI++) {
      directionAvail[rowI][colI] = ''
    }
  }

  for (var rowII = 0; rowII < rowSquare; rowII++) { // 给可执行方向数组赋值
    var rowFact = row - 1
    var rowCertain = rowII / row
    var colCertain = rowII % row
    rowCertain = parseInt(rowCertain)
    row = parseInt(row)
    rowII = parseInt(rowII)
    if (rowCertain === 0 && colCertain === 0) {
      directionAvail[rowII][0] = 1
      directionAvail[rowII][1] = row
    } else if (rowCertain === 0 && colCertain !== 0 && colCertain !== rowFact) {
      directionAvail[rowII][0] = rowII - 1
      directionAvail[rowII][1] = rowII + 1
      directionAvail[rowII][2] = rowII + row
    } else if (rowCertain === 0 && colCertain === rowFact) {
      directionAvail[rowII][0] = rowII - 1
      directionAvail[rowII][1] = rowII + row
    } else if (rowCertain !== 0 && colCertain === 0 && rowCertain !== rowFact) {
      directionAvail[rowII][0] = rowII - row
      directionAvail[rowII][1] = rowII + 1
      directionAvail[rowII][2] = rowII + row
    } else if (colCertain === 0 && rowCertain === rowFact) {
      directionAvail[rowII][0] = rowII - row
      directionAvail[rowII][1] = rowII + 1
    } else if (colCertain !== rowFact && rowCertain === rowFact && colCertain !== 0) {
      directionAvail[rowII][0] = rowII - row
      directionAvail[rowII][1] = rowII + 1
      directionAvail[rowII][2] = rowII - 1
    } else if (colCertain === rowFact && rowCertain === rowFact) {
      directionAvail[rowII][0] = rowII - row
      directionAvail[rowII][1] = rowII - 1
    } else if (colCertain === rowFact && rowCertain !== rowFact && rowCertain !== 0) {
      directionAvail[rowII][0] = rowII - row
      directionAvail[rowII][1] = rowII + row
      directionAvail[rowII][2] = rowII - 1
    } else {
      directionAvail[rowII][0] = rowII - row
      directionAvail[rowII][1] = rowII + row
      directionAvail[rowII][2] = rowII - 1
      directionAvail[rowII][3] = rowII + 1
    }
  }

  for (var a = 0; a <= rowSquare - 1; a++) { // 计算left和top
    var cols = a % row
    var rows = a / row
    rows = parseInt(rows)
    // alert(a)
    for (var b = 0; b < 2; b++) {
      if (b === 0) {
        array[a][b] = -cols * rowsWidth
      } else {
        array[a][b] = -rows * rowsWidth
      }
    }
    if (a == rowSquare - 1) {
      break
    }
    var aa = a + 1

    document.getElementById('d' + aa).style.left = -array[a][0] + 'px' // 设置left和top
    document.getElementById('d' + aa).style.top = -array[a][1] + 'px'
    document.getElementById('d' + aa).style.backgroundPositionX = array[a][0] + 'px'
    document.getElementById('d' + aa).style.backgroundPositionY = array[a][1] + 'px'
  }

  // 事件委托，点击图片时若合法，移动该图片
  var divId = document.getElementById('d')
  divId.onclick = function (ev) {
    var target = ev.target || ev.srcElement

    if (target.nodeName.toLocaleLowerCase() === 'div') {
      var Id = target.id
      var idMove = Id.slice(1)

      var partOfpuzzle = new Puzzle(idMove)

      partOfpuzzle.move()
    }
  }
}

function Puzzle (id) {
  this.id = id
}

Puzzle.prototype.move = function () {
  if (firstMove === true) {
    var i = 1
    var jud = false

    for (i = 1; i < rowSquare + 1; ++i) {
      if (direction[i] == this.id) {
        break
      }
    }

    var g
    i = i - 1
    for (g = 0; g < directionAvail[i].length; g++) {
      //  alert(directionAvail[i][g] + "~~" + direction[directionAvail[i][g] + 1] + "～～" + directionAvail[1][2])
      if (directionAvail[i][g] === '') {
        continue
      }
      //  alert(directionAvail[i][g] + "@@" + direction[directionAvail[i][g] + 1] + "@@" + directionAvail[1][2])
      if (direction[directionAvail[i][g] + 1] === 0) {
        jud = true
        break
      }
    }

    var tmp1 = directionAvail[i][g] + 1
    var tmp2
    i = i + 1

    if (jud === true) {
      // document.getElementById('d' + this.id).style.left = position[tmp1][0] + 'px'
      // document.getElementById('d' + this.id).style.top = position[tmp1][1] + 'px'

      // alert(position[tmp1][0] + "~~" + -array[tmp1 -1][0])
      // alert(position[tmp1][1] + "~~" + -array[tmp1 -1][1])

      document.getElementById('d' + this.id).style.left = -array[tmp1 - 1][0] + 'px' // 设置left和top
      document.getElementById('d' + this.id).style.top = -array[tmp1 - 1][1] + 'px'

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
  for (var index = 1; index < rowSquare + 1; index++) {
    var ran = parseInt(Math.random() * rowSquare + 1)
    if (direction[index] !== 0) {
      document.getElementById('d' + direction[index]).style.left = -array[ran - 1][0] + 'px'
      document.getElementById('d' + direction[index]).style.top = -array[ran - 1][1] + 'px'
    }

    if (direction[ran] !== 0) {
      document.getElementById('d' + direction[ran]).style.left = -array[index - 1][0] + 'px'
      document.getElementById('d' + direction[ran]).style.top = -array[index - 1][1] + 'px'
    }

    var tem2 = direction[index]
    direction[index] = direction[ran]
    direction[ran] = tem2
  }
  second = 0
  min = 0
  firstTime = false
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
    firstTime = false
  }
  firstMove = true
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
  for (var iindex1 = 1; iindex1 < rowSquare + 1; iindex1++) {
    if (iindex1 <= rowSquare - 1) {
      if (iindex1 !== direction[iindex1]) { return false }
    }

    if (iindex1 === rowSquare) {
      if (direction[iindex1] !== 0) { return false } else {
        return true
      }
    }
  }
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
    var divFather = document.getElementById('d')

    var divChild = divFather.getElementsByTagName('div')

    for (var index2 = 0; index2 < divChild.length; index2++) {
      divChild[index2].style.backgroundImage = 'url("' + imgFile + '" )'
    }
  }

  reader.readAsDataURL(file)
}

function file () { // 利用button的点击事件，调用input的file类型读取图片函数
  var file1 = document.getElementById('get2')
  file1.click()
}

function clickSure () {
  var sureFunction = document.getElementById('sure1')
  sureFunction.click()
}
