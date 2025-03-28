import { PageInfo } from "@/types";

type Props = {
    page: PageInfo;
};

export default function Pagination({ page }: Props) {
    return (
        <p className="text-sm text-neutral-400 pb-20">
            Page {page.number + 1} of {page.totalPages} ({page.totalElements} rooms
            total)
        </p>
    );
}