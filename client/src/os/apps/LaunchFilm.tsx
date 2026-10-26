export default function LaunchFilm() {
  return (
    <div className="flex h-full min-h-[320px] items-center justify-center bg-black">
      <video
        controls
        playsInline
        preload="none"
        poster="/media/maliya-launch-cover.jpg"
        aria-label="Maliya launch video: where did your money go this month?"
        className="h-full max-h-full w-auto max-w-full bg-black"
      >
        <source src="/media/maliya-launch.mp4" type="video/mp4" />
        <track kind="captions" src="/media/maliya-launch.vtt" srcLang="en" label="English" />
        Your browser does not support video playback.
      </video>
    </div>
  );
}
