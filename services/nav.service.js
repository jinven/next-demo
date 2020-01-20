export default {
  canvasSecond(path) {
    let result = {
      path: null,
      name: null
    }
    if (path.indexOf('/canvas/3d') >= 0) {
      result.path = '/canvas/3d'
      result.name = '3d'
    } else if (path.indexOf('/canvas/boundary') >= 0) {
      result.path = '/canvas/boundary'
      result.name = '边界与摩擦力'
    } else if (path.indexOf('/canvas/easing') >= 0) {
      result.path = '/canvas/easing'
      result.name = '缓动与弹性动画'
    } else if (path.indexOf('/canvas/impact') >= 0) {
      result.path = '/canvas/impact'
      result.name = '碰撞检测'
    } else if (path.indexOf('/canvas/tri') >= 0) {
      result.path = '/canvas/tri'
      result.name = '三角函数与动画'
    } else if (path.indexOf('/canvas/speed') >= 0) {
      result.path = '/canvas/speed'
      result.name = '速度与加速度'
    } else if (path.indexOf('/canvas/gravity') >= 0) {
      result.path = '/canvas/gravity'
      result.name = '万有引力'
    } else if (path.indexOf('/canvas/moving') >= 0) {
      result.path = '/canvas/moving'
      result.name = '移动物体'
    } else if (path.indexOf('/canvas/billiard') >= 0) {
      result.path = '/canvas/billiard'
      result.name = '桌球运动'
    } else if (path.indexOf('/canvas/coordinate') >= 0) {
      result.path = '/canvas/coordinate'
      result.name = '坐标旋转与角度反弹'
    } else if (path.indexOf('/canvas/other') >= 0) {
      result.path = '/canvas/other'
      result.name = '其他'
    } else {
      result = null
    }
    return result
  }
}