import {
  MainContentWrapperInner,
  MainContentWrapper,
} from "./MainContent.styles";

interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent = ({ children }: MainContentProps) => {
  return (
    <MainContentWrapper>
      <MainContentWrapperInner>{children}</MainContentWrapperInner>
    </MainContentWrapper>
  );
};
