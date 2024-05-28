import { useState, useEffect } from 'react'


type HandleEvent = MouseEvent & TouchEvent;
const events = {
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup',
  },
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend',
  },
};

const defaultMinHeight = 200
const defaultMaxHeight = 500
const useDrag = () => {
  const [dragging, setDragging] = useState(false)
  let baseHeight = 0;
  let startX = 0;

  const removeEvents = () => {}
  const updateHeight = (e: HandleEvent) => {
    let pageH = 0;
    if (e.touches) {
      if (e.touches.length) {
        // touchMove
        pageH = e.touches[0].pageY
      } else {
        // touchend
        pageH = e.changedTouches[0].pageY
      }
    } else {
      pageH = e.pageY
    }
    const temDeltaX = startX - pageH
    let h = Math.max(baseHeight - temDeltaX, defaultMinHeight)
    h = Math.min(h, defaultMaxHeight)
    console.log(h)
  }

  const handleMove = (e: HandleEvent) => {
    updateHeight(e)
  }
  const handleStop = (e: HandleEvent) => {
    setDragging(false)
    updateHeight(e)
    removeEvents()
  }
  const handleStart = (e: HandleEvent, eventsFor: any) => {
    setDragging(true)
    removeEvents()
    // baseHeight = 
  }
  const handleTouchDown = (e: HandleEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleStart(e, events.touch);
  }
  const handleClick = (e: HandleEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }

}

export default useDrag
