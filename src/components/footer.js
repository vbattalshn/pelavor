import Instagram from "@/assets/icons/instagram";
import Tiktok from "@/assets/icons/tiktok";
import Logo from "@/assets/logo";

export default function Footer() {
    return(
        <footer className="w-full bg-neutral-200/50 py-8 pb-20 bg-mainImage bg-auto bg-center">
            <div className="max-w-5xl mx-auto flex gap-4 px-4 lg:flex-row flex-col">
                <div className="flex-1 flex flex-col gap-2">
                    <Logo />
                    <span className="text-neutral-700">
                        Dil öğrenmenin her yolu
                    </span>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <span className="text-neutral-800 font-bold">Ürünler</span>
                    <div className="flex flex-col gap-1 text-neutral-700">
                        <a href="https://pelavor.com/" target="_blank">pelavor.com</a>
                        <a href="https://api.pelavor.com/" target="_blank">api.pelavor.com</a>
                        <a href="https://blog.pelavor.com/" target="_blank">blog.pelavor.com</a>
                        <a href="https://pelavor.com/contact/" target="_blank">pelavor.com/contact</a>
                    </div>

                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <span className="text-neutral-800 font-bold">Site Haritaları</span>
                    <div className="flex flex-col gap-1 text-neutral-700">
                        <a href="https://api.pelavor.com/sitemap.xml" target="_blank">pelavor.com</a>
                        <a href="https://blog.pelavor.com/sitemap.xml" target="_blank">blog.pelavor.com</a>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <span className="text-neutral-800 font-bold">Sosyal Medya</span>
                    <div className="flex gap-1 text-neutral-700">
                        <a href="https://instagram.com/pelavorgo" rel="nofollow" target="_blank" className="bg-neutral-300/50 p-2 rounded-lg hocus:bg-neutral-300 text-neutral-700 hocus:text-neutral-900 transition-all focus:ring focus:ring-indigo-600/50" >
                            <Instagram />
                        </a>
                        <a href="https://tiktok.com/@pelavorgo" rel="nofollow" target="_blank" className="bg-neutral-300/50 p-2 rounded-lg hocus:bg-neutral-300 text-neutral-700 hocus:text-neutral-900 transition-all focus:ring focus:ring-indigo-600/50">
                            <Tiktok />
                        </a>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto text-center pt-6 text-sm text-neutral-500">
                Pelavor.com tüm hakları saklıdır.
            </div>
        </footer>
    )
}