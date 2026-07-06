"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DockProps {
  children: React.ReactNode;
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
}

const DEFAULT_SIZE = 48;
const DEFAULT_MAGNIFICATION = 64;
const DEFAULT_DISTANCE = 140;

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      children,
      className,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: mouseX,
            size: iconSize,
            magnification: iconMagnification,
            distance: iconDistance,
          } as any);
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "mx-auto flex h-16 items-end gap-4 rounded-2xl bg-white/10 p-2 backdrop-blur-md border border-white/20",
          {
            "items-start": direction === "top",
            "items-center": direction === "middle",
            "items-end": direction === "bottom",
          },
          className
        )}
        {...props}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps {
  children?: React.ReactNode;
  className?: string;
  name?: string;
  href?: string;
  src?: string;
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>;
}

export const DockIcon = ({
  children,
  className,
  name,
  href,
  src,
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX ?? useMotionValue(Infinity), (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const content = (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-xl bg-white/90 dark:bg-black/20 text-[#0F315E] shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-[#0F315E]/10 group/icon",
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={name || "Brand logo"}
          className="h-3/5 w-3/5 object-contain"
        />
      ) : (
        children
      )}
      {/* Tooltip */}
      {name && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-[#0F315E] px-2 py-1 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover/icon:opacity-100 whitespace-nowrap pointer-events-none shadow-sm z-50">
          {name}
        </span>
      )}
    </motion.div>
  );

  if (href && href !== "#") {
    return (
      <a href={href} className="block text-decoration-none">
        {content}
      </a>
    );
  }

  return content;
};

DockIcon.displayName = "DockIcon";
