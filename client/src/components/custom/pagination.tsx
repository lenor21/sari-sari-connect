import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface MyCustomPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
}

const MyCustomPagination: React.FC<MyCustomPaginationProps> = ({
  handlePageChange,
  currentPage,
  totalPages,
}) => {
  return (
    <Pagination className='mt-5'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            className={`${
              currentPage === 1 ? 'opacity-30 pointer-events-none' : ''
            }`}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            isActive={currentPage === 1}
            onClick={() => handlePageChange(1)}>
            1
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            className={`${currentPage === 4 ? '' : 'hidden'}`}
            onClick={() => handlePageChange(1)}>
            2
          </PaginationLink>
        </PaginationItem>

        {currentPage > 4 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            className={`${currentPage < 3 && 'hidden'}`}
            onClick={() => handlePageChange(currentPage - 1)}>
            {currentPage - 1}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            isActive={currentPage === currentPage}
            className={`${
              currentPage === 1 || currentPage === totalPages ? 'hidden' : ''
            }`}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            className={`${
              currentPage === totalPages || currentPage === totalPages - 1
                ? 'hidden'
                : ''
            }`}
            onClick={() => handlePageChange(currentPage + 1)}>
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>

        {currentPage < totalPages - 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            className={`${currentPage === totalPages - 3 ? '' : 'hidden'}`}
            onClick={() => handlePageChange(1)}>
            {totalPages - 1}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            className={`${
              currentPage === totalPages ? 'opacity-30 pointer-events-none' : ''
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MyCustomPagination;
