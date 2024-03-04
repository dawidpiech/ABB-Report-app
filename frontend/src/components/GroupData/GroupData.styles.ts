import styled from "styled-components";

interface GroupDataWrapperProps {}

export const GroupDataWrapper = styled.section<GroupDataWrapperProps>`
  width: 100%;
  padding: 20px;
  border: 1px ${({ theme }) => theme.colors.gray}3A solid;
  margin: 10px 0;

  > p {
    margin: 0 0 10px 0;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.red};
    font-size: 0.9rem;
    border-bottom: 3px ${({ theme }) => theme.colors.red} solid;
  }
`;

export const SectionDataWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
