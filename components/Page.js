import styled from "styled-components";
import Actions from "./actions";
import Image from "./Image";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

const PageLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #2778a5;
  border-radius: 8px;
  padding: 20px;
  margin: 17px 0 42px;
  justify-content: space-between;
`;

const Page = ({ page, images, activeId }) => {
    const filteredImages = images.filter(image => image.page === page).sort((a, b) => (a.pos === 'x' ? -1 : 1));
    return (
        <div>
            <Header>
                <Title>{page}</Title>
                <Actions />
            </Header>
            <PageLayout>
                {filteredImages.map(image => {
                    return <Image key={image.id} {...image} activeId={activeId} />
                })}
            </PageLayout>
        </div>
        );
}

export default Page;