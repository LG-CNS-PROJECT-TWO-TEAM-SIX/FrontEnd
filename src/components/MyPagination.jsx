import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const MyPagination = ({ currentPage, setCurrentPage }) => {
  const totalPages = 5;
  return (
    <Pagination.Root
      count={50}
      pageSize={10}
      page={currentPage}
      onChange={setCurrentPage}
    >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton
            aria-label="prev"
            onClick={() => {
              if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
              }
            }}
          >
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton
              key={page.value}
              aria-label={`Page ${page.value}`}
              variant={page.value === currentPage ? "outline" : "ghost"}
              onClick={() => setCurrentPage(page.value)} // ✅ 명시적으로 호출
            >
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton
            aria-label="next"
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default MyPagination;
