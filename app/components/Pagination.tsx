import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalEntries: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
}

export default function Pagination({
    currentPage,
    totalEntries,
    onPageChange,
}: PaginationProps) {
    let totalPages = 0;

    const generatePageNumbers = () => {
        totalPages = Math.floor(totalEntries / 10);
        const pages: (number | string)[] = [];
        const leftIndex = Math.max(currentPage - 1, 1);
        const rightIndex = Math.min(currentPage + 1, totalPages);

        const leftGap = leftIndex > 2;
        const rightGap = rightIndex < totalPages - 1;

        pages.push(1);

        if (leftGap) {
            pages.push('...');
        }

        for (let i = leftIndex; i <= rightIndex; i++) {
            if (i !== 1 && i !== totalPages) {
                pages.push(i);
            }
        }

        if (rightGap) {
            pages.push('...');
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = generatePageNumbers();

    return (
        <div className="flex items-center justify-center gap-2 p-6" aria-label="Pagination">
            <div>
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center w-[44px] h-[44px]
                    bg-gradient-to-br from-slate-100 to-slate-200 text-slate-900 font-medium
                    disabled:opacity-50 disabled:cursor-not-allowed
                    hover:text-blue-500 hover:shadow-lg
                    border-2 border-slate-100 hover:border-blue-500 rounded"
                >
                    <ChevronLeft />
                </button>
            </div>
            <div className="w-[360px] flex items-center justify-center gap-2 m-2">
                {pages.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span
                                key={`dots-${index}`}
                                className="flex items-center justify-center w-[44px] h-[44px] 
                                text-slate-900 font-mono text-sm pointer-events-none"
                            >
                                •••
                            </span>
                        );
                    }

                    const isActive = page === currentPage;

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page as number)}
                            className={`flex items-center justify-center w-[44px] h-[44px] font-medium disabled:opacity-50 
                                disabled:cursor-not-allowed hover:shadow-lg border-2 rounded 
                                ${isActive ? 'bg-blue-500 border-blue-500 hover:border-slate-900 hover:text-slate-900' :
                                    'bg-gradient-to-br from-slate-100 to-slate-200 hover:border-blue-500 hover:text-blue-500 text-slate-900 border-slate-100'}`}
                        >
                            <span className="relative z-10">{page}</span>
                        </button>
                    );
                })}
            </div>
            <div>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center w-[44px] h-[44px] 
                    bg-gradient-to-br from-slate-100 to-slate-200 text-slate-900 font-medium
                    disabled:opacity-50 disabled:cursor-not-allowed
                    hover:text-blue-500 hover:shadow-lg
                    border-2 border-slate-100 hover:border-blue-500 rounded"
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
};
