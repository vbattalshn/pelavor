export default function ListCardLoading({bgColor}){
    return(
        <div className="w-[300px] flex flex-col gap-2 pb-2 bg-neutral-200 rounded-xl animate-pulse overflow-hidden">
            <span className="w-full h-[150px] bg-neutral-300" />
            <div className="flex flex-col px-2 gap-2">            
                <span className="w-full h-5 bg-neutral-300 rounded-lg" />
                <span className="w-1/3 h-5 bg-neutral-300 rounded-lg" />
            </div>
            <div className="flex items-center px-2 gap-2">            
                <span className="w-6 h-6 bg-neutral-300 rounded-full" />
                <span className="w-16 h-4 bg-neutral-300 rounded-lg" />
                <span className="w-20 h-4 bg-neutral-300 rounded-lg" />
            </div>
            <div className="flex flex-col items-center px-2 gap-2">            
                <span className="w-full h-5 bg-neutral-300 rounded-lg" />
                <span className="w-full h-5 bg-neutral-300 rounded-lg" />
                <span className="w-full h-5 bg-neutral-300 rounded-lg" />
            </div>
            <div className="flex justify-end">
            <span className="w-24 h-10 bg-neutral-300 rounded-lg mr-2" />
            </div>
        </div>
    )
}