export default function Button(
  props: React.ComponentPropsWithoutRef<"button">
) {
  return (
    <button
      className={`text-md md:text-xl font-bold bg-blue-500 text-white rounded p-3 transition ease-in-out hover:bg-blue-600 hover:cursor-pointer`}
      {...props}
    ></button>
  );
}
