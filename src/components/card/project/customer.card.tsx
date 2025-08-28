export function CustomerSections({
  client,
  brand,
}: {
  client?: string;
  brand?: string;
}) {
  return (
    <section className="w-full py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-main p-8 shadow-sm">
          <p className="text-3xl font-bold text-white md:text-4xl">{client}</p>
          <p className="mt-2 text-sm text-gray-300 md:text-base">Client</p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl bg-main p-8 shadow-sm">
          <p className="text-3xl font-bold text-white md:text-4xl">{brand}</p>
          <p className="mt-2 text-sm text-gray-300 md:text-base">Brand</p>
        </div>
      </div>
    </section>
  );
}
