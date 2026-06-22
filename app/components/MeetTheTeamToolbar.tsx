"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiMic,
  FiMicOff,
  FiMoreHorizontal,
  FiPhoneCall,
  FiSmile,
  FiUsers,
  FiVideo,
  FiVideoOff,
} from "react-icons/fi";
import { HiOutlineHandRaised } from "react-icons/hi2";
import { comfortaa } from "@/app/fonts";
import { openContactNotebook } from "@/lib/contact-notebook";

const REACTION_EMOJIS = [
  "\u{1F600}",
  "\u{1F601}",
  "\u{1F602}",
  "\u{1F603}",
  "\u{1F604}",
  "\u{1F605}",
  "\u{1F606}",
  "\u{1F607}",
  "\u{1F608}",
  "\u{1F609}",
  "\u{1F60A}",
  "\u{1F60B}",
  "\u{1F60D}",
  "\u{1F60E}",
  "\u{1F60F}",
  "\u{1F618}",
  "\u{1F61A}",
  "\u{1F61C}",
  "\u{1F61D}",
  "\u{1F61E}",
  "\u{1F61F}",
  "\u{1F642}",
  "\u{1F643}",
  "\u{1F970}",
  "\u{1F973}",
  "\u{1F97A}",
  "\u{1F929}",
  "\u{1F60D}",
  "\u{1F917}",
  "\u{1F92D}",
  "\u{1F92F}",
  "\u{1F44F}",
  "\u{1F44D}",
  "\u{1F44C}",
  "\u{1F90C}",
  "\u{1F91D}",
  "\u{1F64C}",
  "\u{1F4AA}",
  "\u{1F525}",
  "\u{2728}",
  "\u{1F31F}",
  "\u{2B50}",
  "\u{1F4AB}",
  "\u{1F389}",
  "\u{1F38A}",
  "\u{1F38F}",
  "\u{1F380}",
  "\u{1F381}",
  "\u{1F382}",
  "\u{1F388}",
  "\u{1F39A}",
  "\u{1F3A8}",
  "\u{1F3A7}",
  "\u{1F3A4}",
  "\u{1F3B6}",
  "\u{1F3B5}",
  "\u{1F680}",
  "\u{1F6F8}",
  "\u{2604}",
  "\u{1F31E}",
  "\u{1F31D}",
  "\u{1F31A}",
  "\u{1F308}",
  "\u{2600}",
  "\u{26A1}",
  "\u{1F4A5}",
  "\u{1F4A8}",
  "\u{1F4AF}",
  "\u{1F496}",
  "\u{1F497}",
  "\u{1F498}",
  "\u{1F499}",
  "\u{1F49A}",
  "\u{1F49B}",
  "\u{1F49C}",
  "\u{1F49D}",
  "\u{1F49E}",
  "\u{1F49F}",
  "\u{2764}",
  "\u{1FA75}",
  "\u{1FA77}",
  "\u{1F90D}",
  "\u{1F9E1}",
  "\u{1F49E}",
  "\u{1F90E}",
  "\u{1F337}",
  "\u{1F338}",
  "\u{1F339}",
  "\u{1F33A}",
  "\u{1F33B}",
  "\u{1F33C}",
  "\u{1F490}",
  "\u{1F332}",
  "\u{1F331}",
  "\u{1FAB4}",
  "\u{1F98B}",
  "\u{1F98A}",
  "\u{1F9CB}",
  "\u{1F984}",
  "\u{1F9E9}",
  "\u{1F9F8}",
  "\u{1F4A1}",
  "\u{1F4BB}",
  "\u{1F4F1}",
  "\u{1F3AF}",
  "\u{1F3C6}",
  "\u{1F947}",
  "\u{1F948}",
  "\u{1F949}",
  "\u{1F451}",
  "\u{1F48E}",
  "\u{1F52E}",
  "\u{1FA84}",
  "\u{1F9F2}",
  "\u{1F7E1}",
  "\u{1F535}",
  "\u{1F7E0}",
  "\u{1F7E2}",
  "\u{1F7E3}",
  "\u{1F7E4}",
  "\u{1F7E5}",
  "\u{1F7E6}",
  "\u{1F9E8}",
  "\u{1F9E0}",
  "\u{1F4CC}",
  "\u{1F4CE}",
  "\u{270C}",
  "\u{1F91F}",
  "\u{1FAF6}",
  "\u{1F44B}",
  "\u{1FAE1}",
];

type ReactionParticle = {
  id: number;
  driftX: number;
  durationMs: number;
  emoji: string;
  originX: number;
  originY: number;
  rotateDeg: number;
  sizeRem: number;
  travelY: number;
};

function HeartDoodle({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      aria-hidden="true"
    >
      <path d="M24 40S9 30 9 18a8 8 0 0 1 15-4 8 8 0 0 1 15 4c0 12-15 22-15 22z" />
    </svg>
  );
}

function ToolbarButton({
  label,
  danger = false,
  active = false,
  onClick,
  children,
}: {
  label: string;
  danger?: boolean;
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`flex h-14 w-14 items-center justify-center rounded-full transition ${
        danger
          ? "bg-[#ef4444] text-white"
          : active
            ? "bg-[#f8cf2f] text-[#171717]"
            : "bg-white text-[#171717]"
      }`}
    >
      {children}
    </button>
  );
}

export function MeetTheTeamToolbar() {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [reactions, setReactions] = useState<ReactionParticle[]>([]);
  const reactionIdRef = useRef(0);
  const timeoutIdsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((timer) => window.clearTimeout(timer));
      timeoutIdsRef.current = [];
    };
  }, []);

  function queueTimeout(callback: () => void, delayMs: number) {
    const timer = window.setTimeout(() => {
      timeoutIdsRef.current = timeoutIdsRef.current.filter(
        (currentTimer) => currentTimer !== timer,
      );
      callback();
    }, delayMs);

    timeoutIdsRef.current.push(timer);
  }

  function addReaction(originX: number, originY: number) {
    const durationMs = 4200 + Math.round(Math.random() * 1800);

    reactionIdRef.current += 1;

    const nextReaction: ReactionParticle = {
      id: reactionIdRef.current,
      driftX: -36 + Math.random() * 144,
      durationMs,
      emoji: REACTION_EMOJIS[Math.floor(Math.random() * REACTION_EMOJIS.length)],
      originX,
      originY,
      rotateDeg: -22 + Math.random() * 44,
      sizeRem: 1.3 + Math.random() * 1.1,
      travelY: originY + 72 + Math.random() * 36,
    };

    setReactions((current) => [...current, nextReaction]);
    queueTimeout(() => {
      setReactions((current) =>
        current.filter((reaction) => reaction.id !== nextReaction.id),
      );
    }, durationMs);
  }

  function spawnReactions() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const rightInset = Math.max(100, Math.min(200, viewportWidth * 0.18));
    const launchX = viewportWidth - rightInset + (-18 + Math.random() * 36);
    const launchY = viewportHeight - (8 + Math.random() * 20);

    addReaction(launchX, launchY);
  }

  function resetToolbar() {
    setIsMicMuted(false);
    setIsVideoOff(false);
    setIsHandRaised(false);
    setReactions([]);
    timeoutIdsRef.current.forEach((timer) => window.clearTimeout(timer));
    timeoutIdsRef.current = [];
  }

  return (
    <div className="relative mx-auto mt-8 w-full max-w-[92rem] px-2 sm:px-4">
      <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
        {reactions.map((reaction) => (
          <span
            key={reaction.id}
            className="meet-team-reaction absolute select-none"
            style={
              {
                "--meet-team-drift-x": `${reaction.driftX}px`,
                "--meet-team-duration": `${reaction.durationMs}ms`,
                "--meet-team-travel-y": `${reaction.travelY}px`,
                fontSize: `${reaction.sizeRem}rem`,
                left: `${reaction.originX}px`,
                rotate: `${reaction.rotateDeg}deg`,
                top: `${reaction.originY}px`,
              } as React.CSSProperties
            }
          >
            {reaction.emoji}
          </span>
        ))}
      </div>

      <div className="relative rounded-[2.4rem] bg-white px-5 py-4 shadow-[0_20px_40px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
          <div className="order-2 flex items-center justify-center gap-4 md:order-none md:justify-start">
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full text-[#171717]">
                <FiUsers className="h-7 w-7" />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1f6cff] text-lg font-bold text-white">
                4
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-[1.05rem] font-semibold text-[#112240]">Team Sync</p>
              <p className={`${comfortaa.className} text-[0.92rem] font-bold text-[#1f6cff]`}>
                Always creating +
              </p>
            </div>
          </div>

          <div className="hidden h-14 w-px bg-black/10 xl:block" />

          <div className="order-1 flex min-w-0 justify-center md:order-none md:flex-1 md:justify-end lg:flex-none lg:justify-center">
            <div className="flex min-w-0 flex-nowrap items-center gap-3 overflow-x-auto pb-1">
              <ToolbarButton
                label={isMicMuted ? "Turn microphone on" : "Mute microphone"}
                active={isMicMuted}
                danger={isMicMuted}
                onClick={() => setIsMicMuted((current) => !current)}
              >
                {isMicMuted ? (
                  <FiMicOff className="h-6 w-6" />
                ) : (
                  <FiMic className="h-6 w-6" />
                )}
              </ToolbarButton>
              <ToolbarButton
                label={isVideoOff ? "Turn camera on" : "Turn camera off"}
                active={isVideoOff}
                danger={isVideoOff}
                onClick={() => setIsVideoOff((current) => !current)}
              >
                {isVideoOff ? (
                  <FiVideoOff className="h-6 w-6" />
                ) : (
                  <FiVideo className="h-6 w-6" />
                )}
              </ToolbarButton>
              <ToolbarButton label="End call" danger onClick={resetToolbar}>
                <FiPhoneCall className="h-6 w-6" />
              </ToolbarButton>
              <ToolbarButton label="Reactions" onClick={spawnReactions}>
                <FiSmile className="h-6 w-6" />
              </ToolbarButton>
              <ToolbarButton
                label={isHandRaised ? "Lower hand" : "Raise hand"}
                active={isHandRaised}
                onClick={() => setIsHandRaised((current) => !current)}
              >
                <HiOutlineHandRaised className="h-6 w-6" />
              </ToolbarButton>
              <ToolbarButton
                label="Open contact notebook"
                onClick={openContactNotebook}
              >
                <FiMoreHorizontal className="h-6 w-6" />
              </ToolbarButton>
            </div>
          </div>

          <div className="hidden h-14 w-px bg-black/10 xl:block" />

          <div className="hidden items-center justify-between gap-5 lg:justify-end xl:flex">
            <div className="text-right">
              <p className="font-cabin-sketch text-[1.15rem] leading-none text-[#20305a] sm:text-[1.45rem]">
                Great work,
              </p>
              <p className="font-cabin-sketch mt-1 text-[1.15rem] leading-none text-[#20305a] sm:text-[1.45rem]">
                team!
              </p>
              <div className="ml-auto mt-1 h-[3px] w-16 rotate-[-3deg] rounded-full bg-[#ef4444]" />
            </div>

            <HeartDoodle className="h-10 w-10 text-[#1f6cff]" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .meet-team-reaction {
          animation: meet-team-reaction-float var(--meet-team-duration) ease-out
            forwards;
          filter: drop-shadow(0 12px 16px rgba(0, 0, 0, 0.16));
          will-change: transform, opacity;
        }

        @keyframes meet-team-reaction-float {
          0% {
            opacity: 0;
            transform: translate3d(0, 0.85rem, 0) scale(0.78);
          }

          10% {
            opacity: 1;
            transform: translate3d(
                calc(var(--meet-team-drift-x) * 0.08),
                -1.25rem,
                0
              )
              scale(1);
          }

          88% {
            opacity: 1;
            transform: translate3d(
                calc(var(--meet-team-drift-x) * 0.88),
                calc(var(--meet-team-travel-y) * -0.88),
                0
              )
              scale(1.04);
          }

          100% {
            opacity: 0;
            transform: translate3d(
                var(--meet-team-drift-x),
                calc(var(--meet-team-travel-y) * -1),
                0
              )
              scale(1.08);
          }
        }
      `}</style>
    </div>
  );
}
