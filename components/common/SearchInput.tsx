import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SearchInput({
    search,
    setSearch,
    placeholder
}: {
    search: string;
    setSearch: (search: string) => void;
    placeholder: string;
}) {
    return (
        <div className="flex w-full items-center">
            <Input
                placeholder={placeholder}
                className="rounded-r-none w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button className="rounded-l-none bg-[#0070c0] hover:bg-[#005999] px-3">
                <Search className="h-4 w-4" />
            </Button>
        </div>
    )
}