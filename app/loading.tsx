export default function Loading() {
  return (
    <div className="bg-bg flex flex-1 flex-col items-center justify-center">
      <div
        role="status"
        aria-label="Cargando"
        className="border-border-soft border-t-brand-teal-500 h-8 w-8 animate-spin rounded-full border-[3px]"
      />
    </div>
  );
}
