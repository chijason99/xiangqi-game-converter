export default function FormGroup(props: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div {...props} className="flex-col md:flex gap-1 justify-center items-center text-center">
        {props.children}
    </div>
  )
}
