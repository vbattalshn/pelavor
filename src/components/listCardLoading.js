export default function ListCardLoading({bgColor}){
    return(
        <div className="w-80 h-96 flex flex-col gap-2 bg-neutral-200 rounded-lg animate-pulse overflow-hidden">
            <span className="w-full h-[180px] bg-neutral-300" />
            <div className="flex flex-col p-4 gap-2">            
                <span className="w-full h-6 bg-neutral-300 rounded-lg" />
                <span className="w-full h-6 bg-neutral-300 rounded-lg" />
                <span className="w-full h-16 bg-neutral-300 rounded-lg" />
            </div>
            <div className="flex justify-end p-4">
            <span className="w-24 h-10 bg-neutral-300 rounded-lg mr-2" />
            </div>
        </div>
    )
}