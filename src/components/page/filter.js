import Filter from "@/assets/icons/filter";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";

export default function PageFilter({ setOrder }) {
  return (
    <div>
      <div className="max-w-5xl m-auto py-2 text-neutral-700 flex items-center justify-end">
        <Menu>
          <MenuButton className="rounded-lg bg-neutral-200">
            <span className="p-2 hocus:bg-neutral-300/50 active:bg-neutral-300/50 rounded-lg flex gap-2">
              <Filter />
              Filtreler
            </span>
          </MenuButton>
          <MenuItems
            className="p-1 bg-neutral-200 rounded-lg flex flex-col gap-0 mt-1 shadow border-neutral-300 z-20 text-neutral-700"
            anchor="bottom start"
          >
            <MenuItem>
              <button onClick={() => setOrder("seo")} className="py-2 px-4 hocus:bg-neutral-300/50 rounded-md transition-all hocus:text-neutral-800" href="#">Akıllı Sıralama</button>
            </MenuItem>
            <MenuItem>
              <button onClick={() => setOrder("title ASC")} className="py-2 px-4 hocus:bg-neutral-300/50 rounded-md transition-all hocus:text-neutral-800" href="#">A'dan  Z'ye</button>
            </MenuItem>
            <MenuItem>
                <button onClick={() => setOrder("title DESC")} className="py-2 px-4 hocus:bg-neutral-300/50 rounded-md transition-all hocus:text-neutral-800" href="#">Z'den A'ya</button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
