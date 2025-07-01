export default function PageHeader({title, icon, className}) {
    return(
        <div className={"bg-neutral-200 bg-mainImage bg-auto bg-center " + className}>
            <div className="max-w-5xl m-auto py-16 text-5xl font-bold text-neutral-700">
                {icon}
                <span className="italic">
                    {title}
                </span>
            </div>
        </div>
    )
}