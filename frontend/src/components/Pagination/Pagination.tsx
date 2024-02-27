import { Dots, PaginationContainer, PaginationLink } from "./Pagination.styles";
import { useLocation, useNavigate } from "react-router-dom";

interface PaginationProps {
  totalPages: number;
  isLoading: boolean;
}

export const Pagination = ({ totalPages, isLoading }: PaginationProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pageParam = new URLSearchParams(location.search).get("page") || "1";
  const currentPage = parseInt(pageParam);

  const handleChangePage = (page: number) => {
    const existingParams = new URLSearchParams(location.search);

    existingParams.set("page", `${page}`);

    const newUrl = `${location.pathname}?${existingParams.toString()}`;

    navigate(newUrl);
  };

  const generatePageLinks = () => {
    const pageLinks = [];

    const firstPageLink = (
      <PaginationLink
        key={1}
        onClick={() => {
          handleChangePage(1);
        }}
        disabled={isLoading}
        active={currentPage === 1}
      >
        1
      </PaginationLink>
    );
    pageLinks.push(firstPageLink);

    if (currentPage > 3) {
      pageLinks.push(<Dots key="dots-start">...</Dots>);
    }

    for (
      let i = Math.max(2, currentPage - 2);
      i <= Math.min(totalPages - 1, currentPage + 2);
      i++
    ) {
      const pageLink = (
        <PaginationLink
          key={i}
          onClick={() => {
            handleChangePage(i);
          }}
          disabled={isLoading}
          active={i === currentPage}
        >
          {i}
        </PaginationLink>
      );
      pageLinks.push(pageLink);
    }

    if (currentPage < totalPages - 2) {
      pageLinks.push(<Dots key="dots-end">...</Dots>);
    }

    const lastPageLink = (
      <PaginationLink
        key={totalPages}
        onClick={() => {
          handleChangePage(totalPages);
        }}
        disabled={isLoading}
        active={currentPage === totalPages}
      >
        {totalPages}
      </PaginationLink>
    );
    pageLinks.push(lastPageLink);

    return pageLinks;
  };

  return <PaginationContainer>{generatePageLinks()}</PaginationContainer>;
};

export default Pagination;
