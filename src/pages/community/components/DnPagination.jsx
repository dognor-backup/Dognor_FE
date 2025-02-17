import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function DnPagination({ totalPage = 1, getClickedPageNumber }) {
  const hideNumber = totalPage - 3;
  const maxNumber = totalPage > 3 ? totalPage - hideNumber : totalPage;
  const handleGetCurrentTaget = (e) => {
    const clicked = e.target.name;
    getClickedPageNumber(clicked);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious name="prev" onClick={handleGetCurrentTaget} />
        </PaginationItem>
        {[...Array(maxNumber)].map((_, i) => (
          <PaginationItem key={i + 1}>
            <PaginationLink name={i + 1} onClick={handleGetCurrentTaget}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPage > 3 ? (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink name={totalPage} onClick={handleGetCurrentTaget}>
                {totalPage}
              </PaginationLink>
            </PaginationItem>
          </>
        ) : null}
        <PaginationItem>
          <PaginationNext name="next" onClick={handleGetCurrentTaget} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
