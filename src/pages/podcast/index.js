import Header from "@/components/header";
import Footer from "@/components/footer";
import UnderConstruction from "@/components/underConstruction";

export default function Podcast() {
    return(
        <>
        <Header />
        <div className="w-full h-content flex items-center justify-center">
            <UnderConstruction />
        </div>
        <Footer />
        </>
    )
}