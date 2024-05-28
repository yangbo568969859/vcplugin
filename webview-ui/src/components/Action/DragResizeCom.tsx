import { FC, useState } from 'react'

type HandleEvent = MouseEvent & TouchEvent;
type EventHandler = (...args: any[]) => void
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

function addEventListenerWrap(target: any, eventType: any, cb: any, option?: any) {
  if (target && target.addEventListener) {
    let opt = option;
    if (
      opt === undefined && (eventType === 'touchstart' || eventType === 'touchmove' || eventType === 'wheel')
    ) {
      opt = { passive: false };
    }
    target.addEventListener(eventType, cb, opt);
  }
  return {
    remove: () => {
      if (target && target.removeEventListener) {
        target.removeEventListener(eventType, cb);
      }
    },
  };
}

const DragResizeCom: FC<any> = (props: any) => {
  const { containerRef } = props;
  const defaultMinHeight = 200
  const defaultMaxHeight = 350

  // const containerRef = useRef(null);
  const [dragging, setDragging] = useState(false)
  let baseHeight = 0;
  let startX = 0;
  let moveEvent = { remove: () => {} };
  let stopEvent = { remove: () => {} };

  const removeEvents = () => {
    moveEvent.remove();
    stopEvent.remove();
  }
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
    let h = Math.max(baseHeight + temDeltaX, defaultMinHeight)
    h = Math.min(h, defaultMaxHeight)
    // console.log(h, temDeltaX, baseHeight)
    containerRef.current.style.height = `${h}px`
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
    if (containerRef && containerRef.current) {
      baseHeight = containerRef.current.getBoundingClientRect().height
    }
    if (e.stopPropagation) e.stopPropagation();
    startX = e.touches ? e.touches[0].pageY : e.pageY;
    moveEvent = addEventListenerWrap(document.documentElement, eventsFor.move, handleMove)
    stopEvent = addEventListenerWrap(document.documentElement, eventsFor.stop, handleStop)
  }
  const handleDown: EventHandler = (e: HandleEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleStart(e, events.mouse);
  };
  const handleTouchDown: EventHandler = (e: HandleEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleStart(e, events.touch);
  }
  const handleClick: EventHandler = (e: HandleEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }
  return (
    <div className='gutter'
      onMouseDown={handleDown}
      onTouchStart={handleTouchDown}
      onClick={handleClick}
    >
    </div>
  )
}

export default DragResizeCom;