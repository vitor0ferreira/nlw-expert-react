export default function NoteCard () {

  return (
    <button className="rounded-md text-left outline-none bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-600">
      <span className="text-sm font-medium text-slate-300">há 4 dias</span>
      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo,
        quas mollitia. Eius inventore laboriosam, officia eveniet quae minus
        illo itaque at quia porro sit, dolorum, rerum accusantium! Nesciunt,
        sapiente vitae?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo,
        quas mollitia. Eius inventore laboriosam, officia eveniet quae minus
        illo itaque at quia porro sit, dolorum, rerum accusantium! Nesciunt,
        sapiente vitae?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo,
        quas mollitia. Eius inventore laboriosam, officia eveniet quae minus
        illo itaque at quia porro sit, dolorum, rerum accusantium! Nesciunt,
        sapiente vitae?
      </p>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
    </button>
  );
}