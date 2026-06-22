import Image from "next/image";
import { FiMic, FiMoreHorizontal, FiStar } from "react-icons/fi";
import { comfortaa } from "@/app/fonts";
import { MeetTheTeamToolbar } from "@/app/components/MeetTheTeamToolbar";

type TeamMember = {
  imageAlt: string;
  imagePosition?: string;
  imageScale?: string;
  imageSrc: string;
  name: string;
  role: string;
  roleBg: string;
  speaking?: boolean;
  micColor: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    imageAlt: "Portrait of Abhigna Muchala",
    imagePosition: "center 24%",
    imageScale: "scale-[1.02]",
    imageSrc: "/team/abhigna.webp",
    name: "Abhigna Muchala",
    role: "Co-Founder",
    roleBg: "#1f6cff",
    speaking: true,
    micColor: "#44c35e",
  },
  {
    imageAlt: "Portrait of Aasish Muchala",
    imagePosition: "center 22%",
    imageScale: "scale-[1.02]",
    imageSrc: "/team/aasish.webp",
    name: "Aasish Muchala",
    role: "Co-Founder",
    roleBg: "#f4cb2b",
    micColor: "#ffffff",
  },
  {
    imageAlt: "Portrait of Sai Datta Reddy",
    imagePosition: "center 18%",
    imageScale: "scale-[1.03]",
    imageSrc: "/team/sai datta.webp",
    name: "Sai Datta Reddy",
    role: "CMO",
    roleBg: "#ef4444",
    micColor: "#ffffff",
  },
  {
    imageAlt: "Portrait of Rishav Mondal",
    imagePosition: "center 20%",
    imageScale: "",
    imageSrc: "/team/rishav.webp",
    name: "Rishav Mondal",
    role: "CTO",
    roleBg: "#4ea54e",
    micColor: "#ffffff",
  },
];

function CloudDoodle({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 84 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      aria-hidden="true"
    >
      <path d="M15 38c-7 0-12-5-12-11 0-6 5-10 11-10 1-8 8-14 17-14 7 0 13 4 16 10 2-1 4-2 7-2 9 0 15 6 15 14s-6 13-14 13H15z" />
    </svg>
  );
}

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

function SparkDoodle({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 34 34"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      aria-hidden="true"
    >
      <path d="M17 3l3 10 11 4-11 4-3 10-3-10-11-4 11-4z" />
    </svg>
  );
}

function BoltDoodle({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 28 50"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      aria-hidden="true"
    >
      <path d="M17 3L5 25h9l-4 21 13-24h-9z" />
    </svg>
  );
}

function SmileDoodle({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="40" />
      <circle cx="37" cy="44" r="3" fill="currentColor" />
      <circle cx="63" cy="44" r="3" fill="currentColor" />
      <path d="M33 62c4 7 10 10 17 10s13-3 17-10" />
    </svg>
  );
}

function PlantDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M31 86h46l-4 16H35z"
          fill="#1668d5"
          stroke="#ffffff"
          strokeWidth="4"
        />
        <path d="M54 83V44" stroke="#3f7a1f" strokeWidth="4" />
        <path
          d="M54 55c-16 0-24-10-24-24 13 0 24 7 24 24z"
          fill="#76c44e"
          stroke="#ffffff"
          strokeWidth="3"
        />
        <path
          d="M54 52c18 0 28-11 28-26-14 0-28 8-28 26z"
          fill="#8fd25c"
          stroke="#ffffff"
          strokeWidth="3"
        />
        <path
          d="M54 68c-12 0-19-8-19-19 11 0 19 6 19 19z"
          fill="#6cb840"
          stroke="#ffffff"
          strokeWidth="3"
        />
        <path
          d="M54 66c14 0 21-8 21-21-11 0-21 7-21 21z"
          fill="#9ad96a"
          stroke="#ffffff"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
}

function PosterNote({
  src,
  alt,
  className,
  rotation,
}: {
  src: string;
  alt: string;
  className?: string;
  rotation: string;
}) {
  return (
    <div className={`relative ${className ?? ""}`} style={{ transform: rotation }}>
      <Image
        src={src}
        alt={alt}
        width={720}
        height={540}
        className="h-auto w-full drop-shadow-[0_18px_34px_rgba(0,0,0,0.16)]"
      />
    </div>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="relative aspect-[1.82/1] w-full">
      <div className="absolute inset-0 rounded-[1.9rem] bg-[#f8efe0] p-[0.32rem] shadow-[0_18px_36px_rgba(0,0,0,0.18)]">
        <div className="relative h-full overflow-hidden rounded-[1.65rem] bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.5),_rgba(255,255,255,0.04)_54%),linear-gradient(180deg,_rgba(18,27,52,0.08),_rgba(18,27,52,0.26))]" />
          <div className="absolute inset-0 z-[1]">
            <Image
              src={member.imageSrc}
              alt={member.imageAlt}
              width={910}
              height={500}
              sizes="(max-width: 768px) 90vw, 44vw"
              className={`absolute inset-0 h-full w-full object-cover ${member.imageScale ?? ""}`}
              style={{ objectPosition: member.imagePosition ?? "center top" }}
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(17,24,39,0.38) 1px, transparent 1px), linear-gradient(90deg, rgba(17,24,39,0.38) 1px, transparent 1px)",
              backgroundSize: "1.28rem 1.28rem",
            }}
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 z-[2]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 24%, rgba(0,0,0,0.03), transparent 20%), radial-gradient(circle at 80% 76%, rgba(0,0,0,0.03), transparent 18%)",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 z-[3] h-[42%] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.14)_28%,rgba(255,255,255,0.88)_100%)]" />

          {member.speaking ? (
            <div className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.74rem] font-semibold text-[#181818] shadow-[0_8px_18px_rgba(0,0,0,0.14)] sm:text-[0.8rem]">
              <span className="h-3 w-3 rounded-full bg-[#55bf4d]" />
              Speaking
            </div>
          ) : null}

          <div className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2c2c2c] shadow-[0_8px_18px_rgba(0,0,0,0.14)]">
            <FiMoreHorizontal className="h-5 w-5" />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between px-4 pb-4">
            <div className="flex flex-col items-start gap-1.5">
              <div className="rounded-[1rem] bg-[#10233f] px-4 py-2 shadow-[0_10px_20px_rgba(0,0,0,0.22)]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[1rem] font-semibold leading-none text-white sm:text-[1.12rem]">
                    {member.name}
                  </span>
                  {member.speaking ? (
                    <FiStar className="h-3.5 w-3.5 text-[#ffd12f]" />
                  ) : null}
                </div>
              </div>

              <div
                className={`${comfortaa.className} rounded-full px-3.5 py-1.5 text-[0.7rem] font-bold text-[#111] shadow-[0_8px_18px_rgba(0,0,0,0.14)] sm:px-4 sm:text-[0.77rem]`}
                style={{ backgroundColor: member.roleBg }}
              >
                {member.role}
              </div>
            </div>

            <div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#181818] shadow-[0_10px_20px_rgba(0,0,0,0.22)]"
              style={{ color: member.micColor }}
            >
              <FiMic className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function MeetTheTeamSection() {
  return (
    <section
      id="team"
      aria-label="Meet the team"
      className="relative overflow-hidden bg-[#09b7ea] py-[4.75rem] sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% -10%, rgba(255,255,255,0.18), transparent 30%), radial-gradient(circle, rgba(255,255,255,0.28) 1.1px, transparent 1.1px)",
          backgroundSize: "100% 100%, 38px 38px",
          opacity: 0.34,
        }}
      />

      <CloudDoodle className="pointer-events-none absolute left-[6%] top-[23rem] hidden h-16 w-24 text-white md:block" />
      <CloudDoodle className="pointer-events-none absolute right-[18%] top-[10rem] hidden h-12 w-[4.5rem] text-white md:block" />
      <HeartDoodle className="pointer-events-none absolute left-[7%] bottom-[16rem] hidden h-16 w-16 text-[#ff92d2] md:block" />
      <SparkDoodle className="pointer-events-none absolute left-[8%] bottom-[10rem] hidden h-10 w-10 text-[#ffd12f] md:block" />
      <BoltDoodle className="pointer-events-none absolute right-[11%] bottom-[15rem] hidden h-14 w-8 text-[#ffd12f] md:block" />
      <SmileDoodle className="pointer-events-none absolute right-[6%] top-[24rem] hidden h-[4.5rem] w-[4.5rem] text-[#ffd12f] lg:block" />

      <div className="relative z-10 mx-auto w-[92%] max-w-[108rem]">
        <div className="relative mx-auto max-w-[96rem]">
          <div className="mb-6 hidden items-start justify-between gap-3">
            <PosterNote
              src="/poster_team_1-Photoroom.webp"
              alt="Dream big poster"
              rotation="rotate(-7deg)"
              className="w-[10.8rem] shrink-0"
            />
            <PosterNote
              src="/poster_team_2-Photoroom.webp"
              alt="We turn ideas into little magic poster"
              rotation="rotate(6deg)"
              className="mt-4 w-[9.8rem] shrink-0"
            />
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 hidden items-start justify-between xl:flex">
            <PosterNote
              src="/poster_team_1-Photoroom.webp"
              alt="Dream big poster"
              rotation="rotate(-8deg)"
              className="w-[17rem] lg:w-[19rem] xl:ml-[1rem]"
            />

            <PosterNote
              src="/poster_team_2-Photoroom.webp"
              alt="We turn ideas into little magic poster"
              rotation="rotate(7deg)"
              className="w-[15.5rem] lg:w-[17rem] xl:mr-[1rem]"
            />
          </div>

          <div className="mx-auto max-w-[44rem] pt-8 text-center md:max-w-[38rem] md:pt-0 lg:max-w-[42rem] xl:max-w-[46rem]">
            <Image
              src="/Team.webp"
              alt="Meet the Team"
              width={1600}
              height={400}
              preload
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 640px) 88vw, (max-width: 1024px) 56vw, 46rem"
              className="mx-auto h-auto w-full max-w-[46rem]"
            />

            <p className="font-cabin-sketch mx-auto mt-6 max-w-[44rem] text-[clamp(1.4rem,3vw,2.35rem)] leading-[1.08] text-white">
              Creative minds. Bold ideas. Meaningful impact.
            </p>
            <div className="mx-auto mt-2 h-1 w-44 rotate-[-2deg] rounded-full bg-[#ffd12f]" />
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-[66rem] grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {TEAM_MEMBERS.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>

        <MeetTheTeamToolbar />
        <PlantDoodle className="pointer-events-none absolute -bottom-3 right-0 hidden h-28 w-28 xl:block" />
      </div>
    </section>
  );
}
