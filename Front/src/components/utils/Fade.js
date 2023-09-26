import React, { useEffect, useRef, useState } from "react";

const VISIBLE = 1;
const HIDDEN = 2;
const ENTERING = 3;
const LEAVING = 4;

/**
 * @param {boolean} visible
 * @param {React.ReactNode} children
 * @param {number} duration en ms
 * @param {boolean} animateEnter Anime l'arrivée de l'élément
 * @param {{opacity?: number, x?: number, y?: number, z?: number}} from
 **/
export function Fade({
  visible,
  children,
  duration = 300,
  animateEnter = false,
  from = { opacity: 0 },
}) {
  const childRef = useRef(children);
  const [state, setState] = useState(
    visible ? (animateEnter ? ENTERING : VISIBLE) : HIDDEN
  );

  if (visible) {
    childRef.current = children;
  }

  useEffect(() => {
    if (!visible) {
      setState(LEAVING);
    } else {
      setState((s) => (s === HIDDEN ? ENTERING : VISIBLE));
    }
  }, [visible]);

  useEffect(() => {
    if (state === LEAVING) {
      const timer = setTimeout(() => {
        setState(HIDDEN);
      }, duration);
      return () => {
        clearTimeout(timer);
      };
    } else if (state === ENTERING) {
      setState(VISIBLE);
    }
  }, [state]);

  if (state === HIDDEN) {
    return null;
  }

  let style = {
    transitionDuration: `${duration}ms`,
    transitionProperty: "opacity transform",
  };
  if (state !== VISIBLE) {
    if (from.opacity !== undefined) {
      style.opacity = from.opacity;
    }
    style.transform = `translate3d(${from.x ?? 0}px, ${from.y ?? 0}px, ${
      from.z ?? 0
    }px)`;
  }

  return <div style={style}>{childRef.current}</div>;
}